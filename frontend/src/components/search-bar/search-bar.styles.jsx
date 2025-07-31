import styled from "styled-components";
import { backgroundDark, backgroundLightDark } from "../../assets/_variables";

export const SearchBarContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	width: 100%;
	span {
		color: ${backgroundDark};
		font-size: 1.2rem;
		font-weight: 600;
	}
	form {
		display: flex;
		gap: 5px;
		input {
			height: 35px;
			box-sizing: border-box;
			border: 1px solid ${backgroundLightDark};
			padding: 0 10px;
			font-size: 1rem;
			outline: none;
		}
	}
`;
