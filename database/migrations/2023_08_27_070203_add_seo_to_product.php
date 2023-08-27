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
    Schema::table("products", function (Blueprint $table) {
      $table->string("seo_title")->nullable();
      $table->string("seo_description")->nullable();
      $table->longText("seo_keywords")->nullable();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table("products", function (Blueprint $table) {
      $table->dropColumn("seo_title");
      $table->dropColumn("seo_description");
      $table->dropColumn("seo_keywords")->nullable();
    });
  }
};
