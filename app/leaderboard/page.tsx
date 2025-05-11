"use client";

import { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Sample data for the leaderboard
const initialData = [
	{ id: 1, name: "John Smith", score: 230, team: "Alpha", position: "1st" },
	{ id: 2, name: "Jane Doe", score: 215, team: "Beta", position: "2nd" },
	{ id: 3, name: "Alex Johnson", score: 198, team: "Alpha", position: "3rd" },
	{ id: 4, name: "Sarah Williams", score: 185, team: "Gamma", position: "4th" },
	{ id: 5, name: "Mike Brown", score: 170, team: "Beta", position: "5th" },
	{ id: 6, name: "Lisa Davis", score: 165, team: "Gamma", position: "6th" },
	{ id: 7, name: "Robert Wilson", score: 155, team: "Alpha", position: "7th" },
	{ id: 8, name: "Emily Taylor", score: 145, team: "Beta", position: "8th" },
	{ id: 9, name: "David Anderson", score: 130, team: "Gamma", position: "9th" },
	{
		id: 10,
		name: "Anna Martinez",
		score: 125,
		team: "Alpha",
		position: "10th",
	},
];

export default function LeaderboardPage() {
	const [data] = useState(initialData);
	const [searchTerm, setSearchTerm] = useState("");

	const filteredData = data.filter(
		(entry) =>
			entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			entry.team.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className="mx-4 lg:mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col justify-center py-10">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Summer Leaderboard</CardTitle>
					<CardDescription>
						Track and compare performance metrics for all participants
					</CardDescription>
					{/* <div className="relative mt-4">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search by name or team..."
							className="w-full pl-8"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div> */}
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">Position</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Team</TableHead>
								<TableHead className="items-end flex flex-col justify-center">
									Score
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredData.map((entry) => (
								<TableRow key={entry.id}>
									<TableCell className="font-bold">{entry.position}</TableCell>
									<TableCell>{entry.name}</TableCell>
									<TableCell>{entry.team}</TableCell>
									<TableCell className="text-right">
										{entry.score.toLocaleString()}
									</TableCell>
								</TableRow>
							))}
							{filteredData.length === 0 && (
								<TableRow>
									<TableCell
										colSpan={4}
										className="text-center py-6 text-muted-foreground"
									>
										No results found. Try a different search term.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
