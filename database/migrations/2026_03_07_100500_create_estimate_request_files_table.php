<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::create("estimate_request_files", function (Blueprint $table) {
      $table->id();

      $table
        ->foreignId("estimate_request_id")
        ->constrained("estimate_requests")
        ->cascadeOnDelete();

      $table->string("item_code")->nullable();
      $table->string("path");
      $table->string("original_name");
      $table->string("mime_type")->nullable();
      $table->unsignedBigInteger("size")->nullable();

      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists("estimate_request_files");
  }
};
