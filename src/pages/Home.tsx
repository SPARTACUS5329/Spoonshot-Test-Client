import React, { useState, useEffect, createContext } from "react";
import { TextField, Switch, Button } from "@mui/material";
import axios from "../utils/_axios";
import Book from "../Interfaces/Book";
import BookCard from "../components/BookCard";
import BookDescriptionModal from "../components/BookDescriptionModal";

export const InventoryContext = createContext<{
	inventory: Book[] | null;
	setInventory: React.Dispatch<React.SetStateAction<Book[] | null>> | null;
	inventoryMap: any; // eslint-disable-line
}>({ inventory: null, setInventory: null, inventoryMap: {} });

export function Home() {
	const [books, setBooks] = useState<Book[] | null>([]);
	const [currentBook, setCurrentBook] = useState<Book | null>(null);
	const [showInventory, setShowInventory]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>
	] = useState(false);
	const [title, setTitle] = useState<string>("");
	const [author, setAuthor] = useState<string>("");
	const [inventory, setInventory] = useState<Book[] | null>([]);
	const [inventoryMap, setInventoryMap] = useState<any>(null); // eslint-disable-line
	const [isBookDescriptionModalOpen, setIsBookDescriptionModalOpen] = useState(false);

	useEffect(() => {
		const getInventory = async (): Promise<void> => {
			try {
				// eslint-disable-next-line
				const result: any = await axios.get("/inventory");
				setInventory([...result.data]);
			} catch (error) {
				console.error(error);
			}
		};
		getInventory();
	}, []);

	useEffect(() => {
		// eslint-disable-next-line
		setInventoryMap((item: any) => {
			// eslint-disable-next-line
			const map: any = {};
			inventory?.map((book: Book) => {
				map[book.googleBookID] = book;
			});
			return map;
		});
	}, [inventory]);

	const handleSubmit = async (): Promise<void> => {
		let queryString: string;
		if (title + author === "") return;
		if (title === "") queryString = `/?author=${author}`;
		if (author === "") queryString = `/?title=${title}`;
		else queryString = `/?title=${title}&author=${author}`;
		try {
			// eslint-disable-next-line
			const res: any = await axios.get(queryString);
			setBooks(() => {
				let temp: Book[] = [];
				// eslint-disable-next-line
				res.data.items.forEach((book: any) => {
					temp = [
						...temp,
						{
							googleBookETag: book.etag,
							googleBookID: book.id,
							googleSelfLink: book.selfLink,
							title: book.volumeInfo.title,
							authors: book.volumeInfo.authors,
							thumbnail: book.volumeInfo.imageLinks.thumbnail,
							description: book.volumeInfo.description,
							stock: 0,
						},
					];
				});
				return temp;
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleAddItems = async () => {
		try {
			console.log(inventory);
			// eslint-disable-next-line
			const result: any = await axios.post("/inventory", {
				inventory,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdateItems = async () => {
		try {
			console.log(inventory);
			await axios.put("/inventory", {
				inventory,
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<InventoryContext.Provider value={{ inventory, setInventory, inventoryMap }}>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					marginTop: "20px",
					marginBottom: "10px",
				}}>
				<div>
					<TextField
						label="Title"
						variant="outlined"
						value={title}
						onChange={(e) => {
							e.preventDefault();
							setTitle(e.target.value);
						}}
						style={{ width: "35vw", marginRight: "10px" }}
					/>
					<TextField
						label="Author"
						variant="outlined"
						value={author}
						onChange={(e) => {
							e.preventDefault();
							setAuthor(e.target.value);
						}}
						style={{ width: "35vw", marginLeft: "10px" }}
					/>
					<Button variant="contained" onClick={handleSubmit}>
						Search
					</Button>
				</div>
			</div>
			<div style={{ display: "flex", justifyContent: "center" }}>
				{showInventory || (
					<Button variant="contained" onClick={handleAddItems}>
						Add
					</Button>
				)}
				{showInventory && (
					<Button variant="contained" onClick={handleUpdateItems}>
						Update
					</Button>
				)}
				<div style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
					<div>
						<Switch
							checked={showInventory}
							onClick={(e) => {
								e.preventDefault();
								setShowInventory(!showInventory);
							}}
						/>
					</div>
					<div style={{ textAlign: "center" }}>{showInventory ? "Inventory" : "All"}</div>
				</div>
			</div>
			<div style={{ marginTop: "20px" }}>
				{!showInventory && books && books?.length !== 0 && (
					<div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
						{books.map((book: Book, index: number) => (
							<div
								key={index}
								style={{
									marginTop: "10px",
								}}>
								<BookCard
									props={{
										book,
										setIsBookDescriptionModalOpen,
										setCurrentBook,
										showInventory,
									}}
								/>
							</div>
						))}
					</div>
				)}
			</div>
			<div style={{ marginTop: "20px" }}>
				{showInventory && inventory && inventory?.length !== 0 && (
					<div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
						{inventory.map((book: Book, index: number) => (
							<div
								key={index}
								style={{
									marginTop: "10px",
								}}>
								<BookCard
									props={{
										book,
										setIsBookDescriptionModalOpen,
										setCurrentBook,
										showInventory,
									}}
								/>
							</div>
						))}
					</div>
				)}
			</div>
			<div>
				{currentBook && (
					<BookDescriptionModal
						props={{
							book: currentBook,
							isBookDescriptionModalOpen,
							setIsBookDescriptionModalOpen,
						}}
					/>
				)}
			</div>
		</InventoryContext.Provider>
	);
}
