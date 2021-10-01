import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Container from "react-bootstrap/Container";

const StickyFooter = () => {
	return (
		<div className="fixed-bottom">
			<Navbar bg="dark" variant="dark">
				<Container>
					<NavbarBrand>Footer</NavbarBrand>
				</Container>
			</Navbar>
		</div>
	);
};

export default StickyFooter;
