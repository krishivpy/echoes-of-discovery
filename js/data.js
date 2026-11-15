/* Echoes of Discovery — Chronological & Interconnected NASA Hardware Story Dataset */

const ZONES = {
  earth: {
    id: 'earth',
    title: 'Earth & Orbit',
    subtitle: 'Deep Space Network & Space Telescopes',
    accent: 'text-cyan-300',
    ringClass: '',
    description: 'Where every mission begins—giant antennas listening to faint whispers across billions of kilometers, and orbital scouts staring into distant starfields.'
  },
  moon: {
    id: 'moon',
    title: 'The Moon',
    subtitle: '384,400 km from Earth',
    accent: 'text-slate-200',
    ringClass: '',
    description: 'From robotic trailblazers to Apollo launchpads, lunar buggies, and mirrors that still bounce Earth lasers back today.'
  },
  mars: {
    id: 'mars',
    title: 'Mars',
    subtitle: '225 Million km Average',
    accent: 'text-amber-300',
    ringClass: 'hotspot-ring-amber',
    description: 'Red-dust plains where stationary labs, marathon rovers, quake listeners, and the first extraterrestrial helicopter rewrote planetary history.'
  },
  deepspace: {
    id: 'deepspace',
    title: 'Deep Space & Asteroids',
    subtitle: 'Asteroid Belt to Interstellar Edge',
    accent: 'text-violet-300',
    ringClass: 'hotspot-ring-violet',
    description: 'Ion-powered orbiters, asteroid landers, and nuclear-powered ambassadors coasting silently beyond our solar system.'
  }
};

