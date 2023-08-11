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
    Schema::create("size_items", function (Blueprint $table) {
      $table->id();

      $table->decimal("width")->default(1);
      $table->decimal("height")->default(1);
      $table->string("label")->default("");
      $table->integer("sheets")->default(0);

      $table->foreignId("size_list_id")->nullable();

      $table
        ->foreign("size_list_id")
        ->references("id")
        ->on("size_lists")
        ->onDelete("cascade");

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
    Schema::dropIfExists("size_items");
  }
};
