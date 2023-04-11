// Import necessary dependencies
import React from "react";
import { mount } from "cypress/react18";
import { MemoryRouter } from "react-router-dom";

import Navbar from "../.././src/components/Navbar";
import SearchResults from "../.././src/components/SearchResults";
import PopularMovies from "../.././src/components/PopularMovies";
import PopularTV from "../.././src/components/PopularTV";
import FooterComponent from "../.././src/components/FooterComponent";

describe("Navbar Component", () => {
	// Test case: Navbar renders with correct elements
	it("should render with correct elements", () => {
		mount(
			<MemoryRouter>
				<Navbar isAuth={false} />
			</MemoryRouter>
		);
		cy.get("nav").should("exist");
		cy.get("a").should("contain", "Movies & TV");
		cy.get("button").should("contain", "Login");
		cy.get("button").should("contain", "Register");
	});

	// Test case: Navbar renders with login elements when not authenticated
	it("should render login elements when not authenticated", () => {
		mount(
			<MemoryRouter>
				<Navbar isAuth={false} />
			</MemoryRouter>
		);
		cy.get("button").should("contain", "Login");
		cy.get("button").should("contain", "Register");
		cy.get("button").should("not.contain", "Logout");
		cy.get("button").should("not.contain", "Account");
	});

	// Test case: Navbar renders with logout elements when authenticated
	it("should render logout elements when authenticated", () => {
		mount(
			<MemoryRouter>
				<Navbar isAuth={true} />
			</MemoryRouter>
		);
		cy.get("button").should("contain", "Logout");
		cy.get("button").should("contain", "Account");
		cy.get("button").should("not.contain", "Login");
		cy.get("button").should("not.contain", "Register");
	});
});

describe("SearchResults, PopularMovies & Popular TV component", () => {
	const movies = {
		results: [
			{
				id: 1,
				title: "Movie 1",
				poster_path: "/poster1.jpg",
				overview: "Overview of Movie 1",
				popularity: 8.5,
			},
			{
				id: 2,
				title: "Movie 2",
				poster_path: "/poster2.jpg",
				overview: "Overview of Movie 2",
				popularity: 7.8,
			},
		],
	};

	const tv = {
		results: [
			{
				id: 3,
				name: "TV Show 1",
				poster_path: "/poster3.jpg",
				overview: "Overview of TV Show 1",
				popularity: 9.1,
			},
			{
				id: 4,
				name: "TV Show 2",
				poster_path: "/poster4.jpg",
				overview: "Overview of TV Show 2",
				popularity: 7.2,
			},
		],
	};

	it("should render search results correctly", () => {
		mount(
			<MemoryRouter>
				<SearchResults movies={movies} tv={tv} />
			</MemoryRouter>
		);
	});

	it("should render search results title correctly", () => {
		mount(
			<MemoryRouter>
				<SearchResults movies={movies} tv={tv} />
			</MemoryRouter>
		);
		cy.get("h1").should("contain", "Results");
	});

	it("should render search results with no TV shows correctly", () => {
		mount(
			<MemoryRouter>
				<SearchResults movies={movies} />
			</MemoryRouter>
		);
		cy.get("h1").should("contain", "Results");
	});

	it("should render search results with no movies correctly", () => {
		mount(
			<MemoryRouter>
				<SearchResults tv={tv} />
			</MemoryRouter>
		);
		cy.get("h1").should("contain", "Results");
	});

	it("should render popular movies correctly", () => {
		mount(
			<MemoryRouter>
				<PopularMovies movies={movies} />
			</MemoryRouter>
		);
	});

	it("should render popular tv correctly", () => {
		mount(
			<MemoryRouter>
				<PopularTV tv={tv} />
			</MemoryRouter>
		);
	});
});

describe("FooterComponent", () => {
	// Test case 1: Footer renders with correct elements
	it("should render with correct elements", () => {
		mount(<FooterComponent />);
		cy.get("footer").should("exist");
	});
});
