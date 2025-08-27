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
    Schema::table("reviews", function (Blueprint $table) {
      $table->string("reviewer_name")->nullable();
      $table->string("reviewer_email")->nullable();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table("reviews", function (Blueprint $table) {
      $table->dropColumn(["reviewer_name", "reviewer_email"]);
    });
  }
};
