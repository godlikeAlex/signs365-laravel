<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::table("estimate_forms", function (Blueprint $table) {
      $table
        ->foreignId("owner_product_id")
        ->nullable()
        ->after("id")
        ->constrained("products")
        ->nullOnDelete();
    });
  }

  public function down(): void
  {
    Schema::table("estimate_forms", function (Blueprint $table) {
      $table->dropConstrainedForeignId("owner_product_id");
    });
  }
};
