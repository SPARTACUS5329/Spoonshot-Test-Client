import React, { useState, SetStateAction, useContext } from "react";
import { Card, Box, CardContent, Typography, Button, Checkbox, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material/";
import { InventoryContext } from "../pages/Home";
import Book from "../Interfaces/Book";
import "../styles/Books.css";

function BookCard(props: {
	props: {
		book: Book;
		setIsBookDescriptionModalOpen: React.Dispatch<SetStateAction<boolean>>;
		setCurrentBook: React.Dispatch<SetStateAction<Book | null>>;
		showInventory: boolean;
	};
}) {
	const {
		inventory,
		inventoryMap,
		setInventory,
	}: {
		inventory: Book[] | null;
		setInventory: React.Dispatch<SetStateAction<Book[] | null>> | null;
		inventoryMap: any; // eslint-disable-line
	} = useContext(InventoryContext);
	const { book, setIsBookDescriptionModalOpen, setCurrentBook, showInventory } = props.props;
	const [isSelected, setIsSelected] = useState<boolean>(false);
	const [isDeleted, setIsDeleted] = useState<boolean>(false);
	const [isBookPresent, setIsBookPresent] = useState<boolean>(
		Object.hasOwn(inventoryMap, book.googleBookID)
	);
	const [stock, setStock] = useState<string>(JSON.stringify(book.stock));
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
					width: "45vw",
					height: "fit-content",
					minHeight: "350px",
					marginLeft: "10px",
					border: isDeleted
						? "2px solid red"
						: Object.hasOwn(inventoryMap, book.googleBookID)
						? "2px solid gold" // eslint-disable-line
						: "", // eslint-disable-line
				}}
				variant="outlined">
				<img
					src={book.thumbnail}
					alt="Book Thumbnail"
					style={{ width: "40%", height: "auto" }}
				/>
				<Box sx={{ width: "60%", display: "flex", flexDirection: "column" }}>
					<CardContent sx={{ flex: "1 0 auto" }}>
						<Box style={{ display: "flex", justifyContent: "space-between" }}>
							<Typography style={{ fontWeight: "bold", fontSize: "20px" }}>
								{book.title}
							</Typography>
							<Checkbox
								checked={isSelected}
								// eslint-disable-next-line
								onChange={(e: any) => {
									if (showInventory) return setIsSelected(!isSelected);
									if (!isSelected) {
										setInventory &&
											setInventory((inventory: Book[] | null) => {
												if (!inventory) return null;
												inventory.map((BOOK: Book) => {
													if (BOOK.googleBookID === book.googleBookID) {
														BOOK.stock += book.stock;
													}
													return BOOK;
												});
												return isBookPresent
													? [...inventory]
													: [...inventory, book];
											});
										return setIsSelected(true);
									}
									setInventory &&
										setInventory((inventory: Book[] | null) => {
											if (!inventory) return null;
											return [
												...inventory.filter((BOOK: Book) => {
													let isReturnable = false;
													if (BOOK.googleBookID === book.googleBookID) {
														if (isBookPresent) {
															BOOK.stock -= book.stock;
															isReturnable = true;
														} else isReturnable = false;
													}
													return isReturnable;
												}),
											];
										});
									return setIsSelected(false);
								}}
							/>
							<Delete
								onClick={(e) => {
									e.preventDefault();
									if (isDeleted) {
										setInventory &&
											setInventory((inventory: Book[] | null) => {
												if (!inventory) return null;
												return [...inventory, book];
											});
										return setIsDeleted(false);
									}
									setInventory &&
										setInventory((inventory: Book[] | null) => {
											if (!inventory) return null;
											return [
												...inventory.filter((BOOK: Book) => {
													return book.googleBookID !== BOOK.googleBookID;
												}),
											];
										});
									setIsDeleted(true);
								}}
							/>
						</Box>
						<Typography style={{ fontSize: "15px" }}>{book.authors[0]}</Typography>
						<Typography className="description">{book.description}</Typography>
						<Button
							style={{ color: "#1d9ccf" }}
							onClick={(e) => {
								e.preventDefault();
								setIsBookDescriptionModalOpen(true);
								setCurrentBook(book);
							}}>
							Show more
						</Button>
					</CardContent>
					<TextField
						label={"Stock"}
						value={stock}
						disabled={!isSelected}
						// eslint-disable-next-line
						onChange={(e: any) => {
							e.preventDefault();
							setStock(e.target.value);
							setInventory &&
								setInventory((inventory: Book[] | null) => {
									if (!inventory) return null;
									return [
										...inventory.map((BOOK: Book) => {
											if (BOOK.googleBookID === book.googleBookID) {
												book.stock = parseInt(e.target.value);
												BOOK.stock = book.stock;
											}
											return BOOK;
										}),
									];
								});
						}}
					/>
				</Box>
			</Card>
		</div>
	);
}

export default BookCard;
