import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useAppSelector } from "../../store/store";
import { db } from "../../firebaseConfig";

const InputWeight = () => {
	const uid = useAppSelector(state => state.userSlice.uid);
	// local states

	const [err, setError] = useState<string>("");
	const [date, setDate] = useState<Date | null>(null);
	const [weight, setWeight] = useState<number>(0);
	const [showForm, setShowForm] = useState<boolean>(false);

	// handlers
	const handleShowForm = () => {
		setShowForm(!showForm);
	};
	const weightHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setWeight(e.target.valueAsNumber);
	};

	// submit the date and weight to firebase database
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!uid) return;
		try {
			await addDoc(collection(db, `users/${uid}/weightTracker`), {
				weight,
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
		<div className="flex relative justify-center p-2 items-center">
			<button
				onClick={handleShowForm}
				className="p-2 rounded-md border border-darkBorder text-darkText bg-black"
			>
				InputWeight
			</button>

			<form
				onSubmit={handleSubmit}
				id="form-weight"
				className={`${
					showForm ? "flex" : "hidden"
				} absolute top-14 flex-col p-2 gap-2  `}
				action="POST"
			>
				<DatePicker
					id="date"
					placeholderText="Date"
					className="outline-none flex w-full text-center border border-darkBorder bg-darkSecondary text-white p-2 rounded-sm "
					selected={date}
					onChange={date => setDate(date)}
				/>
				<input
					onChange={weightHandler}
					value={weight}
					placeholder="Weight"
					className=" outline-none p-2 border text-center border-darkBorder text-white bg-darkSecondary"
					type="number"
					id="weight"
				/>

				<button
					id="submit"
					className="p-2 border border-darkBorder bg-darkSecondary text-white"
					type="submit"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default InputWeight;
