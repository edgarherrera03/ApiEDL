import { useState } from "react";
import {
	ScrollListContainer,
	ScrollListHeaders,
	Header,
	ScollListInformation,
	Item,
	Info,
	ItemDetails,
	CommentsContainer,
	Icon,
	CommentSection,
	ButtonSection,
} from "./scroll-list.styles";
import BlockedIcon from "../blocked-icon/blocked-icon.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const ScrollList = ({
	headersList,
	ordersList,
	itemList,
	height = "",
	commentsList,
	handleDelete,
}) => {
	// Estado para controlar qué elementos están abiertos
	const [openItems, setOpenItems] = useState({});

	const toggleItem = (index) => {
		setOpenItems((prev) => ({
			...prev,
			[index]: !prev[index], // alterna entre true/false
		}));
	};

	return (
		<ScrollListContainer>
			<ScrollListHeaders>
				{headersList.map((header) => (
					<Header key={header}>
						<span>{header}</span>
					</Header>
				))}
				<Icon />
			</ScrollListHeaders>

			<ScollListInformation $height={height}>
				{itemList.map((item, index) => (
					<div key={index}>
						<Item $details={openItems[index]}>
							{ordersList.map((key, i) => (
								<Info key={i}>
									{key === "blocked" ? (
										<BlockedIcon blocked={item[key]} />
									) : (
										<span>{item[key]}</span>
									)}
								</Info>
							))}

							<Icon onClick={() => toggleItem(index)}>
								<span>{openItems[index] ? "˄" : "˅"}</span>
							</Icon>
						</Item>

						{openItems[index] && (
							<ItemDetails>
								<CommentsContainer>
									<CommentSection>
										<span>Comentarios:</span>
									</CommentSection>
									<form action="">
										<input
											type="text"
											required
											placeholder="Nuevo comentario"
										/>
										<Button
											type="submit"
											buttonType={BUTTON_TYPE_CLASSES.seeMore}>
											Agregar
										</Button>
									</form>
								</CommentsContainer>
								<ButtonSection>
									<Button buttonType={BUTTON_TYPE_CLASSES.seeMore}>
										Modificar
									</Button>
									<Button
										onClick={() => handleDelete(item["element"])}
										type="button"
										buttonType={BUTTON_TYPE_CLASSES.deleteItem}>
										Eliminar
									</Button>
								</ButtonSection>
							</ItemDetails>
						)}
					</div>
				))}
			</ScollListInformation>
		</ScrollListContainer>
	);
};

export default ScrollList;
