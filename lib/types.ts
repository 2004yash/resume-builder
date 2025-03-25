export interface Education {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  education: Education[];
  experience: Experience[];
  skills: string[];
}

export interface CoverLetterData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  recipientInfo: {
    name: string;
    company: string;
    position: string;
  };
  content: {
    introduction: string;
    body: string;
    conclusion: string;
  };
}