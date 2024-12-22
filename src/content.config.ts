import { defineCollection, z } from "astro:content";

interface LogData {
	timestamp: string;
	where: string;
	espresso: string;
	rating: string;
	price: string;
}

const logs = defineCollection({
	loader: async () => {
		try {
			const url = import.meta.env.PUBLIC_GOOGLE_SHEET_URL;
			const response = await fetch(url);
			if (!response.ok) {
				console.error("Failed to fetch logs:", response.statusText);
				return [];
			}
			const { data } = await response.json();
			console.log(`Fetched ${data.length} logs`);
			return data.map((log: LogData, index: number) => ({
				id: index.toString(),
				timestamp: new Date(log.timestamp).toLocaleDateString(), // Convert timestamp to short date
				where: log.where,
				espresso: log.espresso,
				rating: log.rating,
				price: parseFloat(log.price), // Convert price from string to number
			}));
		} catch (error) {
			console.error("Error fetching logs:", error);
			return [];
		}
	},
	schema: z.object({
		id: z.string(),
		timestamp: z.string(),
		where: z.string(),
		espresso: z.string(),
		rating: z.string(),
		price: z.number(),
	}),
});

export const collections = { logs };
