<?php

namespace App\Http\Controllers\Circle\CircleNewJoy;

use App\Http\Controllers\Circle\Traits\Permission;
use App\Http\Controllers\Controller;
use App\Http\Requests\Circle\CircleNewJoy\RegisterCircleNewJoyRequest;
use App\Usecases\CircleManagement\CircleNewJoy\CreateCircleNewJoyUsecase;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class RegisterCircleNewJoyController extends Controller
{
    use Permission;

    private CreateCircleNewJoyUsecase $createCircleNewJoyUsecase;

    public function __construct(CreateCircleNewJoyUsecase $createCircleNewJoyUsecase)
    {
        $this->createCircleNewJoyUsecase = $createCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param RegisterCircleNewJoyRequest $request
     * @param int $circleId
     * @return Response
     * @throws Exception
     */
    public function __invoke(
        RegisterCircleNewJoyRequest $request,
        int $circleId
    ) {
        Log::debug("RegisterCircleNewJoyController args", [
            'circleId'       => $circleId,
        ]);

        /** @var \App\Models\User $user */
        $user = $request->user();
        $this->permissionCircle($user, $circleId);

        $param = $request->makeCreateCircleNewJoyUsecaseParam();
        $this->createCircleNewJoyUsecase->invoke($param);
    }
}