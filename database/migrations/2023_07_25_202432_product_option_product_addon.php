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
    Schema::create("product_option_product_addon", function (Blueprint $table) {
      $table->foreignId("product_addon_id")->nullable();
      $table->foreignId("product_option_id")->nullable();

      $table
        ->foreign("product_addon_id")
        ->references("id")
        ->on("product_addons")
        ->onDelete("cascade");

      $table
        ->foreign("product_option_id")
        ->references("id")
        ->on("product_options")
        ->onDelete("cascade");
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists("product_option_product_addon");
  }
};
