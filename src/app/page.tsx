"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Learning Games Hub</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Interactive educational games for children to learn language, math, and science while having fun!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Language Learning</CardTitle>
            <CardDescription>
              Develop language and vocabulary skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md flex items-center justify-center mb-4" style={{ 
              background: 'var(--color-scheme-correct, #4ade80)', 
              opacity: 0.2 
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">
              Practice spelling, vocabulary, and reading through fun interactive games!
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/language">
                Explore Language Games
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Math Learning</CardTitle>
            <CardDescription>
              Build strong math foundations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md flex items-center justify-center mb-4" style={{ 
              background: 'var(--color-scheme-neutral, #e5e7eb)', 
              opacity: 0.3 
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 5h-7V3h7v2z"></path>
                <path d="M5 21h7v-2H5v2z"></path>
                <path d="M19 13V5l-7 8v8"></path>
                <path d="M5 3v18"></path>
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">
              Learn numbers, counting, addition, subtraction and more through engaging activities!
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" variant="outline">
              <Link href="/math">
                Explore Math Games
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Science Learning</CardTitle>
            <CardDescription>
              Discover how the world works
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md flex items-center justify-center mb-4" style={{ 
              background: 'var(--color-scheme-neutral, #e5e7eb)', 
              opacity: 0.3 
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2v8.5a2.5 2.5 0 1 1-5 0V2"></path>
                <path d="M7 2v8.5a2.5 2.5 0 1 0 5 0V2"></path>
                <path d="M8.5 2h-2"></path>
                <path d="M7 16a6 6 0 0 0 3.84 10"></path>
                <path d="M17 22a6 6 0 0 0 0-12c-1.61 0-3.09.59-4.16 1.5"></path>
                <path d="M18.6 13.5c-.47-.17-.97-.3-1.5-.3"></path>
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">
              Explore basic scientific concepts through interactive experiments and games!
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" variant="outline">
              <Link href="/science">
                Explore Science Games
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 text-center mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Game</h2>
        <div className="max-w-md mx-auto rounded-lg shadow-lg overflow-hidden">
          <div className="h-48 flex items-center justify-center" style={{ 
            background: 'var(--color-scheme-correct, #4ade80)', 
            opacity: 0.2 
          }}>
            <span className="text-4xl">🔤</span>
          </div>
          <Card className="border-0 shadow-none">
            <CardContent className="py-6">
              <h3 className="text-xl font-bold mb-2">Word Wizard</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Master spelling skills with our interactive word game! Perfect for young learners.
              </p>
              <Button asChild>
                <Link href="/language/word-wizard">
                  Play Word Wizard
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}