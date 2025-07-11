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
      $table->foreignId("voucher_id")->nullable();

      $table
        ->foreign("voucher_id")
        ->references("id")
        ->on("vouchers")
        ->onDelete("cascade");
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
      $table->dropColumn("voucher_id");
    });
  }
};
