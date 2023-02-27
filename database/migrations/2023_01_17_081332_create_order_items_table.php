<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('order_id')->nullable();
            $table->foreignId('product_id')->nullable();
            $table->foreignId('product_variant_id')->nullable();
            $table->foreignId('product_price_id')->nullable();

            $table->integer('quantity')->default(1);
            $table->integer('price');

            $table->foreign('product_id')
                ->references('id')
                ->on('products');
            $table->foreign('product_variant_id')
                ->references('id')
                ->on('product_variants');
            $table->foreign('product_price_id')
                ->references('id')
                ->on('product_prices');
            $table->foreign('order_id')
                ->references('id')
                ->on('orders')
                ->onDelete('cascade');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_items');
    }
}
