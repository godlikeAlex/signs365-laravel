<?php

namespace App\Http\Requests\Cart;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CalculateSingleItemCartRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, mixed>
   */
  public function rules()
  {
    return [
      "product_id" => "required",
      "option" => "nullable",
      "addons" => ["array"],
      "unit" => ["in:feet,inches"],
      "width" => ["required", "numeric"],
      "height" => ["required", "numeric"],
      // "quantity" => "required",
    ];
  }
}