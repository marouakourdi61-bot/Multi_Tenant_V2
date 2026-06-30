<?php

namespace App\Features\Expenses\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExpenseRequest
extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'name' =>

            [
                'required',
                'string',
            ],

            'recurrence' =>

            [
                'required',
                'in:fixed,variable'
            ],

            'amount' =>

            [
                'required',
                'numeric',
                'min:0'
            ],

        ];
    }
}