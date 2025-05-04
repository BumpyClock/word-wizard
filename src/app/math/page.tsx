"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function MathPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Math Learning Games</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Build strong math foundations with our interactive math games and activities.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="mb-8 border-2 border-dashed">
          <CardHeader>
            <CardTitle>Coming Soon!</CardTitle>
            <CardDescription>
              We&apos;re working on exciting math games for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-12 flex flex-col items-center justify-center gap-4">
              <div className="flex gap-4 items-center justify-center text-6xl">
                <span>➕</span>
                <span>➖</span>
                <span>✖️</span>
                <span>➗</span>
              </div>
              <p className="text-center max-w-md mt-4">
                Our team is currently developing fun and engaging math games to help children learn 
                counting, addition, subtraction, multiplication, and more!
              </p>
              <span>
                Math challenges for all ages. Practice arithmetic, logic, and problem-solving. Don&apos;t just solve—master math!
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
          <p>Check back soon for new math games and activities!</p>
        </div>
      </div>
    </div>
  );
}