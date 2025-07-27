import React, { useState, useMemo } from 'react';
import { Search, MapPin, Users, Star, Phone, Mail, Globe, Filter, Plus, Upload, Download, Database, Settings, Menu, X, ChevronDown, Building, Scale, Briefcase, GraduationCap, Award, Clock, CheckCircle, ExternalLink, Github, FileSpreadsheet, Sigma as Sitemap } from 'lucide-react';
import { Lawyer } from './types/lawyer';
import { lawyers, addLawyer, updateLawyer, deleteLawyer } from './data/lawyers';
import { AddLawyerForm } from './components/AddLawyerForm';
import { ExcelImport } from './components/ExcelImport';
import { BulkDataManager } from './components/BulkDataManager';
import { GitHubSync } from './components/GitHubSync';
import { SitemapManager } from './components/SitemapManager';
import { SEOHead } from './components/SEOHead';
import { SchemaMarkup } from './components/SchemaMarkup';
import { LazyImage } from './components/LazyImage';

// All 160 practice areas from Excel file
const practiceAreas = [
  "Personal Injury", "Criminal Defense", "Family Law", "DUI/DWI", 
  "Business Law", "Real Estate Law", "Immigration Law", "Employment Law",
  "Bankruptcy Law", "Estate Planning", "Tax Law", "Medical Malpractice",
  "Intellectual Property", "Corporate Law", "Workers' Compensation", 
  "Social Security Disability", "Environmental Law", "Healthcare Law",
  "Securities Law", "Construction Law", "Elder Law", "Insurance Law",
  "Education Law", "Aviation Law", "Entertainment Law", "Military Law",
  "Consumer Protection", "Civil Rights", "Nonprofit Law", "Energy Law",
  "Privacy Law", "Maritime Law", "Cybersecurity Law", "Admiralty Law",
  "Administrative Law", "Adoption Law", "Agricultural Law", "Animal Law",
  "Antitrust Law", "Appellate Law", "Art Law", "Asbestos Litigation",
  "Asset Protection", "Automotive Law", "Banking Law", "Biotech Law",
  "Cannabis Law", "Class Action Law", "Commercial Law", "Communications Law",
  "Compliance Law", "Computer Law", "Constitutional Law", "Contract Law",
  "Copyright Law", "Creditors Rights", "Cryptocurrency Law", "Customs Law",
  "Data Privacy Law", "Defamation Law", "Disability Law", "Discrimination Law",
  "Divorce Law", "Drug Crimes", "E-Commerce Law", "Election Law",
  "Eminent Domain", "ERISA Law", "Ethics Law", "Expungement",
  "FDA Law", "Foreclosure Defense", "Franchise Law", "Gaming Law",
  "Government Contracts", "Guardianship Law", "Gun Rights", "Hate Crimes",
  "Health Law", "HOA Law", "Human Rights", "Indian Law",
  "Insurance Defense", "International Law", "Internet Law", "Juvenile Law",
  "Labor Law", "Land Use Law", "Landlord Tenant", "Lemon Law",
  "Licensing Law", "Litigation", "Mass Tort", "Mediation",
  "Mergers & Acquisitions", "Mining Law", "Motor Vehicle Accidents", "Municipal Law",
  "Music Law", "Native American Law", "Oil & Gas Law", "Patent Law",
  "Pension Law", "Pharmaceutical Law", "Probate Law", "Product Liability",
  "Professional Liability", "Public Interest Law", "Railroad Law", "Regulatory Law",
  "Religious Law", "Reproductive Rights", "School Law", "Securities Fraud",
  "Sexual Harassment", "Small Business Law", "Social Media Law", "Sports Law",
  "Startup Law", "Surrogacy Law", "Technology Law", "Telecommunications Law",
  "Toxic Tort", "Trade Secret Law", "Trademark Law", "Transportation Law",
  "Trusts & Estates", "Venture Capital", "Veterans Law", "Whistleblower Law",
  "White Collar Crime", "Wills & Probate", "Zoning Law", "Mergers & Acquisitions",
  "Securities Regulation", "Corporate Governance", "Joint Ventures", "Private Equity",
  "Hedge Fund Law", "Investment Management", "Commodities Law", "Derivatives Law",
  "Financial Services", "Credit Law", "Debt Collection", "Foreclosure Law",
  "Real Estate Finance", "Commercial Leasing", "Property Development", "Title Insurance",
  "Condemnation Law", "Water Rights", "Mineral Rights", "Easement Law",
  "Boundary Disputes", "Quiet Title Actions", "Adverse Possession", "Property Tax Law",
  "Homeowners Association", "Commercial Real Estate", "Residential Real Estate", "Real Estate Litigation",
  "Construction Defects", "Mechanics Liens", "Bid Protests", "Public Works",
  "Design Professional Liability", "Surety Law", "Construction Contracts", "Green Building Law",
  "OSHA Compliance", "Workplace Safety", "Union Relations", "Collective Bargaining",
  "Wage and Hour", "Employee Benefits", "FMLA", "ADA Compliance",
  "Title VII", "Age Discrimination", "Pregnancy Discrimination", "Retaliation Claims",
  "Whistleblower Protection", "Non-Compete Agreements", "Trade Secrets", "Executive Compensation"
];

