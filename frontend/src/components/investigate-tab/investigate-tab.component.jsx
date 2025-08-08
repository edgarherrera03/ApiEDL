import {
	InvestigateTabContainer,
	InvestigateTabTitle,
	InvestigateTabContent,
	SelectFilter,
} from "./investigate-tab.styles";
import { HashLoader } from "react-spinners";
import { investigateItem } from "../../utils/api";
import { UserContext } from "../../context/user.context";
import { useContext, useState } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { elementOptions } from "../../routes/registros/registros.component";

const InvestigateTab = () => {
	const [selectType, setSelectType] = useState("");
	const [investigateField, setInvestigateField] = useState("");
	const [loading, setLoading] = useState(false);

	const { logout } = useContext(UserContext);

	const handleChangeInvestigateField = (event) => {
		const { value } = event.target;
		setInvestigateField(value);
	};
	const handleSelectType = (selected) => {
		setSelectType(selected);
	};

	const handleInvestigate = async (event) => {
		event.preventDefault();
		setLoading(true);
		const { success, code, error, indicatorDetails } = await investigateItem(
			investigateField,
			selectType.value
		);
		if (success) {
			console.log(indicatorDetails);
		} else if (code === 401 || code === 403) {
			await logout();
		} else {
			console.log(error);
		}
		setLoading(false);
	};
	return (
		<InvestigateTabContainer>
			<InvestigateTabTitle>
				<h1>Investigar</h1>
			</InvestigateTabTitle>
			<InvestigateTabContent>
				<form onSubmit={handleInvestigate}>
					<input
						type="text"
						onChange={handleChangeInvestigateField}
						value={investigateField}
						required
					/>
					<SelectFilter
						options={elementOptions}
						value={selectType}
						onChange={handleSelectType}
						placeholder="Tipo"
						isSearchable
						required
					/>
					<Button buttonType={BUTTON_TYPE_CLASSES.seeMore}>Investigar</Button>
					{loading && (
						<HashLoader color="#1A2D42" size={30} speedMultiplier={1.5} />
					)}
				</form>
			</InvestigateTabContent>
		</InvestigateTabContainer>
	);
};

export default InvestigateTab;
