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
    Schema::table("product_categories", function (Blueprint $table) {
      $table->string("primary_color")->nullable();
      $table->string("alternative_color")->nullable();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table("product_categories", function (Blueprint $table) {
      $table->dropColumn(["primary_color", "alternative_color"]);
    });
  }
};
