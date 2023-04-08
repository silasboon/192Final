import React from "react";
import { Footer } from "flowbite-react";
const FooterComponent = () => {
	return (
		<Footer container={true}>
			<Footer.Copyright href="#" by="Movies &amp; Shows™" year={2023} />
			<Footer.LinkGroup>
				<Footer.Link href="/">Home</Footer.Link>
				<Footer.Link href="#">Account</Footer.Link>
				<Footer.Link href="#">Privacy Policy</Footer.Link>
				<Footer.Link href="#">Contact</Footer.Link>
			</Footer.LinkGroup>
		</Footer>
	);
};

export default FooterComponent;
