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
    Schema::create("custom_sizes", function (Blueprint $table) {
      $table->id();
      $table->decimal("width")->default(1);
      $table->decimal("height")->default(1);
      $table->string("label")->default("");
      $table->integer("sheets")->default(0);

      $table->foreignId("product_option_id")->nullable();

      $table
        ->foreign("product_option_id")
        ->references("id")
        ->on("product_options")
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
    Schema::dropIfExists("custom_sizes");
  }
};
