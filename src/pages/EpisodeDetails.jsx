import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterComponent from "../components/FooterComponent";
import { useState, useEffect } from "react";

const EpisodeDetails = () => {
	const { TVId, seasonNumber, seasonSubtract, episodeNumber } = useParams();
	const [isAuth, setIsAuth] = useState(false);
	const [episodeDetails, setEpisodeDetails] = useState([]);
	const MOVIEAPIKEY = "08d85f47ee3b13f3aee2110785af86fa";

	const isLoggedIn = () => {
		const token = localStorage.getItem("token");
		return !!token; // return true if token exists, false otherwise
	};

	useEffect(() => {
		setIsAuth(isLoggedIn());

		const getEpisodeDetails = async () => {
			try {
				const response = await fetch(
					`https://api.themoviedb.org/3/tv/${TVId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${MOVIEAPIKEY}&language=en-US`
				);
				const data = await response.json();
				setEpisodeDetails(data);
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		};

		getEpisodeDetails();
	}, [TVId, seasonNumber, episodeNumber, MOVIEAPIKEY]);

	return (
		<div>
			<Navbar isAuth={isAuth} />
			<Link
				to={`/tv/${TVId}/season/${seasonNumber}/${seasonSubtract}`}
				className="inline-flex items-center text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-100"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5 mr-1"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M12.707,15.707 C12.52,15.894 12.266,16 12,16 C11.734,16 11.48,15.894 11.293,15.707 L7.293,11.707 C7.105,11.52 7,11.266 7,11 C7,10.734 7.105,10.48 7.293,10.293 L11.293,6.293 C11.684,5.902 12.316,5.902 12.707,6.293 C13.098,6.684 13.098,7.316 12.707,7.707 L9.414,11 L16,11 C16.552,11 17,11.448 17,12 C17,12.552 16.552,13 16,13 L9.414,13 L12.707,15.707 Z"
						clipRule="evenodd"
					/>
				</svg>
				<p className="text-lg font-bold">Back to Season</p>
			</Link>
			<div className="container mx-auto mt-8">
				<div className="flex flex-col items-center">
					<h2 className="text-4xl font-bold mb-4 text-center text-gray-700 dark:text-white">
						{episodeDetails.name}
					</h2>
					<img
						src={`https://image.tmdb.org/t/p/original${episodeDetails.still_path}`}
						alt={episodeDetails.name}
						className="w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 mb-8"
					/>
					<div className="text-lg leading-7 mb-8 text-center text-gray-700 dark:text-white">
						<p>{episodeDetails.overview}</p>
						<p className="mt-4 font-bold text-gray-700 dark:text-white">
							Air Date: {episodeDetails.air_date || "Unknown"}
						</p>
					</div>
				</div>
			</div>
			<FooterComponent />
		</div>
	);
};

export default EpisodeDetails;
