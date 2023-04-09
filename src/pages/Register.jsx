import { Label, TextInput, Button } from "flowbite-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";

const Register = () => {
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		RegisterUser();
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

	const RegisterUser = async () => {
		try {
			const response = await fetch("http://localhost:5003/register", {
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
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Navbar />
			<div className="w-4/6 mx-auto mt-10">
				<h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
					Register
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
							color={
								password === passwordConfirm && password !== ""
									? "success"
									: "failure"
							}
							helperText={
								<React.Fragment>
									{password === passwordConfirm && password !== ""
										? "Passwords match"
										: "Passwords do not match"}
								</React.Fragment>
							}
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="passwordConfirm" value="Confirm password" />
						</div>
						<TextInput
							id="passwordConfirm"
							type="password"
							required={true}
							onChange={(e) => {
								setPasswordConfirm(e.target.value);
							}}
							color={
								password === passwordConfirm && password !== ""
									? "success"
									: "failure"
							}
							helperText={
								<React.Fragment>
									{password === passwordConfirm && password !== ""
										? "Passwords match"
										: "Passwords do not match"}
								</React.Fragment>
							}
						/>
					</div>

					<Button
						type="submit"
						disabled={
							password === passwordConfirm && password !== "" ? false : true
						}
					>
						Register
					</Button>
				</form>
			</div>
		</>
	);
};

export default Register;
