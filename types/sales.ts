export type Sale = {
	id: string;
	clientName: string;
	destination: string;
	amount: number;
	date: string;
	status: "pending" | "confirmed" | "cancelled";
};