const ARTIFACTS = [
  {
    id: 'dsn',
    year: 1963,
    zone: 'earth',
    zoneLabel: 'CHAPTER 01 • EARTH & ORBIT',
    name: 'Deep Space Network (DSN)',
    subtitle: 'Where Every Cosmic Story Begins',
    location: 'Goldstone, Madrid & Canberra',
    coords: '35.426° N, 116.890° W (DSS-14)',
    nssdcaId: 'NASA-DSN',
    resourceUrl: 'https://nssdc.gsfc.nasa.gov/',
    statusLabel: 'ACTIVE COMMUNICATIONS BACKBONE',
    statusClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50',
    image: 'assets/images/dsn.jpg',
    imageCaption: '70-meter Deep Space Network dish tracking spacecraft across the solar system.',
    nasaId: 'PIA13277',
    videoUrl: 'https://images-assets.nasa.gov/video/We are SCaN/We are SCaN~medium.mp4',
    punchLine: 'Before a single robot could touch another world, Earth had to build giant ears that never sleep.',
    story: [
      'Our story begins right here at home. As Earth spins through space, any spacecraft flying to the Moon or Mars would vanish behind our horizon—unless three giant 70-meter dishes in California, Spain, and Australia passed the signal like a relay baton.',
      'Those dishes catch radio whispers weaker than a billionth of a billionth of a watt. Every blurry moonbeam, every Martian dust storm, every lonely ping from the edge of the solar system flows through this invisible bridge.',
      'With our listening ears locked on the sky, humanity was finally ready to send its first scout into the unknown—to answer a terrifying question about the Moon.'
    ],
    lastEcho: '8.4 GHz X-band carrier locked and listening 24/7 across 3 continents.',
    liveMetricLabel: 'ROUND-TRIP LIGHT TIME TO MARS',
    liveMetricValue: '~25 Minutes (at 225M km)',
    timeline: [
      { date: '1963', title: 'Network Established', detail: 'Unified global tracking stations for planetary missions.' },
      { date: '1969', title: 'Apollo 11 Relay', detail: 'Carried first live lunar surface TV and voice to Earth.' },
      { date: '2003', title: 'Final Pioneer 10 Ping', detail: 'Detected Pioneer 10 from 12 billion km away.' },
      { date: 'TODAY', title: 'Active 2026', detail: 'Still tracking active Mars, asteroid, and Voyager craft.' }
    ],
    experiment: {
      type: 'slider',
      label: 'Tune DSN Receiver Band',
      min: 2200,
      max: 32000,
      value: 8420,
      unit: 'MHz',
      actionText: 'Sweep Frequency'
    }
  },
  {
    id: 'surveyor3',
    year: 1967,
    zone: 'moon',
    zoneLabel: 'CHAPTER 02 • THE MOON',
    name: 'Surveyor 3 Lander',
    subtitle: 'The Brave Scout That Tested Lunar Quicksand',
    location: 'Oceanus Procellarum',
    coords: '3.015° S, 23.418° W',
    nssdcaId: '1967-035A',
    resourceUrl: 'https://science.nasa.gov/mission/surveyor-3/',
    statusLabel: 'STATIONARY SURFACE MONUMENT',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50',
    image: 'assets/images/surveyor3.jpg',
    imageCaption: 'Surveyor 3 in Oceanus Procellarum with its soil mechanics sampler arm.',
    nasaId: 'S69-55553',
    videoUrl: null,
    punchLine: 'Astronauts feared the Moon’s dust would swallow them alive—Surveyor 3 went first to find out.',
    story: [
      'Before any human boot could dare touch the Moon, scientists whispered a nightmare: what if lunar dust was a bottomless ocean of quicksand? Surveyor 3 took the plunge, bouncing three times down a crater slope before sticking the landing.',
      'Slowly, its accordion-like metal arm reached out and pressed into the alien gray soil. Every millimeter of resistance beamed back to the DSN proved the crust was solid enough to hold a heavy crewed spaceship.',
      'Surveyor 3 didn’t just save Apollo—it waited silently in that crater until humans actually walked down the slope to shake its robotic hand two years later.'
    ],
    lastEcho: 'Operated 65 hours on the lunar surface; visited by Apollo 12 in Nov 1969.',
    liveMetricLabel: 'TIME ON LUNAR SURFACE',
    liveMetricValue: '59 Years in Vacuum',
    timeline: [
      { date: 'Apr 17, 1967', title: 'Launch', detail: 'Launched aboard Atlas-Centaur from Cape Kennedy.' },
      { date: 'Apr 20, 1967', title: 'Soft Landing', detail: 'Touched down inside a 200-meter crater.' },
      { date: 'May 1967', title: 'Soil Bearing Proof', detail: 'Transmitted 6,315 photos and soil strength data.' },
      { date: 'Nov 1969', title: 'Apollo 12 Visit', detail: 'Astronauts Pete Conrad & Alan Bean inspected it.' }
    ],
    experiment: {
      type: 'button',
      label: 'Soil Mechanics Scoop Test',
      actionText: 'Press Scoop Into Regolith',
      resultText: '17.5 cm trench dug — Bearing strength 1.8 N/cm². Safe for Apollo!'
    }
  },
  {
    id: 'apollo11',
    year: 1969,
    zone: 'moon',
    zoneLabel: 'CHAPTER 03 • THE MOON',
    name: 'Apollo 11 LM Eagle Descent Stage',
    subtitle: 'The Launchpad Left Behind at Tranquility Base',
    location: 'Mare Tranquillitatis',
    coords: '0.674° N, 23.473° E',
    nssdcaId: '1969-059C',
    resourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C',
    statusLabel: 'HISTORIC HERITAGE MONUMENT',
    statusClass: 'bg-amber-500/20 text-amber-300 border-amber-400/50',
    image: 'assets/images/apollo11.jpg',
    imageCaption: 'Telecast of Armstrong and Aldrin beside the Apollo 11 Eagle Descent Stage.',
    nasaId: 'S69-39563',
    videoUrl: 'https://images-assets.nasa.gov/video/Apollo_11_Plaque_Comparison_720p/Apollo_11_Plaque_Comparison_720p~medium.mp4',
    punchLine: 'With less than 30 seconds of fuel left, Eagle’s legs touched solid ground—turning Surveyor’s proof into history.',
    story: [
      'Because Surveyor 3 proved the ground would hold, Neil Armstrong and Buzz Aldrin descended toward the Sea of Tranquility. Alarms blared, fuel ticked down to empty, and Eagle’s gold-wrapped lower stage absorbed the shock of humanity’s first landing.',
      'When their 21-hour stay ended, the astronauts didn’t take the whole ship home. Their upper cabin fired its rocket right off the roof of this descent stage, leaving it behind as our species’ first off-world launchpad.',
      'Eagle still stands there today, its plaque gleaming in the airless sun—but Apollo 11 didn’t leave the Moon completely silent. Right beside it, they placed a tiny instrument that refuses to retire.'
    ],
    lastEcho: '"Houston, Tranquility Base here. The Eagle has landed." — July 20, 1969',
    liveMetricLabel: 'PRESERVATION STATE',
    liveMetricValue: 'Intact in Airless Vacuum',
    timeline: [
      { date: 'Jul 16, 1969', title: 'Saturn V Launch', detail: 'Lifted off from Kennedy Space Center Pad 39A.' },
      { date: 'Jul 20, 1969', title: 'Touchdown', detail: 'Landed at Sea of Tranquility at 20:17 UTC.' },
      { date: 'Jul 21, 1969', title: 'Ascent Liftoff', detail: 'Upper cabin launched off the descent stage.' },
      { date: 'TODAY', title: 'Heritage Site', detail: 'Visible from orbit by Lunar Reconnaissance Orbiter.' }
    ],
    experiment: {
      type: 'button',
      label: 'Stage Separation Sequence',
      actionText: 'Fire Ascent Stage Separation',
      resultText: 'Pyrotechnic bolts fired! Ascent cabin in lunar orbit; Descent Stage preserved.'
    }
  },
  {
    id: 'alsep',
    year: 1969,
    zone: 'moon',
    zoneLabel: 'CHAPTER 04 • THE MOON',
    name: 'ALSEP & Laser Retroreflectors',
    subtitle: 'The Mirror That Never Sleeps',
    location: 'Tranquility, Fra Mauro & Hadley',
    coords: '0.673° N, 23.473° E',
    nssdcaId: '1969-059E',
    resourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C',
    statusLabel: 'PASSIVE SCIENCE STILL ACTIVE',
    statusClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50',
    image: 'assets/images/alsep.jpg',
    imageCaption: 'Apollo lunar surface experiment array deployed on the Moon.',
    nasaId: '6900959',
    videoUrl: null,
    punchLine: 'Zero batteries. Zero wires. Yet 57 years later, it still answers green lasers fired from Earth.',
    story: [
      'Most of the science stations Apollo left behind went quiet in 1977 when their radios were switched off. But one suitcase-sized panel of 100 glass prisms needed no electricity at all.',
      'Every week, telescopes on Earth aim a green laser across 384,400 kilometers of space, hit these exact mirrors, and catch the returning photons 2.56 seconds later—measuring the Moon’s distance down to a single millimeter.',
      'That mirror proved the Moon is slowly spiraling away from us at 3.8 centimeters every year. Meanwhile, just four months after Apollo 11, NASA wanted to prove something even bolder: pinpoint accuracy.'
    ],
    lastEcho: 'ACTIVE: Returning laser photons to Apache Point & McDonald Observatories.',
    liveMetricLabel: 'CUMULATIVE LUNAR DRIFT SINCE 1969',
    liveMetricValue: '+216.6 cm Further Away',
    timeline: [
      { date: 'Jul 1969', title: 'Deployed on Moon', detail: 'Placed by Apollo 11; expanded by Apollos 14 & 15.' },
      { date: 'Aug 1969', title: 'First Laser Bounce', detail: 'Lick Observatory captured first returning photons.' },
      { date: '1977', title: 'ALSEP Radios Off', detail: 'Powered science stations shut down; prisms stayed active.' },
      { date: 'TODAY', title: 'Active 2026', detail: 'Still testing Einstein’s General Relativity.' }
    ],
    experiment: {
      type: 'laser',
      label: 'Earth-to-Moon Laser Ranging',
      actionText: 'Fire 532 nm Green Laser Pulse',
      resultText: 'Photon return in 2.5644 s — Distance: 384,402,118.4 mm!'
    }
  },
  {
    id: 'apollo12',
    year: 1969,
    zone: 'moon',
    zoneLabel: 'CHAPTER 05 • THE MOON',
    name: 'Apollo 12 LM Intrepid Descent Stage',
    subtitle: 'A Bullseye Landing Next to an Old Friend',
    location: 'Oceanus Procellarum',
    coords: '3.012° S, 23.421° W',
    nssdcaId: '1969-099C',
    resourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C',
    statusLabel: 'STATIONARY SURFACE MONUMENT',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50',
    image: 'assets/images/apollo12.jpg',
    imageCaption: 'Apollo 12 Lunar Module Intrepid photographed in lunar orbit before descent.',
    nasaId: 'as12-50-7328',
    videoUrl: null,
    punchLine: 'Struck twice by lightning at launch, Intrepid still nailed a bullseye landing 160 meters from Surveyor 3.',
    story: [
      'Apollo 11 landed miles off its target; Apollo 12 set out to prove astronauts could land on a dime. Thirty-six seconds after liftoff, two lightning bolts fried their computers—yet the crew flipped one famous switch and flew on.',
      'Days later, Intrepid touched down right on the rim of Surveyor Crater. Looking out the window, Pete Conrad and Alan Bean spotted the silent Surveyor 3 lander waiting for them since 1967.',
      'They hiked down the crater, clipped off Surveyor’s camera to bring home, and proved humans could revisit our robotic scouts. Next, astronauts needed wheels to go even farther.'
    ],
    lastEcho: '"Whoopee! Man, that may have been a small one for Neil, but that’s a long one for me!" — Pete Conrad',
    liveMetricLabel: 'PRECISION TARGETING ERROR',
    liveMetricValue: 'Only 160 Meters Off Target',
    timeline: [
      { date: 'Nov 14, 1969', title: 'Lightning Launch', detail: 'Survived two lightning strikes during ascent.' },
      { date: 'Nov 19, 1969', title: 'Pinpoint Landing', detail: 'Touched down at Surveyor Crater rim.' },
      { date: 'Nov 20, 1969', title: 'Surveyor 3 Walk', detail: 'Retrieved parts from the 1967 robotic lander.' },
      { date: 'TODAY', title: 'Preserved Pair', detail: 'Intrepid & Surveyor 3 sit side-by-side on the Moon.' }
    ],
    experiment: {
      type: 'button',
      label: 'Pinpoint Landing Radar Check',
      actionText: 'Verify Crater Rim Distance',
      resultText: 'Target lock: 160 m from Surveyor 3 — Pinpoint landing verified!'
    }
  },
  {
    id: 'apollo15_lrv',
    year: 1971,
    zone: 'moon',
    zoneLabel: 'CHAPTER 06 • THE MOON',
    name: 'Apollo 15 Lunar Roving Vehicle',
    subtitle: 'Giving Astronauts Wheels on Another World',
    location: 'Hadley Rille / Apennines',
    coords: '26.132° N, 3.634° E',
    nssdcaId: '1971-063C',
    resourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C',
    statusLabel: 'STATIONARY SURFACE MONUMENT',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50',
    image: 'assets/images/apollo15_lrv.jpg',
    imageCaption: 'Apollo 15 Lunar Roving Vehicle (LRV-1) electric off-world explorer.',
    nasaId: 'S71-30542',
    videoUrl: 'https://images-assets.nasa.gov/video/Moon_Base_Update-Oct-Lunar_Rovers/Moon_Base_Update-Oct-Lunar_Rovers~medium.mp4',
    punchLine: 'It unfolded like origami, rolled on piano-wire wheels, and found a 4.1-billion-year-old piece of the Moon’s birth.',
    story: [
      'In bulky spacesuits, astronauts could barely hike a few hundred meters. So NASA folded a 210-kilogram electric dune buggy into the side of Apollo 15’s lander, complete with titanium-chevron wire wheels that could never go flat.',
      'Driving nearly 28 kilometers across mountains and canyons at Hadley Rille, Dave Scott and Jim Irwin spotted a glittering white crystal rock—the "Genesis Rock," born when the young Moon was a molten ocean of magma.',
      'Before blasting home, they parked the buggy to film their own liftoff. We had conquered the Moon—now it was time to send a pioneer past the Asteroid Belt into the dark.'
    ],
    lastEcho: 'Parked 100m from the Falcon descent stage, TV camera pointed at liftoff.',
    liveMetricLabel: 'TOTAL DISTANCE DRIVEN',
    liveMetricValue: '27.9 km across Hadley Rille',
    timeline: [
      { date: 'Jul 31, 1971', title: 'Unfolded on Moon', detail: 'First human-driven vehicle on another world.' },
      { date: 'Aug 1, 1971', title: 'Genesis Rock Find', detail: 'Collected 4.1-billion-year-old lunar crust.' },
      { date: 'Aug 2, 1971', title: 'Parked & Televised', detail: 'Remote camera filmed Apollo 15’s blastoff.' },
      { date: 'TODAY', title: '3 LRVs on Moon', detail: 'Apollos 15, 16, and 17 rovers remain parked.' }
    ],
    experiment: {
      type: 'button',
      label: 'Wire-Mesh 4WD Traction',
      actionText: 'Engage 4-Wheel Electric Drive',
      resultText: 'All 4 hub motors spinning! Top speed: 13 km/h over powdery regolith.'
    }
  },
  {
    id: 'pioneer',
    year: 1972,
    zone: 'deepspace',
    zoneLabel: 'CHAPTER 07 • DEEP SPACE',
    name: 'Pioneer 10 & 11',
    subtitle: 'Crossing the Asteroid Belt to the Stars',
    location: 'Beyond the Solar System',
    coords: 'Heading toward Aldebaran',
    nssdcaId: '1972-012A',
    resourceUrl: 'https://science.nasa.gov/mission/pioneer-10/',
    statusLabel: 'INTERSTELLAR DRIFTER',
    statusClass: 'bg-violet-500/20 text-violet-300 border-violet-400/50',
    image: 'assets/images/pioneer.jpg',
    imageCaption: 'Pioneer 10 spacecraft carrying the gold-anodized interstellar plaque.',
    nasaId: 'ARC-1972-AC72-2135',
    videoUrl: null,
    punchLine: 'Everyone thought the Asteroid Belt would shred it to pieces—instead, Pioneer 10 opened the outer solar system.',
    story: [
      'While Apollo astronauts drove across the Moon, Pioneer 10 launched faster than any human object ever built, aiming straight into the unknown Asteroid Belt. Many feared cosmic boulders would smash it to bits.',
      'Powered by nuclear plutonium generators because sunlight grew too weak, Pioneer survived the belt, snapped humanity’s first close-ups of Jupiter’s raging storms, and proved the outer planets were open for exploration.',
      'Carrying a Golden Plaque showing Earth’s address in the galaxy, its final whisper reached the DSN in 2003. While Pioneer raced outward into the dark, NASA turned back toward our nearest rocky neighbor: Mars.'
    ],
    lastEcho: 'Final telemetry whisper received January 23, 2003 from 12.2 billion km.',
    liveMetricLabel: 'ESTIMATED 2026 DISTANCE',
    liveMetricValue: '~20.6 Billion km (~138 AU)',
    timeline: [
      { date: 'Mar 2, 1972', title: 'Launch', detail: 'Fastest human-made object at launch (51,680 km/h).' },
      { date: 'Dec 1973', title: 'Jupiter Flyby', detail: 'Mapped Jupiter’s intense radiation belts.' },
      { date: 'Jan 2003', title: 'Last Signal', detail: 'RTG power dropped below transmitter threshold.' },
      { date: '2 MILLION YRS', title: 'Aldebaran Pass', detail: 'Will pass near the star Aldebaran in Taurus.' }
    ],
    experiment: {
      type: 'slider',
      label: 'SNAP-19 Nuclear Power Decay',
      min: 1972,
      max: 2026,
      value: 2026,
      unit: 'Year',
      actionText: 'Check Power'
    }
  },
  {
    id: 'viking1',
    year: 1976,
    zone: 'mars',
    zoneLabel: 'CHAPTER 08 • MARS',
    name: 'Viking 1 & 2 Landers',
    subtitle: 'First Eyes & Chemistry Lab on the Red Planet',
    location: 'Chryse & Utopia Planitia',
    coords: '22.697° N, 48.222° W',
    nssdcaId: '1975-075C',
    resourceUrl: 'https://science.nasa.gov/mission/viking-1/',
    statusLabel: 'STATIONARY SURFACE MONUMENT',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50',
    image: 'assets/images/viking1.jpg',
    imageCaption: 'First surface view of Chryse Planitia captured by Viking Lander 1.',
    nasaId: 'PIA10738',
    videoUrl: null,
    punchLine: 'Designed for 90 days, Viking 1 stood watch on Mars for six straight years—searching the red dust for life.',
    story: [
      'Mars had swallowed previous landers, but on July 20, 1976, Viking 1’s thrusters lowered it gently onto the rust-red plains of Chryse Planitia. Moments later, Earth saw its very first crisp color panorama from Mars.',
      'Its robotic arm scooped Martian dirt into tiny ovens to hunt for microbes. Instead of life, it found hyper-reactive chemistry—and a frozen desert swept by planet-wide dust storms.',
      'Viking 1 outlasted its 90-day warranty by twenty-five times before going silent in 1982. Standing in one spot left scientists wanting more: what if our next Mars explorer could actually roll?'
    ],
    lastEcho: 'Operated 2,245 Martian sols; renamed Thomas Mutch Memorial Station.',
    liveMetricLabel: 'WARRANTY EXCEEDED BY',
    liveMetricValue: '25x Original 90-Day Plan',
    timeline: [
      { date: 'Aug 1975', title: 'Launch', detail: 'Twin Viking orbiters and landers departed Earth.' },
      { date: 'Jul 20, 1976', title: 'Mars Touchdown', detail: 'Landed safely in Chryse Planitia.' },
      { date: '1976–1982', title: '6-Year Weather Log', detail: 'Tracked dust storms and seasonal pressure cycles.' },
      { date: 'Nov 1982', title: 'Final Transmission', detail: 'Lost contact after battery update error.' }
    ],
    experiment: {
      type: 'button',
      label: 'GCMS Soil Pyrolysis Oven',
      actionText: 'Heat Martian Soil to 500°C',
      resultText: 'Water vapor & oxidizing chemistry detected. No biological organics found.'
    }
  },
  {
    id: 'sojourner',
    year: 1997,
    zone: 'mars',
    zoneLabel: 'CHAPTER 09 • MARS',
    name: 'Sojourner Rover',
    subtitle: 'The Microwave-Sized Rover That Started a Revolution',
    location: 'Ares Vallis',
    coords: '19.33° N, 33.55° W',
    nssdcaId: '1996-068A',
    resourceUrl: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/',
    statusLabel: 'FIRST MOBILE ROVER MONUMENT',
    statusClass: 'bg-amber-500/20 text-amber-300 border-amber-400/50',
    image: 'assets/images/sojourner.jpg',
    imageCaption: 'Sojourner compared alongside later generations of NASA Mars rovers.',
    nasaId: 'PIA11436',
    videoUrl: 'https://images-assets.nasa.gov/video/JPL-20230607-MARSf-0001-Mars Report Whats in A Name/JPL-20230607-MARSf-0001-Mars Report Whats in A Name~medium.mp4',
    punchLine: 'Weighing just 11.5 kilograms, Sojourner bounced onto Mars in airbags and proved robots could drive across another planet.',
    story: [
      'Twenty-one years after Viking, NASA returned with a wild idea: wrap a lander in giant airbags, bounce it across Mars, and roll out a 6-wheeled robot the size of a microwave oven.',
      'Using a clever Rocker-Bogie suspension, little Sojourner climbed over boulders, pressed its nose against a rock nicknamed "Barnacle Bill," and proved Mars’s ancient floods had carved volcanic stone.',
      'Sojourner was only meant to live for 7 days—it lasted 83, sparking a rover revolution. Meanwhile, far beyond Mars, another craft was about to pull off the gutsiest landing in space history.'
    ],
    lastEcho: 'Drove in slow circles around Pathfinder after radio relay failed on Sol 83.',
    liveMetricLabel: 'ROVER MASS',
    liveMetricValue: '11.5 kg (Size of a Microwave)',
    timeline: [
      { date: 'Jul 4, 1997', title: 'Airbag Landing', detail: 'Bounced across Ares Vallis flood plain.' },
      { date: 'Jul 6, 1997', title: 'First Wheels on Mars', detail: 'Rolled down the Pathfinder ramp.' },
      { date: 'Jul 1997', title: 'Barnacle Bill Analysis', detail: 'APXS sensor measured volcanic rock chemistry.' },
      { date: 'Sep 27, 1997', title: 'Final Contact', detail: 'Lasted 83 sols (planned for 7 sols).' }
    ],
    experiment: {
      type: 'button',
      label: 'Rocker-Bogie Rock Climb',
      actionText: 'Climb Over "Barnacle Bill"',
      resultText: 'Suspension articulated! APXS confirms high-silica volcanic andesite.'
    }
  },
  {
    id: 'near',
    year: 2001,
    zone: 'deepspace',
    zoneLabel: 'CHAPTER 10 • DEEP SPACE',
    name: 'NEAR Shoemaker',
    subtitle: 'The Orbiter That Dared to Land on an Asteroid',
    location: 'Asteroid 433 Eros',
    coords: 'The Saddle Region of Eros',
    nssdcaId: '1996-008A',
    resourceUrl: 'https://science.nasa.gov/mission/near-shoemaker/',
    statusLabel: 'ASTEROID SURFACE MONUMENT',
    statusClass: 'bg-amber-500/20 text-amber-300 border-amber-400/50',
    image: 'assets/images/near.jpg',
    imageCaption: 'Asteroid 433 Eros mapped by NEAR Shoemaker before its historic touchdown.',
    nasaId: 'PIA02471',
    videoUrl: null,
    punchLine: 'Built with zero landing legs, NEAR Shoemaker ended its mission by softly touching down on a tumbling asteroid.',
    story: [
      'After studying Asteroid 433 Eros from orbit for a full year, NEAR Shoemaker was almost out of fuel. Rather than let it drift away, engineers asked: what if we try to land an orbiter that was never built to land?',
      'Pulsing tiny thrusters in near-zero gravity, NEAR drifted down onto the potato-shaped asteroid at walking speed—1.8 meters per second—and amazingly survived without breaking a single solar panel!',
      'Resting in Eros’s dust, it beamed back two extra weeks of soil chemistry before going silent. Back on Mars, Sojourner’s tiny tire tracks were about to inspire a pair of marathon legends.'
    ],
    lastEcho: 'Transmitted 14 days of surface gamma-ray spectra directly from Asteroid 433 Eros.',
    liveMetricLabel: 'TOUCHDOWN SPEED',
    liveMetricValue: '1.8 m/s (Walking Pace)',
    timeline: [
      { date: 'Feb 1996', title: 'Launch', detail: 'First Discovery-class spacecraft launched by NASA.' },
      { date: 'Feb 2000', title: 'Asteroid Orbit', detail: 'Entered orbit around 433 Eros.' },
      { date: 'Feb 12, 2001', title: 'Historic Landing', detail: 'Touched down intact on an asteroid.' },
      { date: 'Feb 28, 2001', title: 'Final Signal', detail: 'Mission concluded after surface science bonus.' }
    ],
    experiment: {
      type: 'button',
      label: 'Micro-Gravity Descent Burn',
      actionText: 'Pulse Hydrazine Thrusters',
      resultText: 'Soft touchdown at 1.8 m/s! Solar panels intact on 433 Eros.'
    }
  },
  {
    id: 'mer',
    year: 2004,
    zone: 'mars',
    zoneLabel: 'CHAPTER 11 • MARS',
    name: 'Spirit & Opportunity Rovers',
    subtitle: 'The Twin Marathon Geologists',
    location: 'Gusev & Endeavour Craters',
    coords: '1.948° S, 354.474° E',
    nssdcaId: '2003-032A',
    resourceUrl: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/',
    statusLabel: 'STATIONARY SURFACE MONUMENTS',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50',
    image: 'assets/images/mer.jpg',
    imageCaption: 'Opportunity’s panoramic view of Orion Crater on Mars.',
    nasaId: 'PIA21706',
    videoUrl: 'https://images-assets.nasa.gov/video/JPL-20230607-MARSf-0001-Mars Report Whats in A Name/JPL-20230607-MARSf-0001-Mars Report Whats in A Name~medium.mp4',
    punchLine: 'Built for 90 days, Opportunity rolled 45 kilometers over 15 years—and proved ancient Mars once had liquid water.',
    story: [
      'Following in Sojourner’s tracks, twin rovers Spirit and Opportunity bounced onto opposite sides of Mars in 2004. Armed with diamond-tipped rock grinders, they scraped away red dust to read Mars’s ancient diary.',
      'Opportunity uncovered tiny iron spheres nicknamed "blueberries" and salts that only form inside standing liquid water. Spirit found silica from ancient volcanic hot springs.',
      'Spirit drove for six years until trapped in soft sand; Opportunity kept rolling for nearly fifteen years until a monster dust storm blotted out the Sun. While they roamed Mars, another craft fired blue plasma toward the Asteroid Belt.'
    ],
    lastEcho: 'Final telemetry translated as: "My battery is low and it’s getting dark."',
    liveMetricLabel: 'OPPORTUNITY ODOMETER',
    liveMetricValue: '45.16 km (First Off-World Marathon)',
    timeline: [
      { date: 'Jan 2004', title: 'Twin Landings', detail: 'Spirit & Opportunity bounced into opposite craters.' },
      { date: 'Mar 2004', title: 'Water Proof', detail: 'Hematite "blueberries" confirmed ancient liquid water.' },
      { date: '2010', title: 'Spirit Silent', detail: 'Rested permanently at Troy after 6 years.' },
      { date: 'Jun 2018', title: 'Global Dust Storm', detail: 'Opportunity’s final signal after 5,111 sols.' }
    ],
    experiment: {
      type: 'button',
      label: 'Rock Abrasion Tool (RAT)',
      actionText: 'Grind Martian Bedrock',
      resultText: 'Dust cleared at 3,000 RPM — Hematite "blueberries" exposed!'
    }
  },
  {
    id: 'dawn',
    year: 2007,
    zone: 'deepspace',
    zoneLabel: 'CHAPTER 12 • DEEP SPACE',
    name: 'Dawn Spacecraft',
    subtitle: 'The Blue-Ion Explorer of Two Worlds',
    location: 'Perpetual Orbit at Ceres',
    coords: 'Asteroid Belt (2.77 AU)',
    nssdcaId: '2007-043A',
    resourceUrl: 'https://science.nasa.gov/mission/dawn/',
    statusLabel: 'UNPOWERED PERPETUAL ORBIT',
    statusClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50',
    image: 'assets/images/dawn.jpg',
    imageCaption: 'Dawn firing its blue-violet Xenon ion thrusters toward Vesta and Ceres.',
    nasaId: 'PIA12033',
    videoUrl: 'https://images-assets.nasa.gov/video/ksc_070207_dawn_mim5/ksc_070207_dawn_mim5~orig.mp4',
    punchLine: 'Powered by glowing blue Xenon plasma, Dawn became the only spacecraft ever to orbit two separate alien worlds.',
    story: [
      'NEAR Shoemaker proved we could visit one asteroid; Dawn set out to orbit the two giants of the Asteroid Belt—rocky Vesta and icy dwarf planet Ceres—in a single trip.',
      'No normal chemical rocket could carry enough fuel for that double trick. So Dawn used futuristic Xenon ion engines, gently accelerating charged blue plasma to ten times chemical efficiency.',
      'At Ceres, it discovered bright salt domes and an ice volcano 4 kilometers tall before running out of fuel in 2018. Locked in silent orbit forever, our next scout turned its eyes far beyond our solar system.'
    ],
    lastEcho: 'Locked in a planetary-protection orbit around Ceres for at least 50+ years.',
    liveMetricLabel: 'ION EXHAUST VELOCITY',
    liveMetricValue: '30 km/second (Blue Plasma)',
    timeline: [
      { date: 'Sep 2007', title: 'Launch', detail: 'Departed Earth with 425 kg of Xenon propellant.' },
      { date: '2011–2012', title: 'Vesta Orbit', detail: 'Mapped giant iron core and Rheasilvia basin.' },
      { date: '2015–2018', title: 'Ceres Orbit', detail: 'Found cryovolcano Ahuna Mons & salt deposits.' },
      { date: 'Oct 2018', title: 'Fuel Exhausted', detail: 'Entered silent perpetual orbit around Ceres.' }
    ],
    experiment: {
      type: 'slider',
      label: 'NSTAR Xenon Ion Thruster',
      min: 0,
      max: 100,
      value: 85,
      unit: '% Beam',
      actionText: 'Throttle Ion Beam'
    }
  },
  {
    id: 'kepler',
    year: 2009,
    zone: 'earth',
    zoneLabel: 'CHAPTER 13 • EARTH & ORBIT',
    name: 'Kepler Space Telescope',
    subtitle: 'The Planet Hunter That Rewrote the Night Sky',
    location: 'Earth-Trailing Solar Orbit',
    coords: '~150 Million km behind Earth',
    nssdcaId: '2009-011A',
    resourceUrl: 'https://nssdc.gsfc.nasa.gov/',
    statusLabel: 'DEACTIVATED SOLAR DRIFTER',
    statusClass: 'bg-slate-500/20 text-slate-300 border-slate-400/50',
    image: 'assets/images/kepler.jpg',
    imageCaption: 'Artist concept of a distant exoplanet world discovered by NASA’s Kepler mission.',
    nasaId: 'PIA17445',
    videoUrl: 'https://images-assets.nasa.gov/video/GSFC_20190327_TESS_m13155_Voyager/GSFC_20190327_TESS_m13155_Voyager~medium.mp4',
    punchLine: 'Kepler stared at 150,000 stars and proved a mind-bending truth: planets outnumber stars in our galaxy.',
    story: [
      'While Dawn explored worlds inside our solar system, Kepler trailed behind Earth, staring unblinkingly at 150,000 distant stars to catch the tiny shadow of alien planets crossing in front of them.',
      'Spotting one of those transits was like noticing a flea crawl across a car headlight from hundreds of miles away. Yet Kepler discovered over 2,660 confirmed exoplanets—including rocky worlds in habitable zones.',
      'In October 2018, out of fuel, NASA beamed Kepler a final "goodnight" command. Just one month later, our story returned to Mars to listen beneath its red crust.'
    ],
    lastEcho: 'Decommissioned October 30, 2018 — drifting peacefully in Earth-trailing orbit.',
    liveMetricLabel: 'CONFIRMED EXOPLANETS FOUND',
    liveMetricValue: '2,662+ Worlds Discovered',
    timeline: [
      { date: 'Mar 2009', title: 'Launch', detail: 'Entered heliocentric orbit trailing Earth.' },
      { date: '2009–2013', title: 'Primary Survey', detail: 'Monitored 150,000 stars in Cygnus & Lyra.' },
      { date: '2014–2018', title: 'K2 Extended Mission', detail: 'Balanced with solar pressure after wheel failure.' },
      { date: 'Oct 2018', title: 'Goodnight Command', detail: 'Retired safely after exhausting attitude fuel.' }
    ],
    experiment: {
      type: 'button',
      label: 'Exoplanet Transit Detector',
      actionText: 'Simulate Planet Crossing Star',
      resultText: 'Brightness dipped 0.088% — Earth-sized exoplanet confirmed!'
    }
  },
  {
    id: 'phoenix_insight',
    year: 2018,
    zone: 'mars',
    zoneLabel: 'CHAPTER 14 • MARS',
    name: 'Phoenix & InSight Landers',
    subtitle: 'Digging Up Ice & Listening to Mars’s Heartbeat',
    location: 'Arctic Plains & Elysium Planitia',
    coords: '4.502° N, 135.623° E (InSight)',
    nssdcaId: '2018-042A',
    resourceUrl: 'https://science.nasa.gov/mission/insight/',
    statusLabel: 'STATIONARY SURFACE MONUMENTS',
    statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50',
    image: 'assets/images/phoenix_insight.jpg',
    imageCaption: 'Cutaway of InSight’s ultra-sensitive SEIS seismometer dome on Mars.',
    nasaId: 'PIA22320',
    videoUrl: 'https://images-assets.nasa.gov/video/JPL-20211115-MARSf-0001-Hows the Weather on Mars/JPL-20211115-MARSf-0001-Hows the Weather on Mars~medium.mp4',
    punchLine: 'Phoenix scraped up buried Martian water ice; InSight listened to 1,319 marsquakes to hear Mars’s liquid core.',
    story: [
      'Rovers had mapped the surface, so Phoenix and InSight looked underground. In 2008, Phoenix scratched the arctic soil and uncovered bright white water ice that vanished in the sun.',
      'Ten years later, InSight placed a dome-covered seismometer onto the Martian dirt—so sensitive it could feel vibrations smaller than a single atom. It recorded 1,319 marsquakes, mapping Mars’s molten iron core.',
      'When thick dust finally choked its solar panels in December 2022, InSight sent one last dusty selfie goodbye. Yet even as InSight fell silent, something extraordinary was already soaring above Mars.'
    ],
    lastEcho: '"My power’s really low, so this may be the last image I can send..." — Dec 19, 2022',
    liveMetricLabel: 'MARSQUAKES RECORDED',
    liveMetricValue: '1,319+ Seismic Events',
    timeline: [
      { date: 'May 2008', title: 'Phoenix Ice Find', detail: 'Confirmed subsurface water ice in Martian arctic.' },
      { date: 'Nov 2018', title: 'InSight Touchdown', detail: 'Landed on smooth Elysium Planitia.' },
      { date: '2019–2022', title: 'Core Mapped', detail: 'Measured Mars’s 1,830 km liquid iron-alloy core.' },
      { date: 'Dec 2022', title: 'Dust Silence', detail: 'Solar arrays covered; mission officially retired.' }
    ],
    experiment: {
      type: 'button',
      label: 'SEIS Seismometer Pulse',
      actionText: 'Trigger Magnitude 4.2 Marsquake',
      resultText: 'P-waves & S-waves detected! Core boundary echo confirmed.'
    }
  },
  {
    id: 'ingenuity',
    year: 2021,
    zone: 'mars',
    zoneLabel: 'CHAPTER 15 • MARS (FINALE)',
    name: 'Ingenuity Mars Helicopter',
    subtitle: 'Taking Flight in Another World’s Sky',
    location: 'Valinor Hills, Jezero Crater',
    coords: '18.444° N, 77.450° E',
    nssdcaId: '2020-052C',
    resourceUrl: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/',
    statusLabel: 'GROUNDED PIONEER ROTORCRAFT',
    statusClass: 'bg-rose-500/20 text-rose-300 border-rose-400/50',
    image: 'assets/images/ingenuity.jpg',
    imageCaption: 'Ingenuity hovering over the Martian surface in Jezero Crater.',
    nasaId: 'PIA25321',
    videoUrl: 'https://images-assets.nasa.gov/video/JPL-20210323-TECHf-0001-Helicopter First Flight VF/JPL-20210323-TECHf-0001-Helicopter First Flight VF~medium.mp4',
    punchLine: 'They said Mars’s air was too thin to fly—Ingenuity spun at 2,537 RPM and soared 72 times.',
    story: [
      'For sixty years, every pioneer on our timeline crawled, landed, or drifted. Ingenuity dared to fly. Carrying a postage-stamp piece of the Wright Brothers’ 1903 plane, this 1.8-kilogram helicopter spun its blades ten times faster than an Earth chopper to lift off in 1% Martian air.',
      'Built for just 5 test hops, Ingenuity flew an astonishing 72 times across Jezero Crater—scouting canyons and dunes ahead of the Perseverance rover until a rotor tip chipped on landing in January 2024.',
      'Today, Ingenuity rests at Valinor Hills. From Surveyor’s first scoop on the Moon to rotorcraft in Martian skies, these discarded machines are not forgotten junk—they are the milestones of our cosmic journey.'
    ],
    lastEcho: '72 flights, 128.8 flight minutes, 17.0 km flown across Jezero Crater.',
    liveMetricLabel: 'FLIGHTS COMPLETED',
    liveMetricValue: '72 / 5 Planned (14.4x Goal)',
    timeline: [
      { date: 'Feb 2021', title: 'Arrival at Jezero', detail: 'Carried under Perseverance rover’s belly.' },
      { date: 'Apr 19, 2021', title: 'Wright Brothers Moment', detail: 'First aerodynamic flight on another planet.' },
      { date: '2021–2023', title: 'Aerial Scout', detail: 'Scouted ridges, dunes, and river deltas.' },
      { date: 'Jan 18, 2024', title: 'Flight 72 Grounding', detail: 'Rotor blade tip damaged; resting at Valinor Hills.' }
    ],
    experiment: {
      type: 'slider',
      label: 'Carbon-Fiber Rotor Throttle',
      min: 0,
      max: 2700,
      value: 2537,
      unit: 'RPM',
      actionText: 'Spin Rotors'
    }
  }
];

