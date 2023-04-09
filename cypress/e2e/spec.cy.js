describe("Page loaded", () => {
	it("should load the page", () => {
		cy.visit("/");
		cy.get("body").should("contain", "div");
	});
});
