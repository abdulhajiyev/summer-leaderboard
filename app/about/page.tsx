import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
	return (
		<div className="mx-4 lg:mx-auto max-w-7xl sm:px-6 my-auto lg:px-8 flex flex-col justify-center py-10">
			<Card className="max-w-4xl mx-auto">
				<CardHeader className="text-center">
					<CardTitle className="text-3xl font-bold">
						About Summer Leaderboard
					</CardTitle>
					<CardDescription className="text-lg">
						Empowering teams to achieve greatness
					</CardDescription>
				</CardHeader>
				<CardContent className="prose prose-gray dark:prose-invert max-w-none">
					<p>
						Summer Leaderboard is a powerful tool designed to track and
						visualize performance metrics across teams and individuals. Our
						platform provides real-time updates, comprehensive analytics, and
						intuitive visualization tools to help organizations foster healthy
						competition and celebrate success.
					</p>

					<h3>Our Mission</h3>
					<p>
						We believe in the power of transparency and recognition to drive
						performance. Our mission is to provide a simple yet powerful
						platform that makes tracking achievements fun and motivating for
						everyone involved.
					</p>

					<h3>Key Features</h3>
					<ul>
						<li>Real-time performance tracking</li>
						<li>Individual and team leaderboards</li>
						<li>Customizable metrics and goals</li>
						<li>Data visualization and reporting</li>
						<li>Integration with popular productivity tools</li>
					</ul>

					<h3>Get Started Today</h3>
					<p>
						Join organizations worldwide that use Summer Leaderboard to boost
						engagement, increase productivity, and celebrate achievements. Sign
						up today to transform how your team tracks and celebrates success.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
