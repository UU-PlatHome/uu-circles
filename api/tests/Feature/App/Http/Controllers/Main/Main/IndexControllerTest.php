<?php

namespace Tests\Feature\App\Http\Controllers\Main\Main;

use App\Http\Controllers\Main\Main\IndexController;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class IndexControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("IndexControllerTest");
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest()
    {
        Log::info("testRequest");

        // GIVEN
        Http::fake();

        // WHEN
        $response = $this->get('/api/main');

        // THEN
        $response->assertOk();
        $this->assertArrayHasKey('data', $response);
        $this->assertIsArray($response['data']);
        $this->assertCount(IndexController::CIRCLE_MAX_VIEW, $response['data']);

        $this->assertArrayHasKey('mainAdvertises', $response);
        $this->assertIsArray($response['mainAdvertises']);

        $this->assertArrayHasKey('advertises', $response);
        $this->assertIsArray($response['advertises']);
        $this->assertCount(IndexController::ADVERTISE_MAX_VIEW, $response['advertises']);

        $this->assertArrayHasKey('uuYellArticles', $response);
        $this->assertIsArray($response['uuYellArticles']);

        $this->assertArrayHasKey('announcements', $response);
        $this->assertIsArray($response['announcements']);
    }
}
