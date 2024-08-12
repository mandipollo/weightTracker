const capitaliseFirstLetter = (name: string) => {
	if (name.length <= 0) return;
	return name[0].toUpperCase().concat(name.slice(1));
};

export default capitaliseFirstLetter;
