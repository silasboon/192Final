import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function PopularTV() {
	const [data, setData] = useState(null);
	const MOVIEAPIKEY = "08d85f47ee3b13f3aee2110785af86fa";

	const options = {
		method: "GET",
	};

	const getRecommended = async () => {
		try {
			const response = await fetch(
				"https://api.themoviedb.org/3/tv/popular?api_key=" +
					MOVIEAPIKEY +
					"&language=en-US&page=1",
				options
			);
			const data = await response.json();
			setData(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getRecommended();
	}, []);

	return (
		<div className="w-5/6 mx-auto">
			<h1 className="text-3xl font-bold text-gray-800 dark:text-white">
				Popular TV
			</h1>
			<div className="flex overflow-x-auto scrollbar-hide">
				{data &&
					data.results.map((tv) => (
						<div
							key={tv.id}
							className="flex flex-col items-center justify-center p-4 my-4 bg-white rounded-lg shadow-lg dark:bg-gray-800 mx-4"
							style={{ minWidth: "200px", maxWidth: "250px" }}
						>
							<Link to={`/tv/${tv.id}`}>
								<img
									src={
										tv.poster_path
											? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
											: "https://via.placeholder.com/500x750.png?text=Poster+Not+Available"
									}
									alt={tv.name}
									className="h-96 object-contain"
								/>

								<h1 className="text-2xl font-bold text-gray-800 dark:text-white">
									{tv.name}
								</h1>
							</Link>
						</div>
					))}
			</div>
		</div>
	);
}

export default PopularTV;
