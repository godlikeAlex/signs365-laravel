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
      $table->foreignId("product_option_id")->nullable();
      $table->integer("order_column");
      $table->string("group_addon");

      $table
        ->foreign("product_option_id")
        ->references("id")
        ->on("product_options")
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
    Schema::table("product_addons", function (Blueprint $table) {
      $table->dropColumn("product_option_id");
      $table->dropColumn("order_column");
      $table->dropColumn("group_addon");
    });
  }
};
