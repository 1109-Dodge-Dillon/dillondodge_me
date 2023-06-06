<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CouponResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'coupon_id' => $this->coupon_id,
            'month' => $this->month,
            'album' => $this->album,
            'artist' => $this->artist,
            'pressing' => $this->link,
            'date_claimed' => $this->date_claimed,
            'claimed' => $this->claimed
        ];
    }
}
