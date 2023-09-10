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
    Schema::table("orders", function (Blueprint $table) {
      $table->string("supplier_id")->nullable();
      $table->string("tracking_id")->nullable();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table("orders", function (Blueprint $table) {
      $table->dropColumn("supplier_id");
      $table->dropColumn("tracking_id");
    });
  }
};
