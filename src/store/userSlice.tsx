import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
	name: string | null;
	email: string | null;
	uid: string | null;
}

const initialUserData: User = {
	name: null,
	email: null,
	uid: null,
};
const userSlice = createSlice({
	name: "user",
	initialState: initialUserData,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.email = action.payload.email;
			state.uid = action.payload.uid;
			state.name = action.payload.name;
		},
		resetUser: () => {
			return { ...initialUserData };
		},
	},
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
