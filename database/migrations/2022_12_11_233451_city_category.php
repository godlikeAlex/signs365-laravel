<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CityCategory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('city_product_category', function (Blueprint $table) {
            $table->id();

            $table->foreignId('city_id')->nullable();
            $table->foreignId('product_category_id')->nullable();


            $table->foreign('city_id')->references('id')->on('cities')->onDelete('set null');
            $table->foreign('product_category_id')->references('id')->on('product_categories')->onDelete('set null');

        });
        //

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
