<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = ['userName', 'fullName', 'password', 'role'];

    protected $hidden = ['password'];

    protected $casts = [
        'role' => 'string',
    ];
}