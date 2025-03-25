import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, PenLine } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            AI-Powered Resume Builder
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional resumes and cover letters in minutes using advanced AI. 
            Stand out from the crowd with perfectly tailored documents for your dream job.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <FileText className="h-12 w-12 text-primary" />
              <h2 className="text-2xl font-semibold">Resume Builder</h2>
              <p className="text-muted-foreground">
                Create a professional resume with our AI-powered builder. 
                Choose from multiple templates and get expert suggestions.
              </p>
              <Link href="/resume">
                <Button size="lg">
                  Create Resume
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <PenLine className="h-12 w-12 text-primary" />
              <h2 className="text-2xl font-semibold">Cover Letter Generator</h2>
              <p className="text-muted-foreground">
                Generate a compelling cover letter that matches your resume. 
                Customize it for specific job applications.
              </p>
              <Link href="/cover-letter">
                <Button size="lg">
                  Write Cover Letter
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Why Choose Our AI Resume Builder?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-medium mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">
                Advanced AI technology to create perfectly tailored documents
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Professional Templates</h3>
              <p className="text-muted-foreground">
                Multiple modern templates to choose from
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Easy Export</h3>
              <p className="text-muted-foreground">
                Download your documents in PDF or DOCX format
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}