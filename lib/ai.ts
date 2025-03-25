import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyAJvmOPZypyGjbePWLwOc23KiSPJoVjGrU");

export async function generateResumeSummary(experience: string, skills: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const prompt = `Create a professional resume summary based on the following experience and skills. 
  Keep it concise (2-3 sentences) and impactful:
  
  Experience: ${experience}
  Skills: ${skills}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function generateSkillSuggestions(experience: string, currentSkills: string[]): Promise<string[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  const prompt = `Based on the following experience, suggest 5 relevant technical or soft skills that are not already listed:
  
  Experience: ${experience}
  Current Skills: ${currentSkills.join(", ")}
  
  Return only the skills as a comma-separated list.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().split(",").map(skill => skill.trim());
}