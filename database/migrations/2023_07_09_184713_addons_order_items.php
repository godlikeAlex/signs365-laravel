<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create("addon_order_item", function (Blueprint $table) {
      $table->id();

      $table->foreignId("product_addon_id")->nullable();
      $table->foreignId("order_item_id")->nullable();
      $table->integer("quantity")->default(0);

      $table
        ->foreign("order_item_id")
        ->references("id")
        ->on("order_items")
        ->onDelete("cascade");

      $table
        ->foreign("product_addon_id")
        ->references("id")
        ->on("product_addons")
        ->onDelete("cascade");

      $table->softDeletes();
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
    Schema::dropIfExists("addon_order_item");
  }
};
