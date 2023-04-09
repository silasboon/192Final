import { useEffect, useState } from "react";
import SearchResults from "../components/SearchResults";
import PopularMovies from "../components/PopularMovies";
import PopularTV from "../components/PopularTV";
import Navbar from "../components/Navbar";
import FooterComponent from "../components/FooterComponent";

function Home() {
	// states
	const [movieData, setMovieData] = useState(null);
	const [tvData, setTvData] = useState(null);
	const [search, setSearch] = useState("");
	const [isAuth, setIsAuth] = useState(false);
	// API key
	const MOVIEAPIKEY = "08d85f47ee3b13f3aee2110785af86fa";

	const isLoggedIn = () => {
		const token = localStorage.getItem("token");
		return !!token; // return true if token exists, false otherwise
	};

	useEffect(() => {
		setIsAuth(isLoggedIn());
	}, []);

	// prevent defautl form submission behavior
	const handleSubmit = (e) => {
		e.preventDefault();
		getMovie();
		getTv();
	};

	// fetch data from API
	const options = {
		method: "GET",
	};
	const getMovie = async () => {
		try {
			const response = await fetch(
				"https://api.themoviedb.org/3/search/movie?api_key=" +
					MOVIEAPIKEY +
					"&query=" +
					search,
				options
			);
			const data = await response.json();
			const results = data.results;
			setMovieData(data);
		} catch (error) {
			console.log(error);
		}
	};
	const getTv = async () => {
		try {
			const response = await fetch(
				"https://api.themoviedb.org/3/search/tv?api_key=" +
					MOVIEAPIKEY +
					"&query=" +
					search,
				options
			);
			const data = await response.json();
			const results = data.results;
			setTvData(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Navbar isAuth={isAuth} />
			<form
				onSubmit={handleSubmit}
				className="lg:w-1/2 md:w-3/4 sm:w-5/6 mx-auto p-10"
			>
				<label
					htmlFor="default-search"
					className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
				>
					Search
				</label>
				<div className="relative">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg
							aria-hidden="true"
							className="w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke:inecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
					</div>
					<input
						type="search"
						id="default-search"
						className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Find Movies and TV Shows"
						name="search"
						defaultValue={search}
						onChange={(e) => setSearch(e.target.value)}
						required
					/>
					<button
						type="submit"
						className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Search
					</button>
				</div>
			</form>
			{search === "" ? (
				<>
					<PopularMovies /> <PopularTV />
				</>
			) : (
				<SearchResults movies={movieData} tv={tvData} />
			)}

			<FooterComponent />
		</>
	);
}

export default Home;
