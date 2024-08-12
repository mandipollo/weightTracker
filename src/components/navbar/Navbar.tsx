import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useAppSelector } from "../../store/store";
import capitaliseFirstLetter from "../utilities/capitaliseFirstLetter";
const Navbar = () => {
	const user = useAppSelector(state => state.userSlice);

	return (
		<section className="flex w-full bg-black h-16 justify-between items-center p-2 ">
			<NavLink to="/">
				<img src={logo} alt="logo" className="h-10 w-10 text-white" />
			</NavLink>

			<section className="flex gap-2">
				{!user.uid && (
					<NavLink to="/login">
						<button className=" py-2 px-4 text-white">Open</button>
					</NavLink>
				)}

				{user.name ? (
					<p className="text-white">{capitaliseFirstLetter(user.name)}</p>
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
