"use client";

import React from "react";
import { LineChart as LineChartIcon, AreaChartIcon } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export interface ChartAreaProps<T extends Record<string, any>> {
	data: T[];
	// key for the X axis (must be an ISO date string: YYYY-MM-DD)
	xKey: keyof T;
	// key for the Y axis (numeric)
	yKey: keyof T;
	config: ChartConfig;
	title: string;
	description?: string;
	icon?: React.ReactNode;
	// how many days back to show (defaults to 30)
	days?: number;
	// optional footer
	footerLeft?: React.ReactNode;
	footerRight?: React.ReactNode;
	// smoothing (area curve) on/off
	smoothing?: boolean;
}

function getLastNDates(n: number): string[] {
	return Array.from({ length: n }).map((_, i) => {
		const d = new Date();
		d.setDate(d.getDate() - (n - 1 - i));
		return d.toISOString().slice(0, 10);
	});
}

export function ChartArea<T extends Record<string, any>>({
	data,
	xKey,
	yKey,
	config,
	title,
	description,
	icon = <AreaChartIcon className="h-4 w-4 text-muted-foreground" />,
	days = 30,
	footerLeft,
	footerRight,
	smoothing = true,
}: ChartAreaProps<T>) {
	// build a map of incoming data for quick lookup
	const dateMap = React.useMemo(() => {
		const m = new Map<string, T>();
		for (const item of data) {
			m.set(String(item[xKey]), item);
		}
		return m;
	}, [data, xKey]);

	// fill in missing dates with zero
	const chartData = React.useMemo(() => {
		return getLastNDates(days).map((date) => {
			const item = dateMap.get(date);
			return {
				[String(xKey)]: date,
				[String(yKey)]: item ? item[yKey] : 0,
			};
		});
	}, [dateMap, days, xKey, yKey]);

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>{title}</CardTitle>
					{icon}
				</div>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent>
				<ChartContainer config={config}>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{ left: 12, right: 12 }}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey={String(xKey)}
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							// show just the day number
							tickFormatter={(val) =>
								new Date(val as string).getDate().toString()
							}
						/>
						<ChartTooltip
							cursor={true}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Area
							dataKey={String(yKey)}
							type={smoothing ? "linear" : "step"}
							fill={config[String(yKey)].color}
							fillOpacity={0.4}
							stroke={config[String(yKey)].color}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			{(footerLeft || footerRight) && (
				<CardFooter className="flex-col items-start gap-2 text-sm">
					{footerLeft && (
						<div className="flex items-center gap-2 font-medium leading-none">
							{footerLeft}
						</div>
					)}
					{footerRight && (
						<div className="text-muted-foreground">{footerRight}</div>
					)}
				</CardFooter>
			)}
		</Card>
	);
}
