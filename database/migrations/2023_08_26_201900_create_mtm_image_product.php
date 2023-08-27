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
    Schema::create("media_product", function (Blueprint $table) {
      $table->id();

      $table->unsignedBigInteger("media_id")->nullable();
      $table->unsignedBigInteger("product_id")->nullable();
      $table->integer("order")->nullable();

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
    Schema::dropIfExists("media_product");
  }
};
