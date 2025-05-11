import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { TrendingUp, Trophy, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="container py-10 space-y-12 mx-auto my-auto">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-6 py-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Summer Leaderboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Track performance, compete, and celebrate success
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/leaderboard">
              View Leaderboard
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href="/about">
              Learn More
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
