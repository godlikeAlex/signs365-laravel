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
    Schema::create("product_sizes", function (Blueprint $table) {
      $table->id();
      $table->decimal("width")->default(1);
      $table->decimal("height")->default(1);
      $table->string("label")->default("");

      $table->foreignId("product_id")->nullable();

      $table
        ->foreign("product_id")
        ->references("id")
        ->on("products")
        ->onDelete("cascade");

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
    Schema::dropIfExists("product_sizes");
  }
};
