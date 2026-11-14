# Project Specification: Echoes of Discovery — NASA's Silent Pioneers Expedition

## 1. Project Overview & Goals
- **Event:** 2026 NASA Space Apps Challenge — *Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars*
- **Target Audience:** Middle-school students (ages 10–14).
- **Core Objective:** Deliver a continuous, cinematic, story-driven expedition from Earth to the Moon, Mars, and Deep Space that introduces students to **all 13 NASA hardware categories** listed on the official challenge Resources tab—highlighting each artifact's **purpose**, **hardware mechanics**, **scientific discoveries**, and **current level of functionality**.
- **Tone & Visual Style:** Grounded, authentic NASA Deep Space Network (DSN) realism—cinematic space photography palettes (obsidian starfields, lunar basalt gray, Martian iron-oxide rust), mission telemetry HUDs, and engineering blueprints. **No futuristic sci-fi tropes or fictional future dates.**
- **Tech Stack:** Single self-contained `index.html` using semantic HTML5, Tailwind CSS (via CDN), vanilla ES6+ JavaScript, HTML5 Canvas (for planetary environments & orbital-to-surface camera descents), and custom inline SVGs (for interactive hardware schematics). Zero external image dependencies that could break offline.

---

## 2. User Experience & Navigation Flow ("Orbital Descent -> Surface Camera")
1. **Continuous Journey Architecture (Not a Grid Catalogue):**
   - The app opens in **Earth Orbit** above a Deep Space Network tracking dish, introducing the expedition outward through the solar system.
   - A persistent top **Trajectory Progress Bar** tracks the user's current distance from Earth (`Earth` -> `The Moon (384,400 km)` -> `Mars (225M km)` -> `Asteroid Belt & Orbits` -> `Interstellar Edge`).
   - Advancing through the story smoothly transitions the full-screen HTML5 Canvas background from **Orbital View** down into a **Surface Landing Camera** at each historic site, then pulls back into orbit to hop to the next planetary zone.
2. **No Quizzes or Puzzles:**
   - Do **not** interrupt the story with trivia quizzes or gatekeeping locks.
   - Keep students engaged through **tactile hardware micro-interactions** embedded directly inside each artifact's stage.
3. **Audio & Accessibility Suite (Top-Right Control Bar):**
   - **Voice Narration ("Listen to Hardware Log"):** Uses the browser's `window.speechSynthesis` API to read each artifact's first-person monologue aloud with Play/Pause/Stop controls and synchronized active-paragraph highlighting.
   - **Ambient Space Tone Toggle:** Optional subtle Web Audio API low-frequency spacecraft hum (muted by default, user-triggered).
   - **Accessibility Mode:** Toggle for high-contrast / increased font-size / dyslexia-friendly spacing (`Atkinson Hyperlegible` or clean sans-serif fallback).

---

## 3. Complete Coverage of All 13 Challenge Hardware Categories
Every artifact chapter must weave together four pillars—**Purpose**, **Hardware Mechanics**, **Science Made Possible**, and **Current Functionality**—using vivid "show, don't tell" first-person monologues paired with a hands-on hardware control and an expandable **NSSDCA Official Fact Drawer**.

### Zone 1: Earth Orbit (Prologue)
- **DSN Tracking Intro:** Sets the stage—explaining that since the 1960s, NASA has left robotic scouts, rovers, landers, and deep-space probes across the solar system that vary widely in purpose and current operational state.

### Zone 2: The Moon (Orbital Descent to Lunar Surface Sites)
1. **Surveyor Landers (Focus: *Surveyor 3* — Oceanus Procellarum)**
   - *Purpose:* Prove soft robotic landings were possible before Apollo and test whether lunar soil could support heavy crewed landers.
   - *Hardware & Interaction:* Interactive **Surface Sampler Scoop**—click to press the accordion arm into the regolith and test soil bearing strength.
   - *Science:* Confirmed lunar dust wouldn't swallow crewed landers; Apollo 12 astronauts later retrieved *Surveyor 3*'s camera to study 31 months of space weathering.
   - *Current Status:* `STATIONARY SURFACE MONUMENT` (Inactive since 1967).
2. **Apollo Lunar Module Descent Stages (Focus: *Apollo 11 Eagle* — Mare Tranquillitatis)**
   - *Purpose:* Safely land two humans on the Moon and serve as a launchpad for the ascent cabin.
   - *Hardware & Interaction:* Interactive **Stage Separation & Descent Engine Cutaway** showing the throttleable engine, gold Kapton thermal foil, and crushable honeycomb landing legs.
   - *Science:* Delivered the first humans and surface experiment bays to the lunar surface.
   - *Current Status:* `STATIONARY SURFACE MONUMENT` (6 descent stages preserved in the airless lunar vacuum).
