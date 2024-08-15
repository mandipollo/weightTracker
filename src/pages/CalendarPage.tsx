import { FC } from "react";
import EventCalendar from "../components/calendar/EventCalendar";

const CalendarPage: FC = () => {
	return (
		<main className="flex flex-1 ">
			<EventCalendar />
		</main>
	);
};

export default CalendarPage;
