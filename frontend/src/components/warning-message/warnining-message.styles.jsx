import styled from "styled-components";
import { ReactComponent as MaliciousSvg } from "../../assets/malicious.svg";
import { ReactComponent as SuspiciousSvg } from "../../assets/suspicious.svg";
import { ReactComponent as SafeSvg } from "../../assets/safe.svg";
import { dangerColor, greenColor, warningColor } from "../../assets/_variables";

export const WarningMessageContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
	align-items: center;
	padding: 0 50px;
`;

export const WarningLogoContainer = styled.div`
	height: 150px;
	width: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const WarningText = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const WarningTitle = styled.h1`
	color: ${({ $warning }) =>
		$warning === "Malicioso"
			? `${dangerColor}`
			: $warning === "Sospechoso"
			? `${warningColor}`
			: `${greenColor}`};
	text-shadow: -0.5px -0.5px 0 black, 0.5px -0.5px 0 black, -0.5px 0.5px 0 black,
		0.5px 0.5px 0 black;
`;

export const MaliciousLogo = styled(MaliciousSvg)`
	height: 100px;
	path {
		fill: ${dangerColor};
	}
`;

export const SuspiciousLogo = styled(SuspiciousSvg)`
	height: 100%;
	width: 100%;
	text-align: center;
	path {
		fill: ${warningColor};
	}
`;

export const SafeLogo = styled(SafeSvg)`
	height: 100px;
	path {
		fill: ${greenColor};
	}
`;
