interface Book {
	googleBookID: string;
	googleBookETag: string;
	googleSelfLink: string;
	title: string;
	authors: string[];
	thumbnail: string;
	description: string;
	stock: number;
}

export default Book;
