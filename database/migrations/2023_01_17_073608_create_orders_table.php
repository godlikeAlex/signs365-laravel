<?php

use App\Enums\OrderStatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create("orders", function (Blueprint $table) {
      $table->id();

      $table->uuid("uuid")->unique();
      $table->foreignId("user_id")->nullable();
      $table->foreignId("city_id")->nullable();
      $table->string("payment_intent_id")->nullable();

      $table->string("status")->default(OrderStatusEnum::UNPAID);

      $table->integer("amount")->nullable();
      $table->integer("tax")->nullable();

      $table
        ->foreign("user_id")
        ->references("id")
        ->on("users")
        ->onDelete("set null");
      $table
        ->foreign("city_id")
        ->references("id")
        ->on("cities")
        ->onDelete("set null");

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
    Schema::dropIfExists("orders");
  }
}
