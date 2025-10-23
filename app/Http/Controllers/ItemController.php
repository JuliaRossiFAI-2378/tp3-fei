<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function getItemByMaterial(Request $request){
        $zone = $request->query('zone');
        $material = $request->query('material_id');
        $item = Item::where('zone_id', $zone)->where('material_id', $material)->first();
        return response($item);
    }
}
