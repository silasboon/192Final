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
					<div className="hidden md:block"></div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
