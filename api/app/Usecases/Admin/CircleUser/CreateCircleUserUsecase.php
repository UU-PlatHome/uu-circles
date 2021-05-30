<?php

declare(strict_types=1);

namespace App\Usecases\Admin\CircleUser;

use App\Enum\Property\CircleUserProperty;
use App\Events\RegisteredCircleUser;
use App\Models\Circle;
use App\Models\User;
use App\Usecases\Admin\CircleUser\Params\CreateCircleUserUsecaseParam;
use App\ValueObjects\CircleUserValueObject;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

final class CreateCircleUserUsecase
{
    /**
     * invoke
     *
     * @param CreateCircleUserUsecaseParam $param
     * @return void
     * @throws Exception
     */
    public function invoke(
        CreateCircleUserUsecaseParam $param
    ) {
        Log::debug("CreateCircleUserUsecase args", [
            'CreateCircleUserUsecaseParam' => $param,
        ]);

        if (!Circle::whereId($param->circle_id)->exists()) {
            throw new Exception("$param->circle_id のサークルが存在しません");
        }

        $user = new User();
        $user->username = $param->username ?? Str::random(12);
        $user->email = $param->email;
        $user->active = true;
        $user->display_name ??= $user->username;
        $user->createRememberToken();
        $user->createApiToken();

        DB::beginTransaction();
        try {
            $user->save();
            $user->circleUsers()->create([
                CircleUserProperty::circle_id => $param->circle_id,
                CircleUserProperty::role      => $param->role,
            ]);

            // 認証メールの通知
            event(new RegisteredCircleUser($user));

            DB::commit();
        } catch (Exception $e) {
            Log::error("CreateCircleUserUsecase [ERROR]", [
                'CreateCircleUserUsecaseParam' => $param,
            ]);

            DB::rollBack();
            throw $e;
        }
    }
}
