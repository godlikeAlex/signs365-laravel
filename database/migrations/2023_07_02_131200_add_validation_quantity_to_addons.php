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
      $table->integer("min-qty")->default(0);

      $table->string("type")->default("sqft"); // PER ITEM

      $table->integer("max-qty")->default(0);
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
      $table->dropColumn(["min-qty", "max-qty", "type"]);
    });
  }
};
