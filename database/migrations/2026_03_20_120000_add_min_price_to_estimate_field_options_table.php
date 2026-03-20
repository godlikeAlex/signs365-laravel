<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::table("estimate_field_options", function (Blueprint $table) {
      $table->integer("min_price")->default(0)->after("condition");
    });
  }

  public function down(): void
  {
    Schema::table("estimate_field_options", function (Blueprint $table) {
      $table->dropColumn("min_price");
    });
  }
};
