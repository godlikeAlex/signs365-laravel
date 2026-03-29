<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::table("estimate_form_product", function (Blueprint $table) {
      $table->integer("order_column")->default(0)->after("sort");
    });

    DB::table("estimate_form_product")->update([
      "order_column" => DB::raw("`sort`"),
    ]);
  }

  public function down(): void
  {
    Schema::table("estimate_form_product", function (Blueprint $table) {
      $table->dropColumn("order_column");
    });
  }
};
