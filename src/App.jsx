import "./App.css";
import { Routes, Route } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import TVDetails from "./pages/TVDetails";
import TVSeason from "./pages/TVSeason";
import EpisodeDetails from "./pages/EpisodeDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";

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
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/account" element={<Account />} />
		</Routes>
	);
}

export default App;
