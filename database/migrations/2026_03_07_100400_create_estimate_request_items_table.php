<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::create("estimate_request_items", function (Blueprint $table) {
      $table->id();

      $table
        ->foreignId("estimate_request_id")
        ->constrained("estimate_requests")
        ->cascadeOnDelete();

      $table->string("item_code");
      $table->string("label");

      $table->json("selected_value")->nullable();
      $table->integer("quantity")->default(1);

      $table->integer("unit_price")->default(0);
      $table->integer("line_total")->default(0);

      $table->json("meta")->nullable();

      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists("estimate_request_items");
  }
};
