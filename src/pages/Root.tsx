import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

// firebase
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// state
import { useAppDispatch } from "../store/store";
import { resetUser, setUser } from "../store/userSlice";
import { useEffect } from "react";
const Root = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const unsubscribe = () => {
			onAuthStateChanged(auth, user => {
				if (user) {
					const name = user.displayName;
					const email = user.email;
					const uid = user.uid;
					dispatch(setUser({ name, email, uid }));
				} else {
					dispatch(resetUser());
				}
			});
		};

		return () => unsubscribe();
	}, [dispatch]);

	return (
		<div className="flex  relative h-screen flex-col w-full ">
			<header className="flex  sticky top-0">
				<Navbar />
			</header>
			<main
				className="flex flex-1 bg-darkSecondary"
				style={{ maxHeight: " calc( 100vh - 3.5rem )" }}
			>
				<Outlet />
			</main>
		</div>
	);
};

export default Root;
