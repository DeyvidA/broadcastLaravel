<?php

namespace App\Http\Controllers;

use App\Models\AppointmentDay;
use App\Models\Appointment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $appointments = Appointment::all();
        return Inertia::render('Appointments/Index', [
            'appointments' => $appointments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        request()->validate([
            'appointmentDate' => ['required', 'date'],
            'appointmentTime' => ['required', 'string'],
        ]);

        $appointmentDay = AppointmentDay::firstOrCreate([
            'date' => Carbon::parse(request('appointmentDate'))->format('Y-m-d'),
        ]);

        Appointment::firstOrCreate([
            'user_id' => auth()->id(),
            'appointment_day_id' => $appointmentDay->id,
            'time' => request('appointmentTime')
        ]);

        return redirect('/dashboard')->with('success', 'Appointment created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Appointment $appointment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Appointment $appointment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Appointment $appointment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment)
    {
        //
    }
}
