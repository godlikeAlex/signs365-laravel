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
    Schema::table("product_options", function (Blueprint $table) {
      $table->foreignId("shipping_id")->nullable();

      $table
        ->foreign("shipping_id")
        ->references("id")
        ->on("shippings")
        ->onDelete("set null");
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table("product_options", function (Blueprint $table) {
      Schema::disableForeignKeyConstraints();

      $table->dropIfExists("shipping_id");
    });
  }
};
