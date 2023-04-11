describe("Home Page", () => {
	beforeEach(() => {
		cy.visit("http://localhost:8004");
	});

	// Check if search bar exists and functions
	it("should fetch data from API and load images and text", () => {
		// Type a search query in the input field
		cy.get('input[name="search"]')
			.type("Spiderman")
			.should("have.value", "Spiderman");
		// Click the search button
		cy.get('button[type="submit"]').click();
		// Wait for API fetch to complete
		cy.wait(1000);
		// Check if images are loaded
		cy.get("img").should("have.attr", "src");
		// check if text contains the search query
		cy.get("h1").should("contain", "Spiderman");
	});

	// Check if popular movies and TV exist
	it("check if popular movies and TV exist", () => {
		cy.get("h1").should("contain", "Popular Movies");
		cy.get("h1").should("contain", "Popular TV");
	});

	// Check if movie details page loads
	it("Checks if movie details page loads", () => {
		cy.visit("http://localhost:8004/movie/299534");
		// Wait for API fetch to complete
		cy.wait(1000);
		cy.get("h1").should("contain", "Avengers: Endgame");
	});

	// Check if TV details page loads
	it("Checks if TV details page loads", () => {
		cy.visit("http://localhost:8004/tv/1399");
		// Wait for API fetch to complete
		cy.wait(1000);
		cy.get("h1").should("contain", "Game of Thrones");
	});

	// Check if seasons page loads
	it("Checks if seasons page loads", () => {
		cy.visit("http://localhost:8004/tv/1399/season/8/0");
	});
});
