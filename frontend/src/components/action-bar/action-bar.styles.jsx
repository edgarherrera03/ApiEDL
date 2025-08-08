import styled from "styled-components";
import { backgroundDark } from "../../assets/_variables";

export const ActionBarContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 20px;
	width: 100%;
	span {
		color: ${backgroundDark};
		font-size: 1.2rem;
		font-weight: 600;
	}
`;
