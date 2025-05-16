// Ensure you have these shadcn/ui components and lucide-react installed:
// npx shadcn-ui@latest add tabs table avatar badge card button
// npm install lucide-react

"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Adjust path as per your project
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"; // Adjust path
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Adjust path
import { Badge } from "@/components/ui/badge"; // Adjust path
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Adjust path
import { Button } from "@/components/ui/button"; // Adjust path
import { Crown, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { PiCrownSimpleFill } from "react-icons/pi";

// --- INTERFACES ---
interface User {
	id: string;
	name: string;
	username?: string;
	avatarUrl?: string;
	[key: string]: any; // For additional dynamic fields
}

interface LeaderboardEntry extends User {
	rank: number;
	score: number | string;
	previousRank?: number; // For showing rank changes
	totalTime?: string;
	followers?: number;
	reward?: string | number;
}

type TimePeriod = "daily" | "weekly" | "monthly" | "allTime";

interface LeaderboardData {
	daily: LeaderboardEntry[];
	weekly: LeaderboardEntry[];
	monthly: LeaderboardEntry[];
	allTime: LeaderboardEntry[];
}

interface ColumnConfig {
	key: keyof LeaderboardEntry | string; // Allow string for custom/derived fields
	header: string;
	render?: (entry: LeaderboardEntry) => React.ReactNode;
	className?: string;
}

interface LeaderboardProps {
	data: LeaderboardData;
	title?: string;
	defaultPeriod?: TimePeriod;
	columnsConfig?: ColumnConfig[];
	onUserClick?: (user: LeaderboardEntry) => void;
	currentUserHighlight?: string; // id of the current user to highlight
	theme?: "light" | "dark" | "system"; // For potential future theming beyond Tailwind's dark mode
}

// --- DEFAULT CONFIGURATIONS ---
const DEFAULT_COLUMNS: ColumnConfig[] = [
	{ key: "rank", header: "Rank", className: "w-16 text-center" },
	{
		key: "name",
		header: "Name",
		render: (entry) => (
			<div className="flex items-center space-x-3">
				<Avatar className="h-10 w-10 border-2 border-transparent group-hover:border-primary transition-all">
					<AvatarImage
						src={
							entry.avatarUrl ||
							`https://placehold.co/64x64/E0E0E0/B0B0B0?text=${entry.name.charAt(0)}`
						}
						alt={entry.name}
					/>
					<AvatarFallback>{entry.name.charAt(0).toUpperCase()}</AvatarFallback>
				</Avatar>
				<div>
					<div className="font-medium">{entry.name}</div>
					{entry.username && (
						<div className="text-xs text-muted-foreground">
							@{entry.username}
						</div>
					)}
				</div>
			</div>
		),
		className: "min-w-[200px]",
	},
	{ key: "score", header: "Score", className: "text-right font-semibold" },
];

// --- HELPER COMPONENTS ---

const RankChangeIndicator: React.FC<{
	currentRank: number;
	previousRank?: number;
}> = ({ currentRank, previousRank }) => {
	if (previousRank === undefined || previousRank === currentRank) {
		return <Minus size={16} className="text-muted-foreground" />;
	}
	if (currentRank < previousRank) {
		return <ArrowUp size={16} className="text-green-500" />;
	}
	return <ArrowDown size={16} className="text-red-500" />;
};

const PodiumItem: React.FC<{
	entry: LeaderboardEntry;
	position: 1 | 2 | 3;
	onUserClick?: (user: LeaderboardEntry) => void;
}> = ({ entry, position, onUserClick }) => {
	const sizeClasses = {
		1: "w-32 h-32 md:w-40 md:h-40",
		2: "w-28 h-28 md:w-32 md:h-32",
		3: "w-28 h-28 md:w-32 md:h-32",
	};
	const crownColor = {
		1: "text-yellow-400",
		2: "text-slate-400",
		3: "text-orange-400",
	};

	return (
		<div
			className={`flex flex-col items-center p-4 rounded-lg shadow-lg transition-all hover:shadow-xl cursor-pointer bg-card relative ${
				position === 1 ? "border-2 border-yellow-400" : "border border-border"
			} ${onUserClick ? "hover:scale-105" : ""}`}
			onClick={() => onUserClick?.(entry)}
		>
			{position === 1 && (
				<PiCrownSimpleFill
					size={32}
					className={`absolute -top-4 -left-4 ${crownColor[1]}`}
				/>
			)}
			<Avatar
				className={`${sizeClasses[position]} mb-3 border-4 ${position === 1 ? "border-yellow-400" : position === 2 ? "border-slate-300" : "border-orange-300"}`}
			>
				<AvatarImage
					src={
						entry.avatarUrl ||
						`https://placehold.co/128x128/E0E0E0/B0B0B0?text=${entry.name.charAt(0)}`
					}
					alt={entry.name}
				/>
				<AvatarFallback className="text-4xl">
					{entry.name.charAt(0).toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<h3 className="text-lg font-semibold text-center truncate w-full">
				{entry.name}
			</h3>
			{entry.username && (
				<p className="text-sm text-muted-foreground">@{entry.username}</p>
			)}
			<p className="text-xl font-bold text-primary mt-1">{entry.score}</p>
			<Badge
				variant={position === 1 ? "default" : "secondary"}
				className={`mt-2 ${position === 1 ? "bg-yellow-400 text-black hover:bg-yellow-500" : ""}`}
			>
				Rank #{entry.rank}
			</Badge>
		</div>
	);
};

// --- MAIN LEADERBOARD COMPONENT ---
const Leaderboard: React.FC<LeaderboardProps> = ({
	data,
	title = "Leaderboard",
	defaultPeriod = "monthly",
	columnsConfig = DEFAULT_COLUMNS,
	onUserClick,
	currentUserHighlight,
}) => {
	const [selectedPeriod, setSelectedPeriod] =
		useState<TimePeriod>(defaultPeriod);

	const timePeriods: { value: TimePeriod; label: string }[] = [
		{ value: "daily", label: "Daily" },
		{ value: "weekly", label: "Weekly" },
		{ value: "monthly", label: "Monthly" },
		{ value: "allTime", label: "All Time" },
	];

	const currentData = useMemo(() => {
		return (data[selectedPeriod] || []).sort((a, b) => b.score - a.score);
		// For scores that are strings (like time "16h 18m 53s"), a custom sort is needed.
		// This example assumes score is a number for simplicity.
	}, [data, selectedPeriod]);

	const topThree = useMemo(() => currentData.slice(0, 3), [currentData]);
	const restOfLeaderboard = useMemo(() => currentData.slice(3), [currentData]);

	const getPodiumOrder = (entries: LeaderboardEntry[]) => {
		if (entries.length === 0) return [];
		if (entries.length === 1) return [entries[0]];
		if (entries.length === 2) return [entries[1], entries[0]]; // 2nd, 1st
		// Standard podium: 2nd, 1st, 3rd
		return [
			entries.find((e) => e.rank === 2) || entries[1],
			entries.find((e) => e.rank === 1) || entries[0],
			entries.find((e) => e.rank === 3) || entries[2],
		].filter(Boolean) as LeaderboardEntry[];
	};

	const podiumEntries = getPodiumOrder(topThree);

	return (
		<Card className="w-full max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden">
			<CardHeader className="p-6 border-b">
				<div className="flex flex-col sm:flex-row justify-between items-center">
					<CardTitle className="text-2xl font-bold mb-4 sm:mb-0">
						{title}
					</CardTitle>
					<Tabs
						value={selectedPeriod}
						onValueChange={(value) => setSelectedPeriod(value as TimePeriod)}
						className="w-full sm:w-auto"
					>
						<TabsList className="grid w-full content-center grid-cols-2 sm:grid-cols-4 h-auto sm:h-10">
							{timePeriods.map(
								(period) =>
									data[period.value]?.length > 0 && ( // Only show tabs if data exists
										<TabsTrigger
											key={period.value}
											value={period.value}
											className="text-xs sm:text-sm px-2 py-1.5 sm:px-4 sm:py-2"
										>
											{period.label}
										</TabsTrigger>
									),
							)}
						</TabsList>
					</Tabs>
				</div>
			</CardHeader>

			<CardContent className="p-4 md:p-6">
				{/* Podium Section */}
				{topThree.length > 0 && (
					<div className="mb-8 md:mb-12">
						<h2 className="text-xl md:text-2xl font-semibold text-center mb-6 text-gray-700 dark:text-gray-300">
							Top Performers
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 items-end justify-center">
							{/* Second Place (Left or First in 2-col layout) */}
							{podiumEntries.find((p) => p.rank === 2) && (
								<div className="md:mt-8 order-2 sm:order-1 md:order-1">
									<PodiumItem
										entry={podiumEntries.find((p) => p.rank === 2)!}
										position={2}
										onUserClick={onUserClick}
									/>
								</div>
							)}
							{/* First Place (Center or Second in 2-col layout) */}
							{podiumEntries.find((p) => p.rank === 1) && (
								<div className="order-1 sm:order-2 md:order-2">
									<PodiumItem
										entry={podiumEntries.find((p) => p.rank === 1)!}
										position={1}
										onUserClick={onUserClick}
									/>
								</div>
							)}
							{/* Third Place (Right or adapts) */}
							{podiumEntries.find((p) => p.rank === 3) && (
								<div className="md:mt-8 order-3 sm:order-3 md:order-3">
									<PodiumItem
										entry={podiumEntries.find((p) => p.rank === 3)!}
										position={3}
										onUserClick={onUserClick}
									/>
								</div>
							)}
						</div>
						{/* Handle cases with less than 3 top performers for podium */}
						{podiumEntries.length > 0 && podiumEntries.length < 3 && (
							<div className="flex justify-center items-end gap-4 md:gap-6 mt-6">
								{podiumEntries.length === 1 && podiumEntries[0].rank === 1 && (
									<div className="order-1">
										<PodiumItem
											entry={podiumEntries[0]}
											position={1}
											onUserClick={onUserClick}
										/>
									</div>
								)}
								{podiumEntries.length === 2 && ( // Assumes 1st and 2nd
									<>
										{podiumEntries.find((p) => p.rank === 2) && (
											<div className="md:mt-8 order-1">
												<PodiumItem
													entry={podiumEntries.find((p) => p.rank === 2)!}
													position={2}
													onUserClick={onUserClick}
												/>
											</div>
										)}
										{podiumEntries.find((p) => p.rank === 1) && (
											<div className="order-2">
												<PodiumItem
													entry={podiumEntries.find((p) => p.rank === 1)!}
													position={1}
													onUserClick={onUserClick}
												/>
											</div>
										)}
									</>
								)}
							</div>
						)}
					</div>
				)}

				{currentData.length === 0 && (
					<div className="text-center py-12">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="64"
							height="64"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-award mx-auto text-muted-foreground mb-4"
						>
							<circle cx="12" cy="8" r="7" />
							<polyline points="8.21 13.89 7 23 12 17 17 23 15.79 13.88" />
						</svg>
						<p className="text-muted-foreground text-lg">
							No data available for this period.
						</p>
						<p className="text-sm text-muted-foreground">
							Check back later or select a different time period.
						</p>
					</div>
				)}

				{/* Leaderboard Table Section */}
				{restOfLeaderboard.length > 0 && (
					<div>
						<h2 className="text-xl md:text-2xl font-semibold text-center mb-4 md:mb-6 text-gray-700 dark:text-gray-300">
							Full Rankings
						</h2>
						<div className="overflow-x-auto rounded-md border">
							<Table>
								<TableHeader className="bg-muted/20 dark:bg-muted/40">
									<TableRow>
										{columnsConfig.map((col) => (
											<TableHead
												key={col.key as string}
												className={col.className}
											>
												{col.header}
											</TableHead>
										))}
										<TableHead className="text-center w-20">Change</TableHead>
										{/* Rank Change */}
									</TableRow>
								</TableHeader>
								<TableBody>
									{restOfLeaderboard.map((entry) => (
										<TableRow
											key={entry.id}
											className={`group hover:bg-muted/30 dark:hover:bg-muted/50 transition-colors ${onUserClick ? "cursor-pointer" : ""} ${currentUserHighlight === entry.id ? "bg-primary/10 dark:bg-primary/20 ring-2 ring-primary" : ""}`}
											onClick={() => onUserClick?.(entry)}
										>
											{columnsConfig.map((col) => (
												<TableCell
													key={`${entry.id}-${col.key as string}`}
													className={col.className}
												>
													{col.render
														? col.render(entry)
														: (entry[
																col.key as keyof LeaderboardEntry
															] as React.ReactNode) || "-"}
												</TableCell>
											))}
											<TableCell className="text-center">
												<RankChangeIndicator
													currentRank={entry.rank}
													previousRank={entry.previousRank}
												/>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				)}
				{currentData.length > 0 &&
					restOfLeaderboard.length === 0 &&
					topThree.length > 0 && (
						<p className="text-center text-muted-foreground mt-8">
							Only top performers are listed for this period.
						</p>
					)}
			</CardContent>
		</Card>
	);
};

// --- EXAMPLE USAGE (You would place this in a page component) ---
// Make sure to create this component in your project, e.g., `components/leaderboard/LeaderboardPage.tsx`
// And then import it in your Next.js page file.

// Helper function to generate placeholder avatar URLs
const getAvatar = (name: string, seed: string) =>
	`https://api.dicebear.com/7.x/initials/svg?seed=${name}&backgroundColor=00897b,00acc1,039be5,1e88e5,3949ab,43a047,5e35b1,6d4c41,7cb342,8e24aa,c0ca33,d81b60,f4511e,fb8c00&backgroundType=gradientLinear&fontSize=40`;

// Sample Data (More comprehensive)
const SAMPLE_LEADERBOARD_DATA: LeaderboardData = {
	daily: [
		{
			id: "user1",
			name: "Alice Wonderland",
			username: "alice",
			avatarUrl: getAvatar("Alice Wonderland", "user1"),
			rank: 1,
			score: 1500,
			previousRank: 2,
		},
		{
			id: "user2",
			name: "Bob The Builder",
			username: "bob",
			avatarUrl: getAvatar("Bob The Builder", "user2"),
			rank: 2,
			score: 1450,
			previousRank: 1,
			totalTime: "20h 15m",
		},
		{
			id: "user3",
			name: "Charlie Chaplin",
			username: "charlie",
			avatarUrl: getAvatar("Charlie Chaplin", "user3"),
			rank: 3,
			score: 1300,
			previousRank: 5,
			followers: 1200,
		},
		{
			id: "user4",
			name: "Diana Prince",
			username: "diana",
			avatarUrl: getAvatar("Diana Prince", "user4"),
			rank: 4,
			score: 1200,
			previousRank: 3,
		},
		{
			id: "user5",
			name: "Edward Scissorhands",
			username: "edward",
			avatarUrl: getAvatar("Edward Scissorhands", "user5"),
			rank: 5,
			score: 1150,
			previousRank: 4,
			totalTime: "18h 5m",
		},
	],
	weekly: [
		{
			id: "user2",
			name: "Bob The Builder",
			username: "bob",
			avatarUrl: getAvatar("Bob The Builder", "user2"),
			rank: 1,
			score: 7500,
			previousRank: 1,
		},
		{
			id: "user1",
			name: "Alice Wonderland",
			username: "alice",
			avatarUrl: getAvatar("Alice Wonderland", "user1"),
			rank: 2,
			score: 7200,
			previousRank: 3,
			totalTime: "100h",
		},
		{
			id: "user4",
			name: "Diana Prince",
			username: "diana",
			avatarUrl: getAvatar("Diana Prince", "user4"),
			rank: 3,
			score: 6800,
			previousRank: 2,
			followers: 1000,
		},
		{
			id: "user3",
			name: "Charlie Chaplin",
			username: "charlie",
			avatarUrl: getAvatar("Charlie Chaplin", "user3"),
			rank: 4,
			score: 6500,
			previousRank: 6,
		},
		{
			id: "user6",
			name: "Fiona Gallagher",
			username: "fiona",
			avatarUrl: getAvatar("Fiona Gallagher", "user6"),
			rank: 5,
			score: 6200,
			previousRank: 5,
			totalTime: "90h",
		},
		{
			id: "user7",
			name: "George Costanza",
			username: "george",
			avatarUrl: getAvatar("George Costanza", "user7"),
			rank: 6,
			score: 6000,
			previousRank: 7,
			followers: 800,
		},
	],
	monthly: [
		{
			id: "user1",
			name: "Alice Wonderland",
			username: "alice",
			avatarUrl: getAvatar("Alice Wonderland", "user1"),
			rank: 1,
			score: 25000,
			previousRank: 1,
		},
		{
			id: "user2",
			name: "Bob The Builder",
			username: "bob",
			avatarUrl: getAvatar("Bob The Builder", "user2"),
			rank: 2,
			score: 24000,
			previousRank: 2,
			totalTime: "400h",
		},
		{
			id: "user6",
			name: "Fiona Gallagher",
			username: "fiona",
			avatarUrl: getAvatar("Fiona Gallagher", "user6"),
			rank: 3,
			score: 22000,
			previousRank: 5,
			followers: 5000,
		},
		{
			id: "user4",
			name: "Diana Prince",
			username: "diana",
			avatarUrl: getAvatar("Diana Prince", "user4"),
			rank: 4,
			score: 21500,
			previousRank: 3,
		},
		{
			id: "user7",
			name: "George Costanza",
			username: "george",
			avatarUrl: getAvatar("George Costanza", "user7"),
			rank: 5,
			score: 20000,
			previousRank: 8,
			totalTime: "350h",
		},
		{
			id: "user3",
			name: "Charlie Chaplin",
			username: "charlie",
			avatarUrl: getAvatar("Charlie Chaplin", "user3"),
			rank: 6,
			score: 19000,
			previousRank: 4,
			followers: 4500,
		},
		{
			id: "user5",
			name: "Edward Scissorhands",
			username: "edward",
			avatarUrl: getAvatar("Edward Scissorhands", "user5"),
			rank: 7,
			score: 18000,
			previousRank: 7,
		},
		{
			id: "user8",
			name: "Harry Potter",
			username: "harry",
			avatarUrl: getAvatar("Harry Potter", "user8"),
			rank: 8,
			score: 17500,
			previousRank: 10,
			totalTime: "300h",
		},
	],
	allTime: [
		{
			id: "user1",
			name: "Alice Wonderland",
			username: "alice",
			avatarUrl: getAvatar("Alice Wonderland", "user1"),
			rank: 1,
			score: 125000,
		},
		{
			id: "user2",
			name: "Bob The Builder",
			username: "bob",
			avatarUrl: getAvatar("Bob The Builder", "user2"),
			rank: 2,
			score: 124000,
			level: 10,
		},
		{
			id: "user6",
			name: "Fiona Gallagher",
			username: "fiona",
			avatarUrl: getAvatar("Fiona Gallagher", "user6"),
			rank: 3,
			score: 122000,
			level: 9,
		},
		{
			id: "user4",
			name: "Diana Prince",
			username: "diana",
			avatarUrl: getAvatar("Diana Prince", "user4"),
			rank: 4,
			score: 121500,
			level: 9,
		},
		{
			id: "user7",
			name: "George Costanza",
			username: "george",
			avatarUrl: getAvatar("George Costanza", "user7"),
			rank: 5,
			score: 120000,
			level: 8,
		},
	],
};

export default function LeaderboardPage() {
	const handleUserClick = (user: LeaderboardEntry) => {
		console.log("User clicked:", user);
		// Example: navigate to user profile page or show a modal
		// alert(`You clicked on ${user.name}`);
	};

	return (
		<div className="container mx-auto p-4 bg-background text-foreground min-h-screen">
			{/* Leaderboard with default columns */}
			<div className="my-8">
				<h1 className="text-3xl font-bold text-center mb-8">
					Community Champions
				</h1>
				<Leaderboard
					data={SAMPLE_LEADERBOARD_DATA}
					title="Activity Leaderboard"
					onUserClick={handleUserClick}
					// currentUserHighlight="user4" // Example: highlight Diana Prince
				/>
			</div>

			<hr className="my-12 border-dashed" />
		</div>
	);
}

// To use this Leaderboard component:
// 1. Save this code as `Leaderboard.tsx` (or similar) in your components directory.
// 2. Ensure you have the necessary shadcn/ui components (Tabs, Table, Avatar, Badge, Card, Button) installed and correctly pathed.
// 3. Install `lucide-react` for icons: `npm install lucide-react`
// 4. Create a page (e.g., `app/leaderboard-demo/page.tsx`) and import `LeaderboardPage` to see it in action.
//    Example `app/leaderboard-demo/page.tsx`:
//    import LeaderboardPage from '@/components/leaderboard/LeaderboardPage'; // Adjust path
//    export default function DemoPage() {
//      return <LeaderboardPage />;
//    }
