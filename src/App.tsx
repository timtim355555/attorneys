import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Mail, Star, Users, Plus, X, Filter, ChevronDown, Award, Shield, Clock, MessageCircle, ArrowLeft } from 'lucide-react';

// Avvo-style Header Component
const AvvoHeader = ({ currentView, setCurrentView }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button 
                onClick={() => {
                  setCurrentView('home');
                  window.history.pushState({}, '', '/');
                }}
                className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
              >
                Attorneys-deets
              </button>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Find a Lawyer</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Legal Advice</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Reviews</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Resources</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 text-sm font-medium">Sign In</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              For Lawyers
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Avvo-style Hero Section
const AvvoHeroSection = ({ onSearch, searchTerm, setSearchTerm, selectedLocation, setSelectedLocation }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find the right lawyer for you
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Connect with experienced attorneys in your area. Get the legal help you need.
          </p>
          
          {/* Avvo-style Search Form */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={onSearch} className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Legal Issue</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="e.g., Personal Injury, Divorce, DUI"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="City, State"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors font-medium flex items-center justify-center space-x-2"
                  >
                    <Search className="h-5 w-5" />
                    <span>Find Lawyers</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// All States View Component
const AllStatesView = ({ setCurrentView }) => {
  const allStates = [
    { name: 'Alabama', count: '8,432', abbr: 'AL' },
    { name: 'Alaska', count: '1,234', abbr: 'AK' },
    { name: 'Arizona', count: '10,654', abbr: 'AZ' },
    { name: 'Arkansas', count: '4,321', abbr: 'AR' },
    { name: 'California', count: '45,678', abbr: 'CA' },
    { name: 'Colorado', count: '8,765', abbr: 'CO' },
    { name: 'Connecticut', count: '6,543', abbr: 'CT' },
    { name: 'Delaware', count: '2,109', abbr: 'DE' },
    { name: 'Florida', count: '28,901', abbr: 'FL' },
    { name: 'Georgia', count: '16,432', abbr: 'GA' },
    { name: 'Hawaii', count: '2,876', abbr: 'HI' },
    { name: 'Idaho', count: '3,210', abbr: 'ID' },
    { name: 'Illinois', count: '22,345', abbr: 'IL' },
    { name: 'Indiana', count: '7,321', abbr: 'IN' },
    { name: 'Iowa', count: '4,567', abbr: 'IA' },
    { name: 'Kansas', count: '4,890', abbr: 'KS' },
    { name: 'Kentucky', count: '5,432', abbr: 'KY' },
    { name: 'Louisiana', count: '7,654', abbr: 'LA' },
    { name: 'Maine', count: '2,345', abbr: 'ME' },
    { name: 'Maryland', count: '5,987', abbr: 'MD' },
    { name: 'Massachusetts', count: '9,543', abbr: 'MA' },
    { name: 'Michigan', count: '14,210', abbr: 'MI' },
    { name: 'Minnesota', count: '7,890', abbr: 'MN' },
    { name: 'Mississippi', count: '3,456', abbr: 'MS' },
    { name: 'Missouri', count: '6,210', abbr: 'MO' },
    { name: 'Montana', count: '2,109', abbr: 'MT' },
    { name: 'Nebraska', count: '3,456', abbr: 'NE' },
    { name: 'Nevada', count: '5,678', abbr: 'NV' },
    { name: 'New Hampshire', count: '2,345', abbr: 'NH' },
    { name: 'New Jersey', count: '13,987', abbr: 'NJ' },
    { name: 'New Mexico', count: '3,210', abbr: 'NM' },
    { name: 'New York', count: '38,234', abbr: 'NY' },
    { name: 'North Carolina', count: '15,321', abbr: 'NC' },
    { name: 'North Dakota', count: '1,456', abbr: 'ND' },
    { name: 'Ohio', count: '17,654', abbr: 'OH' },
    { name: 'Oklahoma', count: '5,432', abbr: 'OK' },
    { name: 'Oregon', count: '6,789', abbr: 'OR' },
    { name: 'Pennsylvania', count: '19,876', abbr: 'PA' },
    { name: 'Rhode Island', count: '1,876', abbr: 'RI' },
    { name: 'South Carolina', count: '6,543', abbr: 'SC' },
    { name: 'South Dakota', count: '1,654', abbr: 'SD' },
    { name: 'Tennessee', count: '8,432', abbr: 'TN' },
    { name: 'Texas', count: '32,567', abbr: 'TX' },
    { name: 'Utah', count: '4,321', abbr: 'UT' },
    { name: 'Vermont', count: '1,234', abbr: 'VT' },
    { name: 'Virginia', count: '12,876', abbr: 'VA' },
    { name: 'Washington', count: '11,765', abbr: 'WA' },
    { name: 'West Virginia', count: '2,345', abbr: 'WV' },
    { name: 'Wisconsin', count: '4,876', abbr: 'WI' },
    { name: 'Wyoming', count: '1,098', abbr: 'WY' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={() => {
            setCurrentView('home');
            window.history.pushState({}, '', '/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All States</h1>
        <p className="text-gray-600">Find qualified attorneys in all 50 states</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allStates.map((state, index) => (
          <a
            key={index}
            href="#"
            className="group bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-4 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 group-hover:bg-blue-200 text-blue-600 font-bold text-sm px-3 py-2 rounded">
                {state.abbr}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                  {state.name}
                </h3>
                <p className="text-sm text-gray-600">{state.count} lawyers</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

// All Cities View Component
const AllCitiesView = ({ setCurrentView }) => {
  const allCities = [
    'Abbeville', 'Aberdeen', 'Abilene', 'Abingdon', 'Abington', 'Acton', 'Ada', 'Adams', 'Addison', 'Adrian',
    'Affton', 'Agawam', 'Agoura Hills', 'Aiken', 'Air Force Academy', 'Airmont', 'Akron', 'Alameda', 'Alamogordo', 'Alamosa',
    'Albany', 'Albert Lea', 'Albertville', 'Albion', 'Albuquerque', 'Alexandria', 'Algonquin', 'Alhambra', 'Alice', 'Aliquippa',
    'Aliso Viejo', 'Allen', 'Allendale', 'Allentown', 'Alliance', 'Alma', 'Alpena', 'Alpharetta', 'Alpine', 'Alton',
    'Altus', 'Alvin', 'Amarillo', 'Ambler', 'Amelia', 'American Fork', 'Americus', 'Ames', 'Amherst', 'Amityville',
    'Amsterdam', 'Anacortes', 'Anaheim', 'Anchorage', 'Anderson', 'Andover', 'Angola', 'Ann Arbor', 'Annapolis', 'Anniston',
    'Ansonia', 'Antioch', 'Apache Junction', 'Apex', 'Apopka', 'Apple Valley', 'Appleton', 'Arcadia', 'Archdale', 'Ardmore',
    'Arlington', 'Arlington Heights', 'Arroyo Grande', 'Artesia', 'Arthur', 'Arvada', 'Asbury Park', 'Ashdown', 'Asheville', 'Ashland',
    'Ashtabula', 'Aspen', 'Astoria', 'Atchison', 'Athens', 'Atlanta', 'Atlantic City', 'Atmore', 'Attleboro', 'Auburn',
    'Augusta', 'Aurora', 'Austin', 'Aventura', 'Avon', 'Avondale', 'Azle', 'Azusa', 'Babylon', 'Bainbridge Island',
    'Baker', 'Bakersfield', 'Baldwin', 'Baldwin Park', 'Ball Ground', 'Ballwin', 'Baltimore', 'Bangor', 'Banning', 'Bar Harbor',
    'Barberton', 'Bardstown', 'Barnstable', 'Barre', 'Bartlett', 'Bartlesville', 'Barton', 'Bastrop', 'Batavia', 'Batesville',
    'Bath', 'Baton Rouge', 'Battle Creek', 'Bay City', 'Bay Shore', 'Bay Village', 'Bayonne', 'Baytown', 'Beach Park', 'Beacon',
    'Beatrice', 'Beaufort', 'Beaumont', 'Beavercreek', 'Beaverton', 'Bedford', 'Beech Grove', 'Bell', 'Bell Gardens', 'Bella Vista',
    'Bellaire', 'Bellevue', 'Bellflower', 'Bellingham', 'Bellmawr', 'Bellmore', 'Bellwood', 'Belmont', 'Beloit', 'Belvidere',
    'Bemidji', 'Bend', 'Benicia', 'Bennington', 'Bensenville', 'Benton', 'Benton Harbor', 'Bentonville', 'Berea', 'Berkeley',
    'Berlin', 'Bernalillo', 'Berwyn', 'Bessemer', 'Bethany', 'Bethel', 'Bethesda', 'Bethlehem', 'Bethpage', 'Beverly',
    'Beverly Hills', 'Biddeford', 'Big Rapids', 'Big Spring', 'Billings', 'Biloxi', 'Binghamton', 'Birmingham', 'Bismarck', 'Blackfoot',
    'Blacksburg', 'Blaine', 'Blair', 'Bloomfield', 'Bloomington', 'Blue Island', 'Blue Springs', 'Bluffton', 'Blythe', 'Boardman',
    'Boaz', 'Boca Raton', 'Bogalusa', 'Boise', 'Bolingbrook', 'Bonita Springs', 'Boone', 'Boonville', 'Borger', 'Bossier City',
    'Boston', 'Boulder', 'Bountiful', 'Bourne', 'Bowie', 'Bowling Green', 'Boynton Beach', 'Bozeman', 'Bradenton', 'Bradford',
    'Bradley', 'Brainerd', 'Braintree', 'Brandon', 'Branson', 'Brea', 'Breckenridge', 'Bremerton', 'Brentwood', 'Bridgeport',
    'Bridgeton', 'Bridgewater', 'Brighton', 'Bristol', 'Broadview Heights', 'Brockton', 'Broken Arrow', 'Bronx', 'Brookfield', 'Brookhaven',
    'Brookings', 'Brooklyn', 'Brooklyn Center', 'Brooklyn Park', 'Brooks', 'Brooksville', 'Broomfield', 'Brownsburg', 'Brownsville', 'Brownwood',
    'Brunswick', 'Bryan', 'Buckeye', 'Bucyrus', 'Buena Park', 'Buffalo', 'Bullhead City', 'Burbank', 'Burley', 'Burleson',
    'Burlington', 'Burnsville', 'Burton', 'Butler', 'Butte', 'Byram', 'Cabot', 'Cadillac', 'Cahokia', 'Calabasas',
    'Caldwell', 'Caledonia', 'Calexico', 'Calgary', 'California City', 'Calumet City', 'Camarillo', 'Cambridge', 'Camden', 'Camelback East',
    'Campbell', 'Canandaigua', 'Canby', 'Candler-McAfee', 'Canton', 'Canyon', 'Cape Coral', 'Cape Girardeau', 'Carbondale', 'Carlisle',
    'Carlsbad', 'Carmel', 'Carmichael', 'Carol Stream', 'Carpentersville', 'Carrollton', 'Carson', 'Carson City', 'Carteret', 'Cary',
    'Casa Grande', 'Casper', 'Castle Rock', 'Castro Valley', 'Catskill', 'Cave Spring', 'Cedar Falls', 'Cedar Hill', 'Cedar Park', 'Cedar Rapids',
    'Cedarburg', 'Celebration', 'Centennial', 'Center Point', 'Centralia', 'Centre', 'Ceres', 'Cerritos', 'Chambersburg', 'Champaign',
    'Chandler', 'Channahon', 'Chantilly', 'Chapel Hill', 'Charleston', 'Charlotte', 'Charlottesville', 'Chattanooga', 'Cheektowaga', 'Chelsea',
    'Cheltenham', 'Chesapeake', 'Chester', 'Chesterfield', 'Chesterton', 'Cheyenne', 'Chicago', 'Chicago Heights', 'Chico', 'Chicopee',
    'Chino', 'Chino Hills', 'Chippewa Falls', 'Chula Vista', 'Cicero', 'Cincinnati', 'Citrus Heights', 'Claremont', 'Clarksburg', 'Clarksville',
    'Clayton', 'Clear Lake', 'Clearfield', 'Clearwater', 'Cleburne', 'Cleveland', 'Cleveland Heights', 'Clifton', 'Clinton', 'Clovis',
    'Coachella', 'Coal City', 'Coatesville', 'Cocoa', 'Cocoa Beach', 'Coeur d\'Alene', 'Coffeyville', 'College Park', 'College Station', 'Collierville',
    'Colorado Springs', 'Columbia', 'Columbus', 'Commerce', 'Commerce City', 'Compton', 'Concord', 'Conneaut', 'Conway', 'Coon Rapids',
    'Cooper City', 'Coppell', 'Coral Gables', 'Coral Springs', 'Coralville', 'Corona', 'Corpus Christi', 'Corvallis', 'Costa Mesa', 'Cottage Grove',
    'Council Bluffs', 'Covina', 'Covington', 'Cranford', 'Cranston', 'Crestview', 'Crestwood', 'Creve Coeur', 'Crofton', 'Crossville',
    'Crown Point', 'Crystal', 'Crystal Lake', 'Culver City', 'Cumberland', 'Cupertino', 'Cutler Bay', 'Cuyahoga Falls', 'Cypress', 'Dallas',
    'Dalton', 'Daly City', 'Danbury', 'Danvers', 'Danville', 'Darien', 'Dartmouth', 'Davenport', 'Davidson', 'Davis',
    'Dayton', 'Daytona Beach', 'De Pere', 'DeKalb', 'DeSoto', 'Dearborn', 'Dearborn Heights', 'Decatur', 'Dedham', 'Deerfield',
    'Deerfield Beach', 'DeForest', 'Del Rio', 'Delano', 'Delaware', 'Delray Beach', 'Delta', 'Deltona', 'Denham Springs', 'Denison',
    'Denton', 'Denver', 'Derby', 'Des Moines', 'Des Plaines', 'Desert Hot Springs', 'Detroit', 'Detroit Lakes', 'Dickinson', 'Doral',
    'Dothan', 'Dover', 'Downers Grove', 'Downey', 'Doylestown', 'Draper', 'Dublin', 'Dubuque', 'Duluth', 'Duncan',
    'Duncanville', 'Dunedin', 'Dunkirk', 'Durham', 'Eagle', 'Eagle Pass', 'East Chicago', 'East Cleveland', 'East Grand Rapids', 'East Hartford',
    'East Haven', 'East Lansing', 'East Orange', 'East Peoria', 'East Providence', 'East St. Louis', 'Eastlake', 'Easton', 'Eastpointe', 'Eaton',
    'Eau Claire', 'Eden Prairie', 'Edina', 'Edinburg', 'Edison', 'Edmond', 'Edmonds', 'El Cajon', 'El Centro', 'El Cerrito',
    'El Dorado', 'El Monte', 'El Paso', 'El Segundo', 'Elgin', 'Elizabeth', 'Elizabethtown', 'Elk Grove', 'Elkhart', 'Elkton',
    'Ellicott City', 'Elmhurst', 'Elmira', 'Elyria', 'Emporia', 'Encinitas', 'Enfield', 'Englewood', 'Enid', 'Enterprise',
    'Erie', 'Erlanger', 'Escondido', 'Escanaba', 'Euclid', 'Eugene', 'Euless', 'Evanston', 'Evansville', 'Everett',
    'Evergreen Park', 'Fairborn', 'Fairfax', 'Fairfield', 'Fairmont', 'Fairview Heights', 'Fall River', 'Falmouth', 'Fargo', 'Faribault',
    'Farmington', 'Farmington Hills', 'Fayetteville', 'Federal Way', 'Ferndale', 'Findlay', 'Fishers', 'Fitchburg', 'Flagstaff', 'Flint',
    'Florence', 'Florissant', 'Flower Mound', 'Flushing', 'Folsom', 'Fond du Lac', 'Fontana', 'Forest Park', 'Forrest City', 'Fort Collins',
    'Fort Dodge', 'Fort Knox', 'Fort Lauderdale', 'Fort Lee', 'Fort Myers', 'Fort Pierce', 'Fort Smith', 'Fort Walton Beach', 'Fort Wayne', 'Fort Worth',
    'Fountain Valley', 'Framingham', 'Franklin', 'Frederick', 'Fredericksburg', 'Freeport', 'Fremont', 'Fresno', 'Fridley', 'Friendswood',
    'Frisco', 'Fullerton', 'Fulton', 'Gadsden', 'Gainesville', 'Galesburg', 'Gallup', 'Galveston', 'Garden City', 'Garden Grove',
    'Gardena', 'Garfield', 'Garfield Heights', 'Garland', 'Gary', 'Gastonia', 'Georgetown', 'Germantown', 'Gettysburg', 'Gilbert',
    'Gilroy', 'Gladstone', 'Glastonbury', 'Glen Burnie', 'Glen Cove', 'Glen Ellyn', 'Glendale', 'Glendora', 'Glenn Heights', 'Glenview',
    'Globe', 'Gloucester', 'Gloversville', 'Godfrey', 'Golden', 'Golden Valley', 'Goldsboro', 'Goodlettsville', 'Goose Creek', 'Goshen',
    'Grand Forks', 'Grand Island', 'Grand Junction', 'Grand Prairie', 'Grand Rapids', 'Grandview', 'Granite City', 'Grapevine', 'Great Bend', 'Great Falls',
    'Greeley', 'Green', 'Green Bay', 'Green River', 'Greenacres', 'Greenfield', 'Greensboro', 'Greensburg', 'Greenville', 'Greenwood',
    'Greer', 'Gresham', 'Griffin', 'Griffith', 'Grimes', 'Grosse Pointe Woods', 'Groton', 'Grove City', 'Grover Beach', 'Gulfport',
    'Guntersville', 'Gurnee', 'Hackensack', 'Hagerstown', 'Hallandale Beach', 'Hamden', 'Hamilton', 'Hammond', 'Hampton', 'Hanford',
    'Hanover', 'Hanover Park', 'Harker Heights', 'Harlingen', 'Harriman', 'Harrisburg', 'Harrison', 'Harrisonburg', 'Hartford', 'Hartsville',
    'Harvey', 'Hastings', 'Hattiesburg', 'Haverhill', 'Hawthorne', 'Hayward', 'Hazleton', 'Hemet', 'Hempstead', 'Henderson',
    'Hendersonville', 'Henrietta', 'Hercules', 'Hereford', 'Hermitage', 'Herndon', 'Hesperia', 'Hialeah', 'Hibbing', 'Hickory',
    'High Point', 'Highland', 'Highland Park', 'Hillsboro', 'Hillsdale', 'Hilton Head Island', 'Hinesville', 'Hobbs', 'Hoboken', 'Hoffman Estates',
    'Holland', 'Hollister', 'Hollywood', 'Holyoke', 'Homestead', 'Homewood', 'Honolulu', 'Hoover', 'Hopkinsville', 'Hot Springs',
    'Houghton', 'Houston', 'Huber Heights', 'Hudson', 'Huntington', 'Huntington Beach', 'Huntington Park', 'Huntsville', 'Huron', 'Hurst',
    'Hutchinson', 'Hyde Park', 'Idaho Falls', 'Imperial Beach', 'Independence', 'Indianapolis', 'Indio', 'Inglewood', 'Inkster', 'Iowa City',
    'Irondequoit', 'Irvine', 'Irving', 'Irwindale', 'Ishpeming', 'Issaquah', 'Ithaca', 'Jackson', 'Jacksonville', 'Jamestown',
    'Janesville', 'Jefferson City', 'Jeffersonville', 'Jersey City', 'Johnson City', 'Johnstown', 'Joliet', 'Jonesboro', 'Joplin', 'Jupiter',
    'Jurupa Valley', 'Kalamazoo', 'Kalispell', 'Kannapolis', 'Kansas City', 'Kapolei', 'Kearney', 'Kearns', 'Keene', 'Keizer',
    'Keller', 'Kenmore', 'Kennewick', 'Kenosha', 'Kent', 'Kentwood', 'Kettering', 'Key West', 'Killeen', 'Kingsport',
    'Kingston', 'Kirkland', 'Kirkwood', 'Kissimmee', 'Klamath Falls', 'Knoxville', 'Kokomo', 'La Crosse', 'La Habra', 'La Mesa',
    'La Mirada', 'La Puente', 'Lacey', 'Lackawanna', 'Lafayette', 'Laguna Niguel', 'Lake Charles', 'Lake Forest', 'Lake Havasu City', 'Lake Oswego',
    'Lake Worth', 'Lakeland', 'Lakeville', 'Lakewood', 'Lancaster', 'Lansing', 'Laredo', 'Largo', 'Las Cruces', 'Las Vegas',
    'Lauderhill', 'Laurel', 'Lawrence', 'Lawton', 'League City', 'Leavenworth', 'Lebanon', 'Lee\'s Summit', 'Leesburg', 'Lehi',
    'Lemon Grove', 'Lenexa', 'Lewiston', 'Lewisville', 'Lexington', 'Liberal', 'Liberty', 'Lima', 'Lincoln', 'Linden',
    'Lindenhurst', 'Little Rock', 'Littleton', 'Live Oak', 'Livermore', 'Livonia', 'Lodi', 'Logan', 'Lombard', 'Lompoc',
    'Long Beach', 'Longmont', 'Longview', 'Lorain', 'Los Altos', 'Los Angeles', 'Los Gatos', 'Louisville', 'Loveland', 'Lowell',
    'Lubbock', 'Lynchburg', 'Lynn', 'Lynnwood', 'Macon', 'Madison', 'Madison Heights', 'Malden', 'Malibu', 'Manassas',
    'Manchester', 'Manhattan', 'Manhattan Beach', 'Mankato', 'Mansfield', 'Manteca', 'Maple Grove', 'Maplewood', 'Marana', 'Margate',
    'Marietta', 'Marina', 'Marion', 'Marlborough', 'Marshall', 'Marshalltown', 'Martinez', 'Mason', 'Mason City', 'Massillon',
    'Maywood', 'McAllen', 'McKinney', 'McLean', 'Medford', 'Melbourne', 'Memphis', 'Menasha', 'Mendota', 'Menlo Park',
    'Menomonee Falls', 'Mentor', 'Merced', 'Meriden', 'Meridian', 'Merrillville', 'Mesa', 'Mesquite', 'Methuen', 'Miami',
    'Miami Beach', 'Miami Gardens', 'Miami Lakes', 'Middletown', 'Midland', 'Midwest City', 'Milford', 'Mill Valley', 'Millbrae', 'Milledgeville',
    'Miller Place', 'Millville', 'Milton', 'Milwaukee', 'Minden', 'Minneapolis', 'Minnetonka', 'Minot', 'Miramar', 'Mission',
    'Mission Viejo', 'Missoula', 'Missouri City', 'Mobile', 'Modesto', 'Moline', 'Monroe', 'Monroeville', 'Montclair', 'Montebello',
    'Monterey', 'Monterey Park', 'Montgomery', 'Montpelier', 'Montrose', 'Moore', 'Moorhead', 'Moorpark', 'Moreno Valley', 'Morgan Hill',
    'Morristown', 'Morrisville', 'Moscow', 'Mount Pleasant', 'Mount Prospect', 'Mount Vernon', 'Mountain View', 'Muncie', 'Mundelein', 'Murfreesboro',
    'Murray', 'Murrieta', 'Muskegon', 'Muskogee', 'Myrtle Beach', 'Nacogdoches', 'Napa', 'Naperville', 'Nashua', 'Nashville',
    'National City', 'Naugatuck', 'Needham', 'Neenah', 'Neptune', 'New Albany', 'New Bedford', 'New Berlin', 'New Braunfels', 'New Britain',
    'New Brunswick', 'New Castle', 'New Haven', 'New Hope', 'New London', 'New Orleans', 'New Rochelle', 'New York', 'Newark', 'Newberg',
    'Newburgh', 'Newport', 'Newport Beach', 'Newport News', 'Newton', 'Niagara Falls', 'Niles', 'Norfolk', 'Normal', 'Norman',
    'North Charleston', 'North Chicago', 'North Las Vegas', 'North Little Rock', 'North Miami', 'North Miami Beach', 'North Olmsted', 'North Port', 'North Richland Hills', 'North Ridgeville',
    'Northampton', 'Northbrook', 'Northglenn', 'Norton', 'Norwalk', 'Norwich', 'Novato', 'Novi', 'Nutley', 'Oak Forest',
    'Oak Lawn', 'Oak Park', 'Oakland', 'Oakland Park', 'Oakley', 'Ocala', 'Oceanside', 'Ocoee', 'Odessa', 'Ogden',
    'Oklahoma City', 'Olathe', 'Olympia', 'Omaha', 'Ontario', 'Orange', 'Orange City', 'Orangeburg', 'Orem', 'Orlando',
    'Ormond Beach', 'Oshkosh', 'Oswego', 'Ottumwa', 'Overland Park', 'Owensboro', 'Oxnard', 'Pacifica', 'Paducah', 'Palatine',
    'Palm Bay', 'Palm Beach Gardens', 'Palm Coast', 'Palm Desert', 'Palm Springs', 'Palmdale', 'Palo Alto', 'Panama City', 'Paramount', 'Paris',
    'Park Ridge', 'Parkersburg', 'Parma', 'Pasadena', 'Pasco', 'Passaic', 'Paterson', 'Pawtucket', 'Peabody', 'Peachtree City',
    'Pearl', 'Pearl City', 'Pekin', 'Pembroke Pines', 'Pensacola', 'Peoria', 'Perris', 'Perth Amboy', 'Petaluma', 'Petersburg',
    'Pflugerville', 'Pharr', 'Phenix City', 'Philadelphia', 'Phoenix', 'Pickerington', 'Pico Rivera', 'Pierre', 'Pike Creek', 'Pine Bluff',
    'Pinellas Park', 'Pittsburg', 'Pittsburgh', 'Pittsfield', 'Placentia', 'Plainfield', 'Plano', 'Plant City', 'Plantation', 'Plattsburgh',
    'Pleasant Hill', 'Pleasanton', 'Plymouth', 'Pocatello', 'Pomona', 'Pompano Beach', 'Ponca City', 'Pontiac', 'Port Arthur', 'Port Orange',
    'Port St. Lucie', 'Portage', 'Portland', 'Portsmouth', 'Pottstown', 'Pottsville', 'Poughkeepsie', 'Powell', 'Prescott', 'Princeton',
    'Providence', 'Provo', 'Pueblo', 'Puyallup', 'Quincy', 'Racine', 'Raleigh', 'Rancho Cordova', 'Rancho Cucamonga', 'Rancho Palos Verdes',
    'Rancho Santa Margarita', 'Rapid City', 'Raytown', 'Reading', 'Redding', 'Redlands', 'Redmond', 'Redondo Beach', 'Redwood City', 'Reno',
    'Renton', 'Revere', 'Rexburg', 'Reynoldsburg', 'Richardson', 'Richfield', 'Richland', 'Richmond', 'Richmond Heights', 'Ridgewood',
    'Rio Rancho', 'Riverside', 'Riverton', 'Roanoke', 'Rochester', 'Rochester Hills', 'Rock Hill', 'Rock Island', 'Rockford', 'Rocklin',
    'Rockville', 'Rockwall', 'Rocky Mount', 'Rogers', 'Rohnert Park', 'Rolling Meadows', 'Rome', 'Romeoville', 'Roseburg', 'Rosemead',
    'Roseville', 'Roswell', 'Round Rock', 'Rowland Heights', 'Roy', 'Royal Oak', 'Sacramento', 'Saginaw', 'Salem', 'Salina',
    'Salinas', 'Salt Lake City', 'San Angelo', 'San Antonio', 'San Bernardino', 'San Bruno', 'San Buenaventura', 'San Carlos', 'San Clemente', 'San Diego',
    'San Dimas', 'San Francisco', 'San Gabriel', 'San Jose', 'San Leandro', 'San Luis Obispo', 'San Marcos', 'San Mateo', 'San Rafael', 'San Ramon',
    'Sand Springs', 'Sanford', 'Santa Ana', 'Santa Barbara', 'Santa Clara', 'Santa Clarita', 'Santa Cruz', 'Santa Fe', 'Santa Maria', 'Santa Monica',
    'Santa Rosa', 'Santee', 'Sarasota', 'Saratoga', 'Savage', 'Savannah', 'Sayreville', 'Scarsdale', 'Schaumburg', 'Schenectady',
    'Scottsdale', 'Scranton', 'Seal Beach', 'Seaside', 'Seattle', 'Secaucus', 'Sedalia', 'Selma', 'Seminole', 'Shakopee',
    'Shaker Heights', 'Shamrock', 'Shawnee', 'Sheboygan', 'Shelby', 'Shelton', 'Shepherdsville', 'Sherman', 'Shoreline', 'Shreveport',
    'Sierra Vista', 'Simi Valley', 'Sioux City', 'Sioux Falls', 'Skokie', 'Slidell', 'Smithfield', 'Smyrna', 'Snellville', 'Socorro',
    'Solana Beach', 'Somerville', 'South Bend', 'South El Monte', 'South Euclid', 'South Gate', 'South Jordan', 'South Lake Tahoe', 'South Pasadena', 'South Portland',
    'South San Francisco', 'Southaven', 'Southfield', 'Southgate', 'Spanish Fork', 'Sparks', 'Spartanburg', 'Spokane', 'Spring', 'Spring Hill',
    'Spring Valley', 'Springfield', 'St. Charles', 'St. Clair Shores', 'St. Cloud', 'St. George', 'St. Joseph', 'St. Louis', 'St. Louis Park', 'St. Paul',
    'St. Peters', 'St. Petersburg', 'Stafford', 'Stamford', 'Stanton', 'State College', 'Staunton', 'Sterling', 'Sterling Heights', 'Stillwater',
    'Stockton', 'Stoneham', 'Stow', 'Streamwood', 'Strongsville', 'Sturgis', 'Suisun City', 'Summerville', 'Summit', 'Sumter',
    'Sun Prairie', 'Sunnyvale', 'Sunrise', 'Sunset', 'Superior', 'Surprise', 'Susquehanna', 'Swansea', 'Syracuse', 'Tacoma',
    'Tallahassee', 'Tamarac', 'Tampa', 'Taunton', 'Taylor', 'Taylorsville', 'Temecula', 'Tempe', 'Temple', 'Terre Haute',
    'Texarkana', 'Texas City', 'The Colony', 'The Woodlands', 'Thornton', 'Thousand Oaks', 'Tigard', 'Tinley Park', 'Titusville', 'Toledo',
    'Tomball', 'Tonawanda', 'Topeka', 'Torrance', 'Tracy', 'Trenton', 'Troy', 'Trussville', 'Tucson', 'Tulare',
    'Tulsa', 'Turlock', 'Tuscaloosa', 'Tustin', 'Twin Falls', 'Tyler', 'Union', 'Union City', 'University City', 'University Place',
    'Upland', 'Upper Arlington', 'Urbana', 'Urbandale', 'Utica', 'Vacaville', 'Valdosta', 'Vallejo', 'Valley Stream', 'Vancouver',
    'Vero Beach', 'Vestavia Hills', 'Victoria', 'Victorville', 'Vineland', 'Virginia Beach', 'Visalia', 'Vista', 'Waco', 'Wahiawa',
    'Wake Forest', 'Walnut', 'Walnut Creek', 'Waltham', 'Warner Robins', 'Warren', 'Warwick', 'Washington', 'Waterbury', 'Waterford',
    'Waterloo', 'Watertown', 'Waterville', 'Waukegan', 'Waukesha', 'Wausau', 'Wauwatosa', 'Wayne', 'Waynesboro', 'Webster',
    'Webster Groves', 'Wellesley', 'Wellington', 'Wenatchee', 'Wesley Chapel', 'West Allis', 'West Bend', 'West Bloomfield', 'West Covina', 'West Des Moines',
    'West Hartford', 'West Haven', 'West Jordan', 'West Lafayette', 'West New York', 'West Orange', 'West Palm Beach', 'West Sacramento', 'West St. Paul', 'West Valley City',
    'Westbrook', 'Westfield', 'Westland', 'Westminster', 'Westmont', 'Weston', 'Westport', 'Westwood', 'Wheat Ridge', 'Wheaton',
    'Wheeling', 'White Plains', 'Whitewater', 'Wichita', 'Wichita Falls', 'Wilkes-Barre', 'Willoughby', 'Wilmington', 'Wilson', 'Winchester',
    'Windham', 'Windsor', 'Winona', 'Winston-Salem', 'Winter Garden', 'Winter Haven', 'Winter Park', 'Winter Springs', 'Woburn', 'Woodbury',
    'Woodland', 'Woodland Hills', 'Woodstock', 'Woonsocket', 'Worcester', 'Wylie', 'Wyoming', 'Yakima', 'Yonkers', 'Yorba Linda',
    'York', 'Youngstown', 'Ypsilanti', 'Yuba City', 'Yucaipa', 'Yuma', 'Zanesville'
          }}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Cities</h1>
        <p className="text-gray-600">Connect with local attorneys in major cities across America</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCities.map((city, index) => (
          <a
            key={index}
            href="#"
            className="group bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-4 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{city.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                  {city.name}
                </h3>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-600">{city.count} lawyers</p>
                  <p className="text-xs text-gray-500">{city.population}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

// All Practice Areas View Component
const AllPracticeAreasView = ({ setCurrentView }) => {
  const allPracticeAreas = [
    { name: 'Personal Injury', count: '15,234', icon: '⚖️', description: 'Car accidents, slip and fall, medical malpractice' },
    { name: 'Criminal Defense', count: '12,456', icon: '🛡️', description: 'DUI, drug crimes, assault, theft defense' },
    { name: 'Family Law', count: '18,789', icon: '👨‍👩‍👧‍👦', description: 'Divorce, child custody, adoption, domestic relations' },
    { name: 'DUI/DWI', count: '8,567', icon: '🚗', description: 'Drunk driving defense, license suspension' },
    { name: 'Business Law', count: '11,234', icon: '💼', description: 'Corporate formation, contracts, business disputes' },
    { name: 'Real Estate Law', count: '9,876', icon: '🏠', description: 'Property transactions, landlord-tenant, zoning' },
    { name: 'Immigration Law', count: '7,654', icon: '🌍', description: 'Visas, green cards, citizenship, deportation defense' },
    { name: 'Employment Law', count: '6,543', icon: '👔', description: 'Workplace discrimination, wrongful termination' },
    { name: 'Bankruptcy Law', count: '5,432', icon: '💰', description: 'Chapter 7, Chapter 13, debt relief' },
    { name: 'Estate Planning', count: '8,765', icon: '📋', description: 'Wills, trusts, probate, elder law' },
    { name: 'Tax Law', count: '4,321', icon: '📊', description: 'IRS representation, tax disputes, tax planning' },
    { name: 'Medical Malpractice', count: '3,210', icon: '🏥', description: 'Hospital negligence, surgical errors, misdiagnosis' },
    { name: 'Intellectual Property', count: '4,567', icon: '💡', description: 'Patents, trademarks, copyrights, trade secrets' },
    { name: 'Corporate Law', count: '6,789', icon: '🏢', description: 'Mergers & acquisitions, securities, corporate governance' },
    { name: 'Workers\' Compensation', count: '5,678', icon: '🔨', description: 'Workplace injuries, disability benefits' },
    { name: 'Social Security Disability', count: '4,890', icon: '🦽', description: 'SSDI, SSI claims and appeals' },
    { name: 'Environmental Law', count: '2,345', icon: '🌱', description: 'Environmental compliance, pollution, clean energy' },
    { name: 'Healthcare Law', count: '3,456', icon: '⚕️', description: 'HIPAA compliance, medical licensing, healthcare transactions' },
    { name: 'Securities Law', count: '2,789', icon: '📈', description: 'SEC compliance, investment advisor regulation' },
    { name: 'Construction Law', count: '3,678', icon: '🏗️', description: 'Construction defects, contractor disputes, liens' },
    { name: 'Elder Law', count: '4,123', icon: '👴', description: 'Medicaid planning, guardianship, nursing home issues' },
    { name: 'Insurance Law', count: '3,234', icon: '🛡️', description: 'Insurance claims, bad faith, coverage disputes' },
    { name: 'Education Law', count: '2,567', icon: '🎓', description: 'Special education, Title IX, student rights' },
    { name: 'Aviation Law', count: '1,234', icon: '✈️', description: 'Aircraft accidents, FAA regulations, aviation transactions' },
    { name: 'Entertainment Law', count: '1,890', icon: '🎬', description: 'Contract negotiation, intellectual property, media rights' },
    { name: 'Military Law', count: '1,567', icon: '🎖️', description: 'Court-martial defense, military administrative actions' },
    { name: 'Consumer Protection', count: '2,890', icon: '🛒', description: 'Debt collection defense, consumer fraud, credit reporting' },
    { name: 'Civil Rights', count: '2,123', icon: '✊', description: 'Police misconduct, discrimination, constitutional rights' },
    { name: 'Nonprofit Law', count: '1,456', icon: '🤝', description: 'Tax-exempt status, nonprofit governance, charitable giving' },
    { name: 'Energy Law', count: '1,789', icon: '⚡', description: 'Oil and gas, renewable energy, regulatory compliance' },
    { name: 'Privacy Law', count: '1,345', icon: '🔒', description: 'Data protection, GDPR, CCPA compliance, cybersecurity' },
    { name: 'Maritime Law', count: '987', icon: '⚓', description: 'Admiralty, vessel accidents, maritime workers' },
    { name: 'Cybersecurity Law', count: '1,678', icon: '🔐', description: 'Data breaches, incident response, technology compliance' },
    { name: 'Admiralty Law', count: '1,123', icon: '⚓', description: 'Maritime disputes, shipping law, vessel regulations' },
    { name: 'Administrative Law', count: '2,456', icon: '🏛️', description: 'Government regulations, agency proceedings, compliance' },
    { name: 'Adoption Law', count: '1,789', icon: '👶', description: 'Domestic adoption, international adoption, stepparent adoption' },
    { name: 'Agricultural Law', count: '987', icon: '🚜', description: 'Farm regulations, agricultural contracts, land use' },
    { name: 'Animal Law', count: '654', icon: '🐕', description: 'Animal rights, veterinary malpractice, pet custody' },
    { name: 'Antitrust Law', count: '1,234', icon: '⚖️', description: 'Competition law, monopolies, merger review' },
    { name: 'Appellate Law', count: '2,345', icon: '📜', description: 'Appeals court practice, brief writing, oral arguments' },
    { name: 'Art Law', count: '456', icon: '🎨', description: 'Art transactions, cultural property, museum law' },
    { name: 'Asbestos Litigation', count: '1,567', icon: '🏭', description: 'Mesothelioma claims, asbestos exposure, toxic torts' },
    { name: 'Asset Protection', count: '2,123', icon: '🛡️', description: 'Wealth preservation, offshore trusts, creditor protection' },
    { name: 'Automotive Law', count: '1,890', icon: '🚗', description: 'Lemon law, auto defects, dealership disputes' },
    { name: 'Banking Law', count: '3,456', icon: '🏦', description: 'Financial regulations, lending law, bank compliance' },
    { name: 'Biotech Law', count: '789', icon: '🧬', description: 'Biotechnology patents, FDA regulations, life sciences' },
    { name: 'Cannabis Law', count: '1,234', icon: '🌿', description: 'Marijuana regulations, licensing, compliance' },
    { name: 'Class Action Law', count: '2,567', icon: '👥', description: 'Mass tort litigation, consumer class actions' },
    { name: 'Commercial Law', count: '4,321', icon: '💼', description: 'Business transactions, commercial contracts, trade law' },
    { name: 'Communications Law', count: '1,678', icon: '📡', description: 'FCC regulations, telecommunications, media law' },
    { name: 'Compliance Law', count: '3,789', icon: '✅', description: 'Regulatory compliance, corporate governance, risk management' },
    { name: 'Computer Law', count: '2,345', icon: '💻', description: 'Software licensing, technology contracts, IT law' },
    { name: 'Constitutional Law', count: '1,456', icon: '📜', description: 'Civil liberties, constitutional rights, government law' },
    { name: 'Contract Law', count: '5,678', icon: '📝', description: 'Contract drafting, breach of contract, commercial agreements' },
    { name: 'Copyright Law', count: '2,890', icon: '©️', description: 'Copyright infringement, DMCA, creative works protection' },
    { name: 'Creditors Rights', count: '2,123', icon: '💰', description: 'Debt collection, creditor remedies, asset recovery' },
    { name: 'Cryptocurrency Law', count: '1,567', icon: '₿', description: 'Digital assets, blockchain regulation, crypto compliance' },
    { name: 'Customs Law', count: '987', icon: '🛃', description: 'Import/export regulations, trade compliance, customs disputes' },
    { name: 'Data Privacy Law', count: '2,456', icon: '🔐', description: 'GDPR compliance, data protection, privacy policies' },
    { name: 'Defamation Law', count: '1,234', icon: '🗣️', description: 'Libel, slander, reputation protection, media law' },
    { name: 'Disability Law', count: '3,456', icon: '♿', description: 'ADA compliance, disability rights, accommodation law' },
    { name: 'Discrimination Law', count: '2,789', icon: '⚖️', description: 'Employment discrimination, civil rights, equal protection' },
    { name: 'Divorce Law', count: '8,901', icon: '💔', description: 'Divorce proceedings, property division, spousal support' },
    { name: 'Drug Crimes', count: '4,567', icon: '💊', description: 'Drug possession, trafficking, prescription fraud' },
    { name: 'E-Commerce Law', count: '1,890', icon: '🛒', description: 'Online business law, digital transactions, internet commerce' },
    { name: 'Election Law', count: '789', icon: '🗳️', description: 'Campaign finance, voting rights, election disputes' },
    { name: 'Eminent Domain', count: '1,123', icon: '🏘️', description: 'Government takings, property condemnation, just compensation' },
    { name: 'ERISA Law', count: '2,345', icon: '📊', description: 'Employee benefits, pension law, retirement plans' },
    { name: 'Ethics Law', count: '1,456', icon: '⚖️', description: 'Professional ethics, legal malpractice, attorney discipline' },
    { name: 'Expungement', count: '2,678', icon: '🗂️', description: 'Criminal record sealing, expungement petitions, record clearing' },
    { name: 'FDA Law', count: '1,234', icon: '💊', description: 'Food and drug regulation, FDA compliance, product approval' },
    { name: 'Foreclosure Defense', count: '3,456', icon: '🏠', description: 'Mortgage foreclosure, loan modification, homeowner defense' },
    { name: 'Franchise Law', count: '1,789', icon: '🏪', description: 'Franchise agreements, FTC compliance, franchise disputes' },
    { name: 'Gaming Law', count: '987', icon: '🎰', description: 'Casino law, gambling regulations, gaming compliance' },
    { name: 'Government Contracts', count: '2,123', icon: '🏛️', description: 'Federal contracting, procurement law, government bids' },
    { name: 'Guardianship Law', count: '2,456', icon: '👨‍👧‍👦', description: 'Adult guardianship, conservatorship, incapacity proceedings' },
    { name: 'Gun Rights', count: '1,567', icon: '🔫', description: 'Second Amendment rights, firearms law, gun regulations' },
    { name: 'Hate Crimes', count: '654', icon: '⚖️', description: 'Bias crimes, hate crime defense, civil rights violations' },
    { name: 'Health Law', count: '4,321', icon: '🏥', description: 'Healthcare regulations, medical law, health policy' },
    { name: 'HOA Law', count: '1,890', icon: '🏘️', description: 'Homeowners association disputes, HOA governance, community law' },
    { name: 'Human Rights', count: '1,234', icon: '✊', description: 'International human rights, civil liberties, advocacy' },
    { name: 'Indian Law', count: '789', icon: '🪶', description: 'Tribal law, Native American rights, federal Indian law' },
    { name: 'Insurance Defense', count: '5,678', icon: '🛡️', description: 'Insurance litigation, coverage defense, claims disputes' },
    { name: 'International Law', count: '2,345', icon: '🌍', description: 'Cross-border transactions, international disputes, treaty law' },
    { name: 'Internet Law', count: '1,678', icon: '🌐', description: 'Online legal issues, digital rights, internet regulations' },
    { name: 'Juvenile Law', count: '2,890', icon: '👶', description: 'Juvenile court, minor defense, youth advocacy' },
    { name: 'Labor Law', count: '4,567', icon: '👷', description: 'Union law, collective bargaining, workplace rights' },
    { name: 'Land Use Law', count: '2,123', icon: '🏞️', description: 'Zoning law, development rights, municipal law' },
    { name: 'Landlord Tenant', count: '6,789', icon: '🏠', description: 'Rental disputes, evictions, tenant rights' },
    { name: 'Lemon Law', count: '1,456', icon: '🍋', description: 'Defective vehicles, auto warranties, consumer protection' },
    { name: 'Licensing Law', count: '1,789', icon: '📜', description: 'Professional licensing, regulatory compliance, permit law' },
    { name: 'Litigation', count: '12,345', icon: '⚖️', description: 'Civil litigation, trial practice, dispute resolution' },
    { name: 'Mass Tort', count: '3,456', icon: '👥', description: 'Product liability, pharmaceutical litigation, toxic exposure' },
    { name: 'Mediation', count: '2,678', icon: '🤝', description: 'Alternative dispute resolution, conflict resolution, negotiation' },
    { name: 'Mergers & Acquisitions', count: '4,321', icon: '🏢', description: 'Corporate transactions, due diligence, business combinations' },
    { name: 'Mining Law', count: '654', icon: '⛏️', description: 'Mineral rights, mining regulations, extraction law' },
    { name: 'Motor Vehicle Accidents', count: '8,901', icon: '🚗', description: 'Car accidents, truck accidents, motorcycle crashes' },
    { name: 'Municipal Law', count: '2,345', icon: '🏛️', description: 'Local government law, city ordinances, public law' },
    { name: 'Music Law', count: '789', icon: '🎵', description: 'Music contracts, artist representation, entertainment law' },
    { name: 'Native American Law', count: '567', icon: '🪶', description: 'Tribal sovereignty, Indian gaming, federal recognition' },
    { name: 'Oil & Gas Law', count: '1,890', icon: '🛢️', description: 'Energy law, mineral leases, petroleum regulations' },
    { name: 'Patent Law', count: '3,456', icon: '💡', description: 'Patent prosecution, IP litigation, invention protection' },
    { name: 'Pension Law', count: '2,123', icon: '💰', description: 'Retirement benefits, ERISA compliance, pension disputes' },
    { name: 'Pharmaceutical Law', count: '1,678', icon: '💊', description: 'Drug regulation, FDA compliance, pharma litigation' },
    { name: 'Probate Law', count: '4,567', icon: '📋', description: 'Estate administration, will contests, probate court' },
    { name: 'Product Liability', count: '5,890', icon: '⚠️', description: 'Defective products, consumer safety, manufacturing defects' },
    { name: 'Professional Liability', count: '3,234', icon: '⚖️', description: 'Malpractice defense, professional negligence, licensing issues' },
    { name: 'Public Interest Law', count: '1,456', icon: '🤝', description: 'Social justice, advocacy, public policy law' },
    { name: 'Railroad Law', count: '789', icon: '🚂', description: 'Railway regulations, FELA claims, transportation law' },
    { name: 'Regulatory Law', count: '4,321', icon: '📋', description: 'Government regulations, compliance, administrative law' },
    { name: 'Religious Law', count: '987', icon: '⛪', description: 'Religious freedom, church law, faith-based legal issues' },
    { name: 'Reproductive Rights', count: '1,234', icon: '⚖️', description: 'Abortion law, reproductive health, family planning' },
    { name: 'School Law', count: '2,567', icon: '🏫', description: 'Education law, school districts, student rights' },
    { name: 'Securities Fraud', count: '2,890', icon: '📈', description: 'Investment fraud, SEC violations, financial crimes' },
    { name: 'Sexual Harassment', count: '3,456', icon: '⚖️', description: 'Workplace harassment, Title VII, discrimination law' },
    { name: 'Small Business Law', count: '5,678', icon: '🏪', description: 'Business formation, contracts, entrepreneurship law' },
    { name: 'Social Media Law', count: '1,789', icon: '📱', description: 'Digital privacy, online defamation, social platform law' },
    { name: 'Sports Law', count: '1,123', icon: '⚽', description: 'Athlete representation, sports contracts, league regulations' },
    { name: 'Startup Law', count: '2,456', icon: '🚀', description: 'Business formation, venture capital, startup legal issues' },
    { name: 'Surrogacy Law', count: '654', icon: '👶', description: 'Reproductive law, surrogacy agreements, family formation' },
    { name: 'Technology Law', count: '4,321', icon: '💻', description: 'Tech transactions, software law, digital innovation' },
    { name: 'Telecommunications Law', count: '1,567', icon: '📡', description: 'FCC regulations, telecom compliance, communications law' },
    { name: 'Toxic Tort', count: '2,345', icon: '☠️', description: 'Environmental exposure, chemical poisoning, mass tort' },
    { name: 'Trade Secret Law', count: '1,890', icon: '🔒', description: 'Confidential information, non-compete, IP protection' },
    { name: 'Trademark Law', count: '3,678', icon: '™️', description: 'Brand protection, trademark registration, IP enforcement' },
    { name: 'Transportation Law', count: '2,123', icon: '🚛', description: 'Shipping law, logistics, transportation regulations' },
    { name: 'Trusts & Estates', count: '6,789', icon: '📋', description: 'Estate planning, trust administration, wealth transfer' },
    { name: 'Venture Capital', count: '1,456', icon: '💰', description: 'Startup funding, investment law, securities regulation' },
    { name: 'Veterans Law', count: '2,890', icon: '🎖️', description: 'VA benefits, military discharge, veterans rights' },
    { name: 'Whistleblower Law', count: '1,234', icon: '📢', description: 'Qui tam actions, retaliation protection, fraud reporting' },
    { name: 'White Collar Crime', count: '3,567', icon: '💼', description: 'Financial crimes, fraud defense, corporate crime' },
    { name: 'Wills & Probate', count: '5,432', icon: '📜', description: 'Will drafting, estate administration, probate proceedings' },
    { name: 'Zoning Law', count: '1,789', icon: '🏗️', description: 'Land use planning, municipal zoning, development law' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={() => {
            setCurrentView('home');
            window.history.pushState({}, '', '/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Practice Areas</h1>
        <p className="text-gray-600">Find attorneys specializing in your specific legal issue</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPracticeAreas.map((area, index) => (
          <a
            key={index}
            href="#"
            className="group bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-6 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="text-center">
              <div className="text-3xl mb-3">{area.icon}</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                {area.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{area.count} lawyers</p>
              <p className="text-xs text-gray-500 line-clamp-2">{area.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

// Avvo-style Footer Component
const AvvoFooter = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Popular Cities */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Cities</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">New York Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Los Angeles Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Chicago Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Houston Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Phoenix Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Philadelphia Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">San Antonio Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">San Diego Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Dallas Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">San Jose Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Austin Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Jacksonville Lawyers</a></li>
            </ul>
          </div>

          {/* Popular Practice Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Practice Areas</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Personal Injury Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Criminal Defense Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Family Law Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">DUI Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Business Law Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Real Estate Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Immigration Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Employment Law Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Bankruptcy Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Estate Planning Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Tax Law Lawyers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Medical Malpractice Lawyers</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">About Attorneys-deets</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Legal Advice</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Lawyer Reviews</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Legal Forms</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Legal Research</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Find a Lawyer</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Legal Topics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Press</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Help Center</a></li>
            </ul>
          </div>

          {/* For Lawyers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Lawyers</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Join Attorneys-deets</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Lawyer Marketing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Advertise with Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Lawyer Directory</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Premium Profiles</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Client Reviews</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Legal Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Webinars</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Resources</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Success Stories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer mr-8"
              >
                Attorneys-deets
              </button>
              <p className="text-gray-400 text-sm">
                © 2024 Attorneys-deets. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Disclaimer</a>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400 text-sm text-center">
              Attorneys-deets is a comprehensive legal directory connecting clients with qualified attorneys. 
              Our platform provides verified lawyer profiles, client reviews, and easy communication tools to help you find the right legal representation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState('home');
  const [lawyers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Experienced personal injury attorney with over 15 years of practice. Specializes in car accidents, slip and fall cases, and medical malpractice. Known for aggressive representation and successful settlements.',
      location: 'New York, NY',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@lawfirm.com',
      practiceAreas: ['Personal Injury', 'Medical Malpractice', 'Car Accidents', 'Slip and Fall'],
      experience: 15,
      verified: true,
      website: 'https://sarahjohnsonlaw.com'
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      bio: 'Former prosecutor turned defense attorney with deep understanding of criminal law. Successfully defended hundreds of clients in various criminal matters from DUI to serious felonies.',
      location: 'Los Angeles, CA',
      phone: '(555) 234-5678',
      email: 'michael.chen@defense.com',
      practiceAreas: ['Criminal Defense', 'DUI Defense', 'White Collar Crime', 'Drug Crimes'],
      experience: 12,
      verified: true,
      website: 'https://chendefense.com'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      bio: 'Compassionate family law attorney helping families navigate difficult times. Specializes in divorce, child custody, adoption, and domestic relations with a focus on amicable resolutions.',
      location: 'Chicago, IL',
      phone: '(555) 345-6789',
      email: 'emily.rodriguez@familylaw.com',
      practiceAreas: ['Family Law', 'Divorce', 'Child Custody', 'Adoption'],
      experience: 18,
      verified: true,
      website: 'https://rodriguezfamilylaw.com'
    },
    {
      id: 4,
      name: 'David Thompson',
      rating: 4.9,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Corporate attorney with extensive experience in business formation, mergers and acquisitions, and commercial litigation. Trusted advisor to startups and established businesses.',
      location: 'Houston, TX',
      phone: '(555) 456-7890',
      email: 'david.thompson@bizlaw.com',
      practiceAreas: ['Business Law', 'Corporate Law', 'Mergers & Acquisitions', 'Commercial Litigation'],
      experience: 20,
      verified: true,
      website: 'https://thompsonbizlaw.com'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      rating: 4.8,
      reviews: 174,
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Dedicated immigration attorney helping individuals and families achieve their American dreams. Fluent in multiple languages and experienced in all aspects of immigration law.',
      location: 'Miami, FL',
      phone: '(555) 567-8901',
      email: 'lisa.wang@immigration.com',
      practiceAreas: ['Immigration Law', 'Visa Applications', 'Green Cards', 'Citizenship'],
      experience: 11,
      verified: true,
      website: 'https://wangimmigration.com'
    },
    {
      id: 6,
      name: 'Robert Martinez',
      rating: 4.6,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Real estate attorney specializing in residential and commercial transactions. Expert in property law, zoning issues, and real estate litigation with a track record of successful closings.',
      location: 'Phoenix, AZ',
      phone: '(555) 678-9012',
      email: 'robert.martinez@realestate.com',
      practiceAreas: ['Real Estate', 'Property Law', 'Zoning', 'Real Estate Litigation'],
      experience: 16,
      verified: false,
      website: 'https://martinezrealestate.com'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      const path = window.location.pathname;
      if (path === '/all-states') {
        setCurrentView('all-states');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/all-cities') {
        setCurrentView('all-cities');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/all-practice-areas') {
        setCurrentView('all-practice-areas');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  // Render different views based on currentView state
  if (currentView === 'all-states') {
    return (
      <div className="min-h-screen bg-gray-50">
        <AvvoHeader currentView={currentView} setCurrentView={setCurrentView} />
        <AllStatesView setCurrentView={setCurrentView} />
        <AvvoFooter />
      </div>
    );
  }

  if (currentView === 'all-cities') {
    return (
      <div className="min-h-screen bg-gray-50">
        <AvvoHeader currentView={currentView} setCurrentView={setCurrentView} />
        <AllCitiesView setCurrentView={setCurrentView} />
        <AvvoFooter />
      </div>
    );
  }

  if (currentView === 'all-practice-areas') {
    return (
      <div className="min-h-screen bg-gray-50">
        <AvvoHeader currentView={currentView} setCurrentView={setCurrentView} />
        <AllPracticeAreasView setCurrentView={setCurrentView} />
        <AvvoFooter />
      </div>
    );
  }

  // Default home view
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Avvo-style Header */}
      <AvvoHeader currentView={currentView} setCurrentView={setCurrentView} />

      {/* Hero Section */}
      <AvvoHeroSection 
        onSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Avvo-style Directory Sections */}
        <div className="space-y-12">
          {/* Lawyers By Practice Area */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Lawyers By Practice Area</h2>
              <p className="text-gray-600 text-lg">Find attorneys specializing in your legal issue</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: 'Personal Injury', count: '15,234', icon: '⚖️' },
                { name: 'Criminal Defense', count: '12,456', icon: '🛡️' },
                { name: 'Family Law', count: '18,789', icon: '👨‍👩‍👧‍👦' },
                { name: 'DUI/DWI', count: '8,567', icon: '🚗' },
                { name: 'Business Law', count: '11,234', icon: '💼' },
                { name: 'Real Estate Law', count: '9,876', icon: '🏠' },
                { name: 'Immigration Law', count: '7,654', icon: '🌍' },
                { name: 'Employment Law', count: '6,543', icon: '👔' },
                { name: 'Bankruptcy Law', count: '5,432', icon: '💰' },
                { name: 'Estate Planning', count: '8,765', icon: '📋' },
                { name: 'Tax Law', count: '4,321', icon: '📊' },
                { name: 'Medical Malpractice', count: '3,210', icon: '🏥' }
              ].map((area, index) => (
                <a
                  key={index}
                  href="#"
                  className="group bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-4 transition-all duration-200"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{area.icon}</div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">
                      {area.name}
                    </h3>
                    <p className="text-sm text-gray-600">{area.count} lawyers</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <button 
                onClick={() => {
                  setCurrentView('all-practice-areas');
                  window.history.pushState({}, '', '/all-practice-areas');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View All Practice Areas →
              </button>
            </div>
          </section>

          {/* Lawyers By States */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Lawyers By States</h2>
              <p className="text-gray-600 text-lg">Find qualified attorneys in your state</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: 'California', count: '45,678', abbr: 'CA' },
                { name: 'New York', count: '38,234', abbr: 'NY' },
                { name: 'Texas', count: '32,567', abbr: 'TX' },
                { name: 'Florida', count: '28,901', abbr: 'FL' },
                { name: 'Illinois', count: '22,345', abbr: 'IL' },
                { name: 'Pennsylvania', count: '19,876', abbr: 'PA' },
                { name: 'Ohio', count: '17,654', abbr: 'OH' },
                { name: 'Georgia', count: '16,432', abbr: 'GA' },
                { name: 'North Carolina', count: '15,321', abbr: 'NC' },
                { name: 'Michigan', count: '14,210', abbr: 'MI' },
                { name: 'New Jersey', count: '13,987', abbr: 'NJ' },
                { name: 'Virginia', count: '12,876', abbr: 'VA' },
                { name: 'Washington', count: '11,765', abbr: 'WA' },
                { name: 'Arizona', count: '10,654', abbr: 'AZ' },
                { name: 'Massachusetts', count: '9,543', abbr: 'MA' },
                { name: 'Tennessee', count: '8,432', abbr: 'TN' },
                { name: 'Indiana', count: '7,321', abbr: 'IN' },
                { name: 'Missouri', count: '6,210', abbr: 'MO' },
                { name: 'Maryland', count: '5,987', abbr: 'MD' },
                { name: 'Wisconsin', count: '4,876', abbr: 'WI' }
              ].map((state, index) => (
                <a
                  key={index}
                  href="#"
                  className="group bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-3 transition-all duration-200"
                >
                  <div className="text-center">
                    <div className="bg-blue-100 group-hover:bg-blue-200 text-blue-600 font-bold text-sm px-2 py-1 rounded mb-2 inline-block">
                      {state.abbr}
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 text-sm mb-1">
                      {state.name}
                    </h3>
                    <p className="text-xs text-gray-600">{state.count} lawyers</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <button 
                onClick={() => {
                  setCurrentView('all-states');
                  window.history.pushState({}, '', '/all-states');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View All States →
              </button>
            </div>
          </section>

          {/* Lawyers By Cities */}
          <section className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Lawyers By Cities</h2>
              <p className="text-gray-600 text-lg">Connect with local attorneys in major cities</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'New York, NY', count: '12,345', population: '8.3M', icon: '🗽' },
                { name: 'Los Angeles, CA', count: '9,876', population: '4.0M', icon: '🌴' },
                { name: 'Chicago, IL', count: '7,654', population: '2.7M', icon: '🏙️' },
                { name: 'Houston, TX', count: '6,543', population: '2.3M', icon: '🤠' },
                { name: 'Phoenix, AZ', count: '5,432', population: '1.7M', icon: '🌵' },
                { name: 'Philadelphia, PA', count: '4,321', population: '1.6M', icon: '🔔' },
                { name: 'San Antonio, TX', count: '3,210', population: '1.5M', icon: '🏛️' },
                { name: 'San Diego, CA', count: '2,987', population: '1.4M', icon: '🏖️' },
                { name: 'Dallas, TX', count: '2,876', population: '1.3M', icon: '🏢' },
                { name: 'San Jose, CA', count: '2,765', population: '1.0M', icon: '💻' },
                { name: 'Austin, TX', count: '2,654', population: '965K', icon: '🎸' },
                { name: 'Jacksonville, FL', count: '2,543', population: '911K', icon: '🏖️' }
              ].map((city, index) => (
                <a
                  key={index}
                  href="#"
                  className="group bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-4 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{city.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                        {city.name}
                      </h3>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-gray-600">{city.count} lawyers</p>
                        <p className="text-xs text-gray-500">{city.population}</p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <button 
                onClick={() => {
                  setCurrentView('all-cities');
                  window.history.pushState({}, '', '/all-cities');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View All Cities →
              </button>
            </div>
          </section>
        </div>
      </div>
      
      {/* Avvo-style Footer */}
      <AvvoFooter />
    </div>
  );
}

export default App;