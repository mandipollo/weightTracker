import { Timestamp } from "firebase/firestore";

export interface WeightDataProps {
	weight: number;
	date: Timestamp;
}

export interface EventDataProps {
	event: string;
	date: Timestamp;
}
