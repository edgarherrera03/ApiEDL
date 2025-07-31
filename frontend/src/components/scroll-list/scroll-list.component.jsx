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
	Comment,
	ButtonSection,
} from "./scroll-list.styles";
import BlockedIcon from "../blocked-icon/blocked-icon.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const ScrollList = ({
	headersList,
	ordersList,
	itemList,
	height = "",
	handleDelete,
	handleComment,
}) => {
	// Estado para controlar qué elementos están abiertos
	const [openItems, setOpenItems] = useState({});
	const [comments, setComments] = useState({});
	const toggleItem = (index) => {
		setOpenItems((prev) => ({
			...prev,
			[index]: !prev[index], // alterna entre true/false
		}));
	};
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setComments((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmitComment = (event, item, index) => {
		event.preventDefault();
		if (comments[index]?.trim()) {
			handleComment(comments[index], item);
			setComments((prev) => ({
				...prev,
				[index]: "", // Limpiar input tras enviar
			}));
		}
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
										{Array.isArray(item["comments"]) &&
											item["comments"].map((comment, index) => (
												<Comment key={index}>
													<span>{comment.username}</span>
													<p>[{comment.date}]:</p>
													<p>{comment.comment}</p>
												</Comment>
											))}
									</CommentSection>
									<form
										onSubmit={(event) =>
											handleSubmitComment(event, item["element"], index)
										}>
										<input
											name={index}
											type="text"
											placeholder="Nuevo comentario"
											required
											value={comments[index] || ""}
											onChange={handleInputChange}
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
