import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Contestant {
	id: string;
	name: string;
	points: string;
	avatarUrl: string;
	rank: number;
}

interface LeaderboardPodiumProps {
	contestants: Contestant[];
}

export default function LeaderboardPodium({
	contestants,
}: LeaderboardPodiumProps) {
	// Ensure contestants are ordered by rank
	const sortedContestants = [...contestants].sort((a, b) => a.rank - b.rank);

	// Get contestants by position
	const first = sortedContestants.find((c) => c.rank === 1);
	const second = sortedContestants.find((c) => c.rank === 2);
	const third = sortedContestants.find((c) => c.rank === 3);

	if (!first || !second || !third) {
		return <div>Incomplete podium data</div>;
	}

	return (
		<div className="flex flex-col items-center justify-center py-8 px-4">
			<div className="flex flex-row-reverse items-end justify-center w-full max-w-2xl mx-auto">
				{/* Second Place */}
				<div className="flex-1 flex flex-col items-center relative z-10 mb-2 mx-2">
					<div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-lime-300 bg-white">
						<Avatar className="relative w-full h-full">
							<AvatarImage
								src={second.avatarUrl}
								alt={second.name}
								className="w-full h-full object-cover"
							/>
							<AvatarFallback>{second.name.substring(0, 2)}</AvatarFallback>
						</Avatar>
					</div>
					<div className="rounded-full bg-lime-300 text-black w-6 h-6 flex items-center justify-center text-xs font-bold absolute -bottom-1 -right-1">
						2
					</div>
					<div className="mt-3 text-center">
						<div className="text-sm sm:text-base font-medium text-white truncate max-w-full">
							{second.name}
						</div>
						<div className="text-xs text-lime-300">{second.points}</div>
					</div>
				</div>

				{/* First Place */}
				<div className="flex-1 flex flex-col items-center relative z-20 mx-2">
					<div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-lime-300 bg-white relative">
						<Avatar className="relative w-full h-full">
							<AvatarImage
								src={first.avatarUrl}
								alt={first.name}
								className="w-full h-full object-cover"
							/>
							<AvatarFallback>{first.name.substring(0, 2)}</AvatarFallback>
						</Avatar>

						<div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-3">
							<div className="w-full h-full">
								<svg
									viewBox="0 0 24 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									aria-labelledby="crownTitle"
								>
									<title id="crownTitle">Champion Crown</title>
									<path d="M12 0L24 12H0L12 0Z" fill="#c1ff72" />
								</svg>
							</div>
						</div>
					</div>
					<div className="rounded-full bg-lime-300 text-black w-6 h-6 flex items-center justify-center text-xs font-bold absolute -bottom-1 -right-1">
						1
					</div>
					<div className="mt-3 text-center">
						<div className="text-sm sm:text-base font-medium text-white truncate max-w-full">
							{first.name}
						</div>
						<div className="text-xs text-lime-300">{first.points}</div>
					</div>
				</div>

				{/* Third Place */}
				<div className="flex-1 flex flex-col items-center relative z-10 mb-4 mx-2">
					<div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-lime-300 bg-white">
						<Avatar className="relative w-full h-full">
							<AvatarImage
								src={third.avatarUrl}
								alt={third.name}
								className="w-full h-full object-cover"
							/>
							<AvatarFallback>{third.name.substring(0, 2)}</AvatarFallback>
						</Avatar>
					</div>
					<div className="rounded-full bg-lime-300 text-black w-6 h-6 flex items-center justify-center text-xs font-bold absolute -bottom-1 -right-1">
						3
					</div>
					<div className="mt-3 text-center">
						<div className="text-sm sm:text-base font-medium text-white truncate max-w-full">
							{third.name}
						</div>
						<div className="text-xs text-lime-300">{third.points}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