/* Kid-Friendly Story Enhancers: Archetypes, Everyday Comparisons, Problem -> Trick & Takeaways */
const KID_INSIGHTS = {
  dsn: {
    archetype: 'The Cosmic Ears',
    problem: 'As Earth spins, a spacecraft on Mars or the Moon would vanish behind our planet’s curve.',
    trick: 'Place three 70-meter dishes 120° apart around Earth to pass the signal like a relay baton.',
    everydayScale: 'Catches signals weaker than a smartphone battery 20 billion kilometers away.',
    gravityCheck: 'Earth Gravity (1.0g) • Radio travels at the speed of light (300,000 km/s).',
    takeaway: 'Every space mission depends on three giant antenna stations listening 24/7.'
  },
  surveyor3: {
    archetype: 'The Dust Tester',
    problem: 'Scientists feared lunar dust might be deep quicksand that would swallow astronauts.',
    trick: 'Send a lightweight robot first with an accordion arm to poke and test the soil.',
    everydayScale: 'Its scoop dug 17.5 cm deep—about the length of a standard pencil.',
    gravityCheck: 'Moon Gravity (1/6th Earth): A 40 kg student weighs only 6.6 kg here!',
    takeaway: 'Surveyor 3 proved lunar dust was safe so Apollo astronauts could land.'
  },
  apollo11: {
    archetype: 'The First Launchpad',
    problem: 'Carrying fuel to blast the entire heavy spaceship back off the Moon was impossible.',
    trick: 'Split the lander in two—leave the heavy lower legs behind as a launchpad.',
    everydayScale: 'Landed with less than 30 seconds of rocket fuel left—less than a traffic light.',
    gravityCheck: 'Moon Gravity (1/6th Earth): You could jump 6 times higher than on Earth!',
    takeaway: 'Eagle’s lower half stayed behind as humanity’s very first off-world launchpad.'
  },
  alsep: {
    archetype: 'The Immortal Mirror',
    problem: 'Batteries eventually die, silencing science instruments left on the Moon.',
    trick: 'Use 100 glass corner-cube prisms that bounce Earth lasers back with zero electricity.',
    everydayScale: 'The Moon drifts away at 3.8 cm/year—about as fast as your fingernails grow!',
    gravityCheck: 'Light-Speed Ping: A laser takes just 2.56 seconds to reach the Moon and bounce back.',
    takeaway: 'With zero batteries, Apollo’s glass mirrors still answer Earth’s lasers 57 years later.'
  },
  apollo12: {
    archetype: 'The Bullseye Lander',
    problem: 'Apollo 11 landed miles off target; future missions needed pinpoint accuracy.',
    trick: 'Use radar updates to steer Intrepid right onto the rim of Surveyor 3’s crater.',
    everydayScale: 'Landed just 160 meters from Surveyor 3—less than two football fields away!',
    gravityCheck: 'Moon Gravity (1/6th Earth): Airless vacuum means footprints last millions of years.',
    takeaway: 'Apollo 12 proved astronauts could land with pinpoint accuracy next to older robots.'
  },
  apollo15_lrv: {
    archetype: 'The Electric Moon Buggy',
    problem: 'Rubber tires would freeze, crack, and burst in the Moon’s airless extremes.',
    trick: 'Weave springy tires out of piano wire and titanium chevrons, folded like origami.',
    everydayScale: 'Weighed 210 kg on Earth, but felt like only 35 kg (a large dog) on the Moon.',
    gravityCheck: 'Moon Gravity (1/6th Earth): Piano-wire tires never burst or freeze in vacuum.',
    takeaway: 'Giving astronauts wheels let them explore 28 km and find rocks from the Moon’s birth.'
  },
  pioneer: {
    archetype: 'The Cosmic Time Capsule',
    problem: 'Sunlight past Mars is far too weak for solar panels to power a spacecraft.',
    trick: 'Use nuclear plutonium batteries (RTGs) that turn natural heat into electricity for decades.',
    everydayScale: 'Moving at ~11.9 km/s—fast enough to cross the entire United States in 6 minutes!',
    gravityCheck: 'Deep Space (0g): One-way radio signal now takes over 19 hours at light speed.',
    takeaway: 'Pioneer 10 proved spacecraft can cross the Asteroid Belt and carry Earth’s story to the stars.'
  },
  viking1: {
    archetype: 'The First Mars Lab',
    problem: 'We couldn’t bring Martian dirt back to Earth labs in 1976.',
    trick: 'Shrink a full chemistry and biology lab inside a lander with a 3-meter robotic scoop.',
    everydayScale: 'Built for 90 days, it worked for 6 years—like a phone battery lasting 25 times longer!',
    gravityCheck: 'Mars Gravity (38% Earth): A 40 kg student weighs only 15 kg on Mars.',
    takeaway: 'Viking 1 gave us our first color Mars panoramas and six years of weather data.'
  },
  sojourner: {
    archetype: 'The Little Trailblazer',
    problem: 'Landing heavy rockets on Mars was expensive, and rocks could easily tip a rover over.',
    trick: 'Bounce onto Mars inside giant airbags and use 6-wheel Rocker-Bogie legs to climb rocks.',
    everydayScale: 'About the size of a microwave oven and weighed as much as a medium dog (11.5 kg).',
    gravityCheck: 'Mars Gravity (38% Earth): Wrapped in giant airbags to bounce safely onto the surface.',
    takeaway: 'Tiny Sojourner proved wheeled robots could climb rocks and explore another planet.'
  },
  near: {
    archetype: 'The Asteroid Hitchhiker',
    problem: 'NEAR Shoemaker was built only to orbit an asteroid—it had zero landing legs.',
    trick: 'Gently pulse tiny thrusters to touch down on Asteroid 433 Eros at human walking speed.',
    everydayScale: 'Touched down at 1.8 m/s—literally the speed of a person walking down a hallway.',
    gravityCheck: 'Micro-Gravity (0.0005g): A 40 kg student would weigh less than a single paperclip!',
    takeaway: 'Even without landing legs, NEAR Shoemaker pulled off the first soft landing on an asteroid.'
  },
  mer: {
    archetype: 'The 15-Year Marathoners',
    problem: 'Martian rocks are coated in thick red dust that hides what they are really made of.',
    trick: 'Give each rover a diamond-tipped grinder (RAT) to polish away the dust like a geologist.',
    everydayScale: 'Opportunity drove 45.16 km—longer than a full 26.2-mile Olympic marathon!',
    gravityCheck: 'Mars Gravity (38% Earth): Outlived its 90-day warranty by an incredible 60 times.',
    takeaway: 'Spirit and Opportunity found mineral "blueberries" proving ancient Mars had liquid water.'
  },
  dawn: {
    archetype: 'The Blue-Ion Voyager',
    problem: 'Normal rocket fuel is way too heavy for one ship to orbit two different alien worlds.',
    trick: 'Use super-efficient Xenon ion engines that push glowing blue plasma for months.',
    everydayScale: 'Ion engines are 10x more fuel-efficient—like driving 300 miles on a single gallon of gas.',
    gravityCheck: 'Asteroid Belt (2.77 AU): Gentle plasma thrust builds speed slowly over months.',
    takeaway: 'Dawn is the only spacecraft ever to orbit two separate alien worlds in one mission.'
  },
  kepler: {
    archetype: 'The Planet Hunter',
    problem: 'Distant planets are hidden in the blinding glare of their host stars.',
    trick: 'Stare at 150,000 stars at once and measure the tiny brightness dip when a planet passes in front.',
    everydayScale: 'Spotting a planet transit is like seeing a flea walk across a car headlight 100 miles away.',
    gravityCheck: 'Solar Orbit: Trails Earth around the Sun at ~29.5 km every single second.',
    takeaway: 'Kepler discovered 2,660+ alien worlds and proved planets outnumber stars in our galaxy.'
  },
  phoenix_insight: {
    archetype: 'The Planet Doctor',
    problem: 'Mars’s surface is frozen, so its water ice and seismic heartbeats are hidden underground.',
    trick: 'Use Phoenix’s arm to scrape for ice and InSight’s dome-shielded stethoscope to hear marsquakes.',
    everydayScale: 'InSight’s seismometer could feel ground shakes smaller than the width of a single atom!',
    gravityCheck: 'Mars Gravity (38% Earth): Listened to 1,319 marsquakes to map Mars’s liquid core.',
    takeaway: 'Phoenix uncovered buried water ice and InSight took the pulse of Mars’s deep interior.'
  },
  ingenuity: {
    archetype: 'The First Alien Flyer',
    problem: 'Mars’s air is 100 times thinner than Earth’s—ordinary helicopter blades can’t lift off.',
    trick: 'Make the chopper weigh just 1.8 kg and spin twin carbon blades at a blazing 2,537 RPM.',
    everydayScale: 'Flying in Mars’s 1% air is like flying a chopper 3 times higher than Mount Everest!',
    gravityCheck: 'Mars Gravity (38% Earth): Spun twin carbon blades at 2,537 RPM to generate lift.',
    takeaway: 'Planned for 5 hops, Ingenuity flew 72 times—opening the skies of other worlds.'
  }
};

