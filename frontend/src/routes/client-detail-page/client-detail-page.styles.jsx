import styled from "styled-components";
import {
	backgroundDark,
	backgroundMediumDark,
	LeftBarClientWidth,
} from "../../assets/_variables";

export const ClientDetailPageContainer = styled.div`
	position: absolute;
	top: 100px;
	width: 100%;
	align-items: center;
`;

export const ClientDetailContentContainer = styled.div`
	position: absolute;
	left: ${LeftBarClientWidth}px;
	display: flex;
	flex-direction: column;
	padding: 30px 50px;
	gap: 30px;
	width: 80%;
`;

export const ClientTitle = styled.div`
	display: flex;
	flex-direction: column;
	h1 {
		color: ${backgroundDark};
		font-size: 2.5rem;
		margin-bottom: 10px;
	}
	p {
		span {
			font-weight: bold;
		}
		color: ${backgroundMediumDark};
		font-size: 1.2rem;
		margin: 5px 0;
	}
`;
