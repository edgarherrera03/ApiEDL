import styled from "styled-components";
import { backgroundDark, backgroundWhite } from "../../assets/_variables";
import DownloadSvg from "../../assets/download.svg?react";

export const PieChartContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px 5px 25px 5px;
	min-height: 400px;
	background-color: ${backgroundWhite};
	border-radius: 10px;
	width: 100%;
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
