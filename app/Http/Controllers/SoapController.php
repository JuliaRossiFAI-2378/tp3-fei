<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\GhostCastleSoapService;
use Illuminate\Support\Facades\Log;
use DOMDocument;
use Throwable;
use DOMXPath;

class SoapController extends Controller
{
    public function wsdl(){
        $xml = file_get_contents(storage_path('app/wsdl/ghostcastle.wsdl'));
        return response($xml, 200)->header('Content-Type', 'text/xml');
    }

    public function service(Request $request){
        $raw = file_get_contents('php://input');

        if (empty(trim($raw))) {
            // devolvemo codigo 200 o explota todo
            return response('<?xml version="1.0"?><note>SOAP service ready. Use POST with SOAP Envelope.</note>', 200)
                ->header('Content-Type', 'text/xml');
        }

        // parseo
        libxml_use_internal_errors(true);
        $dom = new DOMDocument();
        if (@$dom->loadXML($raw) === false) {
            $errs = libxml_get_errors();
            return response($this->soapFault('Client', 'Malformed XML'), 400)->header('Content-Type', 'text/xml');
        }

        $xpath = new DOMXPath($dom);
        $reqNode = $xpath->query('//*[local-name()="getByIdRequest"]')->item(0);
        if (!$reqNode) {
            return response($this->soapFault('Client', 'Missing getByIdRequest'), 400)->header('Content-Type', 'text/xml');
        }

        $entityNode = $xpath->query('.//*[local-name()="entity"]', $reqNode);
        $idNode = $xpath->query('.//*[local-name()="id"]', $reqNode);
        $entity = $entityNode->length ? $entityNode->item(0)->nodeValue : null;
        $id = $idNode->length ? (int)$idNode->item(0)->nodeValue : null;

        if (!$entity || !$id){
            return response($this->soapFault('Client', 'Missing parameters entity or id'), 400)->header('Content-Type', 'text/xml');
        }

        try {
            $svc = app(GhostCastleSoapService::class);
            $result = $svc->getById($entity, $id); //json o string
            if (!is_string($result)) { //convertimos los feos en json
                $result = json_encode($result);
            }

            // respuesta soap
            $tns = 'http://127.0.0.1/tp3-fei/api/soap/service';
            $escaped = htmlspecialchars($result, ENT_XML1 | ENT_COMPAT, 'UTF-8');

            $respXml = '<?xml version="1.0" encoding="UTF-8"?>' .
                '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">' .
                '<SOAP-ENV:Body>' .
                '<ns1:getByIdResponse xmlns:ns1="' . htmlspecialchars($tns, ENT_XML1) . '">' .
                '<return>' . $escaped . '</return>' .
                '</ns1:getByIdResponse>' .
                '</SOAP-ENV:Body>' .
                '</SOAP-ENV:Envelope>';

            return response($respXml, 200)->header('Content-Type', 'text/xml');

        } catch (Throwable $e) {
            return response($this->soapFault('Server', $e->getMessage()), 500)->header('Content-Type', 'text/xml');
        }
    }

    private function soapFault($code, $msg){
        $msgEsc = htmlspecialchars($msg, ENT_XML1 | ENT_COMPAT, 'UTF-8');
        return '<?xml version="1.0" encoding="UTF-8"?>' .
            '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">' .
            '<SOAP-ENV:Body>' .
            '<SOAP-ENV:Fault>' .
            "<faultcode>{$code}</faultcode>" .
            "<faultstring>{$msgEsc}</faultstring>" .
            '</SOAP-ENV:Fault>' .
            '</SOAP-ENV:Body>' .
            '</SOAP-ENV:Envelope>';
    }


    // van en plural las tablas
    public function test(){
        try {
            $svc = new GhostCastleSoapService();
            $res = $svc->getById('zones', 1);
            return response()->json(['success' => true, 'response' => json_decode($res, true)]);
        } catch (Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()]);
        }
    }

}