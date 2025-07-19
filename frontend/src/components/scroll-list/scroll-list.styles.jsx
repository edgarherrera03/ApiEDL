import styled from "styled-components";
import { backgroundDark, backgroundLightDark } from "../../assets/_variables";

export const ScrollListContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	border-top: 1px solid ${backgroundLightDark};
`;

export const ScrollListHeaders = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 60px;
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	padding: 0 20px;
	width: 100%;
	height: 100%;
	span {
		color: ${backgroundDark};
		font-weight: bold;
	}
`;

export const ScollListInformation = styled.div``;

export const Item = styled.div``;

export const Info = styled.div``;
