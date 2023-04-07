import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterComponent from "../components/FooterComponent";
function Details() {
	const { movieId } = useParams();
	const [data, setData] = useState({});
	const [video, setVideo] = useState([]);
	const [trailer, setTrailer] = useState([]);
	const [featurette, setFeaturette] = useState([]);
	const [url, setURL] = useState("");

	const MOVIEAPIKEY = "08d85f47ee3b13f3aee2110785af86fa";
	const options = {
		method: "GET",
	};
	const getMovie = async () => {
		try {
			const response = await fetch(
				"https://api.themoviedb.org/3/movie/" +
					movieId +
					"?api_key=" +
					MOVIEAPIKEY +
					"&language=en-US",
				options
			);
			const data = await response.json();
			setData(data);
		} catch (error) {
			console.log(error);
		}
	};
	const getVideo = async () => {
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${MOVIEAPIKEY}&language=en-US`,
				options
			);
			const video = await response.json();
			setVideo(video.results);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getMovie();
		getVideo();
	}, [movieId]);

	useEffect(() => {
		video.map((video) => {
			if (video.type == "Trailer") {
				setTrailer(video.key);
			} else if (video.type == "Featurette") {
				setFeaturette(video.key);
			}
		});
	}, [video]);

	useEffect(() => {
		if (trailer != "" || featurette != "") {
			setURL("https://www.youtube.com/embed/" + trailer);
			console.log("Featurette: " + featurette);
		}
	}, [trailer, featurette]);

	return (
		<>
			<Navbar />
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
						{data.poster_path ? (
							<img
								src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
								alt={data.title}
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
							{data.title}
						</h1>
						<div className="flex flex-wrap items-center mb-4">
							<span className="mr-4 text-gray-700 dark:text-white">
								{data.vote_average}/10
							</span>
							<span className="mr-4 text-gray-700 dark:text-white">
								{data.release_date}
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
							{data.spoken_languages && (
								<div className="mb-4">
									<h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
										Spoken Languages
									</h2>
									<div className="flex flex-wrap">
										{data.spoken_languages.map((language) => (
											<div
												key={language.iso_639_1}
												className="mr-4 mb-4 flex items-center"
											>
												<span className="text-lg text-gray-800 dark:text-white">
													{language.english_name}
												</span>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
					<div>
						<iframe
							width="560"
							height="315"
							src={url}
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					</div>
				</div>
			</div>
			<FooterComponent />
		</>
	);
}

export default Details;
