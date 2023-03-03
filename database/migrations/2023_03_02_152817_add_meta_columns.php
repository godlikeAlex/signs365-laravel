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
    Schema::table("temporary_orders", function (Blueprint $table) {
      $table->string("name")->nullable();
      $table->string("phone")->nullable();
      $table->string("email")->nullable();
      $table->string("address")->nullable();
      $table->foreignId("user_id")->nullable();
      $table->foreignId("city_id")->nullable();
      $table->string("main_order_uuid")->nullable();

      $table
        ->foreign("user_id")
        ->references("id")
        ->on("users")
        ->onDelete("set null");
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table("temporary_orders", function (Blueprint $table) {
      $table->dropForeign(["user_id"]);

      $table->dropColumn(
        "name",
        "phone",
        "email",
        "address",
        "city_id",
        "user_id",
        "main_order_uuid"
      );
    });
  }
};
