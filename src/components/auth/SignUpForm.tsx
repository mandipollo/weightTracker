import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import {
	checkEmail,
	checkName,
	checkPassword,
	checkPasswordMatch,
} from "../utilities/checkDetails";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
const SignUpForm = () => {
	const navigate = useNavigate();
	// local variables
	const [err, setError] = useState<string | null>(null);
	const [name, setName] = useState<string>("");
	const [errName, setErrName] = useState<boolean>(false);
	const [touchedName, setTouchedName] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [errEmail, setErrorEmail] = useState<boolean>(false);
	const [touchedEmail, setTouchedEmail] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [errPassword, setErrPassword] = useState<boolean>(false);
	const [touchedPassword, setTouchedPassword] = useState<boolean>(false);
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [errConfirmPassword, setErrConfirmPassword] = useState<boolean>(false);
	const [touchedConfirmPassword, setTouchedConfirmPassword] =
		useState<boolean>(false);

	// handler

	const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTouchedName(true);
		setErrName(checkName(e.target.value));
		setName(e.target.value);
	};

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
	const confirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTouchedConfirmPassword(true);
		setErrConfirmPassword(checkPasswordMatch(password, e.target.value));
		setConfirmPassword(e.target.value);
	};

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!errName || !errPassword || !errConfirmPassword || !errEmail) {
			setError("Invalid Inputs");
			return;
		}

		try {
			const userCredentials = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredentials.user;

			await updateProfile(user, {
				displayName: name,
			});

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
					onChange={nameHandler}
					value={name}
					placeholder="Your name"
					type="text"
					className={`${
						touchedName && !errName ? "border-red-500" : "border-green-500"
					} p-4 md:w-2/3 w-9/12 border rounded-md outline-none`}
					id="name"
				/>

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

				<input
					onChange={confirmPasswordHandler}
					value={confirmPassword}
					placeholder="confirm password"
					type="text"
					id="confirm_password"
					className={` ${
						touchedConfirmPassword && !errConfirmPassword
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

				{err && <p className="text-sm text-red-500">{err}</p>}
			</form>
		</section>
	);
};

export default SignUpForm;
