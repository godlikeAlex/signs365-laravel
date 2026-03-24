<?php

namespace App\Http\Requests\Estimate;

use Illuminate\Foundation\Http\FormRequest;

class SubmitEstimateRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      "name" => ["required", "string", "max:255"],
      "email" => ["required", "email", "max:255"],
      "phone" => ["required", "string", "max:50"],
      "address" => ["required", "string", "max:500"],
    ];
  }
}
