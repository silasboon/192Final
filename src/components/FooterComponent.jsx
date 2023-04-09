import React from "react";
import { Footer } from "flowbite-react";
const FooterComponent = () => {
	return (
		<Footer container={true}>
			<Footer.Copyright href="/" by="Movies &amp; Shows™" year={2023} />
		</Footer>
	);
};

export default FooterComponent;
