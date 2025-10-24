<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use DOMDocument;
use Throwable;
use DOMXPath;

class RestWrapperController extends Controller
{
    private string $wsdlUrl = 'http://127.0.0.1/tp3-fei/public/api/soap/wsdl';
    private string $soapEndpoint = 'http://127.0.0.1/tp3-fei/public/api/soap/service';

    private function buildGetByIdEnvelope($namespace, $entity, $id){
        $ns = rtrim($namespace, '/');
        $entityEsc = htmlspecialchars($entity, ENT_XML1, 'UTF-8');
        $idEsc = htmlspecialchars((string)$id, ENT_XML1, 'UTF-8');

        return <<<XML
            <?xml version="1.0" encoding="UTF-8"?>
            <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="$ns">
                <SOAP-ENV:Body>
                    <tns:getByIdRequest>
                    <tns:entity>{$entityEsc}</tns:entity>
                    <tns:id>{$idEsc}</tns:id>
                    </tns:getByIdRequest>
                </SOAP-ENV:Body>
            </SOAP-ENV:Envelope>
            XML;
        }

    private function parseSoapResponseReturn($soapXml){
        libxml_use_internal_errors(true);
        $dom = new DOMDocument();
        if (!@$dom->loadXML($soapXml)) {
            return null;
        }

        $xpath = new DOMXPath($dom);
        $nodes = $xpath->query('//*[local-name()="return"]');
        if ($nodes->length === 0) return null;

        return $nodes->item(0)->nodeValue;
    }

    private function fetchTargetNamespaceFromWsdl(string $wsdlUrl): ?string
    {
        try {
            $resp = Http::timeout(5)->get($wsdlUrl);
            if (!$resp->ok()) return null;

            $dom = new DOMDocument();
            if (!@$dom->loadXML($resp->body())) return null;

            $defs = $dom->documentElement;
            return $defs?->getAttribute('targetNamespace') ?: null;

        } catch (Throwable) {
            return null;
        }
    }

        public function getById($entity, $id){
        $targetNs = $this->fetchTargetNamespaceFromWsdl($this->wsdlUrl)
            ?? 'http://127.0.0.1/tp3-fei/public/api/soap/service';

        $xml = $this->buildGetByIdEnvelope($targetNs, $entity, (int)$id);

        try {
            $response = Http::withHeaders(['Content-Type' => 'text/xml; charset=utf-8', 'SOAPAction' => $targetNs . '#getById'])->withBody($xml, 'text/xml; charset=utf-8')->post($this->soapEndpoint);

            if (!$response->ok()){
                return response()->json([
                    'success' => false,
                    'error' => 'soap_http_error',
                    'status' => $response->status(),
                    'body_snippet' => substr($response->body(), 0, 2000),
                ], 502);
            }

            $body = $response->body();
            $parsed = $this->parseSoapResponseReturn($body);

            if ($parsed === null) {
                return response()->json([
                    'success' => false,
                    'error' => 'invalid_soap_response',
                ], 500);
            }

            $decoded = json_decode($parsed, true);
            return response()->json([
                'success' => true,
                'data' => $decoded ?? $parsed,
            ]);

        } catch (Throwable $e) {
            Log::error('REST wrapper error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'exception',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