3. **Lunar Roving Vehicles (Focus: *Apollo 15 LRV-002* — Hadley Rille)**
   - *Purpose:* Expand astronaut exploration range from hundreds of meters to tens of kilometers across rugged lunar mountains and rilles.
   - *Hardware & Interaction:* Interactive **4-Wheel Wire-Mesh Drive** toggle showing independent electric wheel motors and titanium chevrons gripping powdery regolith.
   - *Science:* Enabled collection of Sample 15415 (**"Genesis Rock"**), a 4.1-billion-year-old piece of primordial lunar crust proving the Moon once had a global magma ocean.
   - *Current Status:* `STATIONARY SURFACE MONUMENT` (3 LRVs parked at Apollos 15, 16, and 17 sites).
4. **ALSEP Scientific Packages (Focus: *Apollo 11 EASEP & Apollo 12–17 ALSEP*)**
   - *Purpose:* Leave behind long-term geophysical stations to study the Moon's interior and orbit after astronauts departed.
   - *Hardware & Interaction:* Interactive **Earth-to-Moon Laser Ranging Experiment**—student clicks "Fire 532 nm Laser" from Earth, watching the green pulse strike the **100 corner-cube prisms** and bounce back to measure the **3.8 cm/year** lunar drift.
   - *Science:* Passive seismometers detected "moonquakes" (mapping crust, mantle, and core); retroreflectors still test Einstein's General Relativity today.
   - *Current Status:* `PASSIVE SCIENCE ACTIVE` (Electronic stations shut down in 1977; laser retroreflectors remain active indefinitely with zero power).

### Zone 3: Mars (Interplanetary Hop & Martian Surface Descents)
5. **Viking 1 & 2 Landers (Chryse Planitia & Utopia Planitia, 1976)**
   - *Purpose:* Achieve the first successful U.S. landings on Mars, analyze soil chemistry, and search for signs of microbial life.
   - *Hardware & Interaction:* Interactive **Biology & GCMS Soil Oven** toggle inspecting the robotic collector arm and meteorology boom.
   - *Science:* Provided the first high-resolution surface panoramas, tracked Martian weather across multiple seasons for 6+ years, and analyzed soil composition.
   - *Current Status:* `STATIONARY SURFACE MONUMENT` (Inactive since 1982 and 1980).