/* Curiosity Cliffhangers for the Next-Stop Teaser Button */
const CLIFFHANGERS = {
  dsn: 'Next: Why did NASA think the Moon might swallow astronauts?',
  kepler: 'Next: Ready to land on the Moon? Meet the Dust Tester!',
  surveyor3: 'Next: See the gold launchpad Eagle left behind at Tranquility Base.',
  apollo11: 'Next: Meet the Moon mirror that still answers Earth with zero batteries!',
  alsep: 'Next: How did Apollo 12 land within walking distance of an old friend?',
  apollo12: 'Next: Why did NASA weave Moon buggy tires out of piano wire?',
  apollo15_lrv: 'Next: Blast off 225M km to Mars—meet the lab that lasted 25x longer!',
  viking1: 'Next: How did a microwave-sized robot bounce onto Mars in airbags?',
  sojourner: 'Next: Meet the twin rovers that ran a 15-year Mars marathon!',
  mer: 'Next: How did InSight hear a marsquake smaller than a single atom?',
  phoenix_insight: 'Next: They said Mars air was too thin to fly—watch Ingenuity soar!',
  ingenuity: 'Next: Venture to Deep Space—how did an orbiter land on an asteroid?',
  near: 'Next: See the blue-plasma engine that orbited two alien worlds!',
  dawn: 'Next: Meet the nuclear time capsule racing out of our solar system!',
  pioneer: 'Expedition Complete! Open your Explorer Passport & Certificate!'
};

