<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = ['restaurantId', 'openAt', 'closeAt', 'day'];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurantId');
    }
}
