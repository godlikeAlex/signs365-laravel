<?php

use App\Models\OrderItem;
use App\Models\ProductAddons;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create("order_item_product_addons", function (Blueprint $table) {
      $table
        ->foreignIdFor(OrderItem::class, "order_item_id")
        ->constrained("order_items");

      $table
        ->foreignIdFor(ProductAddons::class, "product_addons_id")
        ->constrained("product_addons");

      $table->integer("quantity")->default(0);
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table("order_item_product_addons", function (Blueprint $table) {
      $table->dropConstrainedForeignId("order_item_id");
      $table->dropConstrainedForeignId("product_addons_id");
    });
    Schema::dropIfExists("order_item_product_addons");
  }
};