6. **Sojourner Rover (with *Mars Pathfinder* — Ares Vallis, 1997)**
   - *Purpose:* Demonstrate mobile wheeled robotics on Mars and analyze rocks in an ancient flood plain.
   - *Hardware & Interaction:* Interactive **Rocker-Bogie Suspension** climber—toggle wheel articulation to crawl over the boulder *"Barnacle Bill"* and press the tail-mounted **APXS** sensor against the rock.
   - *Science:* APXS discovered silica-rich **andesite** rock shaped by ancient volcanic heat and water, proving mobile rovers could navigate Mars.
   - *Current Status:* `STATIONARY SURFACE MONUMENT` (Lost radio relay when *Pathfinder*'s battery depleted after 83 sols in Sept 1997).
7. **Spirit & Opportunity Rovers (Gusev Crater & Endeavour Crater, 2004–2018)**
   - *Purpose:* Twin robotic field geologists sent for 90-sol missions to search for geological evidence of past liquid water.
   - *Hardware & Interaction:* Interactive **Rock Abrasion Tool (RAT)**—click to spin the diamond-tipped grinder against Martian bedrock, clearing red dust to expose **hematite "blueberries"** and **jarosite**.
   - *Science:* Proved ancient Mars had standing liquid water (*Opportunity*) and hydrothermal hot-spring silica deposits (*Spirit*); *Opportunity* drove 45.16 km over nearly 15 years.
   - *Current Status:* `STATIONARY SURFACE MONUMENT` (*Spirit* embedded in sand at Troy in 2010; *Opportunity* silenced by the June 2018 global dust storm).
8. **Phoenix & InSight Landers (Vastitas Borealis & Elysium Planitia, 2008 & 2018)**
   - *Purpose:* Dig into Mars's arctic soil for water ice (*Phoenix*) and listen to Mars's deep interior vibrations (*InSight*).
   - *Hardware & Interaction:* Dual toggle inspecting *Phoenix*'s **TEGA thermal oven** (melting water ice) and *InSight*'s **SEIS wind-shielded seismometer dome** (triggering a live marsquake waveform pulse).
   - *Science:* *Phoenix* physically confirmed subsurface **water ice**; *InSight* recorded 1,300+ marsquakes, mapping Mars's crust thickness and liquid iron-alloy core.
   - *Current Status:* `STATIONARY SURFACE MONUMENT` (*Phoenix* iced over in Nov 2008; *InSight* dust-covered in Dec 2022).
9. **Ingenuity Helicopter (Valinor Hills, Jezero Crater, 2021–2024)**
   - *Purpose:* Technology demonstrator to test powered, controlled aerodynamic flight in Mars's ultra-thin ($1\%$ Earth density) atmosphere.
   - *Hardware & Interaction:* Interactive **2,537 RPM Rotor Spin-Up** slider showing counter-rotating carbon-fiber blades generating lift in thin Martian air.
   - *Science:* Completed **72 flights** (far beyond its 5-flight test plan), pioneering aerial scouting for future Mars explorers.
   - *Current Status:* `GROUNDED ARTIFACT` (Sustained rotor blade tip damage on Flight 72 in Jan 2024; resting permanently at Valinor Hills).

### Zone 4: Deep Space, Asteroids & Orbits
10. **NEAR Shoemaker (Asteroid 433 Eros, 1996–2001)**
    - *Purpose:* First spacecraft to orbit an asteroid and map its surface composition and mass distribution.
    - *Hardware & Interaction:* Interactive **X-Ray/Gamma-Ray Spectrometer & Touchdown Thruster** view showing its improvised soft landing on Eros's Saddle region.
    - *Science:* Proved 433 Eros is a consolidated primitive body rather than a loose rubble pile, and transmitted gamma-ray spectra directly from the surface.
    - *Current Status:* `ASTEROID SURFACE MONUMENT` (Resting intact on 433 Eros since Feb 12, 2001).
11. **Dawn Spacecraft (Vesta & Ceres, 2007–2018)**
    - *Purpose:* Orbit and compare the two largest bodies in the main asteroid belt: rocky protoplanet **Vesta** and icy dwarf planet **Ceres**.
    - *Hardware & Interaction:* Interactive **NSTAR Xenon Ion Thruster** toggle illuminating the blue-violet ion beam that allowed *Dawn* to enter and leave two extraterrestrial orbits.
    - *Science:* Revealed Vesta's giant iron core and Ceres's cryovolcano (**Ahuna Mons**) and bright sodium-carbonate salt deposits.
    - *Current Status:* `UNPOWERED PERPETUAL ORBIT` (Exhausted hydrazine attitude fuel in Oct 2018; locked in a silent planetary-protection orbit around Ceres).
12. **Kepler Space Telescope (Earth-Trailing Heliocentric Orbit, 2009–2018)**
    - *Purpose:* Continuously monitor over 500,000 stars to detect tiny brightness dips caused by transiting exoplanets.
    - *Hardware & Interaction:* Interactive **0.95m Photometer Transit Curve**—watch a star's light curve dip as an exoplanet crosses its face.
    - *Science:* Discovered **2,600+ confirmed exoplanets**, proving that planets outnumber stars in our galaxy.
    - *Current Status:* `DEACTIVATED DRIFTER` (Retired in Oct 2018 after running out of thruster fuel; drifting safely in an Earth-trailing orbit).
13. **Pioneer 10 & 11 (Outer Solar System & Interstellar Trajectory, 1972 & 1973)**
    - *Purpose:* First spacecraft to traverse the Asteroid Belt and capture close-up flyby data of **Jupiter** (*Pioneer 10*) and **Saturn** (*Pioneer 11*).
    - *Hardware & Interaction:* Interactive **SNAP-19 RTG & Golden Pioneer Plaque** inspector showing nuclear power decay over decades and the interstellar diagram.
    - *Science:* Mapped the intense radiation belts of Jupiter and Saturn and proved safe passage through the Asteroid Belt for *Voyager* and beyond.
    - *Current Status:* `INTERSTELLAR DRIFTER` (Radio signals faded in 2003 and 1995 as RTG power dropped; both continue coasting silently out of the solar system).

---

## 4. Closing Expedition Summary Screen
- Upon completing Chapter 13 (*Pioneer 10 & 11*), the user reaches the **Expedition Archive Summary**:
  - Visualizes the full spectrum of **Current Operational Status** across all 13 artifacts (`1 Passive Science Still Active`, `8 Stationary Surface Monuments`, `3 Unpowered Orbiters / Asteroid Landers`, `1 Interstellar Voyager Pair`).
  - Offers a clean **"Print / Save Expedition Field Report"** button (`window.print()` styled cleanly) for classroom use and quick navigation back to any planetary zone.

---

## 5. Layout & Component Architecture (Single `index.html`)
- **Top HUD Bar:** Mission Title, Planetary Hop Navigator (`Earth` | `Moon` | `Mars` | `Deep Space`), Audio Narration Controls, and Accessibility Toggle.
- **Full-Viewport HTML5 Canvas Layer:** Renders smooth orbital-to-surface camera transitions, terrain horizons, atmospheric dust/starfields, and trajectory lines.
- **Foreground Story & Hardware Stage (Glassmorphic Dark-Slate Telemetry Panel):**
  - **Left Column (45%):** Interactive SVG Hardware Schematic with clickable instrument callouts + the tactile hands-on experiment control (e.g., laser fire, RAT drill, rotor RPM, ion thruster).
  - **Right Column (55%):** Status Badge (`PASSIVE SCIENCE ACTIVE`, `SURFACE MONUMENT`, etc.), First-Person "Show, Don't Tell" Monologue (3 crisp paragraphs covering Purpose, Hardware Mechanics, and Science), expandable **NSSDCA Official Archive Drawer** (Catalog ID, Coordinates, Dates, NASA NSSDCA link), and `Previous / Next Destination` navigation buttons.
  
