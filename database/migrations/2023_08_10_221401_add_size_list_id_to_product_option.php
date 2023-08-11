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
    Schema::table("product_options", function (Blueprint $table) {
      $table->foreignId("size_list_id")->nullable();

      $table
        ->foreign("size_list_id")
        ->references("id")
        ->on("size_lists")
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
    Schema::table("product_options", function (Blueprint $table) {
      $table->dropColumn("size_list_id");
    });
  }
};
