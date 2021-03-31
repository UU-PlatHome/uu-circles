<?php

namespace App\Http\Controllers\Main\CircleNewJoy;

use App\Http\Controllers\Controller;
use App\Support\Arr;
use App\Usecases\Main\Circle\GetCircleBySlugUsecase;
use App\Usecases\Main\CircleNewJoy\GetTodayCircleNewJoyWithLimitUsecase;
use App\Usecases\Main\CircleNewJoy\IndexCircleNewJoyUsecase;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class IndexCircleNewJoyController extends Controller
{
    private GetCircleBySlugUsecase $getCircleBySlugUsecase;
    private GetTodayCircleNewJoyWithLimitUsecase $getTodayCircleNewJoyWithLimitUsecase;
    private IndexCircleNewJoyUsecase $indexCircleNewJoyUsecase;

    public function __construct(
        GetCircleBySlugUsecase $getCircleBySlugUsecase,
        GetTodayCircleNewJoyWithLimitUsecase $getTodayCircleNewJoyWithLimitUsecase,
        IndexCircleNewJoyUsecase $indexCircleNewJoyUsecase
    ) {
        $this->getCircleBySlugUsecase = $getCircleBySlugUsecase;
        $this->getTodayCircleNewJoyWithLimitUsecase = $getTodayCircleNewJoyWithLimitUsecase;
        $this->indexCircleNewJoyUsecase = $indexCircleNewJoyUsecase;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, string $slug)
    {
        Log::debug("#IndexCircleNewJoyController args", [
            'slug' => $slug
        ]);

        $circle = $this->getCircleBySlugUsecase->invoke($slug);

        $circleNewJoys = Cache::remember(
            $this->getCircleNewJoysCacheKey(),
            60,
            fn () => $this->indexCircleNewJoyUsecase->invoke($circle->circleValueObject->id)
        );

        $allCircleNewJoys = Cache::remember(
            $this->getAllCircleNewJoysCacheKey(),
            60,
            fn () => $this->getTodayCircleNewJoyWithLimitUsecase->invoke()
        );

        return Arr::camel_keys([
            'circle'              => $circle->circleValueObject->toArray(),
            // 新歓開催済み
            'pastCircleNewJoys'   => (new Collection($circleNewJoys['pastCircleNewJoys']))->map(
                fn (CircleNewJoyValueObject $circleNewJoyValueObject) => $circleNewJoyValueObject->toArray()
            )->values()->toArray(),
            // 新歓開催前
            'futureCircleNewJoys' => (new Collection($circleNewJoys['futureCircleNewJoys']))->map(
                fn (CircleNewJoyValueObject $circleNewJoyValueObject) => $circleNewJoyValueObject->toArray()
            )->values()->toArray(),
            // 現在開催中
            'nowCircleNewJoys'    => (new Collection($circleNewJoys['nowCircleNewJoys']))->map(
                fn (CircleNewJoyValueObject $circleNewJoyValueObject) => $circleNewJoyValueObject->toArray()
            )->values()->toArray(),
            // 今日の新歓
            'todayCircleNewJoys'  => (new Collection($circleNewJoys['todayCircleNewJoys']))->map(
                fn (CircleNewJoyValueObject $circleNewJoyValueObject) => $circleNewJoyValueObject->toArray()
            )->values()->toArray(),
            // 今日の新歓 全て
            'allTodayCircleNewJoys' => (new Collection($allCircleNewJoys['todayCircleNewJoys']))->map(
                fn (array $arr) => [
                    'slug'           => $arr['slug'],
                    'name'           => $arr['name'],
                    'circle_type'    => $arr['circle_type'],
                    'main_image_url' => $arr['main_image_url'],
                    'circleNewJoy'   => $arr['circleNewJoyValueObject']->toArray()
                ]
            )->values()->toArray(),
        ]);
    }

    private function getCircleNewJoysCacheKey(): string
    {
        $minutes = Carbon::now()->format('YmdHi');
        return 'IndexCircleNewJoyController.circleNewJoys' . $minutes;
    }

    private function getAllCircleNewJoysCacheKey(): string
    {
        $minutes = Carbon::now()->format('YmdHi');
        return 'IndexCircleNewJoyController.allCircleNewJoys' . $minutes;
    }
}
