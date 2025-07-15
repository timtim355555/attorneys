export interface Lawyer {
  id: number;
  name: string;
  image: string; // Law firm logo URL
  practiceAreas: string[];
  experience: number;
  location: string;
  phone: string;
  email: string;
  rating: number;
  reviews: number;
  education: string;
  bio: string;
  specializations: string[];
  website?: string;
  barNumber?: string;
  languages?: string[];
  hourlyRate?: string;
  availability?: 'Available' | 'Busy' | 'Limited';
  verified?: boolean;
}

export interface PracticeArea {
  id: string;
  name: string;
  description: string;
  icon: string;
}