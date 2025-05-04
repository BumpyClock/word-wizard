"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SciencePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Science Learning Games</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover how the world works with our interactive science games and experiments.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="mb-8 border-2 border-dashed">
          <CardHeader>
            <CardTitle>Coming Soon!</CardTitle>
            <CardDescription>
              We&apos;re working on exciting science games for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-12 flex flex-col items-center justify-center gap-4">
              <div className="flex gap-4 items-center justify-center text-6xl">
                <span>🧪</span>
                <span>🔬</span>
                <span>🌍</span>
                <span>🌱</span>
              </div>
              <p className="text-center max-w-md mt-4">
                Our team is currently developing fun and engaging science games to help children learn 
                about nature, biology, physics, and the world around them!
              </p>
              <span>
                Science quizzes for curious minds. Practice facts, concepts, and critical thinking. Don&apos;t just learn—master science!
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="text-center text-muted-foreground">
          <p>Check back soon for new science games and activities!</p>
        </div>
      </div>
    </div>
  );
}