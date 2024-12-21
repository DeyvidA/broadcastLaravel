<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AppointmentDay extends Model
{
    protected $fillable = [
        'date',
    ];

    public function appointment(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

}
