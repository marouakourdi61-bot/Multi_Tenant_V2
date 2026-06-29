<?php

namespace App\Features\Clients\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFournisseurRequest
extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [

            'name' =>
                'required|string|max:255',

            'email' =>
                'nullable|email',

            'phone' =>
                'nullable|string',

            'address' =>
                'nullable|string',

            'city' =>
                'nullable|string',

            'country' =>
                'nullable|string',

            'notes' =>
                'nullable|string',

        ];
    }
}