<?php

namespace App\Http\Controllers\Circle\Circle;

use App\Http\Controllers\Controller;
use App\Http\Requests\Circle\Traits\Permission;
use Illuminate\Http\Request;

class IndexCircleController extends Controller
{
    use Permission;

    public function __invoke(Request $request)
    {
        /** @var \App\Models\User */
        $user = $request->user();
        $this->permissionWithGetUser($user);

        $circles = $user->circleUser->circle;

        return [
            'data' => $circles,
        ];
    }
}