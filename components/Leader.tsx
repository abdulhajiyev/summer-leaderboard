"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, Crown, Trophy, Medal } from "lucide-react";
import Link from "next/link";

interface Player {
	id: number;
	name: string;
	points: number;
	avatar: string;
	isCurrentUser?: boolean;
}

export default function Leader() {
	const [players] = useState<Player[]>([
		{
			id: 1,
			name: "Bryan Wolf",
			points: 43,
			avatar: "/placeholder.svg?height=100&width=100",
		},
		{
			id: 2,
			name: "Meghan Jes...",
			points: 40,
			avatar: "/placeholder.svg?height=100&width=100",
		},
		{
			id: 3,
			name: "Alex Turner",
			points: 38,
			avatar: "/placeholder.svg?height=100&width=100",
		},
		{
			id: 4,
			name: "Marsha Fisher",
			points: 36,
			avatar: "/placeholder.svg?height=100&width=100",
		},
		{
			id: 5,
			name: "Juanita Cormier",
			points: 35,
			avatar: "/placeholder.svg?height=100&width=100",
		},
		{
			id: 6,
			name: "You",
			points: 34,
			avatar: "/placeholder.svg?height=100&width=100",
			isCurrentUser: true,
		},
		{
			id: 7,
			name: "Tamara Schmidt",
			points: 33,
			avatar: "/placeholder.svg?height=100&width=100",
		},
		{
			id: 8,
			name: "Ricardo Veum",
			points: 32,
			avatar: "/placeholder.svg?height=100&width=100",
		},
		{
			id: 9,
			name: "Gary Sanford",
			points: 31,
			avatar: "/placeholder.svg?height=100&width=100",
		},
		{
			id: 10,
			name: "Becky Bartell",
			points: 30,
			avatar: "/placeholder.svg?height=100&width=100",
		},
	]);

	// Get top 3 players - already sorted by ID in this example
	const topThreePlayers = players.slice(0, 3);

	// Get remaining players
	const remainingPlayers = players.slice(3);

	return (
		<div className="flex flex-col w-full max-w-full mx-auto min-h-screen">


			<div className="md:max-w-6xl md:mx-auto md:w-full md:px-8 md:py-8">
				{/* Background Elements - Only visible on desktop */}
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-5 pointer-events-none hidden md:block">
					<div className="absolute top-20 left-10 transform rotate-12">
						<Trophy className="h-64 w-64" />
					</div>
					<div className="absolute bottom-20 right-10 transform -rotate-12">
						<Medal className="h-64 w-64" />
					</div>
				</div>

				{/* Top 3 Players - Different layouts for mobile and desktop */}
				<div className="flex justify-center items-end py-6 px-4 relative md:py-12 md:rounded-xl md:mb-8">
					{/* 2nd Place */}
					<div className="flex flex-col items-center mr-4 mb-2 md:mr-16 md:mb-12">
						<div className="relative">
							<Avatar className="border-2 border-lime-300 h-16 w-16 md:h-24 md:w-24">
								<AvatarImage
									src={topThreePlayers[1]?.avatar || "/placeholder.svg"}
									alt={topThreePlayers[1]?.name}
								/>
								<AvatarFallback>
									{topThreePlayers[1]?.name.substring(0, 2)}
								</AvatarFallback>
							</Avatar>
							<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-lime-300 rounded-full flex items-center justify-center font-bold w-6 h-6 text-sm md:w-8 md:h-8 md:text-base">
								2
							</div>
						</div>
						<p className="mt-4 font-semibold text-sm md:text-base">
							{topThreePlayers[1]?.name}
						</p>
						<p className="text-gray-600 text-xs md:text-sm">
							<span className="text-yellow-500">★</span>{" "}
							{topThreePlayers[1]?.points} pts
						</p>

						
					</div>

					{/* 1st Place */}
					<div className="flex flex-col items-center z-10 md:mb-4">
						<div className="relative">
							<div className="absolute -top-6 left-1/2 transform -translate-x-1/2 md:scale-150 md:-mt-4">
								<Crown className="text-lime-400 fill-lime-400 h-8 w-8 md:h-12 md:w-12" />
							</div>
							<Avatar className="border-2 border-lime-400 h-20 w-20 md:h-36 md:w-36">
								<AvatarImage
									src={topThreePlayers[0]?.avatar || "/placeholder.svg"}
									alt={topThreePlayers[0]?.name}
								/>
								<AvatarFallback>
									{topThreePlayers[0]?.name.substring(0, 2)}
								</AvatarFallback>
							</Avatar>
							<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-lime-400 rounded-full flex items-center justify-center font-bold w-6 h-6 text-sm md:w-10 md:h-10 md:text-lg">
								1
							</div>
						</div>
						<p className="mt-4 font-semibold text-sm md:text-xl">
							{topThreePlayers[0]?.name}
						</p>
						<p className="text-gray-600 text-xs md:text-base">
							<span className="text-yellow-500">★</span>{" "}
							{topThreePlayers[0]?.points} pts
						</p>

					</div>

					{/* 3rd Place */}
					<div className="flex flex-col items-center ml-4 mb-2 md:ml-16 md:mb-12">
						<div className="relative">
							<Avatar className="border-2 border-lime-300 h-16 w-16 md:h-24 md:w-24">
								<AvatarImage
									src={topThreePlayers[2]?.avatar || "/placeholder.svg"}
									alt={topThreePlayers[2]?.name}
								/>
								<AvatarFallback>
									{topThreePlayers[2]?.name.substring(0, 2)}
								</AvatarFallback>
							</Avatar>
							<div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-lime-300 rounded-full flex items-center justify-center font-bold w-6 h-6 text-sm md:w-8 md:h-8 md:text-base">
								3
							</div>
						</div>
						<p className="mt-4 font-semibold text-sm md:text-base">
							{topThreePlayers[2]?.name}
						</p>
						<p className="text-gray-600 text-xs md:text-sm">
							<span className="text-yellow-500">★</span>{" "}
							{topThreePlayers[2]?.points} pts
						</p>

						
					</div>
				</div>

				{/* Remaining Players List */}
				<div className="flex-1 px-4 pb-4 md:bg-white md:rounded-xl md:p-6">
					{/* Rankings title - only on desktop */}
					<h2 className="hidden md:block text-xl font-semibold mb-4 text-gray-700">
						Rankings
					</h2>

					{remainingPlayers.map((player, index) => (
						<div
							key={player.id}
							className={`
                flex items-center p-3 mb-2 rounded-lg 
                ${
									player.isCurrentUser
										? "bg-lime-200 hover:bg-lime-300"
										: "bg-white hover:bg-gray-50 md:bg-gray-50 md:hover:bg-gray-100"
								}
                transition-colors duration-200
              `}
						>
							<div className="w-6 text-center font-medium text-gray-500 md:w-10 md:h-10 md:rounded-full md:flex md:items-center md:justify-center">
								{index + 4}
							</div>
							<Avatar className="mx-3 h-10 w-10 md:h-12 md:w-12">
								<AvatarImage
									src={player.avatar || "/placeholder.svg"}
									alt={player.name}
								/>
								<AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
							</Avatar>
							<p className="flex-1 font-medium md:text-lg">{player.name}</p>
							<div className="text-gray-700 md:bg-gray-100 md:px-4 md:py-2 md:rounded-full">
								{player.points} pts
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
