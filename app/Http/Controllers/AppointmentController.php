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
        $appointments = AppointmentDay::all();
        $appointments->load('appointment');
        return Inertia::render('Appointments/Index', [
            'appointmentDays' => $appointments
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
        $request->validate([
            'appointmentDate' => 'required|date|after_or_equal:today',
            'appointmentTime' => 'required',
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
        $appointment->delete();

        return redirect('/dashboard')->with('success', 'Appointment deleted!');
    }
}
