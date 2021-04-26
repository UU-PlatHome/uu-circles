<?php

namespace Tests\Feature\App\Http\Controllers\Main\Gacha;

use App\Models\Identifier;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Tests\Traits\RefreshDatabaseLite;
use Tests\TestCase;

class GachaPickupListControllerTest extends TestCase
{
    use RefreshDatabaseLite;

    protected function setUp(): void
    {
        parent::setUp();
        Log::info("GachaPickupListControllerTest");
        Cache::clear();
    }

    /**
     * 各テストの前にデータベースをシードする必要があるかどうかを示す
     *
     * @var bool
     */
    protected $seed = true;

    public function testRequest_単発ガチャ()
    {
        Log::info("testRequest_単発ガチャ");

        // GIVEN
        $NUMBER=1;
        
        $identifier = factory(Identifier::class, 1)->create()->first();
        Log::info($identifier);
        $this->assertNotNull($identifier);
        $this->assertIsString($identifier->identifier_hash);

        // WHEN
        $response = $this->post("api/gacha/circle?number={$NUMBER}",[],[
            "X-IDENTIFIER_HASH"=>$identifier->identifier_hash
        ]);

        // THEN
        $response->assertOk();
        
        $this->assertArrayHasKey("drewCircles", $response);

        //数の確認
        $this->assertCount($NUMBER,$response["drewCircles"]);
    }

    public function testRequest_10連ガチャ()
    {
        Log::info("testRequest_10連ガチャ");

        // GIVEN
        $NUMBER=10;

        $identifier = factory(Identifier::class, 1)->create()->first();
        Log::info($identifier);
        $this->assertNotNull($identifier);
        $this->assertIsString($identifier->identifier_hash);
        // WHEN
        $response = $this->post("api/gacha/circle?number={$NUMBER}",[],[
            "X-IDENTIFIER_HASH"=>$identifier->identifier_hash
        ]);

        // THEN
        $response->assertOk();
        
        $this->assertArrayHasKey("drewCircles", $response);

        //数の確認
        $this->assertCount($NUMBER,$response["drewCircles"]);
    }
}