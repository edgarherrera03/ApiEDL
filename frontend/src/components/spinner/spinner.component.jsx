import { ClimbingBoxLoader } from "react-spinners";
import { SpinnerContainer } from "./spinner.styles";
const Spinner = () => {
	return (
		<SpinnerContainer>
			<ClimbingBoxLoader size={20} color="#1A2D42" speedMultiplier={1.5} />
		</SpinnerContainer>
	);
};

export default Spinner;
