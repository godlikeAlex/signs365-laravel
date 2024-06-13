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
    Schema::create("user_voucher", function (Blueprint $table) {
      $table->integer("user_id")->unsigned();
      $table->bigInteger("voucher_id")->unsigned();

      $table->unique(["user_id", "voucher_id"]);
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists("user_voucher");
  }
};
