export interface Lawyer {
  id: number;
  name: string;
  practiceAreas: string[];
  location: string;
  phone: string;
  email: string;
  college: string;
  about: string;
  rating: number;
  reviews: number;
}

export interface PracticeArea {
  id: string;
  name: string;
  description: string;
  icon: string;
}