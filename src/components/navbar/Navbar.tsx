import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useAppSelector } from "../../store/store";
import capitaliseFirstLetter from "../utilities/capitaliseFirstLetter";
import { auth } from "../../firebaseConfig";
import { useLocation } from "react-router-dom";

const Navbar = () => {
	const url = useLocation().pathname;

	const route = url === "/dashboard" ? "/calendar" : "/dashboard";

	const navigate = useNavigate();
	const user = useAppSelector(state => state.userSlice);

	const logOffHandler = () => {
		if (auth.currentUser) {
			auth.signOut();
			navigate("/");
		}
	};

	return (
		<section className="flex w-full border border-darkBorder bg-darkPrimary h-16 justify-between items-center p-2 ">
			{!user.uid && (
				<NavLink to="/">
					<img src={logo} alt="logo" className="h-10 w-10 text-white" />
				</NavLink>
			)}

			{user.uid && (
				<NavLink to={route}>
					<button className=" py-2 px-4 ">{route.slice(1)}</button>
				</NavLink>
			)}

			<section className="flex gap-2">
				{!user.name ? (
					<NavLink to="/login">
						<button className=" py-2 px-4 text-white">Open</button>
					</NavLink>
				) : (
					<button className=" py-2 px-4 rounded-2xl">
						{capitaliseFirstLetter(user.name)}
					</button>
				)}

				{user.name ? (
					<button
						onClick={logOffHandler}
						className="bg-white text-black py-2 px-4 rounded-2xl"
					>
						Log off
					</button>
				) : (
					<NavLink to="/signup">
						<button className="bg-white text-black py-2 px-4 rounded-2xl">
							Sign up
						</button>
					</NavLink>
				)}
			</section>
		</section>
	);
};

export default Navbar;
