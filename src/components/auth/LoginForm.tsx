import React, { useState } from "react";
import { checkEmail, checkPassword } from "../utilities/checkDetails";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const navigate = useNavigate();

	const [err, setError] = useState<string | null>(null);

	const [email, setEmail] = useState<string>("");
	const [errEmail, setErrorEmail] = useState<boolean>(false);
	const [touchedEmail, setTouchedEmail] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [errPassword, setErrPassword] = useState<boolean>(false);
	const [touchedPassword, setTouchedPassword] = useState<boolean>(false);

	// handler

	const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTouchedEmail(true);
		setErrorEmail(checkEmail(e.target.value));
		setEmail(e.target.value);
	};

	const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTouchedPassword(true);
		setErrPassword(checkPassword(e.target.value));
		setPassword(e.target.value);
	};

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!errEmail || !errPassword) {
			setError("Invalid Inputs");
			return;
		}

		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/dashboard");
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			}
		}
	};

	return (
		<section className="flex w-1/2 h-full">
			<form
				onSubmit={submitHandler}
				className="w-full h-full p-2 gap-2 flex justify-center items-center flex-col"
			>
				<input
					required
					onChange={emailHandler}
					value={email}
					placeholder="Your Email"
					type="email"
					className={`${
						touchedEmail && !errEmail ? "border-red-500" : "border-green-500"
					} p-4 md:w-2/3 w-9/12 border rounded-md outline-none`}
					id="email"
				/>
				<input
					onChange={passwordHandler}
					value={password}
					placeholder="password"
					type="text"
					id="password"
					className={`${
						touchedPassword && !errPassword
							? "border-red-500"
							: "border-green-500"
					} p-4 md:w-2/3 w-9/12 border rounded-md outline-none`}
				/>

				<button
					type="submit"
					className="p-2 bg-black text-white md:w-2/3 w-9/12 border rounded-2xl"
				>
					Submit
				</button>

				{err && <p className="text-red-500 text-sm">{err}</p>}
			</form>
		</section>
	);
};

export default LoginForm;
