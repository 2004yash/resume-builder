"use client";

import { useState, useRef } from "react"; // Add useRef import
import { motion } from "framer-motion";
import { ResumeForm } from "@/components/resume/resume-form";
import { ResumePreview } from "@/components/resume/resume-preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    summary: "Innovative Senior Software Engineer with 8+ years of experience in full-stack development, specializing in building scalable web applications and leading development teams. Proven track record of delivering high-impact projects in fintech and e-commerce sectors.",
  },
  education: [
    {
      school: "Stanford University",
      degree: "Master of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2014-09",
      endDate: "2016-06",
      description: "Specialized in Machine Learning and Distributed Systems. Teaching Assistant for Advanced Algorithms course.",
    },
    {
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science and Engineering",
      startDate: "2010-09",
      endDate: "2014-05",
      description: "Dean's List all semesters. Led the Software Engineering Club. Completed honors thesis on distributed systems.",
    },
  ],
  experience: [
    {
      company: "TechCorp Solutions",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2020-03",
      endDate: "2024-03",
      description: "Led a team of 6 engineers in developing a cloud-based financial platform serving 100K+ users. Implemented microservices architecture that improved system reliability by 40%. Mentored junior developers and established best practices for code review.",
    },
    {
      company: "InnovateTech",
      position: "Software Engineer",
      location: "San Jose, CA",
      startDate: "2016-07",
      endDate: "2020-02",
      description: "Developed and maintained core features for an e-commerce platform processing $50M+ in annual transactions. Reduced page load time by 60% through optimization. Collaborated with product team to implement new features.",
    },
    {
      company: "StartupX",
      position: "Software Engineering Intern",
      location: "Palo Alto, CA",
      startDate: "2015-06",
      endDate: "2015-08",
      description: "Developed full-stack features for a social media analytics platform. Created data visualization components using D3.js. Participated in agile development process.",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
    "System Design",
    "Team Leadership",
    "Agile Methodologies"
  ],
};

export default function ResumePage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const resumeRef = useRef<HTMLDivElement>(null); // Add reference for the resume content

  const handleFormSubmit = async (data: ResumeData) => {
    setResumeData(data);
  };

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      
      if (!resumeRef.current) {
        throw new Error("Resume content not found");
      }
      
      // Switch to preview tab to ensure we're capturing the rendered resume
      const previewTab = document.querySelector('[data-state="inactive"][value="preview"]');
      if (previewTab instanceof HTMLElement) {
        previewTab.click();
      }
      
      // Small delay to ensure the tab has switched and content is rendered
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const resumeElement = resumeRef.current;
      const canvas = await html2canvas(resumeElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate dimensions to fit the content properly
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      
      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      
      // If content extends beyond a single page, add more pages
      const pdfHeight = pdf.internal.pageSize.getHeight();
      if (imgHeight > pdfHeight) {
        let heightLeft = imgHeight;
        
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
      }
      
      // Save the PDF
      pdf.save(`${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
      
      toast({
        title: "Download Complete",
        description: "Your resume has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading your resume.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <Button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-2"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileDown className="h-4 w-4" />
            )}
            Download Resume
          </Button>
        </div>

        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <ResumeForm
              initialData={resumeData}
              onSubmit={handleFormSubmit}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
            />
          </TabsContent>
          <TabsContent value="preview">
            <div ref={resumeRef}>
              <ResumePreview data={resumeData} />
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </main>
  );
}