import { Calendar } from '@/components/ui/calendar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, useForm, usePoll } from '@inertiajs/react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday';
import { useEffect, useState } from 'react';

dayjs.extend(customParseFormat);
dayjs.extend(isToday);

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
    usePoll(10000);

    const { data, setData, post } = useForm({
        appointmentTime: '',
        appointmentDate: new Date(dayjs()),
    });

    const [dailySlots, setDailySlots] = useState(initialDailySlots);

    const handleForm = () => {
        post(route('appointments.store'));
    };

    useEffect(() => {
        const appointmentsInTheSelectedDay = [...appointmentDays].find(
            (appointment) => {
                const appointmentDate = dayjs(appointment.date).startOf('day');
                const dataAppointmentDate = dayjs(data.appointmentDate).startOf(
                    'day',
                );

                return appointmentDate.isSame(dataAppointmentDate);
            },
        );
        const selectedDaySlot = initialDailySlots.filter((slot) => {
            const currentTime = dayjs();
            const slotTime = dayjs(slot.slot, 'HH:mm:ss');

            const isPastTodayTime = slotTime.isBefore(currentTime, 'minute');

            const hasAppointments =
                appointmentsInTheSelectedDay?.appointment?.length > 0;
            const isToday = dayjs(appointmentsInTheSelectedDay?.date).isToday();

            if (appointmentsInTheSelectedDay) {
                if (hasAppointments) {
                    return !appointmentsInTheSelectedDay.appointment.some(
                        (appointment) => {
                            return (
                                (isToday && isPastTodayTime) ||
                                appointment.time === slot.slot
                            );
                        },
                    );
                }

                return !(isToday && isPastTodayTime);
            }

            if (dayjs(data.appointmentDate).isToday() && isPastTodayTime) {
                return false;
            }

            return true;
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
                                fromDate={new Date()}
                            />

                            <div className="flex max-h-[500px] w-full flex-col gap-1 overflow-auto">
                                {dailySlots.length === 0 && (
                                    <div className="h-100% self-center text-center text-red-500">
                                        No available slots
                                    </div>
                                )}
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
                            Create Appointment
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
