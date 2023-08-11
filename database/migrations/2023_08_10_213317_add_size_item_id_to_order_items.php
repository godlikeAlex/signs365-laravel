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
    Schema::table("order_items", function (Blueprint $table) {
      $table->foreignId("size_item_id")->nullable();

      $table
        ->foreign("size_item_id")
        ->references("id")
        ->nullOnDelete()
        ->on("size_items");
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table("order_items", function (Blueprint $table) {
      //   $table->dropForeign(["size_item_id"]);
      $table->dropColumn("size_item_id");
    });
  }
};
