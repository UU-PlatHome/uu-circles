<?php

namespace App\Http\Requests\Admin\CircleNewJoy;

use App\Enum\Property\CircleNewJoyProperty;
use App\Enum\PlaceOfActivity;
use App\Support\Arr;
use App\ValueObjects\CircleNewJoyValueObject;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UpdateCircleNewJoyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return Arr::camel_keys([
            CircleNewJoyProperty::title                    => ['required', 'string', 'max:30'],
            CircleNewJoyProperty::description              => ['string', 'nullable', 'max:100'],
            CircleNewJoyProperty::url                      => ['string', 'nullable', 'url', 'max:255'],
            CircleNewJoyProperty::place_of_activity        => [
                'string',
                Rule::in([PlaceOfActivity::DISCORD, PlaceOfActivity::OTHER]),
            ],
            CircleNewJoyProperty::place_of_activity_detail => ['string', 'nullable', 'max:255'],
            CircleNewJoyProperty::publish_from             => ['date', 'nullable', 'date_format:Y-m-d'],
            CircleNewJoyProperty::start_date               => ['required', 'date', 'date_format:Y-m-d H:i'],
            CircleNewJoyProperty::end_date                 => ['date', 'nullable', 'date_format:Y-m-d H:i', 'after:' . Str::camel('start_date')],
            CircleNewJoyProperty::release                  => ['boolean', 'nullable'],
        ]);
    }

    public function makeCircleNewJoyValueObject(): CircleNewJoyValueObject
    {
        $request = Arr::snake_keys($this->validated());

        return CircleNewJoyValueObject::of([
            CircleNewJoyProperty::circle_id                => $this->id,
            CircleNewJoyProperty::title                    => Arr::get($request, 'title'),
            CircleNewJoyProperty::description              => Arr::get($request, 'description'),
            CircleNewJoyProperty::url                      => Arr::get($request, 'url'),
            CircleNewJoyProperty::place_of_activity        => Arr::get($request, 'place_of_activity'),
            CircleNewJoyProperty::place_of_activity_detail => Arr::get($request, 'place_of_activity') === PlaceOfActivity::OTHER ? Arr::get($request, 'place_of_activity_detail') : '',
            CircleNewJoyProperty::publish_from             => Arr::get($request, 'publish_from'),
            CircleNewJoyProperty::start_date               => Arr::get($request, 'start_date'),
            CircleNewJoyProperty::end_date                 => Arr::get($request, 'end_date'),
            CircleNewJoyProperty::release                  => Arr::get($request, 'release'),
        ]);
    }
}
