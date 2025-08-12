import styled from "styled-components";
import { backgroundDark, backgroundWhite } from "../../assets/_variables";
import { ReactComponent as DownloadSvg } from "../../assets/download.svg";

export const PieChartContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px 0 25px 0;
	min-height: 400px;
	background-color: ${backgroundWhite};
	border-radius: 10px;
	width: fit-content;
	span {
		font-size: 20px;
		color: ${backgroundDark};
	}
`;

export const DownloadButton = styled(DownloadSvg)`
	cursor: pointer;
	height: 25px;
`;

export const Title = styled.div`
	display: flex;
	align-content: center;
	gap: 5px;
`;
