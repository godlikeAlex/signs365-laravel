<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::create("estimate_forms", function (Blueprint $table) {
      $table->id();

      $table
        ->foreignId("product_id")
        ->constrained("products")
        ->cascadeOnDelete();

      $table->string("title");
      $table->integer("price")->default(0);
      $table->string("type")->default("sqft");

      $table->boolean("size_for_collect")->default(false);
      $table->boolean("show_custom_sizes")->default(false);
      $table->boolean("need_file")->default(false);
      $table->boolean("prevent_user_input_size")->default(false);

      $table->decimal("max_width", 10, 2)->default(0);
      $table->decimal("max_height", 10, 2)->default(0);
      $table->integer("min_price")->default(0);

      $table->json("common_data")->nullable();
      $table->json("range_prices")->nullable();
      $table->json("per_quantity_prices")->nullable();
      $table->json("quantity_list")->nullable();

      $table
        ->foreignId("shipping_id")
        ->nullable()
        ->constrained("shippings")
        ->nullOnDelete();

      $table
        ->foreignId("size_list_id")
        ->nullable()
        ->constrained("size_lists")
        ->nullOnDelete();

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
