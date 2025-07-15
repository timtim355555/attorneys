import { Lawyer } from '../types/lawyer';

export const lawyers: Lawyer[] = [
  {
    id: 1,
    name: "Michael Rodriguez",
    practiceAreas: ["Corporate Law", "Business Law"],
    location: "New York, NY",
    phone: "(212) 555-0101",
    email: "michael.rodriguez@nylaw.com",
    college: "Columbia Law School, JD",
    about: "Senior partner at Rodriguez & Associates with over 15 years of experience in corporate law and business transactions. Specializes in mergers and acquisitions, corporate governance, and securities law. Has successfully handled over 200 corporate deals worth more than $2 billion. Known for strategic thinking and client-focused approach to complex business matters.",
    rating: 4.9,
    reviews: 127,
    availability: 'Available'
  },
  {
    id: 2,
    name: "Sarah Chen",
    practiceAreas: ["Criminal Defense", "White Collar Crime"],
    location: "Los Angeles, CA",
    phone: "(213) 555-0102",
    email: "sarah.chen@ladefense.com",
    college: "UCLA School of Law, JD",
    about: "Experienced criminal defense attorney with a proven track record of defending clients in complex criminal cases. Former prosecutor with deep understanding of the criminal justice system. Specializes in white-collar crime, DUI defense, and federal criminal matters. Has achieved numerous acquittals and favorable plea agreements for clients facing serious charges.",
    rating: 4.8,
    reviews: 89,
    availability: 'Limited'
  },
  {
    id: 3,
    name: "David Thompson",
    practiceAreas: ["Family Law", "Divorce"],
    location: "Chicago, IL",
    phone: "(312) 555-0103",
    email: "david.thompson@chicagofamily.com",
    college: "Northwestern University School of Law, JD",
    about: "Compassionate family law attorney with 18 years of experience helping families navigate difficult legal situations. Specializes in divorce, child custody, adoption, and domestic relations. Known for his empathetic approach and strong advocacy for clients' rights. Believes in finding amicable solutions while protecting his clients' best interests.",
    rating: 4.7,
    reviews: 156,
    availability: 'Available'
  },
  {
    id: 4,
    name: "Jennifer Martinez",
    practiceAreas: ["Personal Injury", "Medical Malpractice"],
    location: "Houston, TX",
    phone: "(713) 555-0104",
    email: "jennifer.martinez@houstoninjury.com",
    college: "University of Texas School of Law, JD",
    about: "Dedicated personal injury attorney who has recovered over $50 million for injured clients. Specializes in medical malpractice, car accidents, and workplace injuries. Known for her aggressive representation and compassionate client care. Takes on challenging cases and fights tirelessly for maximum compensation for her clients.",
    rating: 4.9,
    reviews: 203,
    availability: 'Busy'
  },
  {
    id: 5,
    name: "Robert Kim",
    practiceAreas: ["Immigration Law", "Citizenship"],
    location: "Seattle, WA",
    phone: "(206) 555-0105",
    email: "robert.kim@seattleimmigration.com",
    college: "University of Washington School of Law, JD",
    about: "Immigration attorney dedicated to helping individuals and families achieve their American dreams. Specializes in family-based immigration, employment visas, and citizenship applications. Fluent in multiple languages and understands the challenges immigrants face. Has successfully handled thousands of immigration cases with high success rates.",
    rating: 4.8,
    reviews: 174,
    availability: 'Available'
  },
  {
    id: 6,
    name: "Amanda Foster",
    practiceAreas: ["Real Estate Law", "Property Law"],
    location: "Miami, FL",
    phone: "(305) 555-0106",
    email: "amanda.foster@miamirealty.com",
    college: "University of Miami School of Law, JD",
    about: "Real estate attorney with extensive experience in residential and commercial property transactions. Specializes in real estate closings, property disputes, and landlord-tenant law. Has facilitated over $500 million in real estate transactions. Known for attention to detail and ensuring smooth, problem-free closings for clients.",
    rating: 4.6,
    reviews: 98,
    availability: 'Limited'
  },
  {
    id: 7,
    name: "James Wilson",
    practiceAreas: ["Tax Law", "IRS Defense"],
    location: "San Francisco, CA",
    phone: "(415) 555-0107",
    email: "james.wilson@sftaxlaw.com",
    college: "Stanford Law School, JD",
    about: "Senior tax attorney with two decades of experience representing clients before the IRS and state tax authorities. Former IRS attorney with insider knowledge of tax procedures. Specializes in tax litigation, audits, and tax planning for high-net-worth individuals. Has resolved complex tax disputes saving clients millions in penalties and interest.",
    rating: 4.9,
    reviews: 145,
    availability: 'Available'
  },
  {
    id: 8,
    name: "Lisa Patel",
    practiceAreas: ["Employment Law", "Workplace Rights"],
    location: "Boston, MA",
    phone: "(617) 555-0108",
    email: "lisa.patel@bostonemployment.com",
    college: "Harvard Law School, JD",
    about: "Employment law attorney passionate about protecting workers' rights. Specializes in workplace discrimination, wrongful termination, and wage disputes. Has successfully represented hundreds of employees in employment-related matters. Known for her thorough preparation and aggressive advocacy in both negotiations and courtroom proceedings.",
    rating: 4.8,
    reviews: 112,
    availability: 'Busy'
  },
  {
    id: 9,
    name: "Christopher Lee",
    practiceAreas: ["Intellectual Property", "Patent Law"],
    location: "Austin, TX",
    phone: "(512) 555-0109",
    email: "christopher.lee@austinip.com",
    college: "University of Texas School of Law, JD",
    about: "Intellectual property attorney with engineering background specializing in patent prosecution and IP litigation. Has helped tech startups and Fortune 500 companies protect their innovations. Expert in software patents, trademarks, and trade secrets. Combines technical expertise with legal knowledge to provide comprehensive IP protection strategies.",
    rating: 4.7,
    reviews: 87,
    availability: 'Available'
  },
  {
    id: 10,
    name: "Michelle Brown",
    practiceAreas: ["Estate Planning", "Probate"],
    location: "Denver, CO",
    phone: "(303) 555-0110",
    email: "michelle.brown@denverestate.com",
    college: "University of Colorado Law School, JD",
    about: "Estate planning attorney helping families protect their legacy and plan for the future. Specializes in wills, trusts, probate administration, and elder law. Known for her thorough approach and ability to explain complex legal concepts clearly. Has helped thousands of families create comprehensive estate plans tailored to their unique needs.",
    rating: 4.6,
    reviews: 134,
    availability: 'Limited'
  },
  {
    id: 11,
    name: "Daniel Garcia",
    practiceAreas: ["Bankruptcy Law", "Debt Relief"],
    location: "Phoenix, AZ",
    phone: "(602) 555-0111",
    email: "daniel.garcia@phoenixbankruptcy.com",
    college: "Arizona State University College of Law, JD",
    about: "Bankruptcy attorney dedicated to helping individuals and businesses get a fresh financial start. Specializes in Chapter 7 and Chapter 13 bankruptcy, debt negotiation, and creditor defense. Has helped over 1,000 clients eliminate debt and rebuild their financial lives. Provides compassionate guidance through difficult financial situations.",
    rating: 4.5,
    reviews: 76,
    availability: 'Available'
  },
  {
    id: 12,
    name: "Rachel Johnson",
    practiceAreas: ["Environmental Law", "Regulatory Compliance"],
    location: "Portland, OR",
    phone: "(503) 555-0112",
    email: "rachel.johnson@portlandenvironmental.com",
    college: "Lewis & Clark Law School, JD",
    about: "Environmental attorney committed to protecting natural resources and ensuring regulatory compliance. Specializes in environmental litigation, permitting, and sustainability consulting. Works with businesses, nonprofits, and government agencies on environmental matters. Has extensive experience in clean air, water quality, and hazardous waste regulations.",
    rating: 4.4,
    reviews: 52,
    availability: 'Busy'
  },
  {
    id: 13,
    name: "Kevin O'Connor",
    practiceAreas: ["Healthcare Law", "Medical Compliance"],
    location: "Atlanta, GA",
    phone: "(404) 555-0113",
    email: "kevin.oconnor@atlantahealthlaw.com",
    college: "Emory University School of Law, JD",
    about: "Healthcare attorney with extensive experience in medical compliance, HIPAA regulations, and healthcare transactions. Represents hospitals, medical practices, and healthcare professionals. Expert in healthcare mergers, regulatory compliance, and medical malpractice defense. Helps healthcare providers navigate complex regulatory requirements.",
    rating: 4.7,
    reviews: 93,
    availability: 'Available'
  },
  {
    id: 14,
    name: "Stephanie Davis",
    practiceAreas: ["Securities Law", "Investment Compliance"],
    location: "Charlotte, NC",
    phone: "(704) 555-0114",
    email: "stephanie.davis@charlottesecurities.com",
    college: "Duke University School of Law, JD",
    about: "Securities attorney specializing in investment compliance, SEC regulations, and financial services law. Represents investment advisors, broker-dealers, and financial institutions. Former SEC attorney with deep regulatory knowledge and enforcement experience. Helps financial services companies maintain compliance and avoid regulatory issues.",
    rating: 4.8,
    reviews: 67,
    availability: 'Limited'
  },
  {
    id: 15,
    name: "Mark Anderson",
    practiceAreas: ["Construction Law", "Contract Disputes"],
    location: "Las Vegas, NV",
    phone: "(702) 555-0115",
    email: "mark.anderson@vegasconstruction.com",
    college: "University of Nevada Las Vegas School of Law, JD",
    about: "Construction attorney with nearly two decades of experience in construction law, contract disputes, and project management legal issues. Represents contractors, developers, and property owners. Expert in construction defect litigation and mechanic's liens. Helps construction industry clients resolve disputes and avoid costly litigation.",
    rating: 4.6,
    reviews: 84,
    availability: 'Available'
  },
  {
    id: 16,
    name: "Nicole Taylor",
    practiceAreas: ["Elder Law", "Guardianship"],
    location: "Tampa, FL",
    phone: "(813) 555-0116",
    email: "nicole.taylor@tampaelderlaw.com",
    college: "Stetson University College of Law, JD",
    about: "Elder law attorney dedicated to protecting the rights and interests of seniors and their families. Specializes in Medicaid planning, guardianship, and long-term care issues. Compassionate advocate for elderly clients navigating complex legal and healthcare systems. Helps families plan for aging and protect their loved ones' dignity and assets.",
    rating: 4.5,
    reviews: 71,
    availability: 'Busy'
  },
  {
    id: 17,
    name: "Brian Miller",
    practiceAreas: ["Insurance Law", "Claims Defense"],
    location: "San Antonio, TX",
    phone: "(210) 555-0117",
    email: "brian.miller@santonioinsurance.com",
    college: "St. Mary's University School of Law, JD",
    about: "Insurance defense attorney with extensive experience in claims litigation, coverage disputes, and risk management. Represents insurance companies and self-insured entities. Expert in personal injury defense, property claims, and bad faith litigation. Helps insurance clients minimize exposure and resolve claims efficiently.",
    rating: 4.3,
    reviews: 58,
    availability: 'Available'
  },
  {
    id: 18,
    name: "Angela White",
    practiceAreas: ["Education Law", "Student Rights"],
    location: "Minneapolis, MN",
    phone: "(612) 555-0118",
    email: "angela.white@minneapoliseducation.com",
    college: "University of Minnesota Law School, JD",
    about: "Education law attorney passionate about protecting student rights and supporting educational institutions. Specializes in special education law, Title IX compliance, and student discipline matters. Advocates for students with disabilities and their families. Helps schools navigate complex educational regulations while protecting student rights.",
    rating: 4.6,
    reviews: 45,
    availability: 'Limited'
  },
  {
    id: 19,
    name: "Thomas Clark",
    practiceAreas: ["Aviation Law", "Transportation"],
    location: "Dallas, TX",
    phone: "(214) 555-0119",
    email: "thomas.clark@dallasaviation.com",
    college: "Southern Methodist University School of Law, JD",
    about: "Aviation attorney with nearly two decades of experience in aviation law, aircraft transactions, and transportation regulations. Former military pilot with unique understanding of aviation operations. Represents airlines, aircraft manufacturers, and aviation businesses. Expert in FAA regulations, aircraft accidents, and aviation insurance matters.",
    rating: 4.7,
    reviews: 62,
    availability: 'Available'
  },
  {
    id: 20,
    name: "Samantha Lewis",
    practiceAreas: ["Entertainment Law", "Media Rights"],
    location: "Los Angeles, CA",
    phone: "(323) 555-0120",
    email: "samantha.lewis@laentertainment.com",
    college: "USC Gould School of Law, JD",
    about: "Entertainment attorney representing artists, producers, and media companies in the heart of Hollywood. Specializes in contract negotiation, intellectual property, and media rights. Has worked on major film and television productions worth over $100 million. Helps creative professionals protect their work and negotiate favorable deals.",
    rating: 4.8,
    reviews: 91,
    availability: 'Busy'
  }
];

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