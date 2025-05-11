"use client";

import React from "react";
import { BarChart3, ChartBar as ChartBarIcon } from "lucide-react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

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

export interface ChartBarMixedProps<T> {
	data: T[];
	// dataKey for numeric axis (e.g. "sales")
	xKey: keyof T;
	// dataKey for category axis (e.g. "team")
	yKey: keyof T;
	config: ChartConfig;
	title: string;
	description?: string;
	// optional header icon
	icon?: React.ReactNode;
	// optional footer left content (e.g. top seller info)
	footerLeft?: React.ReactNode;
	// optional footer right content (e.g. subtitle)
	footerRight?: React.ReactNode;
	// override bar fill color
	barColor?: string;
}

export function ChartBarMixed<T extends Record<string, any>>({
	data,
	xKey,
	yKey,
	config,
	title,
	description,
	icon = <ChartBarIcon className="h-4 w-4 text-muted-foreground" />,
	footerLeft,
	footerRight,
	barColor = "var(--color-sales)",
}: ChartBarMixedProps<T>) {
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
					<BarChart
						accessibilityLayer
						data={data}
						layout="vertical"
						margin={{ left: 0 }}
					>
						<XAxis type="number" dataKey={String(xKey)} hide />
						<YAxis
							dataKey={String(yKey)}
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							hide
						/>
						<ChartTooltip
							cursor={true}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Bar dataKey={String(xKey)} fill={barColor} radius={5}>
							<LabelList
								dataKey={String(yKey)}
								position="insideLeft"
								offset={8}
								className="fill-foreground font-medium"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
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