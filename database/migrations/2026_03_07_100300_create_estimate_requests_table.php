<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::create("estimate_requests", function (Blueprint $table) {
      $table->id();

      $table->uuid("uuid")->unique();

      $table
        ->foreignId("product_id")
        ->nullable()
        ->constrained("products")
        ->nullOnDelete();

      $table
        ->foreignId("estimate_form_id")
        ->nullable()
        ->constrained("estimate_forms")
        ->nullOnDelete();

      $table->integer("form_version")->default(1);

      $table->string("name");
      $table->string("email");
      $table->string("phone")->nullable();
      $table->text("message")->nullable();

      $table->string("status")->default("new");

      $table->integer("subtotal")->default(0);
      $table->integer("total")->default(0);
      $table->string("currency", 3)->default("USD");

      $table->json("payload")->nullable();

      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists("estimate_requests");
  }
};
