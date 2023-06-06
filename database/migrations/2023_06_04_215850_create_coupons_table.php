<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('coupon_id')->unique();
            $table->string('month');
            $table->string('album')->nullable();
            $table->string('artist')->nullable();
            $table->string('pressing')->nullable();
            $table->string('web_link')->nullable();
            $table->date('date_claimed')->nullable();
            $table->boolean('claimed')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('coupons');
    }
};
