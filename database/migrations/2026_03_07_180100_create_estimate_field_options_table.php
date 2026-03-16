<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::create("estimate_field_options", function (Blueprint $table) {
      $table->id();

      $table
        ->foreignId("estimate_field_id")
        ->constrained("estimate_fields")
        ->cascadeOnDelete();

      $table->string("title");
      $table->string("condition");
      $table->string("type")->default("fee");
      $table->string("disclaimer")->nullable();

      $table->integer("order_column")->default(0);
      $table->boolean("is_active")->default(true);

      $table->softDeletes();
      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists("estimate_field_options");
  }
};
