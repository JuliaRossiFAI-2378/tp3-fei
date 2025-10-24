<?php
namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class GhostCastleSoapService
{
    public function getById($arg1 = null, $arg2 = null){
        try {
            if (is_object($arg1) || is_array($arg1)) {//hay que limpiar todo es re divertido
                $params = (array) $arg1;
                $entity = $params['entity'] ?? null;
                $id = $params['id'] ?? null;
            } else {
                $entity = $arg1;
                $id = $arg2;
            }
            if ($entity === null || $id === null) {
                return json_encode(['error' => 'missing_parameters', 'message' => 'table and id required']);
            }

            $entity = strtolower((string) $entity);
            $id = (int) $id;

            // si no esta aca, no acepta el query
            $allowedEntities = [
                'games',
                'users',
                'ghosts',
                'equipment',
                'materials',
                'npcs',
                'effects',
                'triggers',
                'items',
                'zones'
            ];

            if (!in_array($entity, $allowedEntities, true)) {
                return json_encode(['error' => 'table does not exist', 'table' => $entity]);
            }

            $row = DB::table($entity)->where('id', $id)->first();

            if (!$row) {
                return json_encode(['error' => 'not_found', 'table' => $entity, 'id' => $id]);
            }

            $result = [];
            foreach ($row as $k => $v) {
                $result[$k] = $v;
            }

            return json_encode($result);
        } catch (Throwable $e) {
            return json_encode(['error' => 'internal_error', 'message' => $e->getMessage()]);
        }
    }
}
