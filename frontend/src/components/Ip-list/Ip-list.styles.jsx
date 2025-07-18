import styled from "styled-components";
import { backgroundDark, backgroundWhite } from "../../assets/_variables";

export const IpListContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	form {
		width: 100%;
		display: flex;
		justify-content: space-between;
		height: 35px;
		label {
			width: 10%;
			text-align: center;
			align-content: center;
			border: 1px solid ${backgroundDark};
			height: 100%;
			color: ${backgroundWhite};
			background-color: ${backgroundDark};
			border-top-left-radius: 5px;
		}
		input {
			width: 80%;
			height: 100%;
			border: 1px solid ${backgroundDark};
			padding: 0px 10px;
			font-size: 1.1rem;
		}
		button {
			width: 10%;
			border: 1px solid ${backgroundDark};
			border-top-right-radius: 5px;
			cursor: pointer;
			background-color: ${backgroundDark};
			color: ${backgroundWhite};
			font-weight: 600;
			font-size: 1.5rem;
		}
	}
`;
export const IpListHeader = styled.h3`
	color: ${backgroundDark};
	font-size: 1.1rem;
	width: 100%;
`;
