<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::create("estimate_form_product", function (Blueprint $table) {
      $table->id();
      $table
        ->foreignId("estimate_form_id")
        ->constrained("estimate_forms")
        ->cascadeOnDelete();
      $table
        ->foreignId("product_id")
        ->constrained("products")
        ->cascadeOnDelete();
      $table->integer("sort")->default(0);
      $table->boolean("is_active")->default(true);
      $table->timestamps();

      $table->unique(["estimate_form_id", "product_id"]);
    });

    // Backward compatibility: migrate old one-to-many links if product_id exists.
    if (Schema::hasColumn("estimate_forms", "product_id")) {
      $rows = DB::table("estimate_forms")
        ->whereNotNull("product_id")
        ->select(["id", "product_id", "sort"])
        ->get();

      foreach ($rows as $row) {
        DB::table("estimate_form_product")->updateOrInsert(
          [
            "estimate_form_id" => $row->id,
            "product_id" => $row->product_id,
          ],
          [
            "sort" => (int) ($row->sort ?? 0),
            "is_active" => true,
            "updated_at" => now(),
            "created_at" => now(),
          ]
        );
      }
    }
  }

  public function down(): void
  {
    Schema::dropIfExists("estimate_form_product");
  }
};
