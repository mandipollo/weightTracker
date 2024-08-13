import { WeightDataProps } from "./interfaces";

const convertTimestampToDate = (array: WeightDataProps[]) => {
	const sortedData = array.sort((a, b) => {
		return a.date.toMillis() - b.date.toMillis();
	});

	const data = sortedData.map(data => {
		const dates = data.date.toDate();
		const day = String(dates.getDate());
		const month = String(dates.getMonth());
		const year = String(dates.getFullYear());
		const concatDates = day + "/" + month + "/" + year;
		return { date: concatDates, weight: data.weight };
	});

	return data;
};

export default convertTimestampToDate;
