import { Link } from "react-router-dom";
function SearchResults(props) {
	const movies = props.movies;
	const tv = props.tv;
	// create array of all results
	const allResults = [];
	// add movies to array
	if (movies) {
		movies.results.forEach((movie) => {
			allResults.push(movie);
		});
	}
	// add tv shows to array
	if (tv) {
		tv.results.forEach((tvShow) => {
			allResults.push(tvShow);
		});
	}
	// sort array by popularity
	allResults.sort((a, b) => {
		return b.popularity - a.popularity;
	});

	console.log(allResults);
	return (
		<div className="w-5/6 mx-auto">
			<h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
				Results
			</h1>
			<div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{allResults &&
					allResults.map((result) => {
						// Check if movie or tv show
						return result.title ? (
							<div
								key={result.id}
								className="flex flex-col items-center justify-center p-4 my-4 bg-white rounded-lg shadow-lg dark:bg-gray-800"
							>
								<Link to={`/movie/${result.id}`}>
									<img
										src={
											result.poster_path
												? `https://image.tmdb.org/t/p/w500/${result.poster_path}`
												: "https://via.placeholder.com/500x750.png?text=Poster+Not+Available"
										}
										alt={result.title}
										className="w-1/2 mx-auto"
									/>

									<h1 className="text-2xl font-bold text-gray-800 dark:text-white">
										{result.title}
									</h1>
								</Link>
								<p className="text-gray-600 dark:text-gray-400 h-2/6">
									{result.overview.slice(0, 200)}
									{result.overview.length > 200 ? "..." : ""}
									{result.overview.length == 0 ? "No overview available" : ""}
								</p>
							</div>
						) : (
							<div
								key={result.id}
								className="flex flex-col items-center justify-center p-4 my-4 bg-white rounded-lg shadow-lg dark:bg-gray-800"
							>
								<Link to={`/tv/${result.id}`}>
									<img
										src={
											result.poster_path
												? `https://image.tmdb.org/t/p/w500/${result.poster_path}`
												: "https://via.placeholder.com/500x750.png?text=Poster+Not+Available"
										}
										alt={result.name}
										className="w-1/2 mx-auto"
									/>

									<h1 className="text-2xl font-bold text-gray-800 dark:text-white">
										{result.name}
									</h1>
								</Link>
								<p className="text-gray-600 dark:text-gray-400 h-2/6">
									{result.overview.slice(0, 200)}
									{result.overview.length > 200 ? "..." : ""}
									{result.overview.length == 0 ? "No overview available" : ""}
								</p>
							</div>
						);
					})}
				/
			</div>
		</div>
	);
}

export default SearchResults;
// <div
// 	key={tv.id}
// 	className="flex flex-col items-center justify-center p-4 my-4 bg-white rounded-lg shadow-lg dark:bg-gray-800"
// >
// 	<Link to={`/tv/${tv.id}`}>
// 		<img
// 			src={
// 				tv.poster_path
// 					? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
// 					: "https://via.placeholder.com/500x750.png?text=Poster+Not+Available"
// 			}
// 			alt={tv.name}
// 			className="w-1/2"
// 		/>

// 		<h1 className="text-2xl font-bold text-gray-800 dark:text-white">
// 			{tv.name}
// 		</h1>
// 	</Link>
// 	<p className="text-gray-600 dark:text-gray-400 h-2/6">
// 		{tv.overview.slice(0, 200)}
// 		{tv.overview.length > 200 ? "..." : ""}
// 		{tv.overview.length == 0 ? "No overview available" : ""}
// 	</p>
// </div>

// {
/* {movies &&
					movies.results.map((movie) => (
						<div
							key={movie.id}
							className="flex flex-col items-center justify-center p-4 my-4 bg-white rounded-lg shadow-lg dark:bg-gray-800"
						>
							<Link to={`/movie/${movie.id}`}>
								<img
									src={
										movie.poster_path
											? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
											: "https://via.placeholder.com/500x750.png?text=Poster+Not+Available"
									}
									alt={movie.title}
									className="w-1/2"
								/>

								<h1 className="text-2xl font-bold text-gray-800 dark:text-white">
									{movie.title}
								</h1>
							</Link>
							<p className="text-gray-600 dark:text-gray-400 h-2/6">
								{movie.overview.slice(0, 200)}
								{movie.overview.length > 200 ? "..." : ""}
								{movie.overview.length == 0 ? "No overview available" : ""}
							</p>
						</div>
					))} */
