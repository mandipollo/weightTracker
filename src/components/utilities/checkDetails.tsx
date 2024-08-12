export const checkName = (name: string) => {
	if (name.length < 4) return false;
	return true;
};

export const checkPassword = (password: string) => {
	if (password.length === 0 || password.length < 4) return false;
	else return true;
};

export const checkEmail = (email: string) => {
	if (!email.includes("@")) return false;

	return true;
};
export const checkPasswordMatch = (
	password: string,
	confirmPassword: string
) => {
	if (
		password.length !== confirmPassword.length ||
		password !== confirmPassword
	)
		return false;
	else return true;
};
