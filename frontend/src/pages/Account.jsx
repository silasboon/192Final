import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Account = () => {
	const [isAuth, setIsAuth] = useState(false);
	const isLoggedIn = () => {
		const token = localStorage.getItem("token");
		return !!token; // return true if token exists, false otherwise
	};

	useEffect(() => {
		if (!isLoggedIn()) {
			window.location.href = "/";
		} else {
			setIsAuth(true);
		}
	}, []);
	return (
		<>
			<Navbar isAuth={isAuth} />
			<h1 className="mt-10 text-center text-4xl font-bold text-gray-800 dark:text-white">
				Account
			</h1>
			<h2 className=" mt-20 text-center text-2xl font-bold text-gray-800 dark:text-white">
				Coming Soon...
			</h2>
		</>
	);
};

export default Account;
