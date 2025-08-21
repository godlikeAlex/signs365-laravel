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
    Schema::create("reviews", function (Blueprint $table) {
      $table->id();

      $table->boolean("published")->default(false);
      $table->text("review");
      $table
        ->foreignId("user_id")
        ->nullable()
        ->constrained()
        ->onDelete("set null");
      $table
        ->foreignId("product_id")
        ->constrained()
        ->onDelete("cascade");
      $table->integer("rating")->default(5);

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
    Schema::dropIfExists("reviews");
  }
};
