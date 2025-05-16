"use client";
import { ChartArea } from "@/components/charts/chart-area";
import { ChartBarMixed } from "@/components/charts/chart-bar-mixed";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import { getAzOrdinal } from "@/utils/azOrdinal";
import { useUser } from "@clerk/nextjs";
import {
	BarChart3,
	LineChart,
	LucideLoader,
	Minus,
	TrendingUp,
	TrendingDown,
	Users,
	Trophy,
	Plus,
} from "lucide-react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useSessionContext } from "@/components/session-context";
import { Button } from "@/components/ui/button";
import type { Sale } from "@/types/sales";
/* import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers"; */

export default function Dashboard() {
	const { session, isLoading } = useSessionContext();

	/* 	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/sign-in");
	} */
	// const { user, isLoaded } = useUser();

	// map top-3 ranks to “medal” colors
	const rankColorMap: Record<number, string> = {
		1: "text-yellow-400 ", // gold
		2: "text-gray-400 ", // silver
		3: "text-orange-300 ", // bronze
	};

	const currentRank = 3;
	const teamRank = 1;

	const chartData = [
		{ agent: "Alice", sales: 1 },
		{ agent: "Carol", sales: 12 },
		{ agent: "David", sales: 4 },
		{ agent: "Evelyn", sales: 16 },
		{ agent: "Frank", sales: 3 },
		{ agent: "Grace", sales: 10 },
		{ agent: "Helen", sales: 20 },
		{ agent: "Ian", sales: 11 },
	].sort((a, b) => b.sales - a.sales);

	const chartConfig = {
		sales: { label: "Satış", color: "var(--chart-1)" },
	} satisfies ChartConfig;

	// generate 30 days of fake performance data for Evelyn
	const perfData = Array.from({ length: 30 }).map((_, i) => {
		const d = new Date();
		d.setDate(d.getDate() - (29 - i));
		return {
			date: d.toISOString().slice(0, 10),
			value: Math.floor(Math.random() * 21) + 1,
		};
	});

	const today = perfData[perfData.length - 1];
	const yesterday = perfData[perfData.length - 2];
	const delta = today.value - yesterday.value;
	const TrendIcon = delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus;
	const trendColor =
		delta > 0
			? "text-green-500"
			: delta < 0
				? "text-red-500"
				: "text-muted-foreground";

	const perfConfig = {
		value: { label: "Satış", color: "var(--chart-2)" },
	} satisfies ChartConfig;

	// Mock sales data
	const recentSales: Sale[] = [
		{
			id: "1",
			clientName: "Əhməd Məmmədov",
			destination: "İstanbul",
			amount: 1200,
			date: "2024-05-15",
			status: "confirmed",
		},
		{
			id: "2",
			clientName: "Leyla Əliyeva",
			destination: "Dubai",
			amount: 2500,
			date: "2024-05-14",
			status: "pending",
		},
		{
			id: "3",
			clientName: "Kamal Həsənov",
			destination: "Antalya",
			amount: 800,
			date: "2024-05-13",
			status: "cancelled",
		},
		{
			id: "4",
			clientName: "Fatimə Quliyeva",
			destination: "Paris",
			amount: 1800,
			date: "2024-05-12",
			status: "confirmed",
		},
		{
			id: "5",
			clientName: "Orxan Əzizov",
			destination: "London",
			amount: 2200,
			date: "2024-05-11",
			status: "confirmed",
		},
	];

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full my-auto">
				<LucideLoader className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	return (
		<div className="mx-4 lg:mx-auto max-w-7xl sm:px-6 my-auto lg:px-8 flex flex-col justify-center py-10">
			<div className="flex justify-center items-center mb-6">
				<h1 className="text-3xl font-bold">
					Xoş gəlmisiniz, {session?.user.name || "İstifadəçi"}
				</h1>
				{/* add button for adding new sales */}
				<Button className="ml-auto cursor-pointer">
					<Plus className="h-4 w-4 mr-2" />
					Rezervasiya Əlavə Et
				</Button>
			</div>

			<div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Ümumi Satış</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">1,842</div>
						<p className="text-xs text-muted-foreground">
							keçən həftəyə nisbətən +12%
						</p>
					</CardContent>
				</Card>

				<Card id="current-rank">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">Cari Reytinq</CardTitle>
					</CardHeader>
					<CardContent>
						<div
							className={`text-2xl font-bold flex items-center gap-1 glow ${
								rankColorMap[currentRank] ?? ""
							}`}
						>
							{currentRank <= 3 && (
								<Trophy className={`h-5 w-5 ${rankColorMap[currentRank]}`} />
							)}
							{getAzOrdinal(currentRank)}
						</div>
						<p className="text-xs text-muted-foreground">
							keçən həftəyə nisbətən +2 mövqe
						</p>
						{/* <div className="text-2xl font-bold">3-cü</div>
						<p className="text-xs text-muted-foreground">
							keçən həftəyə nisbətən +2 mövqe
						</p> */}
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Komanda Üzrə Reytinq
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div
							className={`text-2xl font-bold flex items-center gap-1 glow ${
								rankColorMap[teamRank] ?? ""
							}`}
						>
							{teamRank <= 3 && (
								<Trophy className={`h-5 w-5 ${rankColorMap[teamRank]}`} />
							)}
							{getAzOrdinal(teamRank)}
						</div>
						<p className="text-xs text-muted-foreground">
							Keçən həftə ilə eyni
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 md:grid-cols-2 mt-6">
				<ChartArea
					data={perfData}
					xKey="date"
					yKey="value"
					smoothing={false}
					config={perfConfig}
					title="Performans Trendi"
					description="Son 30 gündəki performansınız"
					footerLeft={
						<>
							<Users className="h-4 w-4 text-muted-foreground" />
							<span className="text-sm font-medium">Evelyn</span>
							<TrendIcon className={`h-4 w-4 ${trendColor}`} />
						</>
					}
					footerRight={`Bu gün: ${today.value} (${
						delta > 0
							? `dünənə nisbətən +${delta} satış`
							: delta < 0
								? `dünənə nisbətən -${Math.abs(delta)} satış`
								: "dünən ilə eyni"
					})`}
				/>

				<ChartBarMixed
					data={chartData}
					xKey="sales"
					yKey="agent"
					config={chartConfig}
					title="Komanda Müqayisəsi"
					description="Komandanızla müqayisəniz"
					footerLeft={
						<>
							<Trophy className="h-4 w-4 text-yellow-400" />
							Ən çox satan: {chartData[0].agent} ({chartData[0].sales} satış){" "}
							<TrendingUp className="h-4 w-4 text-green-500" />
						</>
					}
					footerRight="Hər agent üzrə ümumi satışların müqayisəsi"
					barColor="var(--color-sales)"
				/>
			</div>

			{/* Recent Sales Section */}
			<div className="mt-6">
				<Card>
					<CardHeader>
						<CardTitle>Son Satışlar</CardTitle>
						<CardDescription>Son əlavə edilən rezervasiyalar</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Rezervasiya №</TableHead>
									<TableHead>Tarix</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{recentSales.map((sale) => (
									<TableRow key={sale.id}>
										<TableCell className="font-medium">
											№ {sale.id.padStart(6, "0")}
										</TableCell>
										<TableCell>
											{new Date(sale.date).toLocaleDateString("az-AZ")}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
