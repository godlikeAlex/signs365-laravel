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
    Schema::table("users", function (Blueprint $table) {
      $table->string("provider_id")->nullable();
      $table->string("provider_name")->nullable();
      $table->string("provider_token")->nullable();
      $table->string("provider_refresh_token")->nullable();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table("users", function (Blueprint $table) {
      $table->dropColumn("provider_id");
      $table->dropColumn("provider_name");
      $table->dropColumn("provider_token");
      $table->dropColumn("provider_refresh_token");
    });
  }
};
