import SignUpAstronaut from "../components/auth/SignUpAstronaut";
import SignUpForm from "../components/auth/SignUpForm";

const SignUp = () => {
	return (
		<main className="flex justify-center items-center flex-1">
			<SignUpForm />
			<SignUpAstronaut />
		</main>
	);
};

export default SignUp;
