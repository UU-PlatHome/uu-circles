<?php

declare(strict_types=1);

namespace App\Usecases\Admin;

use App\Models\Circle;
use App\ValueObjects\CircleValueObject;
use Illuminate\Support\Facades\Log;

final class IndexCircleUsecase
{
    /**
     * invoke
     *
     * @return CircleValueObject[]
     */
    public function invoke(): array
    {
        Log::debug("IndexCircleUsecase args none");

        $circles = Circle::with([
            'circleInformation',
            'circleHandbill',
        ])->hasByNonDependentSubquery('circleInformation')
            ->get();

        return $circles->map(
            fn (Circle $circle) =>
            CircleValueObject::byEloquent(
                $circle,
                $circle->circleInformation,
                $circle->circleHandbill
            )
        )->all();
    }
}
