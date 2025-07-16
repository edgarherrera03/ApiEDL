import styled from "styled-components";
import { Link } from "react-router";
import {
	backgroundMediumDark,
	backgroundWhite,
	infoText,
} from "../../assets/_variables";

export const NavigationContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 100px;
	background-color: ${backgroundMediumDark};
	z-index: 999;
	padding: 0 40px;
`;

export const LogoContainer = styled.div`
	height: 58px;
	width: 58px;
	border-radius: 50px;
	background-size: cover;
	background-position: center;
	cursor: pointer;
	@media (max-width: 768px) {
		height: 55px;
		width: 55px;
	}

	@media (max-width: 515px) {
		height: 45px;
		width: 45px;
	}
`;

export const AppTitle = styled(Link)`
	color: ${infoText};
	font-size: 25px;
	font-weight: 600;
	text-decoration: none;
`;

export const NavLinks = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	width: 50%;
	margin-right: 40px;

	@media (max-width: 1150px) {
		width: 70%;
	}
	@media (max-width: 1000px) {
		display: none;
	}
`;

export const NavLink = styled(Link)`
	font-family: "Inter", sans-serif;
	font-weight: bold;
	font-size: 18px;
	cursor: pointer;
	color: ${backgroundWhite};
	margin: 10px 0;
	text-decoration: none;
	@media (max-width: 1000px) {
		font-size: 1.4rem;
	}
	@media (max-width: 515px) {
		font-size: 1.2rem;
	}
`;
