import { Calendar } from '@/components/ui/calendar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const initialDailySlots = [
    { slot: '09:00:00' },
    { slot: '09:30:00' },
    { slot: '10:00:00' },
    { slot: '10:30:00' },
    { slot: '11:00:00' },
    { slot: '11:30:00' },
    { slot: '12:00:00' },
    { slot: '12:30:00' },
    { slot: '13:00:00' },
    { slot: '13:30:00' },
    { slot: '14:00:00' },
    { slot: '14:30:00' },
    { slot: '15:00:00' },
    { slot: '15:30:00' },
    { slot: '16:00:00' },
    { slot: '16:30:00' },
    { slot: '17:00:00' },
];

export default function Index({ appointmentDays }) {
    const { data, setData, post } = useForm({
        appointmentTime: '',
        appointmentDate: new Date(),
    });

    const [dailySlots, setDailySlots] = useState(initialDailySlots);

    const handleForm = () => {
        post(route('appointments.store'));
    };

    useEffect(() => {
        const appointmentsInTheSelectedDay = [...appointmentDays].find(
            (appointment) => {
                const appointmentDate = new Date(appointment.date)
                    .toISOString()
                    .split('T')[0];
                const dataAppointmentDate = new Date(data.appointmentDate)
                    .toISOString()
                    .split('T')[0];

                return appointmentDate === dataAppointmentDate;
            },
        );

        console.log(appointmentsInTheSelectedDay);

        const selectedDaySlot = [...initialDailySlots].filter((slot) => {
            if (appointmentsInTheSelectedDay) {
                return !appointmentsInTheSelectedDay.appointment.some(
                    (appointment) => {
                        console.log(
                            'dentro del include',
                            appointment.time === slot.slot,
                        );
                        return appointment.time === slot.slot;
                    },
                );
            }

            return slot;
        });

        setDailySlots(selectedDaySlot);
    }, [data.appointmentDate, appointmentDays]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Appointment
                </h2>
            }
        >
            <Head title="Appointment" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="flex max-h-[600px] flex-col gap-10 overflow-auto p-6 text-gray-900 lg:flex-row">
                            <Calendar
                                mode="single"
                                selected={data.appointmentDate}
                                onSelect={(date) =>
                                    setData('appointmentDate', date)
                                }
                                className="flex h-[500px] rounded-md border lg:w-1/2"
                                classNames={{
                                    months: 'flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1',
                                    month: 'space-y-4 w-full flex flex-col',
                                    day: 'w-full h-full rounded-lg',
                                    table: 'w-full h-full border-collapse space-y-1',
                                    head_row: '',
                                    row: 'w-full mt-2',
                                }}
                                disabled={(date) => date < new Date()}
                            />

                            <div className="flex max-h-[500px] w-full flex-col gap-1 overflow-auto">
                                {dailySlots.map((item) => (
                                    <button
                                        key={item.slot}
                                        className="w-full rounded-lg bg-gray-100 p-8 hover:bg-gray-500 hover:text-white disabled:opacity-40"
                                        onClick={() =>
                                            setData(
                                                'appointmentTime',
                                                item.slot,
                                            )
                                        }
                                        disabled={
                                            data.appointmentTime === item.slot
                                        }
                                    >
                                        {item.slot}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            className="w-full bg-blue-950 p-6 text-white"
                            onClick={handleForm}
                        >
                            Test
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
