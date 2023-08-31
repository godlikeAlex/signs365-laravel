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
    Schema::table("product_addons", function (Blueprint $table) {
      $table->string("extra_data_type")->default("unset");
      $table->json("extra_data_content")->nullable();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table("product_addons", function (Blueprint $table) {
      $table->dropColumn("extra_data_type");
      $table->dropColumn("extra_data_content");
    });
  }
};
