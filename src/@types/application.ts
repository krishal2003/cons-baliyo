export type IApplicationProfileAbout = {
  bio: string;
  name: string;
  country: string;
  city: string;
  phoneNumber: string;
  email: string;
  role: string;
  course: string;
  company: string;
  school: string;
  
};

export type IApplicationProfileCover = {
  name: string;
  cover: string;
};

export type IApplicationAcademics = {
  map(arg0: () => JSX.Element): import("react").ReactNode;
  see_gpa: string;
  eleven_gpa: string;
  twelve_gpa: string;
  english_score: string;
  english_test: string;
};
