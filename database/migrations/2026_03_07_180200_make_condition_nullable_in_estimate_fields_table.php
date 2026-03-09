<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::table("estimate_fields", function (Blueprint $table) {
      $table->string("condition")->nullable()->change();
    });
  }

  public function down(): void
  {
    Schema::table("estimate_fields", function (Blueprint $table) {
      $table->string("condition")->nullable(false)->change();
    });
  }
};
