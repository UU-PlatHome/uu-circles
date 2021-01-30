<?php

namespace App\Providers;

use App\Events\RegisteredAdminUser;
use App\Events\RegisteredCircleUser;
use App\Listeners\SendEmailVerificationAdminUserNotification;
use App\Listeners\SendEmailVerificationCircleUserNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        RegisteredAdminUser::class => [
            SendEmailVerificationAdminUserNotification::class,
        ],
        RegisteredCircleUser::class => [
            SendEmailVerificationCircleUserNotification::class,
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
