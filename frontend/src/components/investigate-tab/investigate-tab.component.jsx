import {
	InvestigateTabContainer,
	InvestigateTabTitle,
	InvestigateTabContent,
	SelectFilter,
	InvestigateResultContainer,
	Result,
} from "./investigate-tab.styles";
import { HashLoader } from "react-spinners";
import { investigateItem } from "../../utils/api";
import { UserContext } from "../../context/user.context";
import { useContext, useState } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { elementOptions } from "../../routes/registros/registros.component";
import WarningMessage from "../warning-message/warning-message.component";

const InvestigateTab = ({ handleInvestigateResult }) => {
	const [selectType, setSelectType] = useState("");
	const [investigateField, setInvestigateField] = useState("");
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState({});
	const [warning, setWarning] = useState("");

	const { logout, currentUser } = useContext(UserContext);
	const role = currentUser["role"];
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
			const classification =
				indicatorDetails.rating < 30
					? "Seguro"
					: indicatorDetails.rating < 60
					? "Sospechoso"
					: "Malicioso";

			// Warning es la variable que nos permitira variar entre el warning mostrado basado en el resultado de la investigacion
			setWarning(classification);
			setResult({
				...indicatorDetails,
				type: selectType["value"],
				element: investigateField,
				classification: classification,
			});
			console.log(result);
		} else if (code === 401 || code === 403) {
			await logout();
		} else {
			console.log(error);
		}
		setLoading(false);
	};

	const handleSendToRegister = () => {
		handleInvestigateResult(result);
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
				<InvestigateResultContainer>
					<Result>
						<span>Elemento:</span>
						<p>{result.element}</p>
					</Result>
					<Result>
						<span>Fuente:</span>
						<p>Alien Vault</p>
					</Result>
					<Result>
						<span>Calificación:</span>
						<p>{result.rating}</p>
					</Result>
					<Result>
						<span>Clasificación:</span>
						<p>{result.classification}</p>
					</Result>
					<Result>
						<span>Pais:</span>
						<p>{result.country}</p>
					</Result>
					{role === "admin" && (
						<Button
							onClick={handleSendToRegister}
							buttonType={BUTTON_TYPE_CLASSES.generate}>
							Registrar
						</Button>
					)}
				</InvestigateResultContainer>
				{warning && <WarningMessage warning={warning} />}
			</InvestigateTabContent>
		</InvestigateTabContainer>
	);
};

export default InvestigateTab;
