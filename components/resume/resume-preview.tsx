"use client";

import { motion } from "framer-motion";
import { ResumeData, Skill } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface ResumePreviewProps {
  data: ResumeData;
}

export function ResumePreview({ data }: ResumePreviewProps) {
  // Ensure skills is an array of strings using a proper type guard
  const skills = Array.isArray(data.skills) 
    ? data.skills.map(skill => {
        // Check if the skill is an object with a name property (Skill interface)
        if (typeof skill === 'object' && skill !== null && 'name' in skill) {
          return (skill as Skill).name;
        }
        // If it's already a string, just return it
        return skill as string;
      })
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">{data.personalInfo.fullName}</h1>
          <div className="mt-2 text-muted-foreground">
            <p>{data.personalInfo.email} • {data.personalInfo.phone}</p>
            <p>{data.personalInfo.location}</p>
          </div>
        </div>

        {data.personalInfo.summary && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
            <p className="text-muted-foreground">{data.personalInfo.summary}</p>
          </div>
        )}

        {data.experience.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{exp.position}</h3>
                      <p className="text-muted-foreground">{exp.company} • {exp.location}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </p>
                  </div>
                  <p className="mt-2 text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{edu.school}</h3>
                      <p className="text-muted-foreground">
                        {edu.degree} in {edu.fieldOfStudy}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                  {edu.description && (
                    <p className="mt-2 text-muted-foreground">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}