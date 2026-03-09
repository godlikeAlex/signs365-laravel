<?php

namespace App\Http\Requests\Estimate;

use Illuminate\Foundation\Http\FormRequest;

class CalculateSingleEstimateRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      "product_id" => ["required", "integer"],
      "estimate_form_id" => ["required", "integer"],
      "quantity" => ["required", "integer", "min:1"],
      "unit" => ["nullable", "in:feet,inches"],
      "width" => ["required", "numeric", "gt:0"],
      "height" => ["required", "numeric", "gt:0"],
      "fields" => ["array"],
      "fields.*.id" => ["nullable", "integer"],
      "fields.*.field_id" => ["nullable", "integer"],
      "fields.*.option_id" => ["nullable", "integer"],
      "fields.*.quantity" => ["nullable", "integer", "min:0"],
      "payload" => ["nullable", "array"],
    ];
  }
}
