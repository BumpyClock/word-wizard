"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LanguagePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Language Learning Games</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Develop vocabulary, spelling, and reading skills with our interactive language games.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Word Wizard</CardTitle>
            <CardDescription>Spelling Practice Game</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="h-40 rounded-md flex items-center justify-center mb-4" style={{ 
              background: 'var(--color-scheme-correct, #4ade80)', 
              opacity: 0.2 
            }}>
              <span className="text-4xl">🔤</span>
            </div>
            <p>
              Practice spelling with our interactive word game. Type the words correctly to advance!
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/language/word-wizard">
                Play Now
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Placeholder for future games */}
        <Card className="flex flex-col h-full opacity-70">
          <CardHeader>
            <CardTitle>Vocabulary Builder</CardTitle>
            <CardDescription>Coming Soon</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="h-40 rounded-md flex items-center justify-center mb-4" style={{ 
              background: 'var(--color-scheme-neutral, #e5e7eb)', 
              opacity: 0.3 
            }}>
              <span className="text-4xl">📚</span>
            </div>
            <p>
              Expand your vocabulary with fun interactive exercises and games. Coming soon!
            </p>
          </CardContent>
          <CardFooter>
            <Button disabled className="w-full">
              Coming Soon
            </Button>
          </CardFooter>
        </Card>

        {/* Placeholder for future games */}
        <Card className="flex flex-col h-full opacity-70">
          <CardHeader>
            <CardTitle>Reading Adventure</CardTitle>
            <CardDescription>Coming Soon</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="h-40 rounded-md flex items-center justify-center mb-4" style={{ 
              background: 'var(--color-scheme-neutral, #e5e7eb)', 
              opacity: 0.3 
            }}>
              <span className="text-4xl">📖</span>
            </div>
            <p>
              Embark on reading adventures with interactive stories and comprehension activities. Coming soon!
            </p>
          </CardContent>
          <CardFooter>
            <Button disabled className="w-full">
              Coming Soon
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}