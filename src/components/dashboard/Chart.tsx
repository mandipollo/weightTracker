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
import { lineChartData } from "./Data";
import InputWeight from "./InputWeight";
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
				color: "white", // Color for the title
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
		<section className="flex flex-col w-1/2 h-full p-2">
			<InputWeight />
			<Line options={options} data={lineChartData} />
		</section>
	);
};

export default LineGraph;
