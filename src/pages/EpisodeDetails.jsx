import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterComponent from "../components/FooterComponent";

const EpisodeDetails = () => {
	const { TVId, seasonNumber, seasonSubtract, episodeNumber } = useParams();

	return (
		<div>
			<Navbar />
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
				<p className="text-lg font-medium">Back To Season</p>
			</Link>
			<h1>Episode Details</h1>
			<h2>TV ID: {TVId}</h2>
			<h2>Season Number: {seasonNumber}</h2>
			<h2>Episode Number: {episodeNumber}</h2>
			<FooterComponent />
		</div>
	);
};

export default EpisodeDetails;
