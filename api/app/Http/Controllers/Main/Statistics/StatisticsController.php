<?php

namespace App\Http\Controllers\Main\Statistics;

use App\Support\Arr;
use App\Usecases\Main\Announcement\Dto\GetMainViewFixedAnnouncementsUsecaseDto;
use App\Usecases\Main\Announcement\GetMainViewFixedAnnouncementsUsecase;
use App\Usecases\Main\Statistics\StatisticsUsecase;
use App\Usecases\Main\UuYell\FetchUuYellArticlesKey;
use App\Usecases\Main\UuYell\FetchUuYellArticlesUsecase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class StatisticsController
{
    private FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase;

    private GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase;

    private StatisticsUsecase $statisticsUsecase;

    public function __construct(
        FetchUuYellArticlesUsecase $fetchUuYellArticlesUsecase,
        GetMainViewFixedAnnouncementsUsecase $getMainViewFixedAnnouncementsUsecase,
        StatisticsUsecase $statisticsUsecase
    ) {
        $this->fetchUuYellArticlesUsecase = $fetchUuYellArticlesUsecase;
        $this->getMainViewFixedAnnouncementsUsecase = $getMainViewFixedAnnouncementsUsecase;
        $this->statisticsUsecase = $statisticsUsecase;
    }

    /**
     * 統計情報
     *
     * @return array
     */
    public function __invoke()
    {
        Log::debug("StatisticsController args none");

        // 統計情報
        $statistics = Cache::remember(
            'StatisticsController.statistics',
            60 * 60,
            fn () => $this->statisticsUsecase->invoke()
        );

        // uu-yellの記事情報
        $articles = Cache::remember(
            FetchUuYellArticlesKey::uuYellCacheKey(),
            FetchUuYellArticlesKey::TTL,
            fn () => $this->fetchUuYellArticlesUsecase->invoke()
        );

        // メイン画面に固定するお知らせの取得
        /** @var GetMainViewFixedAnnouncementsUsecaseDto $announcements */
        $announcements = Cache::remember(
            GetMainViewFixedAnnouncementsUsecase::getCacheKey(),
            GetMainViewFixedAnnouncementsUsecase::TTL,
            fn () => $this->getMainViewFixedAnnouncementsUsecase->invoke()
        );

        return Arr::camel_keys([
            'statistics'     => $statistics->toArray(),
            'uuYellArticles' => $articles,
            'announcements'  => Arr::camel_keys($announcements->toArray())['announcements'],
        ]);
    }
}
