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
    Schema::create("product_product_addon", function (Blueprint $table) {
      $table->id();

      $table->foreignId("product_id")->nullable();
      $table->foreignId("product_addon_id")->nullable();

      $table
        ->foreign("product_id")
        ->references("id")
        ->on("products")
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
    Schema::dropIfExists("product_product_addon", function (Blueprint $table) {
      //
    });
  }
};
