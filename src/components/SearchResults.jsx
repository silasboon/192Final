import { Link } from "react-router-dom";
function SearchResults(props) {
	const data = props.data;
	return (
		<div className="w-5/6 mx-auto">
			<h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
				Results
			</h1>
			<div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{data &&
					data.results.map((movie) => (
						<div
							key={movie.id}
							className="flex flex-col items-center justify-center p-4 my-4 bg-white rounded-lg shadow-lg dark:bg-gray-800"
						>
							<Link to={`/${movie.id}`}>
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
					))}
			</div>
		</div>
	);
}

export default SearchResults;
