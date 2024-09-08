const getBasePath = () => {
	let base_url =
		process.env.NEXT_PUBLIC_NODE_ENV === "development"
			? "http://localhost:3000"
			: "https://weather-app-green-sigma.vercel.app";

	return base_url;
};

export default getBasePath;
