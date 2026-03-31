<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::table("estimate_forms", function (Blueprint $table) {
      $table->string("alt_color")->nullable()->after("color");
    });
  }

  public function down(): void
  {
    Schema::table("estimate_forms", function (Blueprint $table) {
      $table->dropColumn("alt_color");
    });
  }
};
