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
    Schema::table("order_items", function (Blueprint $table) {
      $table->decimal("width")->nullable();
      $table->decimal("height")->nullable();
      $table->string("unit")->nullable();

      $table->foreignId("product_option_id")->nullable();
      $table->foreignId("custom_size_id")->nullable();

      $table
        ->foreign("product_option_id")
        ->references("id")
        ->on("product_options");

      $table
        ->foreign("custom_size_id")
        ->references("id")
        ->on("custom_sizes");
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table("order_items", function (Blueprint $table) {
      //
    });
  }
};