const GALLERY_MAP = {
  dsn: ['assets/images/dsn.jpg', 'assets/images/dsn_2.jpg', 'assets/images/dsn_3.jpg'],
  surveyor3: ['assets/images/surveyor3.jpg', 'assets/images/surveyor3_2.jpg', 'assets/images/surveyor3_3.jpg'],
  apollo11: ['assets/images/apollo11.jpg', 'assets/images/apollo11_2.jpg', 'assets/images/apollo11_3.jpg'],
  apollo12: ['assets/images/apollo12.jpg', 'assets/images/apollo12_2.jpg', 'assets/images/apollo12_3.jpg'],
  apollo15_lrv: ['assets/images/apollo15_lrv.jpg', 'assets/images/apollo15_lrv_2.jpg', 'assets/images/apollo15_lrv_3.jpg'],
  alsep: ['assets/images/alsep.jpg', 'assets/images/alsep_2.jpg', 'assets/images/alsep_3.jpg'],
  viking1: ['assets/images/viking1.jpg', 'assets/images/viking1_2.jpg', 'assets/images/viking1_3.jpg'],
  sojourner: ['assets/images/sojourner.jpg', 'assets/images/sojourner_2.jpg', 'assets/images/sojourner_3.jpg'],
  mer: ['assets/images/mer.jpg', 'assets/images/mer_2.jpg', 'assets/images/mer_3.jpg'],
  phoenix_insight: ['assets/images/phoenix_insight.jpg', 'assets/images/phoenix_insight_2.jpg', 'assets/images/phoenix_insight_3.jpg'],
  ingenuity: ['assets/images/ingenuity.jpg', 'assets/images/ingenuity_2.jpg', 'assets/images/ingenuity_3.jpg'],
  near: ['assets/images/near.jpg', 'assets/images/near_2.jpg'],
  dawn: ['assets/images/dawn.jpg', 'assets/images/dawn_2.jpg', 'assets/images/dawn_3.jpg'],
  kepler: ['assets/images/kepler.jpg', 'assets/images/kepler_2.jpg', 'assets/images/kepler_3.jpg'],
  pioneer: ['assets/images/pioneer.jpg', 'assets/images/pioneer_2.jpg', 'assets/images/pioneer_3.jpg']
};

