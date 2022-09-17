export default (email: String): boolean => {
	const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	return email.match(mailformat) !== null;
};
