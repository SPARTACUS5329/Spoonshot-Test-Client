import React, { SetStateAction } from "react";
import { Box, Modal, Typography } from "@mui/material";
import "../styles/Books.css";
import modalStyle from "../utils/modalStyle";
import Book from "../Interfaces/Book";

function BookDescriptionModal(props: {
	props: {
		book: Book;
		isBookDescriptionModalOpen: boolean;
		setIsBookDescriptionModalOpen: React.Dispatch<SetStateAction<boolean>>;
	};
}) {
	const { book, isBookDescriptionModalOpen, setIsBookDescriptionModalOpen } = props.props;
	return (
		<div>
			<Modal
				open={isBookDescriptionModalOpen}
				// eslint-disable-next-line
				onClose={(e: any) => {
					e.preventDefault();
					setIsBookDescriptionModalOpen(false);
				}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={modalStyle}>
					<Typography variant="h5" component="h2">
						{book.title}
					</Typography>
					<Typography variant="h6" component="h2">
						{book.authors.map((author: string, index: number) => {
							return <div key={index}>{author}</div>;
						})}
					</Typography>
					<Typography style={{ textAlign: "justify" }} sx={{ mt: 2 }}>
						{book.description}
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}

export default BookDescriptionModal;
