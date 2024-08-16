import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

import InputWeight from "./InputWeight";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useAppSelector } from "../../store/store";
import { db } from "../../firebaseConfig";
import { WeightDataProps } from "../utilities/interfaces";
import convertTimestampToDate from "../utilities/convertTimestampToDate";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);
const LineGraph = () => {
	const [err, setErr] = useState<string>("");

	const uid = useAppSelector(state => state.userSlice.uid);
	// retreive weight data from firestore
	const [weightData, setWeightData] = useState<WeightDataProps[]>([]);

	useEffect(() => {
		if (!uid) return;
		let tempData: WeightDataProps[] = [];

		try {
			const unsubscribe = async () => {
				const response = await getDocs(
					collection(db, `users/${uid}/weightTracker`)
				);

				response.forEach(doc => {
					tempData.push(doc.data() as WeightDataProps);
				});
				setWeightData(tempData);
			};

			unsubscribe();
		} catch (err) {
			if (err instanceof Error) {
				setErr(err.message);
			}
		}
	}, [uid]);

	//  the timestamp needs to be converted to date and populated in the labels array
	const convertedData = convertTimestampToDate(weightData);
	// populate data from firestore

	const data = {
		labels: convertedData.map(data => data.date),
		datasets: [
			{
				label: "Weight",
				data: convertedData.map(data => data.weight),
				borderColor: "#30363E",
				backgroundColor: "green",
			},
		],
	};

	// chart options
	const options = {
		responsive: true,
		plugins: {
			legend: {
				labels: {
					color: "white", // Color for legend labels
				},
			},
			title: {
				display: true,
				text: "Weigth trajectory",
				color: "gray", // Color for the title
			},
		},
		scales: {
			x: {
				ticks: {
					color: "gray", // Color for x-axis labels
				},
				grid: {
					color: "#30363E", // Grid line color for x-axis
					borderColor: "#30363E", // Border color for x-axis
				},
			},
			y: {
				ticks: {
					color: "gray", // Color for y-axis labels
				},
				grid: {
					color: "#30363E", // Grid line color for x-axis
					borderColor: "#30363E",
				},
			},
		},
	};

	return (
		<section className="flex border border-darkBorder bg-darkPrimary flex-col w-full h-full ">
			<InputWeight />
			{err && <p>{err}</p>}
			<div className="flex-1 flex justify-center items-center relative w-full h-3/4">
				<Line options={options} data={data} />
			</div>
		</section>
	);
};

export default LineGraph;
