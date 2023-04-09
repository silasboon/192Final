import React from "react";

const Navbar = () => {
	return (
		<nav className="bg-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex-shrink-0">
						<a href="/" className="text-white font-bold text-xl">
							Movies & TV
						</a>
					</div>
					<div className=" flex justify-end flex-1">
						<button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 mx-3 rounded-full">
							Login
						</button>
						<button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4  rounded-full">
							Signup
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
