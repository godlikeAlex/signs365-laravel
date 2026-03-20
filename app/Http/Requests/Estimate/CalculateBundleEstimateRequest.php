<?php

namespace App\Http\Requests\Estimate;

use Illuminate\Foundation\Http\FormRequest;

class CalculateBundleEstimateRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      "product_id" => ["required", "integer"],
      "selected_form_ids" => ["required", "array", "min:1"],
      "selected_form_ids.*" => ["integer"],
      "quantity" => ["required", "integer", "min:1"],
      "unit" => ["nullable", "in:feet,inches"],
      "width" => ["required", "numeric", "gt:0"],
      "height" => ["required", "numeric", "gt:0"],
      "fields_by_form" => ["nullable", "array"],
      "fields_by_form.*" => ["nullable", "array"],
      "fields_by_form.*.*.id" => ["nullable", "integer"],
      "fields_by_form.*.*.field_id" => ["nullable", "integer"],
      "fields_by_form.*.*.option_id" => ["nullable", "integer"],
      "fields_by_form.*.*.value" => ["nullable"],
      "fields_by_form.*.*.quantity" => ["nullable", "integer", "min:0"],
    ];
  }
}
