import { Lawyer } from '../types/lawyer';

export const lawyers: Lawyer[] = [];

// Function to add a new lawyer
export const addLawyer = (lawyer: Omit<Lawyer, 'id'>): Lawyer => {
  const newId = Math.max(0, ...lawyers.map(l => l.id)) + 1;
  const newLawyer = { ...lawyer, id: newId };
  lawyers.push(newLawyer);
  return newLawyer;
};

// Function to update a lawyer
export const updateLawyer = (id: number, updates: Partial<Lawyer>): Lawyer | null => {
  const index = lawyers.findIndex(l => l.id === id);
  if (index === -1) return null;
  
  lawyers[index] = { ...lawyers[index], ...updates };
  return lawyers[index];
};

// Function to delete a lawyer
export const deleteLawyer = (id: number): boolean => {
  const index = lawyers.findIndex(l => l.id === id);
  if (index === -1) return false;
  
  lawyers.splice(index, 1);
  return true;
};

// Function to get lawyers by practice area
export const getLawyersByPracticeArea = (practiceArea: string): Lawyer[] => {
  return lawyers.filter(lawyer => 
    lawyer.practiceAreas.some(area => 
      area.toLowerCase().includes(practiceArea.toLowerCase())
    )
  );
};

// Function to get lawyers by location
export const getLawyersByLocation = (location: string): Lawyer[] => {
  return lawyers.filter(lawyer => 
    lawyer.location.toLowerCase().includes(location.toLowerCase())
  );
};