import React, { useState, useEffect } from "react";
import { TextField, Switch, Button } from "@mui/material";
import axios from "../utils/_axios";
import Book from "../Interfaces/Book";
import BookCard from "../components/BookCard";

function Home() {
	const [books, setBooks] = useState<Book[] | null>([]);
	const [showInventory, setShowInventory]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>
	] = useState(false);
	const [title, setTitle]: [string, React.Dispatch<React.SetStateAction<string>>] = useState("");
	const [author, setAuthor]: [string, React.Dispatch<React.SetStateAction<string>>] =
		useState("");

	useEffect(() => {
		console.log(books);
	}, [books]);

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
						},
					];
				});
				return temp;
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
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
				</div>
			</div>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<Button variant="contained" onClick={handleSubmit}>
					Search
				</Button>
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
				{books?.length !== 0 &&
					books?.map((book: Book, index: number) => {
						return <BookCard key={index} props={{ book }} />;
					})}
			</div>
		</>
	);
}

export default Home;
