<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::create("estimate_forms", function (Blueprint $table) {
      $table->id();

      $table->string("title");
      $table->integer("price")->default(0);
      $table->string("type")->default("sqft");
      $table->integer("min_price")->default(0);
      $table->json("range_prices")->nullable();
      $table->json("per_quantity_prices")->nullable();

      $table->integer("sort")->default(0);
      $table->boolean("is_active")->default(true);

      $table->softDeletes();
      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists("estimate_forms");
  }
};
