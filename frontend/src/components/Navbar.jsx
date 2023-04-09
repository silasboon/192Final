import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
	let loggedIn = props.isAuth;
	console.log(loggedIn);

	const logout = () => {
		localStorage.removeItem("token");
		window.location.href = "/";
	};

	return (
		<nav className="bg-gray-300 dark:bg-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex-shrink-0">
						<a
							href="/"
							className="text-gray-800 dark:text-white font-bold text-xl"
						>
							Movies & TV
						</a>
					</div>
					{!loggedIn ? (
						<div className=" flex justify-end flex-1">
							<Link to="/login">
								<button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 mx-3 rounded-full">
									Login
								</button>
							</Link>
							<Link to="/register">
								<button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4  rounded-full">
									Register
								</button>
							</Link>
						</div>
					) : (
						<div className=" flex justify-end flex-1">
							<button
								className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 mx-3 rounded-full"
								onClick={logout}
							>
								Logout
							</button>
							<Link to="/account">
								<button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4  rounded-full">
									Account
								</button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