ARTIFACTS.forEach(a => {
  if (KID_INSIGHTS[a.id]) {
    Object.assign(a, KID_INSIGHTS[a.id]);
  }
  a.cliffhanger = CLIFFHANGERS[a.id] || 'Continue the expedition';
  a.gallery = GALLERY_MAP[a.id] || [a.image];
});

/* Zone-by-Zone Story Order: All Earth -> All Moon -> All Mars -> All Deep Space */
const JOURNEY_ORDER = [
  'dsn', 'kepler',
  'surveyor3', 'apollo11', 'alsep', 'apollo12', 'apollo15_lrv',
  'viking1', 'sojourner', 'mer', 'phoenix_insight', 'ingenuity',
  'near', 'dawn', 'pioneer'
];

/* Structured 5-Part Audio Scripts (Name, Purpose, Parts, Science, Present & Future) */
const AUDIO_BRIEFS = {
  dsn: {
    purpose: 'Its purpose is to keep Earth in constant radio contact with every spacecraft as our planet spins.',
    parts: 'Its key parts are three giant 70-meter parabolic dishes in California, Spain, and Australia, equipped with ultra-cold microwave receivers.',
    science: 'It made every planetary science discovery possible by catching faint radio whispers from Apollo, Mars rovers, and interstellar probes.',
    presentFuture: 'Today, the Deep Space Network is fully active 24/7, and in the future it will link Artemis astronauts on the Moon and future missions to Mars.'
  },
  kepler: {
    purpose: 'Its purpose was to find out if Earth-like planets around other stars are rare or common in our galaxy.',
    parts: 'Its main parts were a 0.95-meter telescope mirror, a 95-megapixel camera sensor, and a curved solar wing.',
    science: 'By watching 150,000 stars for tiny brightness dips, Kepler discovered over 2,660 exoplanets and proved planets outnumber stars.',
    presentFuture: 'Today, Kepler is retired and drifting silently behind Earth in solar orbit, paving the way for future planet-hunting telescopes.'
  },
  surveyor3: {
    purpose: 'Its purpose was to prove robotic soft landings worked and test if lunar dust could support heavy Apollo spaceships.',
    parts: 'Its main parts included a triangular metal frame, three shock-absorbing footpads, a TV camera, and an accordion-style soil scoop arm.',
    science: 'It dug trenches and proved the Moon’s surface was solid, and later taught scientists how 31 months of space weather ages metal.',
    presentFuture: 'Today, Surveyor 3 sits as a quiet monument inside Surveyor Crater, waiting as a historic landmark for future Artemis explorers.'
  },
  apollo11: {
    purpose: 'Its purpose was to safely land the first two humans on the Moon and act as a launchpad for their return.',
    parts: 'Its main parts were a throttleable rocket engine, four honeycomb landing legs, gold Kapton thermal foil, and the crew ladder.',
    science: 'It delivered astronauts and surface labs to Tranquility Base, bringing back the first 21.5 kilograms of Moon rocks.',
    presentFuture: 'Today, the Eagle descent stage stands untouched in the airless vacuum as a protected heritage site for future generations.'
  },
  alsep: {
    purpose: 'Its purpose was to leave behind a long-term science station to study moonquakes and the Moon’s exact orbit.',
    parts: 'Its key parts were passive seismometers, solar-wind collectors, and 100 precision glass corner-cube mirror prisms.',
    science: 'It mapped the Moon’s inner core and still bounces Earth lasers back today, proving the Moon drifts 3.8 centimeters away each year.',
    presentFuture: 'While its radios turned off in 1977, the glass mirrors work forever with zero power and will guide future lunar navigation.'
  },
  apollo12: {
    purpose: 'Its purpose was to prove NASA could achieve a pinpoint landing right next to an earlier robotic spacecraft.',
    parts: 'Its parts included a precision landing radar, gold thermal shielding, four crushable legs, and nuclear science bays.',
    science: 'Astronauts collected basalt rocks and brought home Surveyor 3’s camera, revealing how cosmic rays and micrometeorites weather hardware.',
    presentFuture: 'Today, Intrepid’s descent stage rests beside Surveyor 3 in Oceanus Procellarum as a twin monument to precision flight.'
  },
  apollo15_lrv: {
    purpose: 'Its purpose was to give astronauts wheels so they could explore mountains and canyons miles away from their lander.',
    parts: 'Its key parts were a folding aluminum frame, four independent electric hub motors, and springy piano-wire mesh tires.',
    science: 'It carried astronauts nearly 28 kilometers to find the 4.1-billion-year-old Genesis Rock, proving the Moon once had a magma ocean.',
    presentFuture: 'Today, three Lunar Roving Vehicles remain parked on the Moon, inspiring the next-generation Artemis Moon buggies.'
  },
  viking1: {
    purpose: 'Its purpose was to make the first long-term landing on Mars, photograph the surface, and test the soil for signs of life.',
    parts: 'Its parts included two nuclear RTG power generators, twin cameras, a weather boom, and a 3-meter robotic soil-scooping arm.',
    science: 'It sent back the first clear color panoramas of Mars and tracked Martian weather and dust storms for over six years.',
    presentFuture: 'Silent since 1982, Viking 1 rests as the Thomas Mutch Memorial Station, preserving our first long look at the Red Planet.'
  },
  sojourner: {
    purpose: 'Its purpose was to prove that a small, solar-powered wheeled rover could drive across rocky Martian terrain.',
    parts: 'Its main parts were a microwave-sized warm electronics box, a 16-watt solar panel, six cleated wheels on Rocker-Bogie legs, and an X-ray rock sensor.',
    science: 'It analyzed rocks like Barnacle Bill, discovering silica-rich volcanic stone shaped by ancient heat and water.',
    presentFuture: 'Though its radio base faded after 83 sols, Sojourner’s six-wheel Rocker-Bogie design lives on in every modern Mars rover.'
  },
  mer: {
    purpose: 'Their purpose was to act as robotic field geologists searching opposite sides of Mars for clues of ancient water.',
    parts: 'Their main parts were sweeping solar wings, tall stereo camera masts, and a diamond-tipped Rock Abrasion Tool grinder.',
    science: 'Opportunity drove over 45 kilometers and discovered hematite blueberries—proving ancient Mars once had standing liquid water.',
    presentFuture: 'Spirit rests in soft sand and Opportunity was silenced by a 2018 dust storm, leaving behind the roadmap for future Mars astronauts.'
  },
  phoenix_insight: {
    purpose: 'Their purpose was to look beneath Mars’s surface—Phoenix to dig for water ice, and InSight to listen to marsquakes.',
    parts: 'Phoenix used a digging scoop and thermal oven, while InSight used UltraFlex solar wings and a dome-shielded SEIS seismometer.',
    science: 'Phoenix proved buried water ice exists on Mars, and InSight recorded 1,319 marsquakes to measure Mars’s liquid iron core.',
    presentFuture: 'Both landers are now silent under Martian dust, but their maps of buried ice and crust thickness will guide future human bases.'
  },
  ingenuity: {
    purpose: 'Its purpose was to test whether powered, controlled helicopter flight was even possible in Mars’s ultra-thin air.',
    parts: 'Its main parts were a tiny 1.8-kilogram body, a top solar panel, and twin carbon-fiber blades spinning at 2,537 RPM.',
    science: 'Designed for 5 test flights, it flew 72 times across Jezero Crater, proving aerial scouting works on other worlds.',
    presentFuture: 'Grounded at Valinor Hills after Flight 72, Ingenuity now inspires future Mars choppers and Titan’s Dragonfly rotorcraft.'
  },
  near: {
    purpose: 'Its purpose was to orbit a near-Earth asteroid for a full year and map its mass, craters, and minerals.',
    parts: 'Its parts included four solar wings, a fixed radio dish, laser rangefinder, and X-ray and gamma-ray spectrometers.',
    science: 'It proved Asteroid 433 Eros is a solid primordial rock, and pulled off an improvised soft landing to measure surface chemistry.',
    presentFuture: 'Resting intact on Eros since 2001, NEAR Shoemaker showed future missions how to rendezvous with and land on small asteroids.'
  },
  dawn: {
    purpose: 'Its purpose was to orbit and compare the two largest worlds in the Asteroid Belt: rocky Vesta and icy Ceres.',
    parts: 'Its key parts were two massive 20-meter solar wings, framing cameras, and three blue-glowing NSTAR Xenon ion thrusters.',
    science: 'It revealed Vesta’s giant iron core and discovered bright salt domes and a 4-kilometer ice volcano on dwarf planet Ceres.',
    presentFuture: 'Out of attitude fuel since 2018, Dawn circles Ceres in a safe, permanent orbit for decades to protect the dwarf planet.'
  },
  pioneer: {
    purpose: 'Their purpose was to cross the uncharted Asteroid Belt and capture humanity’s first close-up data from Jupiter and Saturn.',
    parts: 'Their main parts were a 2.74-meter dish, four nuclear SNAP-19 generators, radiation sensors, and the Golden Pioneer Plaque.',
    science: 'They proved spacecraft could survive the Asteroid Belt and mapped the intense magnetic radiation belts of the gas giants.',
    presentFuture: 'Silent since 2003, Pioneer 10 coasts into interstellar space at nearly 12 kilometers per second—carrying Earth’s story toward the stars.'
  }
};

ARTIFACTS.forEach(a => {
  if (AUDIO_BRIEFS[a.id]) {
    a.audioBrief = AUDIO_BRIEFS[a.id];
  }
});

