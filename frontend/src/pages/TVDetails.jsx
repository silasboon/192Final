import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterComponent from "../components/FooterComponent";
import StarRatings from "react-star-ratings";
function TVDetails() {
	const { TVId } = useParams();
	const [data, setData] = useState({});
	const [images, setImages] = useState({});
	const [seasonsSubtract, setSeasonsSubtract] = useState(0);
	const [votes, setVotes] = useState(0);
	const [isAuth, setIsAuth] = useState(false);

	const MOVIEAPIKEY = "08d85f47ee3b13f3aee2110785af86fa";

	const isLoggedIn = () => {
		const token = localStorage.getItem("token");
		return !!token; // return true if token exists, false otherwise
	};

	useEffect(() => {
		setIsAuth(isLoggedIn());
	}, []);

	const options = {
		method: "GET",
	};
	const getTvDetails = async () => {
		try {
			const response = await fetch(
				"https://api.themoviedb.org/3/tv/" +
					TVId +
					"?api_key=" +
					MOVIEAPIKEY +
					"&language=en-US",
				options
			);
			const data = await response.json();
			setData(data);
			console.log(data);
			// Check if season 0 exists, used to adjust the index of seasons array
			if (data.seasons) {
				if (data.seasons[0].season_number === 0) {
					setSeasonsSubtract(0);
				} else {
					setSeasonsSubtract(1);
				}
			}
			// convert votes to /5 not /10
			setVotes(data.vote_average / 2);
		} catch (error) {
			console.log(error);
		}
	};

	const getTvImages = async () => {
		try {
			const response = await fetch(
				"https://api.themoviedb.org/3/tv/" +
					TVId +
					"/images?api_key=" +
					MOVIEAPIKEY,
				options
			);
			const data = await response.json();
			setImages(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTvDetails();
		getTvImages();
	}, [TVId]);

	return (
		<>
			<Navbar isAuth={isAuth} />
			<div className="container mx-auto px-4">
				<Link
					to={`/`}
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
					<p className="text-lg font-medium">Home</p>
				</Link>
				<div className="flex flex-wrap mt-8">
					<div className="w-full md:w-3/12 lg:w-2/12">
						{images.posters ? (
							<img
								src={`https://image.tmdb.org/t/p/w500${images.posters[0].file_path}`}
								alt={data.original_name}
								className="w-full rounded-lg"
							/>
						) : (
							<div className="bg-gray-400 rounded-lg w-full h-full flex items-center justify-center">
								<span className="text-gray-800 dark:text-white text-lg">
									No image available
								</span>
							</div>
						)}
					</div>
					<div className="w-full md:w-9/12 lg:w-10/12 pl-8">
						<h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
							{data.original_name}
						</h1>
						<div className="flex flex-wrap items-center mb-4">
							<StarRatings
								rating={votes}
								starRatedColor="#FBBF24"
								numberOfStars={5}
								name="rating"
								starDimension="20px"
								starSpacing="1px"
							/>
							<span className="m-4 text-gray-700 dark:text-white">
								{data.first_air_date ? data.first_air_date.substring(0, 4) : ""}
							</span>
							{data.genres && (
								<div className="flex flex-wrap">
									{data.genres.map((genre) => (
										<span
											key={genre.id}
											className="text-sm mr-2 mb-2 py-1 px-2 rounded-lg bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white"
										>
											{genre.name}
										</span>
									))}
								</div>
							)}
						</div>
						<p className="text-gray-700 dark:text-white text-lg mb-4">
							{data.overview}
						</p>
						<div className="flex flex-wrap">
							{data.production_companies && (
								<div className="mb-4">
									<h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
										Production Companies
									</h2>
									<div className="flex flex-wrap">
										{data.production_companies.map((company) => (
											<div
												key={company.id}
												className="mr-4 mb-4 flex items-center"
											>
												{company.logo_path ? (
													<img
														src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
														alt={company.name}
														className="w-8 h-8 mr-2"
													/>
												) : (
													<div className="bg-gray-400 rounded-full w-8 h-8 mr-2 flex items-center justify-center">
														<span className="text-gray-800 dark:text-white text-lg">
															{company.name[0]}
														</span>
													</div>
												)}
												<span className="text-lg text-gray-800 dark:text-white">
													{company.name}
												</span>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
						<div className="flex flex-wrap">
							<div className="w-full md:w-1/2 mb-4 md:mb-0">
								<h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
									Previous Episode:
								</h2>
								{data.next_episode_to_air ? (
									<div className="flex flex-wrap">
										<div className="mr-4"></div>
										<div className="flex flex-col">
											<span className="font-bold text-gray-700 dark:text-white">
												{data.last_episode_to_air.name}
											</span>
											<span className="italic text-gray-700 dark:text-white">
												{data.last_episode_to_air.air_date}
											</span>
											<span
												className="text-gray-700 dark:text-white"
												title="Click to copy"
											>
												{data.original_name} S
												{data.last_episode_to_air.season_number}E
												{data.last_episode_to_air.episode_number}
											</span>
										</div>
									</div>
								) : (
									<span className="text-gray-700 dark:text-white">
										No previous episode data
									</span>
								)}
							</div>
							<div className="w-full md:w-1/2">
								<h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
									Next Episode:
								</h2>
								{data.next_episode_to_air ? (
									<div className="flex flex-wrap">
										<div className="mr-4"></div>
										<div className="flex flex-col">
											<span className="font-bold text-gray-700 dark:text-white">
												{data.next_episode_to_air.name}
											</span>
											<span className="italic text-gray-700 dark:text-white">
												{data.next_episode_to_air.air_date}
											</span>
											<span className="text-gray-700 dark:text-white">
												{data.original_name} S
												{data.next_episode_to_air.season_number}E
												{data.next_episode_to_air.episode_number}
											</span>
										</div>
									</div>
								) : (
									<span className="text-gray-700 dark:text-white">
										No upcoming episodes
									</span>
								)}
							</div>
						</div>
					</div>
					{data.seasons && (
						<div className="mb-4">
							<h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
								Seasons
							</h2>
							<div className="flex flex-wrap">
								{data.seasons.map((season) => (
									<Link
										to={`/tv/${TVId}/season/${season.season_number}/${seasonsSubtract}`}
									>
										<div key={season.id} className="mr-4">
											{season.poster_path ? (
												<>
													<img
														src={`https://image.tmdb.org/t/p/original/${season.poster_path}`}
														alt={season.name}
														className="w-24"
													/>
													<h6 className=" text-center text-gray-700 dark:text-white">
														{season.name}
													</h6>
												</>
											) : (
												<span className="text-gray-700 dark:text-white">
													{season.name}
												</span>
											)}
										</div>
									</Link>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
			<FooterComponent />
		</>
	);
}

export default TVDetails;
