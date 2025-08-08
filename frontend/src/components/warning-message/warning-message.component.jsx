import {
	WarningMessageContainer,
	WarningLogoContainer,
	MaliciousLogo,
	SafeLogo,
	SuspiciousLogo,
	WarningText,
	WarningTitle,
} from "./warnining-message.styles";
const WarningMessage = ({ warning }) => {
	return (
		<WarningMessageContainer>
			{warning === "Malicioso" ? (
				<WarningLogoContainer>
					<MaliciousLogo />
				</WarningLogoContainer>
			) : warning === "Sospechoso" ? (
				<WarningLogoContainer>
					<SuspiciousLogo />
				</WarningLogoContainer>
			) : (
				<WarningLogoContainer>
					<SafeLogo />
				</WarningLogoContainer>
			)}
			<WarningText>
				<WarningTitle $warning={warning}>{warning}</WarningTitle>
				{warning === "Malicioso" ? (
					<p>
						El elemento analizado presenta características que lo hacen parecer
						malicioso y debe ser tratado con precaución.
					</p>
				) : warning === "Sospechoso" ? (
					<p>
						El elemento analizado ha sido calificado como sospechoso y debe ser
						tratado con precaución.
					</p>
				) : (
					<p>
						El elemento ha sido calificado como seguro. No se detectaron
						amenazas, aunque se recomienda mantener precaución básica.
					</p>
				)}
			</WarningText>
		</WarningMessageContainer>
	);
};

export default WarningMessage;
