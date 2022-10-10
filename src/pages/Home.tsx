import React, { useState, useEffect } from "react";
import { TextField, Switch } from "@mui/material";
import axios from "../utils/_axios";

function Home() {
	// const [books, setBooks] = useState(null);
	const [search, setSearch]: [string, React.Dispatch<React.SetStateAction<string>>] =
		useState("");
	const [showInventory, setShowInventory]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>
	] = useState(false);

	useEffect(() => {
		const getBooks = async () => {
			try {
				const res: string = await axios.get("/");
				console.log(res);
			} catch (error) {
				console.error(error);
			}
		};
		getBooks();
	});

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<div>
				<TextField
					label="Search"
					variant="outlined"
					value={search}
					onChange={(e) => {
						e.preventDefault();
						setSearch(e.target.value);
					}}
				/>
			</div>
			<div>
				<Switch
					checked={showInventory}
					onClick={(e) => {
						e.preventDefault();
						setShowInventory(!showInventory);
					}}
				/>
			</div>
		</div>
	);
}

export default Home;
