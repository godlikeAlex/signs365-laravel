<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void
  {
    Schema::table("estimate_fields", function (Blueprint $table) {
      if (Schema::hasColumn("estimate_fields", "group_addon")) {
        $table->dropColumn("group_addon");
      }
    });

    Schema::table("estimate_field_options", function (Blueprint $table) {
      if (Schema::hasColumn("estimate_field_options", "group_addon")) {
        $table->dropColumn("group_addon");
      }
    });
  }

  public function down(): void
  {
    Schema::table("estimate_fields", function (Blueprint $table) {
      if (!Schema::hasColumn("estimate_fields", "group_addon")) {
        $table->string("group_addon")->default("addons");
      }
    });

    Schema::table("estimate_field_options", function (Blueprint $table) {
      if (!Schema::hasColumn("estimate_field_options", "group_addon")) {
        $table->string("group_addon")->default("addons");
      }
    });
  }
};
