import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
	name: string;
	email: string;
	uid: string;
}

const initialUserData: User = {
	name: "",
	email: "",
	uid: "",
};
const userSlice = createSlice({
	name: "user",
	initialState: initialUserData,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			return { ...action.payload };
		},
		resetUser: () => {
			return { ...initialUserData };
		},
	},
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
