import "./App.css";
import { Routes, Route } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import TVDetails from "./pages/TVDetails";
import TVSeason from "./pages/TVSeason";
import EpisodeDetails from "./pages/EpisodeDetails";
import Home from "./pages/Home";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/movie/:movieId" element={<MovieDetails />} />
			<Route path="/tv/:TVId" element={<TVDetails />} />
			<Route
				path="/tv/:TVId/season/:seasonNumber/:seasonSubtract"
				element={<TVSeason />}
			/>
			<Route
				path="/tv/:TVId/season/:seasonNumber/:seasonSubtract/episode/:episodeNumber"
				element={<EpisodeDetails />}
			/>
		</Routes>
	);
}

export default App;
