<?php

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
    Schema::create("product_options", function (Blueprint $table) {
      $table->id();

      $table->string("title");
      $table->integer("price")->default(0);
      $table->string("type")->default("sqft"); // PER ITEM
      $table->boolean("size_for_collect")->default(false);

      $table->decimal("max_width")->default(0);
      $table->decimal("max_height")->default(0);

      $table->softDeletes();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists("product_options");
  }
};
