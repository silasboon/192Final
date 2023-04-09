import React from "react";
import { Label, TextInput, Button } from "flowbite-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		LoginUser();
	};

	const isLoggedIn = () => {
		const token = localStorage.getItem("token");
		return !!token; // return true if token exists, false otherwise
	};

	useEffect(() => {
		if (isLoggedIn()) {
			window.location.href = "/";
		}
	}, []);

	const LoginUser = async () => {
		try {
			const response = await fetch("http://165.22.12.9:5003/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: email,
					password: password,
				}),
			});
			const data = await response.json();
			if (data.token) {
				localStorage.setItem("token", data.token); // Save token to local storage
				// Redirect to the dashboard or home page
				window.location.href = "/";
			} else {
				console.log(data.message); // Display error message
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Navbar />
			<div className="w-4/6 mx-auto mt-10">
				<h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
					Login
				</h1>
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="email1" value="Your email" />
						</div>
						<TextInput
							id="email1"
							type="email"
							placeholder="name@email.com"
							required={true}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="password" value="Your password" />
						</div>
						<TextInput
							id="password"
							type="password"
							required={true}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							helperText={
								<React.Fragment>
									Don't have an account?{" "}
									<Link to="/register">
										<a
											href="/register"
											className="font-medium text-blue-600 hover:underline dark:text-blue-500"
										>
											Register here
										</a>
									</Link>
									.
								</React.Fragment>
							}
						/>
					</div>

					<Button type="submit">Submit</Button>
				</form>
			</div>
		</>
	);
};

export default Login;
