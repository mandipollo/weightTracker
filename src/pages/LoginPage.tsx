import LoginForm from "../components/auth/LoginForm";
import SignUpAstronaut from "../components/auth/SignUpAstronaut";

const LoginPage = () => {
	return (
		<main className="flex justify-center items-center flex-1">
			<LoginForm />
			<SignUpAstronaut />
		</main>
	);
};

export default LoginPage;