// All 3,954+ cities with state abbreviations from Excel file
const cities = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ", "Philadelphia, PA",
  "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA", "Austin, TX", "Jacksonville, FL",
  "Fort Worth, TX", "Columbus, OH", "Charlotte, NC", "San Francisco, CA", "Indianapolis, IN", "Seattle, WA",
  "Denver, CO", "Washington, DC", "Boston, MA", "El Paso, TX", "Nashville, TN", "Detroit, MI",
  "Oklahoma City, OK", "Portland, OR", "Las Vegas, NV", "Memphis, TN", "Louisville, KY", "Baltimore, MD",
  "Milwaukee, WI", "Albuquerque, NM", "Tucson, AZ", "Fresno, CA", "Sacramento, CA", "Kansas City, MO",
  "Mesa, AZ", "Atlanta, GA", "Omaha, NE", "Colorado Springs, CO", "Raleigh, NC", "Miami, FL",
  "Long Beach, CA", "Virginia Beach, VA", "Oakland, CA", "Minneapolis, MN", "Tulsa, OK", "Tampa, FL",
  "Arlington, TX", "New Orleans, LA", "Wichita, KS", "Cleveland, OH", "Bakersfield, CA", "Aurora, CO",
  "Anaheim, CA", "Honolulu, HI", "Santa Ana, CA", "Riverside, CA", "Corpus Christi, TX", "Lexington, KY",
  "Stockton, CA", "Henderson, NV", "Saint Paul, MN", "St. Louis, MO", "Cincinnati, OH", "Pittsburgh, PA",
  "Greensboro, NC", "Anchorage, AK", "Plano, TX", "Lincoln, NE", "Orlando, FL", "Irvine, CA",
  "Newark, NJ", "Toledo, OH", "Durham, NC", "Chula Vista, CA", "Fort Wayne, IN", "Jersey City, NJ",
  "St. Petersburg, FL", "Laredo, TX", "Madison, WI", "Chandler, AZ", "Buffalo, NY", "Lubbock, TX",
  "Scottsdale, AZ", "Reno, NV", "Glendale, AZ", "Gilbert, AZ", "Winston-Salem, NC", "North Las Vegas, NV",
  "Norfolk, VA", "Chesapeake, VA", "Garland, TX", "Irving, TX", "Hialeah, FL", "Fremont, CA",
  "Boise, ID", "Richmond, VA", "Baton Rouge, LA", "Spokane, WA", "Des Moines, IA", "Tacoma, WA",
  "San Bernardino, CA", "Modesto, CA", "Fontana, CA", "Santa Clarita, CA", "Birmingham, AL", "Oxnard, CA",
  "Fayetteville, NC", "Moreno Valley, CA", "Akron, OH", "Huntington Beach, CA", "Little Rock, AR", "Augusta, GA",
  "Amarillo, TX", "Glendale, CA", "Mobile, AL", "Grand Rapids, MI", "Salt Lake City, UT", "Tallahassee, FL",
  "Huntsville, AL", "Grand Prairie, TX", "Knoxville, TN", "Worcester, MA", "Newport News, VA", "Brownsville, TX",
  "Overland Park, KS", "Santa Rosa, CA", "Peoria, IL", "Oceanside, CA", "Chattanooga, TN", "Fort Lauderdale, FL",
  "Rancho Cucamonga, CA", "Port St. Lucie, FL", "Tempe, AZ", "Ontario, CA", "Vancouver, WA", "Cape Coral, FL",
  "Sioux Falls, SD", "Springfield, MO", "Peoria, AZ", "Pembroke Pines, FL", "Elk Grove, CA", "Salem, OR",
  "Lancaster, CA", "Corona, CA", "Eugene, OR", "Palmdale, CA", "Salinas, CA", "Springfield, MA",
  "Pasadena, CA", "Fort Collins, CO", "Hayward, CA", "Pomona, CA", "Cary, NC", "Rockford, IL",
  "Alexandria, VA", "Escondido, CA", "McKinney, TX", "Kansas City, KS", "Joliet, IL", "Sunnyvale, CA",
  "Torrance, CA", "Bridgeport, CT", "Lakewood, CO", "Hollywood, FL", "Paterson, NJ", "Naperville, IL",
  "Syracuse, NY", "Mesquite, TX", "Dayton, OH", "Savannah, GA", "Clarksville, TN", "Orange, CA",
  "Pasadena, TX", "Fullerton, CA", "Killeen, TX", "Frisco, TX", "Hampton, VA", "McAllen, TX",
  "Warren, MI", "Bellevue, WA", "West Valley City, UT", "Columbia, MO", "Olathe, KS", "Sterling Heights, MI",
  "New Haven, CT", "Miramar, FL", "Waco, TX", "Thousand Oaks, CA", "Cedar Rapids, IA", "Charleston, SC",
  "Visalia, CA", "Topeka, KS", "Elizabeth, NJ", "Gainesville, FL", "Thornton, CO", "Roseville, CA",
  "Carrollton, TX", "Coral Springs, FL", "Stamford, CT", "Simi Valley, CA", "Concord, CA", "Hartford, CT",
  "Kent, WA", "Lafayette, LA", "Midland, TX", "Surprise, AZ", "Denton, TX", "Victorville, CA",
  "Evansville, IN", "Santa Clara, CA", "Abilene, TX", "Athens, GA", "Vallejo, CA", "Allentown, PA",
  "Norman, OK", "Beaumont, TX", "Independence, MO", "Murfreesboro, TN", "Ann Arbor, MI", "Fargo, ND",
  "Wilmington, NC", "Provo, UT", "Springfield, IL", "Columbia, SC", "Lansing, MI", "Antioch, CA",
  "Palm Bay, FL", "Richmond, CA", "Clearwater, FL", "Miami Gardens, FL", "Inglewood, CA", "Reading, PA",
  "Cambridge, MA", "Evanston, IL", "Rochester, NY", "Elgin, IL", "Miami Beach, FL", "Woodbridge, NJ",
  "Rialto, CA", "Las Cruces, NM", "South Bend, IN", "Davenport, IA", "Erie, PA", "Rochester, MN",
  "Renton, WA", "Wichita Falls, TX", "College Station, TX", "Vero Beach, FL", "Pompano Beach, FL", "Costa Mesa, CA",
  "Abbeville, AL", "Abbeville, GA", "Abbeville, LA", "Abbeville, MS", "Abbeville, SC", "Abbotsford, WI",
  "Abbott, TX", "Abbyville, KS", "Abernant, AL", "Aberdeen, ID", "Aberdeen, MD", "Aberdeen, MS",
  "Aberdeen, NC", "Aberdeen, NJ", "Aberdeen, OH", "Aberdeen, SD", "Aberdeen, WA", "Abernathy, TX",
  "Abilene, KS", "Abilene, TX", "Abingdon, IL", "Abingdon, VA", "Abington, MA", "Abington, PA",
  "Abiquiu, NM", "Abita Springs, LA", "Absecon, NJ", "Academy, SD", "Acampo, CA", "Accokeek, MD",
  "Accomac, VA", "Accord, MA", "Accord, NY", "Acme, MI", "Acme, PA", "Acme, WA", "Acton, CA",
  "Acton, MA", "Acton, ME", "Acushnet, MA", "Acworth, GA", "Acworth, NH", "Ada, MI", "Ada, MN",
  "Ada, OH", "Ada, OK", "Adah, PA", "Adair, IA", "Adair, OK", "Adairsville, GA", "Adairville, KY",
  "Adams, MA", "Adams, MN", "Adams, ND", "Adams, NY", "Adams, OR", "Adams, TN", "Adams, WI",
  "Adams Center, NY", "Adamsburg, PA", "Adamstown, MD", "Adamstown, PA", "Adamsville, AL", "Adamsville, OH",
  "Adamsville, PA", "Adamsville, TN", "Addison, AL", "Addison, IL", "Addison, ME", "Addison, MI",
  "Addison, NY", "Addison, PA", "Addison, TX", "Addison, VT", "Adelphi, MD", "Adelphi, OH",
  "Adel, GA", "Adel, IA", "Adell, WI", "Adelphia, NJ", "Aden, AL", "Adena, OH", "Adger, AL",
  "Adkins, TX", "Adna, WA", "Adrian, GA", "Adrian, MI", "Adrian, MN", "Adrian, MO", "Adrian, OR",
  "Adrian, PA", "Adrian, TX", "Adrian, WV", "Advance, IN", "Advance, MO", "Advance, NC",
  "Afton, IA", "Afton, MN", "Afton, NY", "Afton, OK", "Afton, TN", "Afton, TX", "Afton, VA",
  "Afton, WY", "Agate, CO", "Agate, ND", "Agawam, MA", "Agency, IA", "Agency, MO", "Agness, OR",
  "Agua Dulce, CA", "Agua Dulce, TX", "Aguanga, CA", "Aguilar, CO", "Ahwahnee, CA", "Aiken, SC",
  "Ainsworth, IA", "Ainsworth, NE", "Airville, PA", "Aitkin, MN", "Akeley, MN", "Akiak, AK",
  "Akron, AL", "Akron, CO", "Akron, IA", "Akron, IN", "Akron, MI", "Akron, NY", "Akron, OH",
  "Akron, PA", "Alabama, NY", "Alabaster, AL", "Alachua, FL", "Alameda, CA", "Alameda, NM",
  "Alamo, CA", "Alamo, GA", "Alamo, IN", "Alamo, ND", "Alamo, NV", "Alamo, TN", "Alamo, TX",
  "Alamogordo, NM", "Alamosa, CO", "Albany, GA", "Albany, IL", "Albany, IN", "Albany, KY",
  "Albany, LA", "Albany, MN", "Albany, MO", "Albany, NY", "Albany, OH", "Albany, OR", "Albany, TX",
  "Albany, VT", "Albany, WI", "Albemarle, NC", "Albers, IL", "Albert, KS", "Albert City, IA",
  "Albert Lea, MN", "Alberta, AL", "Alberta, MN", "Alberta, VA", "Albertson, NC", "Albertson, NY",
  "Albertville, AL", "Albertville, MN", "Albion, CA", "Albion, IA", "Albion, ID", "Albion, IL",
  "Albion, IN", "Albion, ME", "Albion, MI", "Albion, NE", "Albion, NY", "Albion, OK", "Albion, PA",
  "Albion, WA", "Albrightsville, PA", "Albuquerque, NM", "Alcester, SD", "Alcoa, TN", "Alcolu, SC",
  "Alda, NE", "Alden, IA", "Alden, KS", "Alden, MI", "Alden, MN", "Alden, NY", "Alden, PA",
  "Alderson, OK", "Alderson, WV", "Aldrich, MN", "Aldrich, MO", "Aledo, IL", "Aledo, TX",
  "Alexander, AR", "Alexander, IA", "Alexander, IL", "Alexander, KS", "Alexander, ME", "Alexander, ND",
  "Alexander, NY", "Alexander City, AL", "Alexandria, AL", "Alexandria, IN", "Alexandria, KY", "Alexandria, LA",
  "Alexandria, MN", "Alexandria, MO", "Alexandria, NE", "Alexandria, NH", "Alexandria, OH", "Alexandria, PA",
  "Alexandria, SD", "Alexandria, TN", "Alexandria, VA", "Alexis, IL", "Alexis, NC", "Alford, FL",
  "Alfred, ME", "Alfred, NY", "Alfred, ND", "Alfred Station, NY", "Algoma, MS", "Algoma, WI",
  "Algonac, MI", "Algonquin, IL", "Alhambra, CA", "Alhambra, IL", "Alice, ND", "Alice, TX",
  "Alicia, AR", "Aliquippa, PA", "Aliso Viejo, CA", "Alkol, WV", "All Saints, NJ", "Allakaket, AK",
  "Allamuchy, NJ", "Allan, SK", "Allandale, FL", "Allardt, TN", "Allegany, NY", "Allegany, OR",
  "Allen, KS", "Allen, MD", "Allen, MI", "Allen, NE", "Allen, OK", "Allen, SD", "Allen, TX",
  "Allendale, IL", "Allendale, MI", "Allendale, NJ", "Allendale, SC", "Allenhurst, GA", "Allenhurst, NJ",
  "Allenport, PA", "Allenspark, CO", "Allensville, KY", "Allensville, PA", "Allentown, GA", "Allentown, NJ",
  "Allentown, PA", "Allenwood, NJ", "Allenwood, PA", "Alliance, NE", "Alliance, OH", "Allison, IA",
  "Allison, PA", "Allison Park, PA", "Alloway, NJ", "Allred, TN", "Alma, AR", "Alma, CO",
  "Alma, GA", "Alma, IL", "Alma, KS", "Alma, MI", "Alma, MO", "Alma, NE", "Alma, WI",
  "Almena, KS", "Almena, WI", "Almo, ID", "Almo, KY", "Almond, NC", "Almond, NY", "Almond, WI",
  "Almyra, AR", "Alna, ME", "Alpaugh, CA", "Alpena, AR", "Alpena, MI", "Alpena, SD",
  "Alpha, IL", "Alpha, MN", "Alpha, NJ", "Alpha, OH", "Alpharetta, GA", "Alpine, AL", "Alpine, AZ",
  "Alpine, CA", "Alpine, NY", "Alpine, TN", "Alpine, TX", "Alpine, UT", "Alpine, WY",
  "Alsea, OR", "Alsen, ND", "Alstead, NH", "Alta, CA", "Alta, IA", "Alta, UT", "Alta, WY",
  "Alta Loma, CA", "Alta Vista, IA", "Alta Vista, KS", "Altadena, CA", "Altamont, IL", "Altamont, KS",
  "Altamont, NY", "Altamont, OR", "Altamont, TN", "Altamont, UT", "Altamonte Springs, FL", "Altavista, VA",
  "Altenburg, MO", "Altha, FL", "Althea, KY", "Altheimer, AR", "Alton, AL", "Alton, IA",
  "Alton, IL", "Alton, IN", "Alton, KS", "Alton, ME", "Alton, MO", "Alton, NH", "Alton, TX",
  "Alton, UT", "Alton, VA", "Altoona, AL", "Altoona, FL", "Altoona, IA", "Altoona, KS",
  "Altoona, PA", "Altoona, WI", "Alturas, CA", "Altus, AR", "Altus, OK", "Alum Bank, PA",
  "Alum Bridge, WV", "Alum Creek, WV", "Alvarado, MN", "Alvarado, TX", "Alvaton, KY", "Alverta, OK",
  "Alverton, PA", "Alvey, KY", "Alvin, IL", "Alvin, TX", "Alvin, WI", "Alvord, IA", "Alvord, TX",
  "Amado, AZ", "Amagon, AR", "Amalga, UT", "Amanda, OH", "Amanda Park, WA", "Amana, IA",
  "Amarillo, TX", "Amasa, MI", "Amawalk, NY", "Amberg, WI", "Ambler, AK", "Ambler, PA",
  "Amboy, CA", "Amboy, IL", "Amboy, IN", "Amboy, MN", "Amboy, WA", "Ambrose, GA", "Ambrose, ND",
  "Amelia, LA", "Amelia, NE", "Amelia, OH", "Amelia, VA", "Amelia Court House, VA", "Amelith, ND",
  "American Canyon, CA", "American Falls, ID", "American Fork, UT", "Americus, GA", "Americus, IN", "Americus, KS",
  "Ames, IA", "Ames, NE", "Ames, NY", "Ames, OK", "Amesbury, MA", "Amesville, OH",
  "Amherst, CO", "Amherst, MA", "Amherst, NE", "Amherst, NH", "Amherst, NY", "Amherst, OH",
  "Amherst, SD", "Amherst, TX", "Amherst, VA", "Amherst, WI", "Amherst Junction, WI", "Amity, AR",
  "Amity, ME", "Amity, MO", "Amity, OR", "Amity, PA", "Amityville, NY", "Amlin, OH",
  "Ammon, ID", "Amonate, VA", "Amoret, MO", "Amos, WV", "Amsterdam, MO", "Amsterdam, MT",
  "Amsterdam, NY", "Amsterdam, OH", "Anacoco, LA", "Anaconda, MT", "Anacortes, WA", "Anahola, HI",
  "Anahuac, TX", "Anamoose, ND", "Anasco, PR", "Anatone, WA", "Anchor, IL", "Anchor Point, AK",
  "Anchorage, AK", "Anchorage, KY", "Ancona, IL", "Andalusia, AL", "Andalusia, IL", "Andalusia, PA",
  "Andover, CT", "Andover, FL", "Andover, IA", "Andover, IL", "Andover, KS", "Andover, MA",
  "Andover, ME", "Andover, MN", "Andover, NH", "Andover, NJ", "Andover, NY", "Andover, OH",
  "Andover, SD", "Andover, VT", "Andrew, IA", "Andrew, WV", "Andrews, IN", "Andrews, NC",
  "Andrews, SC", "Andrews, TX", "Andrews Air Force Base, MD", "Angelica, NY", "Angelica, WI", "Angels Camp, CA",
  "Angier, NC", "Angleton, TX", "Angola, IN", "Angola, LA", "Angola, NY", "Angoon, AK",
  "Angora, MN", "Angora, NE", "Anguilla, MS", "Aniak, AK", "Anita, IA", "Anita, PA",
  "Anmoore, WV", "Anna, IL", "Anna, OH", "Anna, TX", "Annada, MO", "Annandale, MN",
  "Annandale, NJ", "Annandale, VA", "Annapolis, CA", "Annapolis, IL", "Annapolis, MD", "Annapolis, MO",
  "Anniston, AL", "Annville, KY", "Annville, PA", "Anoka, MN", "Anselmo, NE", "Ansley, NE",
  "Anson, ME", "Anson, TX", "Ansonville, NC", "Antelope, CA", "Antelope, MT", "Antelope, OR",
  "Anthony, FL", "Anthony, KS", "Anthony, NM", "Anthony, TX", "Antioch, CA", "Antioch, IL",
  "Antioch, TN", "Antlers, OK", "Antrim, NH", "Antwerp, NY", "Antwerp, OH", "Anza, CA",
  "Apache, OK", "Apache Junction, AZ", "Apalachicola, FL", "Apex, NC", "Apison, TN", "Apollo, PA",
  "Apollo Beach, FL", "Apopka, FL", "Appalachia, VA", "Apple Creek, OH", "Apple River, IL", "Apple Springs, TX",
  "Apple Valley, CA", "Apple Valley, MN", "Applegate, CA", "Applegate, MI", "Applegate, OR", "Appleton, ME",
  "Appleton, MN", "Appleton, WI", "Appomattox, VA", "Aquasco, MD", "Aquilla, TX", "Arab, AL",
  "Arabi, GA", "Arabi, LA", "Arapaho, NC", "Arapaho, OK", "Arapahoe, CO", "Arapahoe, NE",
  "Arapahoe, NC", "Arapahoe, WY", "Arbela, MO", "Arboles, CO", "Arbovale, WV", "Arcade, GA",
  "Arcade, NY", "Arcadia, CA", "Arcadia, FL", "Arcadia, IA", "Arcadia, IN", "Arcadia, KS",
  "Arcadia, LA", "Arcadia, MI", "Arcadia, MO", "Arcadia, NE", "Arcadia, OH", "Arcadia, OK",
  "Arcadia, PA", "Arcadia, SC", "Arcadia, TX", "Arcadia, WI", "Arcanum, OH", "Archbald, PA",
  "Archbold, OH", "Archer, FL", "Archer, IA", "Archer, NE", "Archer City, TX", "Arcola, IL",
  "Arcola, IN", "Arcola, LA", "Arcola, MS", "Arcola, TX", "Arcola, VA", "Arctic Village, AK",
  "Arden, DE", "Arden, NC", "Arden, NV", "Arden Hills, MN", "Ardmore, AL", "Ardmore, OK",
  "Ardmore, PA", "Ardmore, SD", "Ardmore, TN", "Arendtsville, PA", "Argenta, IL", "Argentina, KS",
  "Argo, AL", "Argonia, KS", "Argos, IN", "Argyle, FL", "Argyle, IA", "Argyle, MN",
  "Argyle, NY", "Argyle, TX", "Argyle, WI", "Arickaree, CO", "Ariton, AL", "Arizona City, AZ",
  "Arkadelphia, AR", "Arkansaw, WI", "Arkansas City, AR", "Arkansas City, KS", "Arkdale, WI", "Arkoma, OK",
  "Arkport, NY", "Arlington, AL", "Arlington, AZ", "Arlington, CO", "Arlington, GA", "Arlington, IA",
  "Arlington, IL", "Arlington, IN", "Arlington, KS", "Arlington, KY", "Arlington, MA", "Arlington, MN",
  "Arlington, NE", "Arlington, NJ", "Arlington, OH", "Arlington, OR", "Arlington, SD", "Arlington, TN",
  "Arlington, TX", "Arlington, VA", "Arlington, VT", "Arlington, WA", "Arlington, WI", "Arlington Heights, IL",
  "Armada, MI", "Armagh, PA", "Arma, KS", "Arminto, WY", "Armona, CA", "Armour, SD",
  "Armstrong, IA", "Armstrong, MO", "Arnaudville, LA", "Arnegard, ND", "Arnold, CA", "Arnold, KS",
  "Arnold, MD", "Arnold, MO", "Arnold, NE", "Arnold, PA", "Arnoldsburg, WV", "Arnoldsville, GA",
  "Arock, OR", "Aroda, VA", "Aromas, CA", "Arpin, WI", "Arrey, NM", "Arrow Rock, MO",
  "Arrowhead, OK", "Arrowsmith, IL", "Artesia, CA", "Artesia, NM", "Arthur, IA", "Arthur, IL",
  "Arthur, ND", "Arthur, NE", "Arthur, TN", "Arthur, WV", "Arthur City, TX", "Artie, WV",
  "Arvada, CO", "Arvada, WY", "Arvin, CA", "Asbury, IA", "Asbury, MO", "Asbury, NJ",
  "Asbury Park, NJ", "Ascension, LA", "Ash, NC", "Ash Flat, AR", "Ash Fork, AZ", "Ash Grove, MO",
  "Ashaway, RI", "Ashburn, GA", "Ashburn, VA", "Ashby, MA", "Ashby, MN", "Ashby, NE",
  "Ashdown, AR", "Asheboro, NC", "Asheville, NC", "Ashfield, MA", "Ashford, AL", "Ashford, CT",
  "Ashford, WA", "Ashippun, WI", "Ashkum, IL", "Ashland, AL", "Ashland, CA", "Ashland, IL",
  "Ashland, KS", "Ashland, KY", "Ashland, LA", "Ashland, MA", "Ashland, ME", "Ashland, MI",
  "Ashland, MO", "Ashland, MS", "Ashland, MT", "Ashland, NE", "Ashland, NH", "Ashland, NJ",
  "Ashland, NY", "Ashland, OH", "Ashland, OR", "Ashland, PA", "Ashland, SC", "Ashland, TX",
  "Ashland, VA", "Ashland, WI", "Ashley, IL", "Ashley, IN", "Ashley, MI", "Ashley, ND",
  "Ashley, OH", "Ashley, PA", "Ashley Falls, MA", "Ashmore, IL", "Ashtabula, OH", "Ashton, IA",
  "Ashton, ID", "Ashton, IL", "Ashton, MD", "Ashton, NE", "Ashton, SD", "Ashton, WV",
  "Ashville, AL", "Ashville, NY", "Ashville, OH", "Ashville, PA", "Ashwood, OR", "Ashwood, TN",
  "Asotin, WA", "Aspen, CO", "Aspen Hill, MD", "Aspermont, TX", "Aspinwall, PA", "Assaria, KS",
  "Assumption, IL", "Assumption, LA", "Astoria, IL", "Astoria, NY", "Astoria, OR", "Astor, FL",
  "Atascadero, CA", "Atascosa, TX", "Atchison, KS", "Athena, OR", "Athens, AL", "Athens, GA",
  "Athens, IL", "Athens, IN", "Athens, LA", "Athens, ME", "Athens, MI", "Athens, NY",
  "Athens, OH", "Athens, PA", "Athens, TN", "Athens, TX", "Athens, VT", "Athens, WI",
  "Athens, WV", "Atherton, CA", "Athol, ID", "Athol, KS", "Athol, MA", "Athol, NY",
  "Athol Springs, NY", "Atka, AK", "Atkins, AR", "Atkins, IA", "Atkins, VA", "Atkinson, IL",
  "Atkinson, ME", "Atkinson, NE", "Atkinson, NH", "Atlanta, GA", "Atlanta, ID", "Atlanta, IL",
  "Atlanta, IN", "Atlanta, KS", "Atlanta, LA", "Atlanta, MI", "Atlanta, MO", "Atlanta, NE",
  "Atlanta, NY", "Atlanta, TX", "Atlantic, IA", "Atlantic, MA", "Atlantic, NC", "Atlantic, PA",
  "Atlantic, VA", "Atlantic Beach, FL", "Atlantic Beach, NC", "Atlantic Beach, NY", "Atlantic Beach, SC",
  "Atlantic City, NJ", "Atlantic Highlands, NJ", "Atlantis, FL", "Atlas, MI", "Atmore, AL", "Atoka, OK",
  "Atoka, TN", "Atomic City, ID", "Atqasuk, AK", "Attalla, AL", "Attapulgus, GA", "Attica, IN",
  "Attica, KS", "Attica, MI", "Attica, NY", "Attica, OH", "Attleboro, MA", "Atwater, CA",
  "Atwater, MN", "Atwater, OH", "Atwood, CA", "Atwood, CO", "Atwood, IL", "Atwood, IN",
  "Atwood, KS", "Atwood, OK", "Atwood, TN", "Au Gres, MI", "Au Sable, MI", "Auburn, AL",
  "Auburn, CA", "Auburn, GA", "Auburn, IL", "Auburn, IN", "Auburn, IA", "Auburn, KS",
  "Auburn, KY", "Auburn, MA", "Auburn, ME", "Auburn, MI", "Auburn, NE", "Auburn, NH",
  "Auburn, NY", "Auburn, PA", "Auburn, WA", "Auburn, WV", "Auburn Hills, MI", "Auburndale, FL",
  "Auburndale, MA", "Auburndale, WI", "Auburntown, TN", "Audubon, IA", "Audubon, MN", "Audubon, NJ",
  "Audubon, PA", "Audubon Park, KY", "Audubon Park, NJ", "Augusta, AR", "Augusta, GA", "Augusta, IL",
  "Augusta, KS", "Augusta, KY", "Augusta, ME", "Augusta, MI", "Augusta, MO", "Augusta, MT",
  "Augusta, NJ", "Augusta, WI", "Augusta, WV", "Aulander, NC", "Ault, CO", "Aumsville, OR",
  "Aura, NJ", "Aurora, CO", "Aurora, IL", "Aurora, IN", "Aurora, IA", "Aurora, KS",
  "Aurora, ME", "Aurora, MN", "Aurora, MO", "Aurora, NE", "Aurora, NY", "Aurora, OH",
  "Aurora, OR", "Aurora, SD", "Aurora, TX", "Aurora, UT", "Aurora, WV", "Austell, GA",
  "Austin, AR", "Austin, IN", "Austin, MN", "Austin, NV", "Austin, PA", "Austin, TX",
  "Austinburg, OH", "Austintown, OH", "Austinville, IA", "Austinville, VA", "Autaugaville, AL", "Autryville, NC",
  "Auxvasse, MO", "Ava, IL", "Ava, MO", "Ava, NY", "Avalon, CA", "Avalon, NJ",
  "Avalon, PA", "Avalon, TX", "Avant, OK", "Avella, PA", "Avenal, CA", "Aventura, FL",
  "Averill, MN", "Averill, VT", "Averill Park, NY", "Avery, CA", "Avery, ID", "Avery, TX",
  "Avilla, IN", "Avilla, MO", "Avis, PA", "Avoca, AR", "Avoca, IA", "Avoca, IN",
  "Avoca, MI", "Avoca, MN", "Avoca, NE", "Avoca, NY", "Avoca, PA", "Avoca, TX",
  "Avoca, WI", "Avon, CO", "Avon, CT", "Avon, IL", "Avon, IN", "Avon, MA",
  "Avon, ME", "Avon, MN", "Avon, MT", "Avon, NY", "Avon, OH", "Avon, SD",
  "Avon, UT", "Avon Lake, OH", "Avon Park, FL", "Avondale, AZ", "Avondale, CO", "Avondale, LA",
  "Avondale, PA", "Avondale Estates, GA", "Avonmore, PA", "Axtell, KS", "Axtell, NE", "Axtell, TX",
  "Ayden, NC", "Ayer, MA", "Ayersville, OH", "Ayr, NE", "Ayr, ND", "Azalea, OR",
  "Aztec, NM", "Azusa, CA", "Babbitt, MN", "Babbitt, NV", "Babylon, NY", "Baconton, GA",
  "Bad Axe, MI", "Badger, CA", "Badger, IA", "Badger, MN", "Badger, SD", "Bagdad, AZ",
  "Bagdad, FL", "Bagdad, KY", "Bagley, IA", "Bagley, MN", "Bagley, WI", "Bagnell, MO",
  "Bahama, NC", "Bailey, CO", "Bailey, MI", "Bailey, MS", "Bailey, NC", "Bailey, TX",
  "Baileyville, IL", "Baileyville, KS", "Baileyville, ME", "Bainbridge, GA", "Bainbridge, IN", "Bainbridge, NY",
  "Bainbridge, OH", "Bainbridge, PA", "Bainbridge Island, WA", "Baird, TX", "Baker, CA", "Baker, FL",
  "Baker, LA", "Baker, MN", "Baker, MT", "Baker, NV", "Baker, OR", "Baker City, OR",
  "Bakerfield, VT", "Bakersfield, CA", "Bakersfield, MO", "Bakersfield, VT", "Baldwin, FL", "Baldwin, GA",
  "Baldwin, IA", "Baldwin, IL", "Baldwin, LA", "Baldwin, MD", "Baldwin, MI", "Baldwin, NY",
  "Baldwin, ND", "Baldwin, WI", "Baldwin City, KS", "Baldwin Park, CA", "Baldwinsville, NY", "Baldwyn, MS",
  "Balfour, ND", "Ball, LA", "Ball Club, MN", "Ball Ground, GA", "Ballantine, MT", "Ballard, CA",
  "Ballard, UT", "Ballard, WV", "Ballico, CA", "Ballinger, TX", "Ballston Lake, NY", "Ballston Spa, NY",
  "Baltic, CT", "Baltic, OH", "Baltic, SD", "Baltimore, MD", "Baltimore, OH", "Bamberg, SC",
  "Bandera, TX", "Bandon, OR", "Bangor, CA", "Bangor, ME", "Bangor, MI", "Bangor, NY",
  "Bangor, PA", "Bangor, WI", "Banks, AL", "Banks, AR", "Banks, ID", "Banks, OR",
  "Banner, MS", "Banner, WY", "Banner Elk, NC", "Bannister, MI", "Bannock, OH", "Banning, CA",
  "Bapchule, AZ", "Bar Harbor, ME", "Bar Nunn, WY", "Baraga, MI", "Barataria, LA", "Barberton, OH",
  "Barbour, WV", "Barbourmeade, KY", "Barbours Cut, TX", "Barboursville, VA", "Barboursville, WV", "Barbourville, KY",
  "Barcelona, NY", "Barclay, MD", "Bardolph, IL", "Bardstown, KY", "Bardwell, KY", "Bardwell, TX",
  "Bargersville, IN", "Barhamsville, VA", "Baring, MO", "Barker, NY", "Barker, TX", "Barkhamsted, CT",
  "Barlow, KY", "Barlow, OR", "Barnard, KS", "Barnard, MO", "Barnard, SD", "Barnard, VT",
  "Barnegat, NJ", "Barnes, KS", "Barnes City, IA", "Barnesburg, SC", "Barneston, NE", "Barnet, VT",
  "Barnett, MO", "Barnetts Creek, KY", "Barneville, GA", "Barnhart, MO", "Barnhart, TX", "Barnsdall, OK",
  "Barnstable, MA", "Barnstead, NH", "Barnwell, SC", "Baroda, MI", "Baron, OK", "Barr, CO",
  "Barre, MA", "Barre, VT", "Barren Springs, VA", "Barrington, IL", "Barrington, NH", "Barrington, NJ",
  "Barrington, RI", "Barrington Hills, IL", "Barron, WI", "Barronett, WI", "Barry, IL", "Barry, MN",
  "Barry, TX", "Barryton, MI", "Barstow, CA", "Barstow, TX", "Bartlesville, OK", "Bartlett, IL",
  "Bartlett, KS", "Bartlett, NE", "Bartlett, NH", "Bartlett, TN", "Bartlett, TX", "Barton, MD",
  "Barton, NY", "Barton, VT", "Barton City, MI", "Bartonsville, PA", "Bartonville, IL", "Bartonville, TX",
  "Bartow, FL", "Bartow, GA", "Bartow, WV", "Basalt, CO", "Basalt, ID", "Basehor, KS",
  "Basile, LA", "Basin, MT", "Basin, WY", "Baskin, LA", "Basking Ridge, NJ", "Bass Harbor, ME",
  "Bass Lake, CA", "Bass Lake, IN", "Bassett, AR", "Bassett, IA", "Bassett, NE", "Bassett, VA",
  "Bastian, VA", "Bastrop, LA", "Bastrop, TX", "Batavia, IL", "Batavia, IA", "Batavia, NY",
  "Batavia, OH", "Bateman, SC", "Bates City, MO", "Batesburg, SC", "Batesville, AR", "Batesville, IN",
  "Batesville, MS", "Batesville, TX", "Bath, IL", "Bath, IN", "Bath, ME", "Bath, MI",
  "Bath, NH", "Bath, NY", "Bath, NC", "Bath, PA", "Bath, SC", "Bath, SD",
  "Baton Rouge, LA", "Battle Creek, IA", "Battle Creek, MI", "Battle Creek, NE", "Battle Ground, IN", "Battle Ground, WA",
  "Battle Lake, MN", "Battle Mountain, NV", "Battleboro, NC", "Battletown, KY", "Baudette, MN", "Baxley, GA",
  "Baxter, IA", "Baxter, MN", "Baxter, TN", "Baxter Springs, KS", "Bay, AR", "Bay City, MI",
  "Bay City, OR", "Bay City, TX", "Bay Harbor Islands, FL", "Bay Head, NJ", "Bay Minette, AL", "Bay Point, CA",
  "Bay Port, MI", "Bay Saint Louis, MS", "Bay Shore, NY", "Bay Springs, MS", "Bay Village, OH", "Bayamon, PR",
  "Bayard, IA", "Bayard, NE", "Bayard, NM", "Bayard, WV", "Bayboro, NC", "Bayfield, CO",
  "Bayfield, WI", "Baylis, IL", "Baylor, TX", "Bayonne, NJ", "Bayou Goula, LA", "Bayou La Batre, AL",
  "Bayport, MN", "Bayport, NY", "Bayshore, NY", "Baytown, TX", "Bayview, ID", "Bayview, TX",
  "Bayville, NJ", "Bayville, NY", "Beach, ND", "Beach City, OH", "Beach Haven, NJ", "Beach Lake, PA",
  "Beach Park, IL", "Beachwood, NJ", "Beachwood, OH", "Beacon, IA", "Beacon, NY", "Beacon Falls, CT",
  "Beadle, SD", "Beale Air Force Base, CA", "Beallsville, MD", "Beallsville, OH", "Beallsville, PA", "Beaman, IA",
  "Bean Station, TN", "Bear, DE", "Bear Creek, AL", "Bear Creek, NC", "Bear Creek, PA", "Bear Creek, WI",
  "Bear Lake, MI", "Bear Lake, PA", "Bear River City, UT", "Bearsville, NY", "Beatrice, AL", "Beatrice, NE",
  "Beatty, NV", "Beatty, OR", "Beattyville, KY", "Beaufort, MO", "Beaufort, NC", "Beaufort, SC",
  "Beaumont, CA", "Beaumont, KS", "Beaumont, MS", "Beaumont, TX", "Beaver, AK", "Beaver, IA",
  "Beaver, OH", "Beaver, OK", "Beaver, PA", "Beaver, UT", "Beaver, WV", "Beaver City, NE",
  "Beaver City, UT", "Beaver Creek, MN", "Beaver Dam, KY", "Beaver Dam, WI", "Beaver Falls, NY", "Beaver Falls, PA",
  "Beaver Island, MI", "Beaver Springs, PA", "Beavercreek, OH", "Beaverdale, PA", "Beaverton, AL", "Beaverton, MI",
  "Beaverton, OR", "Beaverville, IL", "Bechtelsville, PA", "Beckemeyer, IL", "Becker, MN", "Beckley, WV",
  "Beckville, TX", "Beckwourth, CA", "Bedford, IA", "Bedford, IN", "Bedford, KY", "Bedford, MA",
  "Bedford, NH", "Bedford, NY", "Bedford, OH", "Bedford, PA", "Bedford, TX", "Bedford, VA",
  "Bedford Heights, OH", "Bedford Hills, NY", "Bedias, TX", "Bedminster, NJ", "Bedminster, PA", "Bee, NE",
  "Bee Branch, AR", "Bee Spring, KY", "Beebe, AR", "Beech Bottom, WV", "Beech Creek, KY", "Beech Creek, PA",
  "Beech Grove, AR", "Beech Grove, IN", "Beech Island, SC", "Beech Mountain, NC", "Beechgrove, TN", "Beechwood, NJ",
  "Beeler, KS", "Beemer, NE", "Beeville, TX", "Bel Air, MD", "Bel Aire, KS", "Bel Ridge, MO",
  "Belchertown, MA", "Belcourt, ND", "Belden, CA", "Belden, MS", "Belden, NE", "Belding, MI",
  "Belfair, WA", "Belfast, ME", "Belfast, NY", "Belfield, ND", "Belford, NJ", "Belgium, WI",
  "Belgrade, ME", "Belgrade, MN", "Belgrade, MT", "Belgrade, NE", "Belgrade Lakes, ME", "Belknap, IL",
  "Bell, CA", "Bell, FL", "Bell Buckle, TN", "Bell City, LA", "Bell City, MO", "Bell Gardens, CA",
  "Bella Vista, AR", "Bella Vista, CA", "Bellair, FL", "Bellaire, MI", "Bellaire, OH", "Bellaire, TX",
  "Belleair, FL", "Belleair Beach, FL", "Belleair Bluffs, FL", "Belleair Shore, FL", "Bellechase, LA", "Bellefonte, AR",
  "Bellefonte, DE", "Bellefonte, KY", "Bellefonte, PA", "Bellefontaine, OH", "Bellemont, AZ", "Belleplain, NJ",
  "Bellerose, NY", "Belleview, FL", "Belleview, NE", "Belleville, AR", "Belleville, IL", "Belleville, KS",
  "Belleville, MI", "Belleville, NJ", "Belleville, NY", "Belleville, PA", "Belleville, TX", "Belleville, WI",
  "Bellevue, IA", "Bellevue, ID", "Bellevue, KY", "Bellevue, MI", "Bellevue, NE", "Bellevue, OH",
  "Bellevue, PA", "Bellevue, TX", "Bellevue, WA", "Bellflower, CA", "Bellflower, IL", "Bellflower, MO",
  "Bellingham, MA", "Bellingham, WA", "Bellmawr, NJ", "Bellmore, NY", "Bellport, NY", "Bells, TN",
  "Bells, TX", "Bellvale, NY", "Bellville, GA", "Bellville, OH", "Bellville, TX", "Bellwood, AL",
  "Bellwood, IL", "Bellwood, NE", "Bellwood, PA", "Belmar, NJ", "Belmont, CA", "Belmont, MA",
  "Belmont, ME", "Belmont, MI", "Belmont, MS", "Belmont, NC", "Belmont, NH", "Belmont, NY",
  "Belmont, OH", "Belmont, VT", "Belmont, WI", "Beloit, KS", "Beloit, OH", "Beloit, WI",
  "Belpre, KS", "Belpre, OH", "Belton, MO", "Belton, SC", "Belton, TX", "Beltrami, MN",
  "Beltsville, MD", "Belvidere, IL", "Belvidere, NE", "Belvidere, NJ", "Belvidere, SD", "Belvidere, TN",
  "Belvidere Center, VT", "Belzoni, MS", "Bemidji, MN", "Ben Arnold, CA", "Ben Avon, PA", "Ben Franklin, TX",
  "Ben Hur, VA", "Ben Lomond, AR", "Ben Lomond, CA", "Ben Wheeler, TX", "Benbrook, TX", "Bend, OR",
  "Bendersville, PA", "Benicia, CA", "Benjamin, TX", "Benjamin, UT", "Benkelman, NE", "Bennett, CO",
  "Bennett, IA", "Bennett, NC", "Bennettsville, SC", "Bennington, ID", "Bennington, IN", "Bennington, KS",
  "Bennington, NE", "Bennington, NH", "Bennington, OK", "Bennington, VT", "Benoit, MS", "Benoit, WI",
  "Bensalem, PA", "Bensenville, IL", "Benson, AZ", "Benson, IL", "Benson, MN", "Benson, NC",
  "Benson, UT", "Benson, VT", "Bent Mountain, VA", "Bentley, KS", "Bentley, LA", "Bentley, MI",
  "Bentleyville, OH", "Bentleyville, PA", "Benton, AR", "Benton, CA", "Benton, IL", "Benton, IA",
  "Benton, KS", "Benton, KY", "Benton, LA", "Benton, ME", "Benton, MS", "Benton, MO",
  "Benton, PA", "Benton, TN", "Benton, WI", "Benton City, WA", "Benton Harbor, MI", "Benton Ridge, OH",
  "Bentonville, AR", "Bentonville, VA", "Benzonia, MI", "Berea, KY", "Berea, OH", "Berea, WV",
  "Beresford, SD", "Berg, ND", "Bergheim, TX", "Bergholz, OH", "Bergland, MI", "Bergman, AR",
  "Bergoo, WV", "Berkeley, CA", "Berkeley, IL", "Berkeley, MO", "Berkeley Heights, NJ", "Berkeley Lake, GA",
  "Berkeley Springs, WV", "Berkley, MA", "Berkley, MI", "Berlin, CT", "Berlin, GA", "Berlin, MA",
  "Berlin, MD", "Berlin, NH", "Berlin, NJ", "Berlin, NY", "Berlin, OH", "Berlin, PA",
  "Berlin, VT", "Berlin, WI", "Berlin Center, OH", "Berlin Heights, OH", "Bermuda Dunes, CA", "Bermuda Run, NC",
  "Bern, ID", "Bern, IN", "Bern, KS", "Bernalillo, NM", "Bernard, IA", "Bernard, ME",
  "Bernardston, MA", "Bernardsville, NJ", "Bernice, LA", "Bernice, OK", "Bernie, MO", "Bernville, PA",
  "Berry, AL", "Berry, KY", "Berryburg, WV", "Berrydale, PA", "Berrysburg, PA", "Berryville, AR",
  "Berryville, VA", "Berthold, ND", "Berthoud, CO", "Bertram, IA", "Bertram, TX", "Berwick, IA",
  "Berwick, LA", "Berwick, ME", "Berwick, PA", "Berwyn, IL", "Berwyn, MD", "Berwyn, NE",
  "Berwyn, PA", "Berwyn Heights, MD", "Besemer, AL", "Bessemer, AL", "Bessemer, MI", "Bessemer, PA",
  "Bessemer City, NC", "Bethany, CT", "Bethany, IL", "Bethany, LA", "Bethany, MO", "Bethany, OK",
  "Bethany, OR", "Bethany, WV", "Bethany Beach, DE", "Bethel, AK", "Bethel, CT", "Bethel, DE",
  "Bethel, ME", "Bethel, MN", "Bethel, NC", "Bethel, NY", "Bethel, OH", "Bethel, OK",
  "Bethel, PA", "Bethel, VT", "Bethel, WA", "Bethel Island, CA", "Bethel Park, PA", "Bethel Springs, TN",
  "Bethesda, MD", "Bethesda, OH", "Bethlehem, CT", "Bethlehem, GA", "Bethlehem, IN", "Bethlehem, KY",
  "Bethlehem, NH", "Bethlehem, NY", "Bethlehem, PA", "Bethpage, NY", "Bethpage, TN", "Bettendorf, IA",
  "Bettsville, OH", "Betty, KY", "Beulah, CO", "Beulah, MI", "Beulah, ND", "Beulah, WY",
  "Beulaville, NC", "Beverly, KS", "Beverly, MA", "Beverly, NJ", "Beverly, OH", "Beverly, WV",
  "Beverly Hills, CA", "Beverly Hills, FL", "Beverly Hills, MI", "Beverly Hills, TX", "Bevier, MO", "Bexley, OH",
  "Bibb City, GA", "Bicknell, IN", "Bicknell, UT", "Biddeford, ME", "Biddeford Pool, ME", "Bidwell, OH",
  "Bienville, LA", "Big Arm, MT", "Big Bear City, CA", "Big Bear Lake, CA", "Big Bend, CA", "Big Bend, WI",
  "Big Cabin, OK", "Big Creek, CA", "Big Creek, KY", "Big Creek, WV", "Big Falls, MN", "Big Flats, NY",
  "Big Flats, WI", "Big Fork, MT", "Big Lake, AK", "Big Lake, MN", "Big Lake, TX", "Big Pine, CA",
  "Big Pine Key, FL", "Big Piney, WY", "Big Rapids, MI", "Big River, CA", "Big Rock, IL", "Big Rock, TN",
  "Big Rock, VA", "Big Sandy, MT", "Big Sandy, TN", "Big Sandy, TX", "Big Spring, KY", "Big Spring, TX",
  "Big Stone City, SD", "Big Stone Gap, VA", "Big Sur, CA", "Big Timber, MT", "Bigelow, AR",
  "Bigelow, MN", "Bigfork, MN", "Bigfoot, TX", "Biggs, CA", "Biglers, PA", "Biglersville, PA",
  "Bihm, TX", "Billerica, MA", "Billings, MO", "Billings, MT", "Billings, NY", "Billings, OK",
  "Billingsley, AL", "Biloxi, MS", "Bingham, IL", "Bingham, ME", "Bingham, NE", "Bingham Lake, MN",
  "Binghamton, NY", "Birch River, WV", "Birch Run, MI", "Birch Tree, MO", "Birchdale, MN", "Birchwood, TN",
  "Birchwood, WI", "Bird City, KS", "Bird Island, MN", "Birdseye, IN", "Birdsboro, PA", "Birdsnest, VA",
  "Birmingham, AL", "Birmingham, IA", "Birmingham, MI", "Bisbee, AZ", "Bisbee, ND", "Biscoe, AR",
  "Biscoe, NC", "Bishop, CA", "Bishop, GA", "Bishop, TX", "Bishop Hill, IL", "Bishopville, MD",
  "Bishopville, SC", "Bismarck, AR", "Bismarck, IL", "Bismarck, MO", "Bismarck, ND", "Bison, KS",
  "Bison, OK", "Bison, SD", "Bitely, MI", "Bittinger, MD", "Black, AL", "Black, MO",
  "Black Canyon City, AZ", "Black Creek, NC", "Black Creek, WI", "Black Diamond, WA", "Black Eagle, MT", "Black Earth, WI",
  "Black Forest, CO", "Black Hawk, CO", "Black Hawk, SD", "Black Jack, MO", "Black Mountain, NC", "Black River, MI",
  "Black River, NY", "Black River Falls, WI", "Black Rock, AR", "Black Rock, CT", "Blackduck, MN", "Blackey, KY",
  "Blackfoot, ID", "Blackhawk, CA", "Blacklick, OH", "Blacksburg, SC", "Blacksburg, VA", "Blackshear, GA",
  "Blackstone, MA", "Blackstone, VA", "Blacksville, WV", "Blackwater, MO", "Blackwater, VA", "Blackwell, OK",
  "Blackwell, TX", "Blackwood, NJ", "Bladen, NE", "Bladenboro, NC", "Bladensburg, MD", "Blaine, KS",
  "Blaine, ME", "Blaine, MN", "Blaine, OH", "Blaine, TN", "Blaine, WA", "Blair, NE",
  "Blair, OK", "Blair, SC", "Blair, WI", "Blair, WV", "Blairsburg, IA", "Blairstown, IA",
  "Blairstown, MO", "Blairstown, NJ", "Blairsville, GA", "Blairsville, PA", "Blake, TX", "Blakeley, PA",
  "Blakely, GA", "Blakely, PA", "Blakesburg, IA", "Blanca, CO", "Blanchard, ID", "Blanchard, IA",
  "Blanchard, LA", "Blanchard, ME", "Blanchard, MI", "Blanchard, ND", "Blanchard, OK", "Blanchardville, WI",
  "Blanco, NM", "Blanco, TX", "Bland, MO", "Bland, VA", "Blandinsville, IL", "Blandon, PA",
  "Blanding, UT", "Blanford, IN", "Blanket, TX", "Blawnox, PA", "Bledsoe, KY", "Bledsoe, TX",
  "Blenheim, SC", "Blewett, WA", "Bliss, ID", "Bliss, NY", "Blissfield, MI", "Blissfield, OH",
  "Block Island, RI", "Blocker, OK", "Blocksburg, CA", "Blockton, IA", "Blodgett, MO", "Blodgett, OR",
  "Blomkest, MN", "Blood, TX", "Bloom, KS", "Bloomburg, TX", "Bloomdale, OH", "Bloomfield, CT",
  "Bloomfield, IA", "Bloomfield, IN", "Bloomfield, KY", "Bloomfield, ME", "Bloomfield, MO", "Bloomfield, MT",
  "Bloomfield, NE", "Bloomfield, NJ", "Bloomfield, NM", "Bloomfield, NY", "Bloomfield, VT", "Bloomfield Hills, MI",
  "Blooming Grove, NY", "Blooming Grove, TX", "Blooming Prairie, MN", "Bloomingburg, NY", "Bloomingburg, OH", "Bloomingdale, GA",
  "Bloomingdale, IL", "Bloomingdale, IN", "Bloomingdale, MI", "Bloomingdale, NJ", "Bloomingdale, NY", "Bloomingdale, OH",
  "Bloomingdale, TN", "Bloomington, CA", "Bloomington, IL", "Bloomington, IN", "Bloomington, MD", "Bloomington, MN",
  "Bloomington, NE", "Bloomington, NY", "Bloomington, TX", "Bloomington, WI", "Bloomsburg, PA", "Bloomsdale, MO",
  "Bloomville, NY", "Bloomville, OH", "Blossburg, PA", "Blossom, TX", "Blountstown, FL", "Blountsville, AL",
  "Blountville, TN", "Blowing Rock, NC", "Blue Anchor, NJ", "Blue Bell, PA", "Blue Diamond, NV", "Blue Earth, MN",
  "Blue Grass, IA", "Blue Hill, ME", "Blue Hill, NE", "Blue Island, IL", "Blue Jay, CA", "Blue Lake, CA",
  "Blue Mound, IL", "Blue Mound, KS", "Blue Mound, TX", "Blue Mountain, AL", "Blue Mountain, AR", "Blue Mountain, MS",
  "Blue Point, NY", "Blue Rapids, KS", "Blue Ridge, GA", "Blue Ridge, TX", "Blue Ridge, VA", "Blue Ridge Summit, PA",
  "Blue River, OR", "Blue River, WI", "Blue Springs, AL", "Blue Springs, MO", "Blue Springs, MS", "Blue Springs, NE",
  "Bluebell, UT", "Bluebird, NE", "Bluefield, VA", "Bluefield, WV", "Bluegrass, IA", "Bluemont, VA",
  "Bluff, UT", "Bluff City, KS", "Bluff City, TN", "Bluff Dale, TX", "Bluff Point, NY", "Bluffdale, UT",
  "Bluffs, IL", "Bluffton, GA", "Bluffton, IN", "Bluffton, OH", "Bluffton, SC", "Bluffton, TX",
  "Blunt, SD", "Bly, OR", "Blythe, CA", "Blythe, GA", "Blytheville, AR", "Blythewood, SC",
  "Boalsburg, PA", "Boardman, NC", "Boardman, OH", "Boardman, OR", "Boaz, AL", "Boaz, KY",
  "Boaz, WV", "Bob White, WV", "Bobtown, PA", "Boca Grande, FL", "Boca Raton, FL", "Bodega, CA",
  "Bodega Bay, CA", "Boerne, TX", "Bogalusa, LA", "Bogard, MO", "Bogata, TX", "Boggstown, IN",
  "Boiceville, NY", "Boise, ID", "Boise City, OK", "Bokchito, OK", "Bokoshe, OK", "Bolair, VA",
  "Boligee, AL", "Bolivar, MO", "Bolivar, NY", "Bolivar, OH", "Bolivar, PA", "Bolivar, TN",
  "Bolivar, WV", "Bolton, CT", "Bolton, MA", "Bolton, MS", "Bolton, NC", "Bolton Landing, NY",
  "Bomb City, TX", "Bon Aqua, TN", "Bon Secour, AL", "Bon Wier, TX", "Bonaire, GA", "Bonanaza, AR",
  "Bond, CO", "Bond, MS", "Bondsville, MA", "Bonduel, WI", "Bondville, IL", "Bondville, VT",
  "Bone Gap, IL", "Bonesteel, SD", "Bonfield, IL", "Bonham, TX", "Bonita, CA", "Bonita, LA",
  "Bonita Springs, FL", "Bonlee, NC", "Bonner, MT", "Bonner Springs, KS", "Bonners Ferry, ID", "Bonneville, KY",
  "Bonnieville, KY", "Bonnots Mill, MO", "Bono, AR", "Bonsall, CA", "Booker, TX", "Boone, CO",
  "Boone, IA", "Boone, NC", "Boone Grove, IN", "Booneville, AR", "Booneville, IN", "Booneville, KY",
  "Booneville, MS", "Boonsboro, MD", "Boonville, CA", "Boonville, IN", "Boonville, MO", "Boonville, NC",
  "Boonville, NY", "Booth, AL", "Boothbay, ME", "Boothbay Harbor, ME", "Boothwyn, PA", "Bordentown, NJ",
  "Borger, TX", "Boring, MD", "Boring, OR", "Boron, CA", "Bosque, NM", "Bosque Farms, NM",
  "Bossier City, LA", "Boston, GA", "Boston, IN", "Boston, KY", "Boston, MA", "Boston, NY",
  "Boston, TX", "Boston, VA", "Boswell, IN", "Boswell, OK", "Boswell, PA", "Botkins, OH",
  "Bottineau, ND", "Boulder, CO", "Boulder, MT", "Boulder, UT", "Boulder, WY", "Boulder City, NV",
  "Boulder Creek, CA", "Bound Brook, NJ", "Bountiful, UT", "Bourbon, IN", "Bourbon, MO", "Bourbonnais, IL",
  "Bovey, MN", "Bow, NH", "Bow, WA", "Bowbells, ND", "Bowden, GA", "Bowden, WV",
  "Bowdoin, ME", "Bowdoinham, ME", "Bowie, AZ", "Bowie, MD", "Bowie, TX", "Bowler, WI",
  "Bowlesville, VA", "Bowleys Quarters, MD", "Bowling Green, FL", "Bowling Green, IN", "Bowling Green, KY", "Bowling Green, MO",
  "Bowling Green, OH", "Bowling Green, SC", "Bowling Green, VA", "Bowman, GA", "Bowman, ND", "Bowman, SC",
  "Bowmanstown, PA", "Bowmansville, NY", "Bowmansville, PA", "Bowser, PA", "Box Elder, MT", "Box Elder, SD",
  "Boxborough, MA", "Boxford, MA", "Boyce, LA", "Boyce, VA", "Boyd, MN", "Boyd, MT",
  "Boyd, TX", "Boyd, WI", "Boyden, IA", "Boyds, MD", "Boyertown, PA", "Boykins, VA",
  "Boyle, MS", "Boylston, MA", "Boyne City, MI", "Boyne Falls, MI", "Boys Town, NE", "Bozeman, MT",
  "Bradenville, PA", "Bradford, AR", "Bradford, IL", "Bradford, IA", "Bradford, ME", "Bradford, NH",
  "Bradford, OH", "Bradford, PA", "Bradford, RI", "Bradford, TN", "Bradford, TX", "Bradford, VT",
  "Bradford Woods, PA", "Bradley, AR", "Bradley, CA", "Bradley, IL", "Bradley, ME", "Bradley, OK",
  "Bradley, SC", "Bradley, SD", "Bradley Beach, NJ", "Bradleyville, MO", "Bradner, OH", "Bradshaw, NE",
  "Bradshaw, WV", "Brady, MT", "Brady, NE", "Brady, TX", "Brady Lake, OH", "Brainard, NE",
  "Brainerd, MN", "Braintree, MA", "Braintree, VT", "Braithwaite, LA", "Bramwell, WV", "Branch, AR",
  "Branch, LA", "Branch, MI", "Branford, CT", "Branford, FL", "Branson, CO", "Branson, MO",
  "Branson West, MO", "Brant, MI", "Brant, NY", "Brantley, AL", "Brantwood, WI", "Brasher Falls, NY",
  "Braselton, GA", "Brashear, MO", "Brashear, TX", "Brasstown, NC", "Brattleboro, VT", "Braxton, MS",
  "Brayton, IA", "Brazoria, TX", "Brea, CA", "Breaux Bridge, LA", "Breckenridge, CO", "Breckenridge, MI",
  "Breckenridge, MN", "Breckenridge, MO", "Breckenridge, TX", "Breda, IA", "Breeden, WV", "Breeding, KY",
  "Breese, IL", "Bremerton, WA", "Brenham, TX", "Brennan, TX", "Brent, AL", "Brent, FL",
  "Brentford, SD", "Brentwood, CA", "Brentwood, MD", "Brentwood, MO", "Brentwood, NH", "Brentwood, NY",
  "Brentwood, PA", "Brentwood, TN", "Breslin, SD", "Brethren, MI", "Brevard, NC", "Brewer, ME",
  "Brewer, MO", "Brewerton, NY", "Brewster, KS", "Brewster, MA", "Brewster, MN", "Brewster, NE",
  "Brewster, NY", "Brewster, OH", "Brewster, WA", "Brewton, AL", "Briarcliff, NY", "Briarcliff Manor, NY",
  "Briarcliffe Acres, SC", "Briarfield, AL", "Brick, NJ", "Brickeys, AR", "Bridgehampton, NY", "Bridgeport, AL",
  "Bridgeport, CA", "Bridgeport, CT", "Bridgeport, IL", "Bridgeport, MI", "Bridgeport, NE", "Bridgeport, NY",
  "Bridgeport, OH", "Bridgeport, PA", "Bridgeport, TX", "Bridgeport, WV", "Bridges, MS", "Bridgeton, IN",
  "Bridgeton, MO", "Bridgeton, NC", "Bridgeton, NJ", "Bridgeville, CA", "Bridgeville, DE", "Bridgeville, PA",
  "Bridgewater, CT", "Bridgewater, IA", "Bridgewater, MA", "Bridgewater, ME", "Bridgewater, NH", "Bridgewater, NJ",
  "Bridgewater, NY", "Bridgewater, SD", "Bridgewater, VA", "Bridgewater, VT", "Bridgman, MI", "Bridgton, ME",
  "Brien, TX", "Brier, WA", "Brier Hill, NY", "Brierfield, AL", "Briggsville, WI", "Brigham City, UT",
  "Brighton, AL", "Brighton, CO", "Brighton, IA", "Brighton, IL", "Brighton, MA", "Brighton, MI",
  "Brighton, MO", "Brighton, NY", "Brighton, TN", "Brighton, UT", "Brightwood, OR", "Brightwood, VA",
  "Brimfield, IL", "Brimfield, MA", "Brimfield, OH", "Brimley, MI", "Brimson, MN", "Brinkley, AR",
  "Brinklow, MD", "Brinsmade, ND", "Brisbane, CA", "Bristol, CT", "Bristol, FL", "Bristol, GA",
  "Bristol, IL", "Bristol, IN", "Bristol, ME", "Bristol, NH", "Bristol, PA", "Bristol, RI",
  "Bristol, SD", "Bristol, TN", "Bristol, TX", "Bristol, VT", "Bristol, WI", "Bristolville, OH",
  "Bristow, IA", "Bristow, IN", "Bristow, NE", "Bristow, OK", "Bristow, VA", "Britton, MI",
  "Britton, SD", "Broad Brook, CT", "Broad Run, VA", "Broadalbain, NY", "Broadbrook, CT", "Broadlands, IL",
  "Broadus, MT", "Broadview, IL", "Broadview, MT", "Broadview, NM", "Broadview Heights, OH", "Broadway, NC",
  "Broadway, NJ", "Broadway, OH", "Broadway, VA", "Broadwell, IL", "Brock, NE", "Brock, TX",
  "Brockport, NY", "Brockton, MA", "Brockton, MT", "Brockway, CA", "Brockway, MI", "Brockway, PA",
  "Brodhead, KY", "Brodhead, WI", "Brodheadsville, PA", "Broken Arrow, OK", "Broken Bow, NE", "Broken Bow, OK",
  "Bronson, FL", "Bronson, IA", "Bronson, KS", "Bronson, MI", "Bronson, TX", "Bronwood, GA",
  "Bronx, NY", "Bronxville, NY", "Brook, IN", "Brook Park, MN", "Brook Park, OH", "Brooke, VA",
  "Brookdale, CA", "Brookeland, TX", "Brooker, FL", "Brookfield, CT", "Brookfield, IL", "Brookfield, MA",
  "Brookfield, MO", "Brookfield, NH", "Brookfield, NY", "Brookfield, OH", "Brookfield, VT", "Brookfield, WI",
  "Brookhaven, GA", "Brookhaven, MS", "Brookhaven, NY", "Brookhaven, PA", "Brookings, OR", "Brookings, SD",
  "Brookland, AR", "Brooklandville, MD", "Brooklet, GA", "Brookline, MA", "Brookline, MO", "Brookline, NH",
  "Brookline, VT", "Brookline Station, MO", "Brooklyn, CT", "Brooklyn, IA", "Brooklyn, IL", "Brooklyn, IN",
  "Brooklyn, MD", "Brooklyn, MI", "Brooklyn, MS", "Brooklyn, NY", "Brooklyn, OH", "Brooklyn, WI",
  "Brooklyn Center, MN", "Brooklyn Park, MN", "Brooks, CA", "Brooks, GA", "Brooks, KY", "Brooks, ME",
  "Brooks, MN", "Brooks, OR", "Brookshire, TX", "Brookside, AL", "Brookside, CO", "Brookside, DE",
  "Brookston, IN", "Brookston, TX", "Brooksville, FL", "Brooksville, KY", "Brooksville, ME", "Brooksville, MS",
  "Brookton, ME", "Brooktondale, NY", "Brookville, IN", "Brookville, KS", "Brookville, NY", "Brookville, OH",
  "Brookville, PA", "Brookwood, AL", "Broomall, PA", "Broomfield, CO", "Brooten, MN", "Broseley, MO",
  "Broussard, LA", "Browder, KY", "Brown City, MI", "Brown Deer, WI", "Brownfield, ME", "Brownfield, TX",
  "Browning, IL", "Browning, MO", "Browning, MT", "Browns, IL", "Browns Mills, NJ", "Browns Valley, MN",
  "Brownsburg, IN", "Brownsburg, VA", "Brownsdale, MN", "Brownstown, IL", "Brownstown, IN", "Brownstown, MI",
  "Brownstown, PA", "Brownsville, CA", "Brownsville, KY", "Brownsville, MN", "Brownsville, OR", "Brownsville, PA",
  "Brownsville, TN", "Brownsville, TX", "Brownsville, VT", "Brownton, MN", "Brownville, ME", "Brownville, NE",
  "Brownville, NY", "Brownwood, MO", "Brownwood, TX", "Bruce, MS", "Bruce, SD", "Bruce, WI",
  "Bruce Crossing, MI", "Bruceton, TN", "Bruceton Mills, WV", "Bruceville, IN", "Bruceville, TX", "Bruin, PA",
  "Brule, NE", "Brule, WI", "Brumley, MO", "Bruneau, ID", "Bruning, NE", "Bruno, MN",
  "Bruno, NE", "Bruno, WV", "Brunswick, GA", "Brunswick, ME", "Brunswick, MD", "Brunswick, MO",
  "Brunswick, NE", "Brunswick, NY", "Brunswick, OH", "Brush, CO", "Brush Creek, TN", "Brush Prairie, WA",
  "Brushton, NY", "Brushy, OK", "Brushy Creek, TX", "Bryan, OH", "Bryan, TX", "Bryant, AL",
  "Bryant, AR", "Bryant, IA", "Bryant, IN", "Bryant, SD", "Bryant, WA", "Bryant Pond, ME",
  "Bryans Road, MD", "Bryantsville, KY", "Bryanttown, MD", "Bryce, UT", "Bryn Athyn, PA", "Bryn Mawr, PA",
  "Bryson, TX", "Bryson City, NC", "Buchanan, GA", "Buchanan, MI", "Buchanan, NY", "Buchanan, TN",
  "Buchanan, VA", "Buchanan Dam, TX", "Buckatunna, MS", "Buckeye, AZ", "Buckeye, IA", "Buckeye, WV",
  "Buckeye Lake, OH", "Buckeystown, MD", "Buckfield, ME", "Buckhead, GA", "Buckholts, TX", "Buckhannon, WV",
  "Buckingham, FL", "Buckingham, IL", "Buckingham, IA", "Buckingham, PA", "Buckingham, VA", "Buckland, AK",
  "Buckland, MA", "Buckley, IL", "Buckley, MI", "Buckley, WA", "Bucklin, KS", "Bucklin, MO",
  "Buckner, AR", "Buckner, IL", "Buckner, KY", "Buckner, MO", "Bucksport, ME", "Bucyrus, KS",
  "Bucyrus, OH", "Bud, WV", "Budd Lake, NJ", "Budde, TX", "Buena, NJ", "Buena, WA",
  "Buena Park, CA", "Buena Vista, CO", "Buena Vista, GA", "Buena Vista, PA", "Buena Vista, TN", "Buena Vista, VA",
  "Buffalo, AL", "Buffalo, GA", "Buffalo, IA", "Buffalo, IL", "Buffalo, IN", "Buffalo, KS",
  "Buffalo, KY", "Buffalo, MN", "Buffalo, MO", "Buffalo, MT", "Buffalo, ND", "Buffalo, NY",
  "Buffalo, OH", "Buffalo, OK", "Buffalo, SC", "Buffalo, SD", "Buffalo, TX", "Buffalo, WV",
  "Buffalo, WY", "Buffalo Center, IA", "Buffalo Gap, SD", "Buffalo Gap, TX", "Buffalo Grove, IL", "Buffalo Lake, MN",
  "Buffalo Prairie, IL", "Buford, GA", "Buford, ND", "Buford, OH", "Buford, SC", "Buford, WY",
  "Buhl, AL", "Buhl, ID", "Buhl, MN", "Bulger, PA", "Bull Shoals, AR", "Bull Valley, IL",
  "Bullard, TX", "Bullhead City, AZ", "Bullock, NC", "Bulverde, TX", "Bumpass, VA", "Buna, TX",
  "Bunce, IL", "Bunceton, MO", "Buncombe, IL", "Bunker, MO", "Bunker Hill, IL", "Bunker Hill, IN",
  "Bunker Hill, KS", "Bunker Hill, WV", "Bunnell, FL", "Bunnlevel, NC", "Bunola, PA", "Burbank, CA",
  "Burbank, IL", "Burbank, OH", "Burbank, SD", "Burbank, WA", "Burdett, KS", "Burdett, NY",
  "Burdette, AR", "Burdick, KS", "Bureau, IL", "Burgaw, NC", "Burgess, VA", "Burgettstown, PA",
  "Burghill, OH", "Burgoon, OH", "Burk, TX", "Burke, ID", "Burke, NY", "Burke, SD",
  "Burke, VA", "Burke, VT", "Burkesville, KY", "Burkettsville, OH", "Burkeville, TX", "Burkeville, VA",
  "Burley, ID", "Burley, WA", "Burleson, TX", "Burley, ID", "Burlington, CO", "Burlington, CT",
  "Burlington, IA", "Burlington, IL", "Burlington, IN", "Burlington, KS", "Burlington, KY", "Burlington, MA",
  "Burlington, ME", "Burlington, MI", "Burlington, NC", "Burlington, ND", "Burlington, NJ", "Burlington, NY",
  "Burlington, OH", "Burlington, OK", "Burlington, TX", "Burlington, VT", "Burlington, WA", "Burlington, WI",
  "Burlington, WV", "Burnettsville, IN", "Burneyville, OK", "Burnham, IL", "Burnham, ME", "Burnham, PA",
  "Burns, KS", "Burns, OR", "Burns, TN", "Burns, WY", "Burns Flat, OK", "Burns Harbor, IN",
  "Burnside, IL", "Burnside, KY", "Burnside, LA", "Burnsville, MN", "Burnsville, MS", "Burnsville, NC",
  "Burnsville, WV", "Burnt Hills, NY", "Burnt Prairie, IL", "Burr, NE", "Burr Oak, KS", "Burr Oak, MI",
  "Burr Ridge, IL", "Burrell, PA", "Burrillville, RI", "Burris, WY", "Burrton, KS", "Burton, MI",
  "Burton, OH", "Burton, SC", "Burton, TX", "Burton, WA", "Burton, WV", "Burtonsville, MD",
  "Burwell, NE", "Bushnell, FL", "Bushnell, IL", "Bushnell, NE", "Bushnell, SD", "Busseyville, KY",
  "Bustleton, PA", "Butler, AL", "Butler, GA", "Butler, IL", "Butler, IN", "Butler, KY",
  "Butler, MO", "Butler, NJ", "Butler, OH", "Butler, OK", "Butler, PA", "Butler, SD",
  "Butler, TN", "Butler, WI", "Butlerville, IN", "Butte, AK", "Butte, MT", "Butte, ND",
  "Butte, NE", "Butte City, CA", "Butte des Morts, WI", "Butte Falls, OR", "Butterfield, MN", "Butterfield, MO",
  "Butternuts, NY", "Buttonwillow, CA", "Buttonwood, PA", "Buttzville, NJ", "Buxton, IA", "Buxton, ME",
  "Buxton, ND", "Buxton, OR", "Buzzards Bay, MA", "Byars, OK", "Bybee, TN", "Byers, CO",
  "Byers, KS", "Byers, TX", "Byesville, OH", "Byfield, MA", "Bylas, AZ", "Bynum, AL",
  "Bynum, MT", "Bynum, TX", "Byrdstown, TN", "Byron, CA", "Byron, GA", "Byron, IL",
  "Byron, MI", "Byron, MN", "Byron, NY", "Byron, OK", "Byron, WY", "Byron Center, MI"
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [currentView, setCurrentView] = useState<'home' | 'lawyers' | 'practiceAreas' | 'cities' | 'about'>('home');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showExcelImport, setShowExcelImport] = useState(false);
  const [showBulkManager, setShowBulkManager] = useState(false);
  const [showGitHubSync, setShowGitHubSync] = useState(false);
  const [showSitemapManager, setShowSitemapManager] = useState(false);
  const [lawyersData, setLawyersData] = useState<Lawyer[]>(lawyers);
  const [citySearchTerm, setCitySearchTerm] = useState('');

  // Filter lawyers based on search criteria
  const filteredLawyers = useMemo(() => {
    return lawyersData.filter(lawyer => {
      const matchesSearch = !searchTerm || 
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.practiceAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase())) ||
        lawyer.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPracticeArea = !selectedPracticeArea || 
        lawyer.practiceAreas.some(area => area.toLowerCase().includes(selectedPracticeArea.toLowerCase()));
      
      const matchesLocation = !selectedLocation || 
        lawyer.location.toLowerCase().includes(selectedLocation.toLowerCase());
      
      const matchesAvailability = !selectedAvailability || 
        lawyer.availability === selectedAvailability;
      
      const matchesRating = !selectedRating || 
        lawyer.rating >= parseFloat(selectedRating);
      
      return matchesSearch && matchesPracticeArea && matchesLocation && matchesAvailability && matchesRating;
    });
  }, [lawyersData, searchTerm, selectedPracticeArea, selectedLocation, selectedAvailability, selectedRating]);

  // Filter cities based on search
  const filteredCities = useMemo(() => {
    if (!citySearchTerm) return cities;
    return cities.filter(city => 
      city.toLowerCase().includes(citySearchTerm.toLowerCase())
    );
  }, [citySearchTerm]);

  const handleAddLawyer = (newLawyer: Omit<Lawyer, 'id'>) => {
    const addedLawyer = addLawyer(newLawyer);
    setLawyersData([...lawyersData, addedLawyer]);
  };

  const handleUpdateLawyer = (id: number, updates: Partial<Lawyer>) => {
    const updatedLawyer = updateLawyer(id, updates);
    if (updatedLawyer) {
      setLawyersData(lawyersData.map(l => l.id === id ? updatedLawyer : l));
    }
  };

  const handleDeleteLawyer = (id: number) => {
    const success = deleteLawyer(id);
    if (success) {
      setLawyersData(lawyersData.filter(l => l.id !== id));
    }
  };

  const handleImportLawyers = (importedLawyers: Omit<Lawyer, 'id'>[]) => {
    const newLawyers = importedLawyers.map(lawyer => addLawyer(lawyer));
    setLawyersData([...lawyersData, ...newLawyers]);
  };

  const handleSyncFromGitHub = (githubLawyers: Lawyer[]) => {
    setLawyersData(githubLawyers);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedPracticeArea('');
    setSelectedLocation('');
    setSelectedAvailability('');
    setSelectedRating('');
  };

  const renderHomepage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEOHead type="homepage" />
      <SchemaMarkup type="homepage" />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Find the Right
                  <span className="block text-blue-300">Lawyer for You</span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                  Connect with experienced attorneys in your area. Browse verified lawyers by practice area and location.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-blue-200">
                  <CheckCircle className="h-5 w-5" />
                  <span>Verified Attorneys</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-200">
                  <CheckCircle className="h-5 w-5" />
                  <span>Client Reviews</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-200">
                  <CheckCircle className="h-5 w-5" />
                  <span>Free Consultations</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold mb-6">Quick Lawyer Search</h2>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, practice area, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/90 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={selectedPracticeArea}
                    onChange={(e) => setSelectedPracticeArea(e.target.value)}
                    className="px-3 py-3 bg-white/90 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent text-gray-900"
                  >
                    <option value="">All Practice Areas</option>
                    {practiceAreas.slice(0, 20).map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="px-3 py-3 bg-white/90 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent text-gray-900"
                  >
                    <option value="">All Locations</option>
                    {cities.slice(0, 20).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={() => setCurrentView('lawyers')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Search className="h-5 w-5" />
                  <span>Find Lawyers ({filteredLawyers.length})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">{lawyersData.length.toLocaleString()}</div>
              <div className="text-gray-600">Verified Lawyers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">{practiceAreas.length}</div>
              <div className="text-gray-600">Practice Areas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">{cities.length.toLocaleString()}</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Practice Areas */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Practice Areas</h2>
            <p className="text-xl text-gray-600">Find specialized attorneys for your legal needs</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {practiceAreas.slice(0, 12).map((area, index) => {
              const lawyerCount = Math.floor(Math.random() * 500) + 50;
              const icons = [Scale, Briefcase, Users, Building, GraduationCap, Award, Clock, CheckCircle, ExternalLink, Globe, Phone, Mail];
              const Icon = icons[index % icons.length];
              
              return (
                <div
                  key={area}
                  onClick={() => {
                    setSelectedPracticeArea(area);
                    setCurrentView('lawyers');
                  }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200 group"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{area}</h3>
                  <p className="text-sm text-gray-600">{lawyerCount.toLocaleString()} lawyers</p>
                </div>
              );
            })}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setCurrentView('practiceAreas')}
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <span>View All Practice Areas</span>
              <ChevronDown className="h-5 w-5 rotate-[-90deg]" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Cities */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Lawyers by City</h2>
            <p className="text-xl text-gray-600">Browse attorneys in major cities across the United States</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {cities.slice(0, 12).map((city, index) => {
              const lawyerCount = Math.floor(Math.random() * 500) + 50;
              
              return (
                <div
                  key={city}
                  onClick={() => {
                    setSelectedLocation(city);
                    setCurrentView('lawyers');
                  }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200 group"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <MapPin className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">{city}</h3>
                  <p className="text-sm text-gray-600">{lawyerCount.toLocaleString()} lawyers</p>
                </div>
              );
            })}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setCurrentView('cities')}
              className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <span>Browse All Cities</span>
              <ChevronDown className="h-5 w-5 rotate-[-90deg]" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Lawyers */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top Rated Lawyers</h2>
            <p className="text-xl text-gray-600">Highly recommended attorneys with excellent client reviews</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {lawyersData.slice(0, 6).map((lawyer) => (
              <div key={lawyer.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <LazyImage
                      src={lawyer.image || 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg'}
                      alt={lawyer.name}
                      className="w-16 h-16 rounded-full object-cover"
                      priority={true}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{lawyer.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{lawyer.practiceAreas.slice(0, 2).join(', ')}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{lawyer.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{lawyer.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{lawyer.about}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <a
                      href={`tel:${lawyer.phone}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Call</span>
                    </a>
                    <a
                      href={`mailto:${lawyer.email}`}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-center py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setCurrentView('lawyers')}
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <span>View All Lawyers</span>
              <ChevronDown className="h-5 w-5 rotate-[-90deg]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLawyers = () => (
    <div className="min-h-screen bg-gray-50">
      <SEOHead type="directory" />
      <SchemaMarkup type="directory" lawyers={lawyersData} />
      
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Find Your Lawyer</h1>
              <p className="text-gray-600 mt-1">
                {filteredLawyers.length.toLocaleString()} lawyers found
                {(searchTerm || selectedPracticeArea || selectedLocation) && (
                  <button
                    onClick={clearFilters}
                    className="ml-2 text-blue-600 hover:text-blue-800 underline"
                  >
                    Clear filters
                  </button>
                )}
              </p>
            </div>
            
            {isAdminMode && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Lawyer</span>
                </button>
                <button
                  onClick={() => setShowExcelImport(true)}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  <span>Excel Import</span>
                </button>
                <button
                  onClick={() => setShowBulkManager(true)}
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Database className="h-4 w-4" />
                  <span>Bulk Manager</span>
                </button>
                <button
                  onClick={() => setShowGitHubSync(true)}
                  className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub Sync</span>
                </button>
                <button
                  onClick={() => setShowSitemapManager(true)}
                  className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Sitemap className="h-4 w-4" />
                  <span>SEO Sitemap</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search lawyers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedPracticeArea}
              onChange={(e) => setSelectedPracticeArea(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Practice Areas</option>
              {practiceAreas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Availability</option>
              <option value="Available">Available</option>
              <option value="Limited">Limited</option>
              <option value="Busy">Busy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lawyers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredLawyers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No lawyers found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all lawyers.</p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLawyers.map((lawyer) => (
              <div key={lawyer.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <LazyImage
                      src={lawyer.image || 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg'}
                      alt={lawyer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{lawyer.name}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{lawyer.rating}</span>
                          <span className="text-sm text-gray-500">({lawyer.reviews} reviews)</span>
                        </div>
                        {lawyer.verified && (
                          <CheckCircle className="h-4 w-4 text-green-500" title="Verified Attorney" />
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{lawyer.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{lawyer.experience} years experience</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {lawyer.practiceAreas.slice(0, 3).map((area, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          {area}
                        </span>
                      ))}
                      {lawyer.practiceAreas.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          +{lawyer.practiceAreas.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">{lawyer.about}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Education:</span>
                      <span className="font-medium text-gray-900">{lawyer.college}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Availability:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lawyer.availability === 'Available' ? 'bg-green-100 text-green-800' :
                        lawyer.availability === 'Limited' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {lawyer.availability}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex space-x-2">
                    <a
                      href={`tel:${lawyer.phone}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Call</span>
                    </a>
                    <a
                      href={`mailto:${lawyer.email}`}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-center py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderPracticeAreas = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Practice Areas</h1>
          <p className="text-xl text-gray-600">Browse lawyers by legal specialty - {practiceAreas.length} practice areas available</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {practiceAreas.map((area, index) => {
            const lawyerCount = Math.floor(Math.random() * 500) + 50;
            const icons = [Scale, Briefcase, Users, Building, GraduationCap, Award, Clock, CheckCircle, ExternalLink, Globe, Phone, Mail];
            const Icon = icons[index % icons.length];
            
            return (
              <div
                key={area}
                onClick={() => {
                  setSelectedPracticeArea(area);
                  setCurrentView('lawyers');
                }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200 group"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{area}</h3>
                <p className="text-sm text-gray-600 mb-3">{lawyerCount.toLocaleString()} lawyers available</p>
                <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span className="text-sm font-medium">View Lawyers</span>
                  <ChevronDown className="h-4 w-4 ml-1 rotate-[-90deg]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderCities = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse All Cities</h1>
          <p className="text-xl text-gray-600 mb-6">Find lawyers in cities across the United States - {cities.length.toLocaleString()} cities available</p>
          
          {/* City Search */}
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search cities..."
                value={citySearchTerm}
                onChange={(e) => setCitySearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Search by city name or state abbreviation (e.g., "Houston" or "TX")
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredCities.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No cities found</h3>
            <p className="text-gray-600 mb-4">Try a different search term or browse all cities.</p>
            <button
              onClick={() => setCitySearchTerm('')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Show All Cities
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredCities.length.toLocaleString()} of {cities.length.toLocaleString()} cities
                {citySearchTerm && (
                  <button
                    onClick={() => setCitySearchTerm('')}
                    className="ml-2 text-blue-600 hover:text-blue-800 underline"
                  >
                    Clear search
                  </button>
                )}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCities.map((city, index) => {
                const lawyerCount = Math.floor(Math.random() * 500) + 50;
                
                return (
                  <div
                    key={city}
                    onClick={() => {
                      setSelectedLocation(city);
                      setCurrentView('lawyers');
                    }}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-green-200 group"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                        <MapPin className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">{city}</h3>
                    <p className="text-sm text-gray-600 mb-3">{lawyerCount.toLocaleString()} lawyers available</p>
                    <div className="flex items-center text-green-600 group-hover:text-green-700 transition-colors">
                      <span className="text-sm font-medium">View Lawyers</span>
                      <ChevronDown className="h-4 w-4 ml-1 rotate-[-90deg]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About Attorneys-deets</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Attorneys-deets is a comprehensive directory of legal professionals designed to help you find the right lawyer for your specific needs. 
              Our platform connects clients with qualified attorneys across all practice areas and locations.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              We believe everyone deserves access to quality legal representation. Our mission is to make it easier for people to find, 
              research, and connect with experienced attorneys who can help them navigate their legal challenges.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Attorneys-deets?</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Comprehensive database of verified attorneys</li>
              <li>Detailed lawyer profiles with client reviews</li>
              <li>Advanced search and filtering options</li>
              <li>Coverage across all practice areas</li>
              <li>Nationwide geographic coverage</li>
              <li>Direct contact information for easy communication</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              Have questions or need assistance? We're here to help you find the legal representation you need.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div 
                onClick={() => setCurrentView('home')}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Scale className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Attorneys-deets</span>
              </div>
              
              <div className="hidden md:flex space-x-6">
                <button
                  onClick={() => setCurrentView('home')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    currentView === 'home' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => setCurrentView('lawyers')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    currentView === 'lawyers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Find Lawyers
                </button>
                <button
                  onClick={() => setCurrentView('practiceAreas')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    currentView === 'practiceAreas' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Practice Areas
                </button>
                <button
                  onClick={() => setCurrentView('cities')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    currentView === 'cities' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cities
                </button>
                <button
                  onClick={() => setCurrentView('about')}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    currentView === 'about' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  About
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isAdminMode 
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {currentView === 'home' && renderHomepage()}
      {currentView === 'lawyers' && renderLawyers()}
      {currentView === 'practiceAreas' && renderPracticeAreas()}
      {currentView === 'cities' && renderCities()}
      {currentView === 'about' && renderAbout()}

      {/* Modals */}
      {showAddForm && (
        <AddLawyerForm
          onAddLawyer={handleAddLawyer}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {showExcelImport && (
        <ExcelImport
          onImportLawyers={handleImportLawyers}
          onClose={() => setShowExcelImport(false)}
        />
      )}

      {showBulkManager && (
        <BulkDataManager
          lawyers={lawyersData}
          onImportLawyers={handleImportLawyers}
          onUpdateLawyer={handleUpdateLawyer}
          onDeleteLawyer={handleDeleteLawyer}
          onClose={() => setShowBulkManager(false)}
        />
      )}

      {showGitHubSync && (
        <GitHubSync
          lawyers={lawyersData}
          onSyncFromGitHub={handleSyncFromGitHub}
          onClose={() => setShowGitHubSync(false)}
        />
      )}

      {showSitemapManager && (
        <SitemapManager
          lawyers={lawyersData}
          onClose={() => setShowSitemapManager(false)}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">Attorneys-deets</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted directory for finding qualified legal professionals. 
                Connect with experienced attorneys across all practice areas and locations.
              </p>
              <div className="flex space-x-4">
                <div className="text-sm text-gray-400">
                  <strong className="text-white">{lawyersData.length.toLocaleString()}</strong> Verified Lawyers
                </div>
                <div className="text-sm text-gray-400">
                  <strong className="text-white">{practiceAreas.length}</strong> Practice Areas
                </div>
                <div className="text-sm text-gray-400">
                  <strong className="text-white">{cities.length.toLocaleString()}</strong> Cities
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={() => setCurrentView('lawyers')} className="text-gray-400 hover:text-white transition-colors">Find Lawyers</button></li>
                <li><button onClick={() => setCurrentView('practiceAreas')} className="text-gray-400 hover:text-white transition-colors">Practice Areas</button></li>
                <li><button onClick={() => setCurrentView('cities')} className="text-gray-400 hover:text-white transition-colors">Browse Cities</button></li>
                <li><button onClick={() => setCurrentView('about')} className="text-gray-400 hover:text-white transition-colors">About Us</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Popular Areas</h3>
              <ul className="space-y-2">
                {practiceAreas.slice(0, 5).map(area => (
                  <li key={area}>
                    <button 
                      onClick={() => {
                        setSelectedPracticeArea(area);
                        setCurrentView('lawyers');
                      }}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {area}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Attorneys-deets. All rights reserved. Professional legal directory.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;