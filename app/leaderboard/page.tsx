"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Crown,
	Trophy,
	Medal,
	TreePalm,
	Plane,
	MapPin,
	Compass,
	SunMedium,
	Umbrella,
	Hotel,
	Briefcase,
	Landmark,
	Ship,
	Globe,
} from "lucide-react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface Player {
	id: number;
	name: string;
	points: number;
	avatar: string;
	team?: string;
	isCurrentUser?: boolean;
}

export default function Page() {
	const [players] = useState<Player[]>([
		{
			id: 1,
			name: "Bryan Wolf",
			points: 43,
			avatar: "https://i.pravatar.cc/350?u=BryanWolf",
			team: "Alpha",
		},
		{
			id: 2,
			name: "Meghan Jessie",
			points: 40,
			avatar: "https://i.pravatar.cc/350?u=MeghanJessie",
			team: "Beta",
		},
		{
			id: 3,
			name: "Alex Turner",
			points: 38,
			avatar: "https://i.pravatar.cc/350?u=AlexTurner",
			team: "Alpha",
		},
		{
			id: 4,
			name: "Marsha Fisher",
			points: 36,
			avatar: "https://i.pravatar.cc/350?u=MarshaFisher",
			team: "Beta",
		},
		{
			id: 5,
			name: "Juanita Cormier",
			points: 35,
			avatar: "https://i.pravatar.cc/350?u=JuanitaCormier",
			team: "Gamma",
		},
		{
			id: 6,
			name: "You",
			points: 34,
			avatar: "https://i.pravatar.cc/350?u=You",
			team: "Alpha",
			isCurrentUser: true,
		},
		{
			id: 7,
			name: "Tamara Schmidt",
			points: 33,
			avatar: "https://i.pravatar.cc/350?u=TamaraSchmidt",
			team: "Beta",
		},
		{
			id: 8,
			name: "Ricardo Veum",
			points: 32,
			avatar: "https://i.pravatar.cc/350?u=RicardoVeum",
			team: "Gamma",
		},
		{
			id: 9,
			name: "Gary Sanford",
			points: 31,
			avatar: "https://i.pravatar.cc/350?u=GarySanford",
			team: "Alpha",
		},
		{
			id: 10,
			name: "Becky Bartell",
			points: 30,
			avatar: "https://i.pravatar.cc/350?u=BeckyBartell",
			team: "Beta",
		},
	]);

	// Get top 3 players - already sorted by ID in this example
	const topThreePlayers = players.slice(0, 3);

	// Get remaining players
	const remainingPlayers = players.slice(3);

	return (
		<div className="flex flex-col w-full max-w-full mx-auto min-h-screen">
			<div className="md:max-w-6xl md:mx-auto md:w-full md:px-8 md:py-8 my-auto">
				{/* Background Elements - Only visible on desktop */}
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden text-blue-500 -z-10 opacity-5 pointer-events-none hidden lg:block mt-40">
					<div className="absolute top-20 left-10 transform rotate-12">
						<Trophy className="h-64 w-64" />
					</div>
					<div className="absolute bottom-20 right-10 transform -rotate-12">
						<Medal className="h-64 w-64" />
					</div>
					<div className="absolute top-40 right-20 transform rotate-6">
						<Plane className="h-48 w-48" />
					</div>
					<div className="absolute bottom-40 left-20 transform -rotate-6">
						<TreePalm className="h-48 w-48" />
					</div>
				</div>

				{/* Top 3 Players - Different layouts for mobile and desktop */}
				<div className="flex justify-center items-end py-10 px-4 relative md:mt-4 md:pt-16">
					{/* 2nd Place */}
					<div className="flex flex-col items-center mr-4 md:mr-16 md:mb-12 mt-6 md:mt-10">
						<div className="relative">
							<Avatar className="border-2 border-gray-300 bg-gray-400 h-20 w-20 md:h-24 md:w-24">
								<AvatarImage
									src={topThreePlayers[1]?.avatar || "/placeholder.svg"}
									alt={topThreePlayers[1]?.name}
								/>
								<AvatarFallback>
									{topThreePlayers[1]?.name.substring(0, 2)}
								</AvatarFallback>
							</Avatar>
							<div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-300 rounded-full flex items-center justify-center font-bold w-7 h-7 text-sm md:w-8 md:h-8 md:text-base">
								2
							</div>
						</div>
						<p className="mt-4 font-semibold text-base md:text-base">
							{topThreePlayers[1]?.name}
						</p>
						<p className="text-gray-600 text-sm md:text-sm">
							<span className="text-yellow-500">★</span>{" "}
							{topThreePlayers[1]?.points} pts
						</p>
						<p className="text-gray-500 text-sm mt-1">
							Team {topThreePlayers[1]?.team}
						</p>
					</div>

					{/* 1st Place */}
					<div className="flex flex-col items-center mb-5 z-10 -mt-10 md:-mt-20 md:mb-14">
						<div className="relative">
							<div className="absolute -top-6 left-1/2 transform -translate-x-1/2 md:scale-150 md:-mt-4">
								<Crown className="text-yellow-300 fill-yellow-300 h-10 w-10 md:h-12 md:w-12" />
							</div>
							<Avatar className="border-2 border-yellow-300 bg-yellow-400 h-24 w-24 md:h-36 md:w-36">
								<AvatarImage
									src={topThreePlayers[0]?.avatar || "/placeholder.svg"}
									alt={topThreePlayers[0]?.name}
								/>
								<AvatarFallback>
									{topThreePlayers[0]?.name.substring(0, 2)}
								</AvatarFallback>
							</Avatar>
							<div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-300 rounded-full flex items-center justify-center font-bold w-8 h-8 text-base md:w-10 md:h-10 md:text-lg">
								1
							</div>
						</div>
						<p className="mt-4 font-semibold text-base md:text-xl">
							{topThreePlayers[0]?.name}
						</p>
						<p className="text-gray-600 text-sm md:text-base">
							<span className="text-yellow-500">★</span>{" "}
							{topThreePlayers[0]?.points} pts
						</p>
						<p className="text-gray-500 text-xs mt-1 md:text-sm">
							Team {topThreePlayers[0]?.team}
						</p>
					</div>

					{/* 3rd Place */}
					<div className="flex flex-col items-center ml-4 md:ml-16 md:mb-12 mt-6 md:mt-10">
						<div className="relative">
							<Avatar className="border-2 border-orange-300 bg-orange-400 h-20 w-20 md:h-24 md:w-24">
								<AvatarImage
									src={topThreePlayers[2]?.avatar || "/placeholder.svg"}
									alt={topThreePlayers[2]?.name}
								/>
								<AvatarFallback>
									{topThreePlayers[2]?.name.substring(0, 2)}
								</AvatarFallback>
							</Avatar>
							<div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-orange-300 rounded-full flex items-center justify-center font-bold w-7 h-7 text-sm md:w-8 md:h-8 md:text-base">
								3
							</div>
						</div>
						<p className="mt-4 font-semibold text-base md:text-base">
							{topThreePlayers[2]?.name}
						</p>
						<p className="text-gray-600 text-sm md:text-sm">
							<span className="text-yellow-500">★</span>{" "}
							{topThreePlayers[2]?.points} pts
						</p>
						<p className="text-gray-500 text-xs mt-1">
							Team {topThreePlayers[2]?.team}
						</p>
					</div>
				</div>

				{/* Remaining Players List */}
				<div className="flex-1 px-4 pb-6 md:bg-card md:rounded-md md:p-6">
					{/* Rankings title - only on desktop */}
					<h2 className="hidden md:block text-xl font-semibold mb-4 text-gray-700">
						Rankings
					</h2>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-16">Rank</TableHead>
								<TableHead>Player</TableHead>
								<TableHead>Team</TableHead>
								<TableHead className="text-right">Points</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{remainingPlayers.map((player, index) => (
								<TableRow
									key={player.id}
									className={
										player.isCurrentUser ? "bg-blue-200 hover:bg-blue-300" : ""
									}
								>
									<TableCell className="font-medium">{index + 4}</TableCell>
									<TableCell>
										<div className="flex items-center gap-3">
											<Avatar className="h-10 w-10 bg-white">
												<AvatarImage
													src={player.avatar || "/placeholder.svg"}
													alt={player.name}
												/>
												<AvatarFallback>
													{player.name.substring(0, 2)}
												</AvatarFallback>
											</Avatar>
											<span className="font-medium">{player.name}</span>
										</div>
									</TableCell>
									<TableCell>{player.team}</TableCell>
									<TableCell className="text-right font-medium">
										{player.points} pts
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
