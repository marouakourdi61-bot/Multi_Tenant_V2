<?php

namespace App\Features\Expenses\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExpenseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized
     * to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules.
     */
    public function rules(): array
    {
        return [

            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'recurrence' => [
                'required',
                'in:fixed,variable',
            ],

            'monthly_amount' => [
                'nullable',
                'numeric',
                'min:0',
            ],

        ];
    }

    /**
     * Custom messages.
     */
    public function messages(): array
    {
        return [

            'name.required' =>
                'Le nom est obligatoire.',

            'recurrence.required' =>
                'Choisissez le type.',

            'recurrence.in' =>
                'Type invalide.',

            'monthly_amount.numeric' =>
                'Le montant doit être numérique.',

            'monthly_amount.min' =>
                'Le montant doit être positif.',

        ];
    }
}