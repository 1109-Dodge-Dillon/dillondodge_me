<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCouponRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'coupon_id' => 'required|string|unique:coupons,coupon_id',
            'month' => 'required|string|max:15',
            'album' => 'nullable|string|max:50',
            'artist' => 'nullable|string|max:30',
            'pressing' => 'nullable|string|max:15',
            'web_link' => 'nullable|string|max:100',
            'date_claimed' => 'nullable|date',
            'claimed' => 'nullable|boolean'
        ];
    }
}
