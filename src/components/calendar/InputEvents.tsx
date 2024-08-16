import { addDoc, collection } from "firebase/firestore";
import React, { useState, FC } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useAppSelector } from "../../store/store";
import { db } from "../../firebaseConfig";
import closeImg from "../../assets/close.svg";
const InputEvents: FC = () => {
	const uid = useAppSelector(state => state.userSlice.uid);
	// local states

	const [err, setError] = useState<string>("");

	const [date, setDate] = useState<Date | null>(null);
	const [event, setEvent] = useState<string>("");
	const [showForm, setShowForm] = useState<boolean>(false);

	// handlers

	const closeForm = () => {
		setShowForm(false);
	};
	const handleShowForm = () => {
		setShowForm(!showForm);
	};
	const eventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEvent(e.target.value);
	};

	// submit the date and weight to firebase database
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!uid) return;
		try {
			await addDoc(collection(db, `users/${uid}/events`), {
				event,
				date,
			});

			setShowForm(!showForm);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			}
		}
	};
	return (
		<section className="flex relative p-2 items-center">
			<button
				id="submit-form"
				onClick={handleShowForm}
				className="p-2 rounded-md border border-darkBorder bg-black"
			>
				Input Event
			</button>

			{err && <p>{err}</p>}
			<form
				onSubmit={handleSubmit}
				id="form-weight"
				className={`${
					showForm ? "flex" : "hidden"
				} absolute bg-darkPrimary top-14 z-10 flex-col p-2 gap-2  `}
				action="POST"
			>
				<button
					onClick={closeForm}
					id="close"
					className="p-2  flex justify-end  text-white "
					type="button"
				>
					<img src={closeImg} alt="clsoe" className="w-6 h-6" />
				</button>
				<DatePicker
					id="date"
					placeholderText="Date"
					className="outline-none flex w-full text-center border border-darkBorder bg-darkSecondary text-white p-2 rounded-sm "
					selected={date}
					onChange={date => setDate(date)}
				/>
				<input
					onChange={eventHandler}
					value={event}
					placeholder="Event"
					className=" outline-none p-2 border text-center border-darkBorder text-white bg-darkSecondary"
					type="text"
					id="event"
				/>

				<button
					id="submit"
					className="p-2 border border-darkBorder bg-darkSecondary text-white "
					type="submit"
				>
					Submit
				</button>
			</form>
		</section>
	);
};

export default InputEvents;
