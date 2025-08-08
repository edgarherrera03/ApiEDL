import { useContext, useState } from "react";
import {
	ScrollListContainer,
	ScrollListHeaders,
	Header,
	ScollListInformation,
	Item,
	Info,
	ItemDetails,
	ButtonContainer,
	CommentsContainer,
	Icon,
	CommentSection,
	Comment,
} from "./scroll-list.styles";
import BlockedIcon from "../blocked-icon/blocked-icon.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import ModifyItemWindow from "../modify-item-window/modify-item-window.component";
import { UserContext } from "../../context/user.context";

const ScrollList = ({
	headersList,
	ordersList,
	itemList = [],
	height = "",
	handleDelete,
	handleComment,
}) => {
	const [openItems, setOpenItems] = useState({});
	const [comments, setComments] = useState({});
	const [openModifyItemIndex, setOpenModifyItemIndex] = useState(null);
	const { currentUser } = useContext(UserContext);
	const role = currentUser["role"];

	const toggleItem = (index) => {
		setOpenItems((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setComments((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmitComment = (event, item, index, type) => {
		event.preventDefault();
		if (comments[index]?.trim()) {
			handleComment(comments[index], item, type);
			setComments((prev) => ({
				...prev,
				[index]: "",
			}));
		}
	};

	const handleModifyItem = (index) => {
		setOpenModifyItemIndex(index); // 🔧 almacenar índice actual
	};

	const closeWindow = () => {
		setOpenModifyItemIndex(null);
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
									) : Array.isArray(item[key]) ? (
										<span>{item[key].join(", ")}</span>
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
									{role === "admin" && (
										<form
											onSubmit={(event) =>
												handleSubmitComment(
													event,
													item["element"],
													index,
													item["type"]
												)
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
									)}
								</CommentsContainer>
								{role === "admin" && (
									<ButtonContainer>
										<Button
											onClick={() => handleModifyItem(index)}
											buttonType={BUTTON_TYPE_CLASSES.seeMore}>
											Modificar
										</Button>
										<Button
											onClick={() =>
												handleDelete(item["element"], item["type"])
											}
											type="button"
											buttonType={BUTTON_TYPE_CLASSES.deleteItem}>
											Eliminar
										</Button>
									</ButtonContainer>
								)}

								{openModifyItemIndex === index && (
									<ModifyItemWindow
										itemToModify={item["element"]}
										closeWindow={closeWindow}
										type={item["type"]}
									/>
								)}
							</ItemDetails>
						)}
					</div>
				))}
			</ScollListInformation>
		</ScrollListContainer>
	);
};

export default ScrollList;
