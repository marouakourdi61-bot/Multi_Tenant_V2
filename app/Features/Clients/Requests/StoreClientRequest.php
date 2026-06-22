<?php

namespace App\Features\Clients\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'name' => [
                'required',
                'string',
                'max:255'
            ],

            'email' => [
                'nullable',
                'email'
            ],

            'phone' => [
                'nullable',
                'string'
            ],

            'address' => [
                'nullable',
                'string'
            ],

            'city' => [
                'nullable',
                'string'
            ],

            'postal_code' => [
                'nullable',
                'string'
            ],

            'country' => [
                'required'
            ],

            'notes' => [
                'nullable'
            ],
        ];
    }
}
