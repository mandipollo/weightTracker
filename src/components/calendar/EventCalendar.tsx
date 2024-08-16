import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/store";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { EventDataProps } from "../utilities/interfaces";

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
	const [err, setErr] = useState<string>("");

	const uid = useAppSelector(state => state.userSlice.uid);
	// retreive weight data from firestore
	const [eventData, setEventData] = useState<EventDataProps[]>([]);

	useEffect(() => {
		if (!uid) return;
		let tempData: EventDataProps[] = [];

		try {
			const unsubscribe = async () => {
				const response = await getDocs(collection(db, `users/${uid}/events`));

				response.forEach(doc => {
					tempData.push(doc.data() as EventDataProps);
				});
				setEventData(tempData);
			};

			unsubscribe();
		} catch (err) {
			if (err instanceof Error) {
				setErr(err.message);
			}
		}
	}, [uid]);

	const events = eventData.map(event => {
		const date = event.date.toDate();
		return {
			title: event.event,
			start: date,
			end: date,
		};
	});

	return (
		<div className="flex flex-1">
			{err && <p>{err}</p>}
			{events && (
				<Calendar
					events={events}
					localizer={localizer}
					startAccessor="start"
					style={{ height: "100%", width: "100%" }}
				/>
			)}
		</div>
	);
};

export default EventCalendar;
