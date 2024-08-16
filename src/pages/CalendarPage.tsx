import { FC } from "react";
import EventCalendar from "../components/calendar/EventCalendar";
import InputEvents from "../components/calendar/InputEvents";

const CalendarPage: FC = () => {
	return (
		<main className="flex flex-1 flex-col gap-2 p-2 ">
			<InputEvents />
			<EventCalendar />
		</main>
	);
};

export default CalendarPage;
