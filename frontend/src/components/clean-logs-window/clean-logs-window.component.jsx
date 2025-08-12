import { useState } from "react";
import {
	CleanLogsWindowContainer,
	CleanFormInput,
	ButtonsContainer,
} from "./clean-logs-window.styles";
import Button from "../button/button.component";

const CleanLogsWindow = ({ handleCancel, handleSubmit }) => {
	const [cleanDate, setCleanDate] = useState("");
	const handleChange = (event) => setCleanDate(event.target.value);
	return (
		<CleanLogsWindowContainer>
			<form onSubmit={() => handleSubmit(cleanDate)}>
				<CleanFormInput
					name="expirationDate"
					type="date"
					label="Fecha de limpieza"
					required
					value={cleanDate}
					onChange={handleChange}
				/>
				<ButtonsContainer>
					<Button type="button" onClick={handleCancel}>
						Cancelar
					</Button>
					<Button type="submit">Confirmar</Button>
				</ButtonsContainer>
			</form>
		</CleanLogsWindowContainer>
	);
};
export default CleanLogsWindow;
