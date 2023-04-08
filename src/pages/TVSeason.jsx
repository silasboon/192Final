import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterComponent from "../components/FooterComponent";
const TVSeason = () => {
	const { TVId, seasonNumber, seasonSubtract } = useParams();
	const [data, setData] = useState([]);
	const [episodeNumber, setEpisodeNumber] = useState(0);
	const [videoData, setVideoData] = useState([]);
	const MOVIEAPIKEY = "08d85f47ee3b13f3aee2110785af86fa";
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
			setEpisodeNumber(data.seasons[seasonNumber].episode_count);
		} catch (error) {
			console.log(error);
		}
	};

	const getTvVideos = async () => {
		try {
			const response = await fetch(
				"https://api.themoviedb.org/3/tv/" +
					TVId +
					"/season/" +
					seasonNumber +
					"/videos?api_key=" +
					MOVIEAPIKEY +
					"&language=en-US",
				options
			);
			const data = await response.json();
			setVideoData(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTvDetails();
		getTvVideos();
	}, []);

	const getEpisodeList = () => {
		let episodeList = [];
		for (let i = 1; i <= episodeNumber; i++) {
			episodeList.push(i);
		}
		return (
			<div>
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
					Episodes
				</h2>
				{episodeList.map((episode) => {
					return (
						<button
							key={episode}
							className="px-3 py-2 m-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
						>
							<Link
								to={`/tv/${TVId}/season/${seasonNumber}/${seasonSubtract}/episode/${episode}`}
							>
								Episode: {episode}
							</Link>
						</button>
					);
				})}
			</div>
		);
	};

	const getVideoList = () => {
		let videoList = [];
		const [scrollPosition, setScrollPosition] = useState(0);
		// gradient effect on left and right of video list
		const handleScroll = (event) => {
			const { scrollLeft, scrollWidth, clientWidth } = event.target;
			const maxScrollLeft = scrollWidth - clientWidth;
			const newScrollPosition = scrollLeft / maxScrollLeft;
			setScrollPosition(newScrollPosition);
		};
		const gradientLeft = `linear-gradient(to right, rgb(16,23,41), rgb(16,23,41) ${
			(1 - scrollPosition) * 100
		}%, rgb(16,23,41), rgba(255, 255, 255, 0))`;
		const gradientRight = `linear-gradient(to left, rgb(16,23,41), rgb(16,23,41) ${
			scrollPosition * 100
		}%, rgb(16,23,41), rgba(255, 255, 255, 0))`;
		if (videoData && videoData.results) {
			for (let i = 0; i < videoData.results.length; i++) {
				videoList.push(videoData.results[i].key);
			}
		}
		return (
			<>
				<h3 className="text-2xl font-semibold text-gray-700 dark:text-white mt-5">
					Videos
				</h3>
				<div className="relative mx-auto my-5">
					<div
						className="absolute top-0 bottom-0 left-0 w-8"
						style={{ backgroundImage: `${gradientLeft}` }}
					/>
					<div
						className="absolute top-0 left--20 bottom-0 right-0 w-8"
						style={{ backgroundImage: `${gradientRight}` }}
					/>
					<div className="flex overflow-x-scroll mx-4" onScroll={handleScroll}>
						{videoList.map((vid) => {
							return (
								<div key={vid} className="flex-none mx-4">
									<iframe
										width="560"
										height="315"
										src={`https://www.youtube.com/embed/${vid}`}
										title={videoData}
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
									></iframe>
								</div>
							);
						})}
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<Navbar />
			<div className="container mx-auto">
				<Link
					to={`/tv/${TVId}`}
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
					<p className="text-lg font-medium">Back To Show</p>
				</Link>

				<div className="w-full md:w-3/12 lg:w-2/12">
					{data.poster_path ? (
						<img
							src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
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
				<h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
					{data.original_name}
				</h1>
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
					Season {seasonNumber}
				</h2>
				<p className="text-gray-700 dark:text-white text-lg mb-4">
					{data.seasons && data.seasons[seasonNumber - seasonSubtract].overview}
				</p>
				{getEpisodeList()}
				{getVideoList()}
			</div>
			<FooterComponent />
		</>
	);
};

export default TVSeason;
