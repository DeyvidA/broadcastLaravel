<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appointment extends Model
{
    protected $fillable = [
        'appointment_day_id',
        'user_id',
        'time',
        'status'
    ];


    public function appointmentDay(): BelongsTo
    {
        return $this->belongsTo(AppointmentDay::class);
    }
}
