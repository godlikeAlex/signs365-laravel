<?php

use App\Enums\VoucherTypeEnum;
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
    Schema::create("vouchers", function (Blueprint $table) {
      $table->bigIncrements("id");

      $table
        ->string("code")
        ->nullable()
        ->unique();

      $table->string("name");

      $table->string("type")->default(VoucherTypeEnum::DISCOUNT->value);

      $table->integer("min_price")->nullable();

      // The max uses this voucher has
      $table
        ->integer("max_uses")
        ->unsigned()
        ->nullable();

      // How many times a user can use this voucher.
      $table
        ->integer("max_uses_user")
        ->unsigned()
        ->nullable();

      $table->boolean("is_fixed")->default(true);

      $table->integer("discount_amount")->nullable();
      $table->integer("discount_percent")->nullable();

      $table->timestamp("starts_at");
      $table->timestamp("expires_at")->nullable();

      $table->string("timezone")->default("America/New_York");
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
    Schema::dropIfExists("vouchers");
  }
};
