<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::create("estimate_fields", function (Blueprint $table) {
      $table->id();

      $table
        ->foreignId("estimate_form_id")
        ->constrained("estimate_forms")
        ->cascadeOnDelete();

      $table->string("title");
      $table->string("field_type")->default("radio");
      $table->string("condition")->nullable();
      $table->string("type")->default("fee");

      $table->integer("order_column")->default(0);
      $table->boolean("is_required")->default(false);
      $table->string("cart_label")->nullable();
      $table->boolean("is_active")->default(true);
      $table->string("disclaimer")->nullable();

      $table->softDeletes();
      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists("estimate_fields");
  }
};
