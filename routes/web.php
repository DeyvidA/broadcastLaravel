<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $users = User::all();

    return Inertia::render('Dashboard',
        ['users' => $users]
    );
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/users/create', [ProfileController::class, 'create'])->name('user.create');
    Route::get('/users/edit/{id}', [ProfileController::class, 'editUser'])->name('user.edit');
    Route::post('/users', [ProfileController::class, 'store'])->name('user.store');
    Route::patch('/users/edit/{id}', [ProfileController::class, 'updateUser'])->name('user.updateUser');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
