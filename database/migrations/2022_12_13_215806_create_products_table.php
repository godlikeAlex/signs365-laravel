<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create("products", function (Blueprint $table) {
      $table->id();

      $table->string("title", 50);
      $table->string("slug", 75)->unique();
      $table->longText("description")->nullable();

      $table->boolean("published")->default(false);
      $table->boolean("with_checkout")->default(true);

      $table->integer("order")->nullable();

      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists("products");
  }
}
