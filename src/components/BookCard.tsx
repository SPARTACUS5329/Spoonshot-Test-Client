import React from "react";
import { Card, Box, CardContent, Typography } from "@mui/material";
import Book from "../Interfaces/Book";

function BookCard(props: { props: { book: Book } }) {
	const { book }: { book: Book } = props.props;
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				marginBottom: "20px",
			}}>
			<Card
				sx={{ display: "flex", boxShadow: 3 }}
				style={{
					width: "80vw",
					height: "fit-content",
					marginLeft: "10px",
				}}
				variant="outlined">
				<img
					src={book.thumbnail}
					alt="Book Thumbnail"
					style={{ width: "20%", height: "auto" }}
				/>
				<Box sx={{ width: "60%", display: "flex", flexDirection: "column" }}>
					<CardContent sx={{ flex: "1 0 auto" }}>
						<Typography style={{ fontWeight: "bold", fontSize: "30px" }}>
							{book.title}
						</Typography>
						<Typography style={{ fontWeight: "bold", fontSize: "25px" }}>
							{book.authors[0]}
						</Typography>
					</CardContent>
				</Box>
			</Card>
		</div>
	);
}

export default BookCard;
