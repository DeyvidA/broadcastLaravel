import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ appointments }) {
    console.log(appointments);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                Appointments
                            </h2>
                            <div className="mt-4 flex flex-wrap gap-8">
                                {appointments.map((appointment) => (
                                    <div
                                        key={appointment.id}
                                        className="mt-4 flex items-center justify-between gap-8 rounded-lg bg-gray-100 p-4"
                                    >
                                        <div>
                                            <h3 className="text-lg font-semibold">
                                                {
                                                    appointment?.appointment_day
                                                        .date
                                                }
                                            </h3>
                                            <p className="text-sm">
                                                {appointment?.time}
                                            </p>
                                        </div>
                                        <button className="rounded-lg bg-red-500 px-4 py-2 text-white">
                                            Cancel
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
