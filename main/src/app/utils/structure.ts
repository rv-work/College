export interface Schema {
  [branch: string]: {
    [year: string]: {
      name: string;
      code: string;
      Units: {
        name: string;
        number: number;
        topics: string[];
        youtube: string[];
        notes: string[];
        ppt: string[];
        important: string[];
      }[];
      STs: {
        year: number;
        semester : string;
          papers : {
            name : string;
            file : string;
          }[];
        }[];
      AKTU: {
        year: number;
        file: string;
      }[];
    }[];
  };
}


export const schema: Schema = {
  "CSE/IT": {
    "1": [
      {
        name: "ENGINEERING PHYSICS",
        code: "BAS101 / BAS201",
        Units: [
          {
            name: "Unit-1: Quantum Mechanics",
            number: 1,
            topics: [
              "Inadequacy of classical mechanics",
              "Planck’s theory of black body radiation (qualitative)",
              "Compton effect",
              "de-Broglie concept of matter waves",
              "Davisson and Germer Experiment",
              "Phase velocity and group velocity",
              "Time-dependent and time-independent Schrodinger wave equations",
              "Physical interpretation of wave function",
              "Particle in a one-Dimensional box"
            ],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2: Electromagnetic Field Theory",
            number: 2,
            topics: [
              "Basic concept of Stoke’s theorem and Divergence theorem",
              "Basic laws of electricity and magnetism",
              "Continuity equation for current density",
              "Displacement current",
              "Maxwell equations in integral and differential form",
              "Maxwell equations in vacuum and in conducting medium",
              "Poynting vector and Poynting theorem",
              "Plane electromagnetic waves in vacuum and their transverse nature",
              "Relation between electric and magnetic fields of an electromagnetic wave",
              "Plane electromagnetic waves in conducting medium",
              "Skin depth"
            ],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3: Wave Optics",
            number: 3,
            topics: [
              "Coherent sources",
              "Interference in uniform and wedge shaped thin films",
              "Necessity of extended sources",
              "Newton’s Rings and its applications",
              "Introduction to diffraction",
              "Fraunhoffer diffraction at single slit and double slit",
              "Absent spectra",
              "Diffraction grating",
              "Spectra with grating",
              "Dispersive power",
              "Resolving power",
              "Rayleigh’s criterion of resolution",
              "Resolving power of grating"
            ],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4: Fiber Optics & Laser",
            number: 4,
            topics: [
              "Fibre Optics: Principle and construction of optical fiber",
              "Acceptance angle",
              "Numerical aperture",
              "Acceptance cone",
              "Step index and graded index fibers",
              "Fiber optic communication principle",
              "Attenuation",
              "Dispersion",
              "Application of fiber",
              
              "Laser: Absorption of radiation",
              "Spontaneous and stimulated emission of radiation",
              "Population inversion",
              "Einstein’s Coefficients",
              "Principles of laser action",
              "Solid state Laser (Ruby laser) and Gas Laser (He-Ne laser)",
              "Laser applications"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5: Superconductors and Nano-Materials: ",
            number: 5,
            topics: [
              "Superconductors: Temperature dependence of resistivity in superconducting materials",
              "Meissner effect",
              "Temperature dependence of critical field",
              "Persistent current",
              "Type I and Type II superconductors",
              "High temperature superconductors",
              "Properties and Applications of Super-conductors",
              
              "Nano-Materials: Introduction and properties of nano materials",
              "Basics concept of Quantum Dots, Quantum wires and Quantum well",
              "Fabrication of nano materials - Top-Down approach (CVD) and Bottom-Up approach (Sol Gel)",
              "Properties and Application of nano materials"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "ENGINEERING CHEMISTRY",
        code: "BAS102 / BAS202",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Electrochemistry and Batteries: Basic concepts of electrochemistry",
              
              "Batteries: Classification and applications of Primary Cells (Dry Cell) and Secondary Cells (Lead Acid battery)",
              
              "Corrosion: Introduction to corrosion",
              "Types of corrosion",
              "Cause of corrosion",
              "Corrosion prevention and control",
              "Corrosion issues in specific industries (Power generation, Chemical processing industry, Oil & gas industry, and Pulp & paper industries)",
              
              "Chemistry of Engineering Materials:",
              "Cement: Constituents, manufacturing, hardening and setting, deterioration of cement",
              "Plaster of Paris (POP)"
            ]
            
,            
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Spectroscopic Techniques and Applications: Elementary idea and simple applications of UV, IR and NMR",
              "Numerical problems",
              
              "Stereochemistry: Optical isomerism in compounds without chiral carbon",
              "Geometrical isomerism",
              "Chiral Drugs"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Electrochemistry and Batteries: Basic concepts of electrochemistry",
              
              "Batteries: Classification and applications of Primary Cells (Dry Cell) and Secondary Cells (Lead Acid battery)",
              
              "Corrosion: Introduction to corrosion",
              "Types of corrosion",
              "Cause of corrosion",
              "Corrosion prevention and control",
              "Corrosion issues in specific industries (Power generation, Chemical processing industry, Oil & gas industry, and Pulp & paper industries)",
              
              "Chemistry of Engineering Materials:",
              "Cement: Constituents, manufacturing, hardening and setting, deterioration of cement",
              "Plaster of Paris (POP)"
            ]
            
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Water Technology: Sources and impurities of water",
              "Hardness of water",
              "Boiler troubles",
              "Techniques for water softening (Lime-Soda, Zeolite, Ion Exchange, and Reverse Osmosis process)",
              "Determination of Hardness and alkalinity",
              "Numerical problems on water hardness",
              
              "Fuels and Combustion: Definition, Classification, Characteristics of a good fuel",
              "Calorific Values: Gross & Net calorific value",
              "Determination of calorific value by Bomb Calorimeter",
              "Theoretical calculation of calorific value by Dulong’s method",
              "Ranking of Coal",
              "Analysis of coal by Proximate and Ultimate analysis method",
              "Numerical problems on calorific value",
              "Chemistry of Biogas production from organic waste materials and their environmental impact on society"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5 : Materials Chemistry ",
            number: 5,
            topics: [
              "Polymers: Classification",
              "Polymerization processes",
              "Thermosetting and Thermoplastic Polymers",
              "Polymer Blends and Composites",
              "Conducting and Biodegradable polymers",
              "Preparation, properties, and industrial applications of Teflon, Lucite, Bakelite, Kevlar, Dacron, Thiokol, Nylon, Buna-N, and Buna-S",
              "Environmental impact of polymers on society",
              "Speciality polymers",
              
              "Organometallic Compounds: General methods of preparation and applications",
              "Organometallic compounds (RMgX and LiAlH4)"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "ENGINEERING MATHEMATICS-I",
        code: "BAS103",
        Units: [
          {
            name: "Unit-1: Matrices",
            number: 1,
            topics: [
              "Elementary transformations",
              "Inverse of a matrix",
              "Rank of matrix",
              "Solution of system of linear equations",
              "Characteristic equation",
              "Cayley-Hamilton Theorem and its application",
              "Linear Dependence and Independence of vectors",
              "Eigen values and Eigen vectors",
              "Complex Matrices",
              "Hermitian, Skew-Hermitian, and Unitary Matrices",
              "Applications to Engineering problems"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2: Differential Calculus- I ",
            number: 2,
            topics: [
              "Successive Differentiation (nth order derivatives)",
              "Leibnitz theorem",
              "Curve tracing",
              "Partial derivatives",
              "Euler’s Theorem for homogeneous functions",
              "Total derivative",
              "Change of variables"
            ]
              ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3: Differential Calculus-II ",
            number: 3,
            topics: [
              "Expansion of functions by Taylor’s and Maclaurin’s theorems for functions of one and two variables",
              "Maxima and Minima of functions of several variables",
              "Lagrange’s method of multipliers",
              "Jacobians",
              "Approximation of errors"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4: Multiple integration ",
            number: 4,
            topics: [
              "Double integral",
              "Triple integral",
              "Change of order of integration",
              "Change of variables",
              "Beta and Gamma function and their properties",
              "Dirichlet’s integral and its applications to area and volume",
              "Liouville’s extensions of Dirichlet’s integral"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5: Vector Calculus ",
            number: 5,
            topics: [
              "Vector differentiation: Gradient, Curl, and Divergence and their Physical interpretation",
              "Directional derivatives",
              
              "Vector Integration: Line integral, Surface integral, Volume integral",
              "Gauss’s Divergence theorem",
              "Green’s theorem",
              "Stoke’s theorem (without proof) and their applications"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "ENGINEERING MATHEMATICS-II",
        code: "BAS203 ",
        Units: [
          {
            name: "Unit -1: Ordinary Differential Equation of Higher Order ",
            number: 1,
            topics: [
              "Linear differential equation of nth order with constant coefficients",
              "Simultaneous linear differential equations",
              "Second order linear differential equations with variable coefficients",
              "Solution by changing independent variable",
              "Method of variation of parameters",
              "Cauchy-Euler equation",
              "Application of differential equations in solving engineering problems"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2: Laplace Transform",
            number: 2,
            topics: [
              "Laplace transform",
              "Existence theorem",
              "Properties of Laplace Transform",
              "Laplace transform of derivatives and integrals",
              "Unit step function",
              "Laplace transform of periodic function",
              "Inverse Laplace transform",
              "Convolution theorem",
              "Application of Laplace Transform to solve ordinary differential equations and simultaneous differential equations"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3: Sequence and Series ",
            number: 3,
            topics: [
              "Definition of Sequence and series with examples",
              "Convergence of series",
              "Tests for convergence of series",
              "Ratio test",
              "D’Alembert’s test",
              "Raabe’s test",
              "Comparison test",
              
              "Fourier series",
              "Half range Fourier sine and cosine series"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4: Complex Variable–Differentiation",
            number: 4,
            topics: [
              "Functions of complex variable",
              "Limit, Continuity and differentiability",
              "Analytic functions",
              "Cauchy-Riemann equations (Cartesian and Polar form)",
              "Harmonic function",
              "Method to find Analytic functions",
              "Milne’s Thompson Method",
              "Conformal mapping",
              "Mobius transformation and their properties"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5: Complex Variable –Integration ",
            number: 5,
            topics: [
              "Complex integration",
              "Cauchy-Integral theorem",
              "Cauchy integral formula",
              "Taylor’s and Laurent’s series",
              "Singularities and its classification",
              "Zeros of analytic functions",
              "Residues",
              "Cauchy’s Residue theorem and its application"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "FUNDAMENTALS OF ELECTRICAL ENGINEERING",
        code: "BEE101 / BEE201",
        Units: [
          {
            name: "Unit -1: DC Circuits ",
            number: 1,
            topics: [
              "Electrical circuit elements (R, L and C)",
              "Concept of active and passive elements",
              "Voltage and current sources",
              "Concept of linearity",
              "Unilateral and bilateral elements",
              
              "Kirchhoff’s laws",
              "Mesh and nodal methods of analysis"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2: : Steady State Analysis of Single Phase AC Circuits",
            number: 2,
            topics: [
              "Representation of Sinusoidal waveforms – Average and effective values",
              "Form and peak factors",
              
              "Analysis of single phase AC Circuits consisting R-L-C combination (Series and Parallel)",
              "Apparent, active & reactive power",
              "Power factor",
              
              "Concept of Resonance in series & parallel circuits",
              "Bandwidth and quality factor",
              
              "Three phase balanced circuits",
              "Voltage and current relations in star and delta connections"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3: Transformers ",
            number: 3,
            topics: [
              "Magnetic circuits",
              "Ideal and practical transformer",
              "Equivalent circuit",
              "Losses in transformers",
              "Regulation and efficiency"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4: Electrical machines",
            number: 4,
            topics: [
              "DC machines: Principle & Construction",
              "Types of DC machines",
              "EMF equation of generator and torque equation of motor",
              "Applications of DC motors (simple numerical problems)",
              
              "Three Phase Induction Motor: Principle & Construction",
              "Types of Three Phase Induction Motors",
              "Slip-torque characteristics",
              "Applications (Numerical problems related to slip only)",
              
              "Single Phase Induction motor: Principle of operation and introduction to methods of starting",
              "Applications of Single Phase Induction motor",
              
              "Three Phase Synchronous Machines: Principle of operation of alternator and synchronous motor",
              "Applications of Three Phase Synchronous Machines"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5: Electrical Installations",
            number: 5,
            topics: [
              "Introduction of Switch Fuse Unit (SFU)",
              "MCB, ELCB, MCCB, ACB",
              "Types of Wires, Cables and Bus-bars",
              "Fundamentals of earthing and lightning protection",
              "Types of Batteries"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "FUNDAMENTALS OF ELECTRONICS ENGINEERING",
        code: "BEC101 / BEC201",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Semiconductor Diode: Depletion layer",
              "V-I characteristics of diodes",
              "Ideal and practical Diodes",
              "Diode Equivalent Circuits",
              "Zener Diodes breakdown mechanism (Zener and avalanche)",
              
              "Diode Application: Diode Configuration",
              "Half and Full Wave rectification",
              "Clippers",
              "Clampers",
              "Zener diode as shunt regulator",
              "Voltage-Multiplier Circuits",
              
              "Special Purpose two terminal Devices: Light-Emitting Diodes",
              "Photo Diodes",
              "Varactor Diodes",
              "Tunnel Diodes"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Bipolar Junction Transistor: Transistor Construction",
              "Operation and Amplification action of Bipolar Junction Transistor",
              "Common Base, Common Emitter, Common Collector Configuration",
              
              "Field Effect Transistor: Construction and Characteristic of JFETs",
              "Transfer Characteristic of JFETs",
              "MOSFET (MOS) (Depletion and Enhancement) Type",
              "Transfer Characteristic of MOSFET"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Operational Amplifiers: Introduction",
              "Op-Amp basic",
              "Practical Op-Amp Circuits (Inverting Amplifier, Non-inverting Amplifier, Unit Follower, Summing Amplifier, Integrator, Differentiator)",
              "Differential and Common-Mode Operation",
              "Comparators"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Digital Electronics: Number system & representation",
              "Binary arithmetic",
              "Introduction of Basic and Universal Gates",
              "Using Boolean algebra simplification of Boolean function",
              "K Map Minimization upto 6 Variables"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Fundamentals of Communication Engineering: Basics of signal representation and analysis",
              "Electromagnetic spectrum",
              "Elements of a Communication System",
              "Need of modulation and typical applications",
              "Fundamentals of amplitude modulation and demodulation techniques",
              
              "Introduction to Wireless Communication: Overview of wireless communication",
              "Cellular communication, different generations and standards in cellular communication systems",
              "Fundamentals of Satellite & Radar Communication"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "PROGRAMMING FOR PROBLEM SOLVING",
        code: "BCS101 / BCS201",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction to Components of a Computer System: Memory, Processor, I/O Devices, Storage, Operating System",
              "Concept of Assembler, Compiler, Interpreter, Loader and Linker",
              
              "Idea of Algorithm: Representation of Algorithm, Flowchart, Pseudo Code with Examples",
              "From Algorithms to Programs",
              "Source Code",
              
              "Programming Basics: Structure of C Program",
              "Writing and Executing the First C Program",
              "Syntax and Logical Errors in Compilation",
              "Object and Executable Code",
              
              "Components of C Language",
              "Standard I/O in C",
              "Fundamental Data types",
              "Variables and Memory Locations",
              "Storage Classes"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Arithmetic Expressions and Precedence: Operators and Expression Using Numeric and Relational Operators",
              "Mixed Operands, Type Conversion",
              "Logical Operators",
              "Bit Operations",
              "Assignment Operator",
              "Operator precedence and Associativity",
              
              "Conditional Branching: Applying if and Switch Statements",
              "Nesting if and Else and Switch"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Iteration and Loops: Use of While, do While and for Loops",
              "Multiple Loop Variables",
              "Use of Break, Goto and Continue Statements",
              
              "Arrays: Array Notation and Representation",
              "Manipulating Array Elements",
              "Using Multi Dimensional Arrays",
              "Character Arrays and Strings",
              "Structure, union, Enumerated Data types",
              "Array of Structures",
              "Passing Arrays to Functions"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Functions: Introduction, Types of Functions",
              "Functions with Array",
              "Passing Parameters to Functions",
              "Call by Value, Call by Reference",
              "Recursive Functions",
              
              "Basics of searching and Sorting Algorithms: Searching & Sorting Algorithms",
              "Linear Search",
              "Binary search",
              "Bubble Sort",
              "Insertion and Selection Sort"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Pointers: Introduction, Declaration, Applications",
              "Introduction to Dynamic Memory Allocation (Malloc, Calloc, Realloc, Free)",
              "String and String functions",
              "Use of Pointers in Self-Referential Structures",
              "Notion of Linked List (No Implementation)",
              
              "File Handling: File I/O Functions",
              "Standard C Preprocessors",
              "Defining and Calling Macros and Command-Line Arguments"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "FUNDAMENTALS OF MECHANICAL ENGINEERING",
        code: "Soon",
        Units: [
          {
            name: "Unit -1: Introduction to Mechanics",
            number: 1,
            topics: [
              "Force moment and couple",
              "Principle of transmissibility",
              "Varignon's theorem",
              
              "Resultant of force system: Concurrent and non-concurrent coplanar forces",
              "Types of supports (Hinge, Roller) and loads (Point, UDL, UVL)",
              "Free body diagram",
              "Equilibrium equations and Support Reactions",
              
              "Normal and shear Stress, strain",
              "Hooke’s law",
              "Poisson’s ratio",
              "Elastic constants and their relationship",
              "Stress-strain diagram for ductile and brittle materials",
              "Factor of safety"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2: Introduction to IC Engines and Electric Vehicles",
            number: 2,
            topics: [
              "IC Engine: Basic definition of engine and Components",
              "Construction and Working of Two stroke and four stroke SI & CI engine",
              "Merits and demerits of SI & CI engines",
              "Scavenging process",
              "Difference between two-stroke and four-stroke IC engines",
              "Difference between SI and CI Engines",
              
              "Electric vehicles and hybrid vehicles: Components of an EV",
              "EV batteries, chargers, drives, transmission, and power devices",
              "Advantages and disadvantages of EVs",
              "Hybrid electric vehicles",
              "HEV drive train components",
              "Advantages of HV"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3: Introduction to Refrigeration and Air-Conditioning",
            number: 3,
            topics: [
              "Refrigeration: Refrigerating effect, Ton of Refrigeration",
              "Coefficient of performance",
              "Methods of refrigeration",
              "Construction and working of domestic refrigerator",
              "Concept of heat pump",
              
              "Air-Conditioning: Meaning and application",
              "Humidity, dry bulb, wet bulb, and dew point temperatures",
              "Comfort conditions",
              "Construction and working of window air conditioner"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4: Introduction to Fluid Mechanics and Applications ",
            number: 4,
            topics: [
              "Introduction: Fluids properties",
              "Pressure, density, dynamic and kinematic viscosity",
              "Specific gravity",
              "Newtonian and Non-Newtonian fluid",
              "Pascal’s Law",
              "Continuity Equation",
              
              "Working principles of hydraulic turbines (Pelton Wheel and Francis) & pumps (Centrifugal and Reciprocating)",
              "Classifications of hydraulic turbines and pumps",
              "Hydraulic lift"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5: Introduction to Measurement and Mechatronics",
            number: 5,
            topics: [
              "Introduction to Measurement: Concept of Measurement",
              "Error in measurements",
              "Calibration",
              "Measurements of pressure (Bourdon Tube Pressure and U-Tube Manometer)",
              "Measurements of temperature (Thermocouple and Optical Pyrometer)",
              "Measurements of mass flow rate (Venturi Meter and Orifice Meter)",
              "Measurements of strain (Bonded and Unbonded Strain Gauge)",
              "Measurements of force (Proving Ring) and torques (Prony Brake Dynamometer)",
              "Concepts of accuracy, precision, and resolution",
              
              "Introduction to Mechatronic Systems: Evolution, Scope, Advantages and disadvantages of Mechatronics",
              "Industrial applications of Mechatronics",
              "Introduction to autotronics, bionics, and avionics and their applications",
              
              "Sensors and Transducers: Types of sensors, types of transducers and their characteristics",
              
              "Overview of Mechanical Actuation System – Kinematic Chains, Cam, Ratchet Mechanism, Gears and its type, Belt, Bearing",
              
              "Hydraulic and Pneumatic Actuation Systems: Overview",
              "Pressure Control Valves",
              "Direction Control Valves",
              "Rotary Actuators",
              "Accumulators and Pneumatic Sequencing Problems"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "ENVIRONMENT AND ECOLOGY",
        code: "BAS104 / BAS204",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Environment: Definition, Types of Environment",
              "Components of environment",
              "Segments of environment",
              "Scope and importance",
              "Need for Public Awareness",
              
              "Ecosystem: Definition, Types of ecosystem",
              "Structure of ecosystem",
              "Food Chain",
              "Food Web",
              "Ecological pyramid",
              "Balanced Ecosystem",
              
              "Effects of Human Activities on Environment: Food, Shelter, Housing, Agriculture, Industry, Mining, Transportation, Economic and Social security",
              "Environmental Impact Assessment",
              "Sustainable Development"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Natural Resources: Introduction, Classification",
              
              "Water Resources: Availability, sources and Quality Aspects",
              "Water Borne and Water Induced Diseases",
              "Fluoride and Arsenic Problems in Drinking Water",
              
              "Mineral Resources: Material Cycles (Carbon, Nitrogen, and Sulfur cycles)",
              
              "Energy Resources: Conventional and Non-conventional Sources of Energy",
              
              "Forest Resources: Availability, Depletion of Forests",
              "Environmental impact of forest depletion on society"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Pollution and their Effects",
              "Public Health Aspects of Environment",
              "Water Pollution",
              "Air Pollution",
              "Soil Pollution",
              "Noise Pollution",
              "Solid Waste Management"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Current Environmental Issues of Importance",
              "Global Warming",
              "Greenhouse Effects",
              "Climate Change",
              "Acid Rain",
              "Ozone Layer Formation and Depletion",
              "Population Growth and Automobile Pollution",
              "Burning of Paddy Straw"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Environmental Protection: Environmental Protection Act 1986",
              "Initiatives by Non-Governmental Organizations (NGOs)",
              
              "Human Population and the Environment: Population growth",
              "Environmental Education",
              "Women Education"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "SOFT SKILLS",
        code: "BAS105 / BAS205",
        Units: [
          {
            name: "Unit-1 Applied Grammar and Usage ",
            number: 1,
            topics: [
              "Transformation of Sentences: Simple, Compound and Complex",
              "Subject-verb agreement",
              "Prefix and Suffix",
              "Antonyms",
              "Synonyms",
              "Homophones",
              "Homonyms",
              "New word Formation",
              "Select word power"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2: Listening and Speaking Skills",
            number: 2,
            topics: [
              "Active Listening: Meaning and Art of Listening",
              "Traits of a Good Listener",
              "Listening modes",
              "Listening and Note taking",
              "Types of Listening",
              "Listening Techniques using Ted Talk Audio listening with script reading",
              "Pronunciation",
              "Speaking style",
              "Content and sequencing"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3: Reading and Writing Skills",
            number: 3,
            topics: [
              "Reading style: Skimming; Scanning; Churning & Assimilation",
              "Effective writing tools and methods: Inductive Deductive; Exposition; Linear; Interrupted; Spatial & Chronological",
              "Official and Business Letter writing",
              "Agenda, Notices, Minutes of meeting"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4: Presentation and Interaction Skills",
            number: 4,
            topics: [
              "Introduction to oral communication",
              "Nuances and Modes of Speech Delivery",
              "Public speaking: confidence, clarity, and fluency",
              "Individual Speaking: Elements",
              
              "Non-verbal Communication: Kinesics, Paralinguistic features of Voice-Dynamics",
              "Proxemics, Chronemics",
              
              "Presentation Strategies: planning, preparation, organization, delivery"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5: Work- place skills",
            number: 5,
            topics: [
              "Leadership qualities; Impact",
              "Communication skills for Leaders: Listening and Responding",
              "Mental health at work place: Managing Stress",
              "Techniques: Application of 4 A’s; Avoid, Alter, Access, Adapt"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
    ],
    "2" : [
      {
        name: "DATA STRUCTURE",

        code: "BCS301 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction: Basic Terminology",
              "Elementary Data Organization",
              "Built in Data Types in C",
              
              "Algorithm, Efficiency of an Algorithm",
              "Time and Space Complexity",
              "Asymptotic notations: Big Oh, Big Theta and Big Omega",
              "Time-Space trade-off",
              
              "Abstract Data Types (ADT)",
              
              "Arrays: Definition, Single and Multidimensional Arrays",
              "Representation of Arrays: Row Major Order, and Column Major Order",
              "Derivation of Index Formulae for 1-D, 2-D, 3-D and n-D Array",
              "Application of arrays",
              "Sparse Matrices and their representations",
              
              "Linked lists: Array Implementation and Pointer Implementation of Singly Linked Lists",
              "Doubly Linked List",
              "Circularly Linked List",
              "Operations on a Linked List: Insertion, Deletion, Traversal",
              "Polynomial Representation and Addition, Subtraction & Multiplications of Single variable & Two variables Polynomial"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Stacks: Abstract Data Type",
              "Primitive Stack operations: Push & Pop",
              "Array and Linked Implementation of Stack in C",
              "Application of stack: Prefix and Postfix Expressions",
              "Evaluation of postfix expression",
              
              "Iteration and Recursion: Principles of recursion",
              "Tail recursion",
              "Removal of recursion",
              "Problem solving using iteration and recursion with examples such as binary search, Fibonacci numbers, and Hanoi towers",
              "Tradeoffs between iteration and recursion",
              
              "Queues: Operations on Queue: Create, Add, Delete, Full and Empty",
              "Circular queues",
              "Array and linked implementation of queues in C",
              "Dequeue and Priority Queue"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Searching: Concept of Searching",
              "Sequential search",
              "Index Sequential Search",
              "Binary Search",
              "Concept of Hashing & Collision resolution Techniques used in Hashing",
              
              "Sorting: Insertion Sort",
              "Selection Sort",
              "Bubble Sort",
              "Quick Sort",
              "Merge Sort",
              "Heap Sort",
              "Radix Sort"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Trees: Basic terminology used with Tree",
              "Binary Trees",
              "Binary Tree Representation: Array Representation and Pointer (Linked List) Representation",
              "Binary Search Tree",
              "Strictly Binary Tree",
              "Complete Binary Tree",
              "Extended Binary Trees",
              
              "Tree Traversal algorithms: Inorder, Preorder and Postorder",
              "Constructing Binary Tree from given Tree Traversal",
              
              "Operation of Insertion, Deletion, Searching & Modification of data in Binary Search Tree",
              
              "Threaded Binary Trees",
              "Traversing Threaded Binary Trees",
              
              "Huffman coding using Binary Tree",
              
              "Concept & Basic Operations for AVL Tree, B Tree & Binary Heaps"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Graphs: Terminology used with Graph",
              "Data Structure for Graph Representations: Adjacency Matrices, Adjacency List, Adjacency",
              
              "Graph Traversal: Depth First Search and Breadth First Search",
              "Connected Component",
              "Spanning Trees",
              
              "Minimum Cost Spanning Trees: Prim's and Kruskal's algorithm",
              
              "Transitive Closure and Shortest Path algorithm: Warshall Algorithm and Dijkstra Algorithm"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "COMPUTER ORGANIZATION AND ARCHITECTURE",
        code: "BCS302 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Functional units of digital system and their interconnections",
              "Buses, bus architecture, types of buses and bus arbitration",
              "Register, bus and memory transfer",
              "Processor organization, general registers organization, stack organization and addressing modes"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Arithmetic and logic unit: Look ahead carries adders",
              "Multiplication: Signed operand multiplication, Booth's algorithm and array multiplier",
              "Division and logic operations",
              "Floating point arithmetic operation, Arithmetic & logic unit design",
              "IEEE Standard for Floating Point Numbers"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Control Unit: Instruction types, formats, instruction cycles and sub cycles (fetch and execute etc)",
              "Micro operations, execution of a complete instruction",
              "Program Control, Reduced Instruction Set Computer, Pipelining",
              "Hardwire and micro programmed control: micro programme sequencing",
              "Concept of horizontal and vertical microprogramming"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Memory: Basic concept and hierarchy, semiconductor RAM memories, 2D & 2 1/2D memory organization",
              "ROM memories",
              "Cache memories: concept and design issues & performance, address mapping and replacement",
              "Auxiliary memories: magnetic disk, magnetic tape and optical disks",
              "Virtual memory: concept and implementation"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Input / Output: Peripheral devices, I/O interface, I/O ports",
              "Interrupts: interrupt hardware, types of interrupts and exceptions",
              "Modes of Data Transfer: Programmed I/O, interrupt initiated I/O and Direct Memory Access",
              "I/O channels and processors",
              "Serial Communication: Synchronous & asynchronous communication, standard communication interfaces"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Discrete Structures & Theory of Logic",
        code: "BCS303 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Set Theory & Relations: Introduction, Combination of sets",
              "Relations: Definition, Operations on relations, Properties of relations",
              "Composite Relations, Equality of relations, Recursive definition of relation",
              "Order of relations",
              
              "POSET & Lattices: Hasse Diagram, POSET",
              "Definition & Properties of lattices – Bounded, Complemented, Distributed, Modular and Complete lattice"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Functions: Definition, Classification of functions, Operations on functions",
              "Growth of Functions",
              
              "Boolean Algebra: Introduction, Axioms and Theorems of Boolean algebra",
              "Algebraic manipulation of Boolean expressions",
              "Simplification of Boolean Functions, Karnaugh maps"
            ]
              ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Theory of Logics: Proposition, Truth tables, Tautology, Satisfiability, Contradiction",
              "Algebra of proposition, Theory of Inference",
              
              "Predicate Logic: First order predicate, well-formed formula of predicate",
              "Quantifiers, Inference theory of predicate logic"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Algebraic Structures: Definition, Groups, Subgroups and order",
              "Cyclic Groups, Cosets, Lagrange's theorem, Normal Subgroups",
              "Permutation and Symmetric groups",
              "Group Homomorphisms, Definition and elementary properties of Rings and Fields"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Graphs: Definition and terminology, Representation of graphs",
              "Multigraphs, Bipartite graphs, Planar graphs",
              "Isomorphism and Homeomorphism of graphs",
              "Euler and Hamiltonian paths, Graph coloring",
              
              "Combinatorics: Introduction, Counting Techniques, Pigeonhole Principle"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Operating system",
        code: "BCS401",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction: Operating system and functions",
              "Classification of Operating systems: Batch, Interactive, Time sharing, Real Time System",
              "Multiprocessor Systems, Multiuser Systems, Multiprocess Systems, Multithreaded Systems",
              "Operating System Structure: Layered structure, System Components, Operating System services",
              "Reentrant Kernels, Monolithic and Microkernel Systems"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Concurrent Processes: Process Concept, Principle of Concurrency",
              "Producer / Consumer Problem, Mutual Exclusion, Critical Section Problem",
              "Dekker’s solution, Peterson’s solution, Semaphores, Test and Set operation",
              "Classical Problem in Concurrency: Dining Philosopher Problem, Sleeping Barber Problem",
              "Inter Process Communication models and Schemes, Process generation"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "CPU Scheduling: Scheduling Concepts, Performance Criteria, Process States, Process Transition Diagram",
              "Schedulers, Process Control Block (PCB), Process address space, Process identification information",
              "Threads and their management, Scheduling Algorithms, Multiprocessor Scheduling",
              
              "Deadlock: System model, Deadlock characterization",
              "Prevention, Avoidance and detection, Recovery from deadlock"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Memory Management: Basic bare machine, Resident monitor",
              "Multiprogramming with fixed partitions, Multiprogramming with variable partitions",
              "Protection schemes, Paging, Segmentation, Paged segmentation",
              "Virtual memory concepts, Demand paging, Performance of demand paging",
              "Page replacement algorithms, Thrashing, Cache memory organization, Locality of reference"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Memory Management: Basic bare machine, Resident monitor",
              "Multiprogramming with fixed partitions, Multiprogramming with variable partitions",
              "Protection schemes, Paging, Segmentation, Paged segmentation",
              "Virtual memory concepts, Demand paging, Performance of demand paging",
              "Page replacement algorithms, Thrashing, Cache memory organization, Locality of reference"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Theory of Automata and Formal Languages",
        code: "BCS402",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Basic Concepts and Automata Theory: Introduction to Theory of Computation- Automata, Computability and Complexity",
              "Alphabet, Symbol, String, Formal Languages",
              
              "Deterministic Finite Automaton (DFA): Definition, Representation, Acceptability of a String and Language",
              "Non-Deterministic Finite Automaton (NFA)",
              "Equivalence of DFA and NFA",
              "NFA with ε-Transition, Equivalence of NFA’s with and without ε-Transition",
              
              "Finite Automata with output: Moore Machine, Mealy Machine",
              "Equivalence of Moore and Mealy Machine",
              "Minimization of Finite Automata"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Regular Expressions and Languages: Regular Expressions, Transition Graph",
              "Kleen’s Theorem",
              "Finite Automata and Regular Expression: Arden’s theorem",
              "Algebraic Method Using Arden’s Theorem",
              
              "Regular and Non-Regular Languages: Closure properties of Regular Languages",
              "Pigeonhole Principle",
              "Pumping Lemma, Application of Pumping Lemma",
              
              "Decidability: Decision properties, Finite Automata and Regular Languages"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Regular and Non-Regular Grammars: Context Free Grammar (CFG)-Definition, Derivations, Languages",
              "Derivation Trees and Ambiguity",
              "Regular Grammars: Right Linear and Left Linear grammars",
              "Conversion of FA into CFG and Regular grammar into FA",
              "Simplification of CFG",
              
              "Normal Forms: Chomsky Normal Form (CNF), Greibach Normal Form (GNF)",
              "Chomsky Hierarchy",
              "Programming problems based on the properties of CFGs"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Push Down Automata and Properties of Context Free Languages: Nondeterministic Pushdown Automata (NPDA)- Definition, Moves",
              "A Language Accepted by NPDA",
              "Deterministic Pushdown Automata (DPDA) and Deterministic Context free Languages (DCFL)",
              "Pushdown Automata for Context Free Languages",
              
              "Context Free grammars for Pushdown Automata",
              "Two stack Pushdown Automata",
              "Pumping Lemma for CFL",
              "Closure properties of CFL",
              "Decision Problems of CFL",
              "Programming problems based on the properties of CFLs"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Turing Machines and Recursive Function Theory: Basic Turing Machine Model, Representation of Turing Machines",
              "Language Acceptability of Turing Machines",
              "Techniques for Turing Machine Construction, Modifications of Turing Machine",
              "Turing Machine as Computer of Integer Functions",
              "Universal Turing machine",
              "Linear Bounded Automata",
              "Church’s Thesis",
              
              "Recursive and Recursively Enumerable language",
              "Halt"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Object Oriented Programming with Java",
        code: "BCS403",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction: Why Java, History of Java, JVM, JRE, Java Environment, Java Source File Structure, and Compilation",
              
              "Fundamental Programming Structures in Java: Defining Classes in Java, Constructors, Methods, Access Specifiers",
              "Static Members, Final Members, Comments, Data types, Variables, Operators, Control Flow",
              "Arrays & String",
              
              "Object Oriented Programming: Class, Object, Inheritance Super Class, Sub Class, Overriding, Overloading",
              "Encapsulation, Polymorphism, Abstraction, Interfaces, and Abstract Class",
              
              "Packages: Defining Package, CLASSPATH Setting for Packages, Making JAR Files for Library Packages",
              "Import and Static Import, Naming Convention For Packages"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Exception Handling: The Idea behind Exception, Exceptions & Errors, Types of Exception",
              "Control Flow in Exceptions, JVM Reaction to Exceptions, Use of try, catch, finally, throw, throws in Exception Handling",
              "In-built and User Defined Exceptions, Checked and Un-Checked Exceptions",
              
              "Input/Output Basics: Byte Streams and Character Streams, Reading and Writing File in Java",
              
              "Multithreading: Thread, Thread Life Cycle, Creating Threads, Thread Priorities",
              "Synchronizing Threads, Inter-thread Communication"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Java New Features: Functional Interfaces, Lambda Expression, Method References, Stream API",
              "Default Methods, Static Method, Base64 Encode and Decode, ForEach Method",
              "Try-with-resources, Type Annotations, Repeating Annotations, Java Module System",
              "Diamond Syntax with Inner Anonymous Class, Local Variable Type Inference",
              "Switch Expressions, Yield Keyword, Text Blocks, Records, Sealed Classes"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Java Collections Framework: Collection in Java, Collection Framework in Java",
              "Hierarchy of Collection Framework, Iterator Interface, Collection Interface",
              
              "List Interface: ArrayList, LinkedList, Vector, Stack, Queue Interface",
              "Set Interface: HashSet, LinkedHashSet, SortedSet Interface, TreeSet",
              
              "Map Interface: HashMap Class, LinkedHashMap Class, TreeMap Class, Hashtable Class",
              "Sorting, Comparable Interface, Comparator Interface, Properties Class in Java"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Spring Framework: Spring Core Basics - Spring Dependency Injection concepts, Spring Inversion of Control",
              "AOP, Bean Scopes - Singleton, Prototype, Request, Session, Application, Web Socket",
              "Auto wiring, Annotations, Life Cycle Callbacks, Bean Configuration styles",
              
              "Spring Boot: Spring Boot Build Systems, Spring Boot Code Structure, Spring Boot Runners",
              "Logger, BUILDING RESTFUL WEB SERVICES: Rest Controller, Request Mapping, Request Body, Path Variable, Request Parameter",
              "GET, POST, PUT, DELETE APIs, Build Web Applications"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Technical Communication",
        code: "Soon",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Universal Human Value and Professional Ethics",
        code: "Soon",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Cyber Security",
        code: "Soon",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Python Programming",
        code: "Soon",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Maths IV",
        code: "Soon",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Maths III",
        code: "Soon",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Maths V",
        code: "Soon",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Digital Electronics",
        code: "Soon",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [],
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
    ],
    "3" : [
      {
        name: "Database Management System",
        code: "KCS501 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction: Overview, Database System vs File System",
              "Database System Concept and Architecture",
              "Data Model Schema and Instances",
              "Data Independence and Database Language and Interfaces",
              "Data Definitions Language, DML, Overall Database Structure",
              
              "Data Modeling Using the Entity Relationship Model: ER Model Concepts",
              "Notation for ER Diagram, Mapping Constraints",
              "Keys: Super Key, Candidate Key, Primary Key",
              "Generalization, Aggregation, Reduction of an ER Diagram to Tables",
              "Extended ER Model, Relationship of Higher Degree"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Relational Data Model and Language: Relational Data Model Concepts",
              "Integrity Constraints: Entity Integrity, Referential Integrity, Keys Constraints, Domain Constraints",
              "Relational Algebra, Relational Calculus, Tuple and Domain Calculus",
              
              "Introduction to SQL: Characteristics of SQL, Advantages of SQL",
              "SQL Data Type and Literals, Types of SQL Commands",
              "SQL Operators and Their Procedure, Tables, Views and Indexes",
              "Queries and Sub Queries, Aggregate Functions",
              "Insert, Update and Delete Operations, Joins, Unions, Intersection, Minus",
              "Cursors, Triggers, Procedures in SQL/PL SQL"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Database Design & Normalization: Functional dependencies",
              "Normal forms: First, Second, Third normal forms, BCNF",
              "Inclusion dependence, lossless join decompositions",
              "Normalization using FD, MVD, and JDs",
              "Alternative approaches to database design"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Transaction Processing Concept: Transaction System",
              "Testing of Serializability, Serializability of Schedules",
              "Conflict & View Serializable Schedule",
              "Recoverability, Recovery from Transaction Failures",
              "Log Based Recovery, Checkpoints, Deadlock Handling",
              
              "Distributed Database: Distributed Data Storage, Concurrency Control, Directory System"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Concurrency Control Techniques: Concurrency Control",
              "Locking Techniques for Concurrency Control",
              "Time Stamping Protocols for Concurrency Control",
              "Validation Based Protocol, Multiple Granularity",
              "Multi Version Schemes, Recovery with Concurrent Transaction",
              "Case Study of Oracle"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Web Designing and Development",
        code: "KCD501",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction to HTML: Brief Introduction of HTML, HTML Tags, Basic structure of an HTML document",
              "Heading-Paragraphs, Line Breaks",
              
              "Elements of HTML: Introduction to elements of HTML",
              "Working with Text, Formatting Tags",
              "Working with Lists, Tables and Frames",
              "Working with Hyperlinks, Images and Multimedia",
              "Working with Forms and controls",
              "Marquee Elements"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Introduction to Cascading Style Sheets: Concept of CSS, Creating Style Sheet",
              "CSS Properties, CSS Styling (Background, Text Format, Controlling Fonts)",
              "Working with block elements and objects",
              "Working with Lists and Tables",
              "CSS Id and Class, Box Model (Introduction, Border properties, Padding Properties, Margin properties)",
              "Navigation Bar, CSS Color",
              "Creating page Layout and Site Designs"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "BOOTSTRAP: Fundamentals of implementing responsive web design",
              "Use Balsamiq to mockup and wireframe websites",
              "The fundamentals of UI design for websites",
              "How to install the Bootstrap framework",
              "Understanding the Bootstrap grid layout system",
              "How to use bootstrap containers to layout your website easily",
              "Use other Bootstrap components such as buttons",
              "Adding symbols using Font Awesome",
              "Bootstrap carousels",
              "Add Bootstrap cards to your website",
              "Using Bootstrap navigation bars"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "JAVA SCRIPT: The Fundamentals of Code",
              "Starting code with alerts and prompts",
              "Understand Variables and Data Types in JavaScript, Variable naming in JS",
              "Working with strings and numbers",
              "Randomisation and logical operators",
              "Loops, collections and Conditionals",
              "Functions and invocation patterns",
              "Discussion of ECMAScripts",
              "Intermediate JavaScript, JS Expressions, Operators, Statements and Declarations",
              "Object-Oriented Programming JS Objects and Prototypes",
              "`This`, Scope and Closures",
              "Objects and Prototypes",
              "Refactoring and Debugging",
              "Assignment 3: BMI Calculator"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "REACT JS: Learn front-end development with React",
              "Understand when and how to use React Components",
              "Props and work with them",
              "JSX and understand JSX syntax",
              "React DOM, State Management in React",
              "React Hooks, Conditional rendering in React",
              "Understand the difference between class and functional components",
              "Event Handling in React"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Design and Analysis of Algorithm",
        code: "KCS503",
        Units: [
            {
              name: "Unit-1",
            number: 1,
              topics: [
                "Introduction: Algorithms, Analyzing Algorithms, Complexity of Algorithms",
                "Growth of Functions, Performance Measurements",
                "Sorting and Order Statistics: Shell Sort, Quick Sort, Merge Sort, Heap Sort",
                "Comparison of Sorting Algorithms",
                "Sorting in Linear Time"
              ],
              youtube: [],
              notes: [],
              ppt: [],
              important: [],
            },
            {
              name: "Unit-2",
            number: 2,
              topics: [
                "Advanced Data Structures: Red-Black Trees",
                "B – Trees, Binomial Heaps, Fibonacci Heaps",
                "Tries, Skip List"
              ],
              youtube: [],
              notes: [],
              ppt: [],
              important: [],
            },
            {
              name: "Unit-3",
            number: 3,
              topics: [
                "Divide and Conquer with Examples: Sorting, Matrix Multiplication, Convex Hull, Searching",
                "Greedy Methods with Examples: Optimal Reliability Allocation, Knapsack",
                "Minimum Spanning Trees: Prim’s and Kruskal’s Algorithms",
                "Single Source Shortest Paths: Dijkstra’s and Bellman Ford Algorithms"
              ],
              youtube: [],
              notes: [],
              ppt: [],
              important: [],
            },
            {
              name: "Unit-4",
            number: 4,
              topics: [
                "Dynamic Programming with Examples: Knapsack",
                "All Pair Shortest Paths: Warshal’s and Floyd’s Algorithms",
                "Resource Allocation Problem",
                "Backtracking, Branch and Bound with Examples: Travelling Salesman Problem, Graph Coloring",
                "n-Queen Problem, Hamiltonian Cycles, Sum of Subsets"
              ],
              youtube: [],
              notes: [],
              ppt: [],
              important: [],
            },
            {
              name: "Unit-5",
            number: 5,
              topics: [
                "Selected Topics: Algebraic Computation",
                "Fast Fourier Transform",
                "String Matching",
                "Theory of NP-Completeness",
                "Approximation Algorithms and Randomized Algorithms"
              ],
              youtube: [],
              notes: [],
              ppt: [],
              important: [],
            }
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Data Analytics",
        code: "KCS051",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction to Data Analytics: Sources and nature of data, classification of data (structured, semi-structured, unstructured)",
              "Characteristics of data, introduction to Big Data platform",
              "Need of data analytics, evolution of analytic scalability, analytic process and tools",
              "Analysis vs reporting, modern data analytic tools, applications of data analytics",
              "Data Analytics Lifecycle: Need, key roles for successful analytic projects",
              "Various phases of data analytics lifecycle – discovery, data preparation, model planning, model building, communicating results, operationalization"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Data Analysis: Regression modeling, multivariate analysis, Bayesian modeling",
              "Inference and Bayesian networks, support vector and kernel methods",
              "Analysis of time series: linear systems analysis & nonlinear dynamics",
              "Rule induction, neural networks: learning and generalisation, competitive learning",
              "Principal component analysis and neural networks",
              "Fuzzy logic: extracting fuzzy models from data, fuzzy decision trees",
              "Stochastic search methods"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Mining Data Streams: Introduction to streams concepts, stream data model and architecture",
              "Stream computing, sampling data in a stream, filtering streams",
              "Counting distinct elements in a stream, estimating moments, counting oneness in a window",
              "Decaying window, Real-time Analytics Platform (RTAP) applications",
              "Case studies – real-time sentiment analysis, stock market predictions"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Frequent Itemsets and Clustering: Mining frequent itemsets, market-based modeling",
              "Apriori algorithm, handling large data sets in main memory, limited pass algorithm",
              "Counting frequent itemsets in a stream",
              "Clustering techniques: hierarchical, K-means, clustering high dimensional data",
              "CLIQUE and ProCLUS, frequent pattern based clustering methods",
              "Clustering in non-euclidean space, clustering for streams and parallelism"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Frame Works and Visualization: MapReduce, Hadoop, Pig, Hive, HBase, MapR",
              "Sharding, NoSQL Databases, S3, Hadoop Distributed File Systems",
              "Visualization: visual data analysis techniques, interaction techniques, systems and applications",
              "Introduction to R - R graphical user interfaces, data import and export",
              "Attribute and data types, descriptive statistics, exploratory data analysis",
              "Visualization before analysis, analytics for unstructured data"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Metaverse",
        code: "KCD051 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "INTRODUCTION TO METAVERSE: Introduction to Metaverse and immersive experience",
              "History of Metaverse - Metaverse value chain with 7 layers"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "TECHNOLOGIES INVOLVED IN THE METAVERSE: Metaverse as a product of Extended Reality",
              "Augmented Reality (AR) - Virtual Reality (VR) - Benefits of AR/VR - Difference between AR/VR",
              "Mixed Reality (MR) - Artificial Intelligence (AI), Introduction in Metaverse",
              "Financial and Economics of Metaverse - Benefits of Metaverse"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "BLOCKCHAIN ADOPTION IN METAVERSE: Blockchain Overview",
              "History of Blockchain - Need of Decentralization in MV",
              "Smart Contract, Capabilities in Blockchain",
              "Blockchain in Metaverse - Understanding Tokens",
              "Understanding the NFT - NFT Token Standards",
              "NFTs in MV - Cryptocurrency in MV"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "AR, VR, AND MR IN METAVERSE: Everything about VR (Virtual Reality)",
              "Everything about AR (Augmented Reality)",
              "Everything about MR (Mixed Reality)",
              "Blockchain Identity Management in Metaverse",
              "NFT (non-fungible token) for Metaverse - Introduction to NFTs",
              "History of NFTs - Benefits of NFTs"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "USE-CASES: Gaming in Metaverse",
              "Meetings in Metaverse",
              "Virtual Learning in Metaverse",
              "Social Interactions in Metaverse",
              "Virtual Real-estate in Metaverse",
              "e-commerce in Metaverse",
              "Travel in Metaverse",
              "Personalized Avatars - Digital Identity in Metaverse"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Computer Graphics",
        code: "KCS053",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction and Line Generation: Types of computer graphics, Graphic Displays- Random scan displays, Raster scan displays, Frame buffer and video controller",
              "Points and lines, Line drawing algorithms, Circle generating algorithms",
              "Mid-point circle generating algorithm, and parallel version of these algorithms"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Transformations: Basic transformation, Matrix representations and homogenous coordinates",
              "Composite transformations, Reflections and shearing",
              "Windowing and Clipping: Viewing pipeline, Viewing transformations",
              "2-D Clipping algorithms: Line clipping algorithms such as Cohen Sutherland line clipping algorithm, Liang Barsky algorithm",
              "Line clipping against non rectangular clip windows; Polygon clipping – Sutherland Hodgeman polygon clipping, Weiler and Atherton polygon clipping",
              "Curve clipping, Text clipping"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Three Dimensional: 3-D Geometric Primitives, 3-D Object representation",
              "3-D Transformation, 3-D viewing, projections, 3-D Clipping"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Curves and Surfaces: Quadric surfaces, Spheres, Ellipsoid, Blobby objects",
              "Introductory concepts of Spline, Bspline and Bezier curves and surfaces"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Hidden Lines and Surfaces: Back Face Detection algorithm",
              "Depth buffer method, A- buffer method, Scan line method",
              "Basic illumination models– Ambient light, Diffuse reflection, Specular reflection and Phong model",
              "Combined approach, Warn model, Intensity Attenuation, Color consideration",
              "Transparency and Shadows"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Object Oriented System Design",
        code: "KCS054 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction: The meaning of Object Orientation, object identity, Encapsulation, information hiding, polymorphism, generosity",
              "Importance of modelling, principles of modelling, object oriented modelling",
              "Introduction to UML, conceptual model of the UML, Architecture"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Basic Structural Modeling: Classes, Relationships, common Mechanisms, and diagrams",
              "Class & Object Diagrams: Terms, concepts, modelling techniques for Class & Object Diagrams",
              "Collaboration Diagrams: Terms, Concepts, depicting a message, polymorphism in collaboration Diagrams",
              "Iterated messages, use of self in messages",
              "Sequence Diagrams: Terms, concepts, depicting asynchronous messages with/without priority",
              "Call-back mechanism, broadcast messages",
              "Basic Behavioural Modeling: Use cases, Use case Diagrams, Activity Diagrams, State Machine",
              "Process and thread, Event and signals, Time diagram, interaction diagram, Package diagram",
              "Architectural Modeling: Component, Deployment, Component diagrams and Deployment diagrams"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Object Oriented Analysis: Object oriented design, Object design, Combining three models",
              "Designing algorithms, design optimization, Implementation of control, Adjustment of inheritance",
              "Object representation, Physical packaging, Documenting design considerations",
              "Structured analysis and structured design (SA/SD), Jackson Structured Development (JSD)",
              "Mapping object oriented concepts using non-object oriented language",
              "Translating classes into data structures, Passing arguments to methods, Implementing inheritance, associations encapsulation",
              "Object oriented programming style: reusability, extensibility, robustness, programming in the large",
              "Procedural v/s OOP, Object oriented language features",
              "Abstraction and Encapsulation"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "C++ Basics: Overview, Program structure, namespace, identifiers, variables, constants, enum, operators, typecasting, control structures",
              "C++ Functions: Simple functions, Call and Return by reference, Inline functions",
              "Macro Vs. Inline functions, Overloading of functions, default arguments, friend functions, virtual functions"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Objects and Classes: Basics of object and class in C++, Private and public members, static data and function members",
              "Constructors and their types, destructors, operator overloading, type conversion",
              "Inheritance: Concept of Inheritance, types of inheritance: single, multiple, multilevel, hierarchical, hybrid",
              "Protected members, overriding, virtual base class",
              "Polymorphism: Pointers in C++, Pointers and Objects, this pointer, virtual and pure virtual functions",
              "Implementing polymorphism"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Machine Learning Techniques",
        code: "KCS 055",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "INTRODUCTION – Learning, Types of Learning, Well defined learning problems, Designing a Learning System",
              "History of ML, Introduction of Machine Learning Approaches – (Artificial Neural Network, Clustering, Reinforcement Learning, Decision Tree Learning, Bayesian networks, Support Vector Machine, Genetic Algorithm)",
              "Issues in Machine Learning and Data Science Vs Machine Learning"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "REGRESSION: Linear Regression and Logistic Regression",
              "BAYESIAN LEARNING - Bayes theorem, Concept learning, Bayes Optimal Classifier, Naïve Bayes classifier, Bayesian belief networks, EM algorithm",
              "SUPPORT VECTOR MACHINE: Introduction, Types of support vector kernel – (Linear kernel, polynomial kernel, and Gaussian kernel)",
              "Hyperplane – (Decision surface), Properties of SVM, and Issues in SVM"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "DECISION TREE LEARNING - Decision tree learning algorithm, Inductive bias, Inductive inference with decision trees",
              "Entropy and information theory, Information gain, ID-3 Algorithm, Issues in Decision tree learning",
              "INSTANCE-BASED LEARNING – k-Nearest Neighbour Learning, Locally Weighted Regression, Radial basis function networks, Case-based learning"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "ARTIFICIAL NEURAL NETWORKS – Perceptron’s, Multilayer perceptron, Gradient descent and the Delta rule",
              "Multilayer networks, Derivation of Backpropagation Algorithm, Generalization",
              "Unsupervised Learning – SOM Algorithm and its variant",
              "DEEP LEARNING - Introduction, concept of convolutional neural network",
              "Types of layers – (Convolutional Layers, Activation function, pooling, fully connected)",
              "Concept of Convolution (1D and 2D) layers, Training of network",
              "Case study of CNN for eg on Diabetic Retinopathy, Building a smart speaker, Self-driving car etc."
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "REINFORCEMENT LEARNING–Introduction to Reinforcement Learning, Learning Task, Example of Reinforcement Learning in Practice",
              "Learning Models for Reinforcement – (Markov Decision process, Q Learning - Q Learning function, Q Learning Algorithm)",
              "Application of Reinforcement Learning, Introduction to Deep Q Learning",
              "GENETIC ALGORITHMS: Introduction, Components, GA cycle of reproduction, Crossover, Mutation, Genetic Programming",
              "Models of Evolution and Learning, Applications"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Multimedia and Animation",
        code: "KCD052 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "INTRODUCTION TO MULTIMEDIA: Definitions, Elements, Multimedia Hardware and Software",
              "Distributed multimedia systems, challenges: security, sharing / distribution, storage, retrieval, processing, computing",
              "Multimedia metadata, Multimedia databases, Hypermedia, Multimedia Learning"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "MULTIMEDIA FILE FORMATS AND STANDARDS",
              "File formats – Text, Image file formats, Graphic and animation file formats, Digital audio and Video file formats",
              "Color in image and video, Color Models",
              "Multimedia data and file formats for the web"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "MULTIMEDIA AUTHORING",
              "Authoring metaphors, Tools Features and Types: Card and Page Based Tools, Icon and Object Based Tools",
              "Time Based Tools, Cross Platform Authoring Tools, Editing Tools",
              "Painting and Drawing Tools, 3D Modeling and Animation Tools, Image Editing Tools, audio Editing Tools",
              "Digital Movie Tools, Creating interactive presentations, virtual learning, simulations"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "ANIMATION",
              "Principles of animation: staging, squash and stretch, timing, onion skinning, secondary action",
              "2D, 2 ½ D, and 3D animation, Animation techniques: Keyframe, Morphing, Inverse Kinematics",
              "Hand Drawn, Character rigging, vector animation, stop motion, motion graphics",
              "Fluid Simulation, skeletal animation, skinning Virtual Reality, Augmented Reality"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "MULTIMEDIA APPLICATIONS",
              "Multimedia Big data computing, social networks, smart phones, surveillance, Analytics",
              "Multimedia Cloud Computing, Multimedia streaming cloud, media on demand",
              "Security and forensics, Online social networking, multimedia ontology",
              "Content based retrieval from digital libraries"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Software Engineering",
        code: "KCD053 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction: Introduction to Software Engineering, Software Components, Software Characteristics, Software Crisis",
              "Software Engineering Processes, Similarity and Differences from Conventional Engineering Processes",
              "Software Quality Attributes",
              "Software Development Life Cycle (SDLC) Models: Water Fall Model, Prototype Model, Spiral Model, Evolutionary Development Models, Iterative Enhancement Models"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Software Requirement Specifications (SRS): Requirement Engineering Process: Elicitation, Analysis, Documentation, Review and Management of User Needs",
              "Feasibility Study, Information Modelling, Data Flow Diagrams, Entity Relationship Diagrams, Decision Tables",
              "SRS Document, IEEE Standards for SRS",
              "Software Quality Assurance (SQA): Verification and Validation, SQA Plans, Software Quality Frameworks",
              "ISO 9000 Models, SEI-CMM Model"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Software Design: Basic Concept of Software Design, Architectural Design, Low Level Design",
              "Modularization, Design Structure Charts, Pseudo Codes, Flow Charts",
              "Coupling and Cohesion Measures, Design Strategies: Function Oriented Design, Object Oriented Design",
              "Top-Down and Bottom-Up Design",
              "Software Measurement and Metrics: Various Size Oriented Measures",
              "Halestead’s Software Science, Function Point (FP) Based Measures, Cyclomatic Complexity Measures: Control Flow Graphs"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Software Testing: Testing Objectives, Unit Testing, Integration Testing, Acceptance Testing, Regression Testing",
              "Testing for Functionality and Testing for Performance",
              "Top-Down and Bottom-Up Testing Strategies: Test Drivers and Test Stubs",
              "Structural Testing (White Box Testing), Functional Testing (Black Box Testing)",
              "Test Data Suit Preparation, Alpha and Beta Testing of Products",
              "Static Testing Strategies: Formal Technical Reviews (Peer Reviews), Walk Through, Code Inspection",
              "Compliance with Design and Coding Standards"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Software Maintenance and Software Project Management: Software as an Evolutionary Entity, Need for Maintenance",
              "Categories of Maintenance: Preventive, Corrective and Perfective Maintenance, Cost of Maintenance",
              "Software Re-Engineering, Reverse Engineering",
              "Software Configuration Management Activities, Change Control Process",
              "Software Version Control, An Overview of CASE Tools",
              "Estimation of Various Parameters such as Cost, Efforts, Schedule/Duration, Constructive Cost Models (COCOMO)",
              "Resource Allocation Models, Software Risk Analysis and Management"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Human Computer Interface",
        code: "KCS058",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction: Importance of user Interface – definition, importance of good design",
              "Benefits of good design, A brief history of Screen design",
              "The graphical user interface – popularity of graphics, the concept of direct manipulation",
              "Graphical system, Characteristics, Web user – Interface popularity",
              "Characteristics- Principles of user interface"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Design process: Human interaction with computers, importance of human characteristics",
              "Human consideration, Human interaction speeds, understanding business functions"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Screen Designing: Design goals – Screen planning and purpose",
              "Organizing screen elements, ordering of screen data and content",
              "Screen navigation and flow, Visually pleasing composition",
              "Amount of information, focus and emphasis, presentation of information simply and meaningfully",
              "Information retrieval on web, statistical graphics",
              "Technological consideration in interface design"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Windows: New and Navigation schemes selection of window, selection of devices based and screen based controls",
              "Components – text and messages, Icons and increases, Multimedia, colors",
              "Uses problems, choosing colors"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Software tools: Specification methods, interface – Building Tools",
              "Interaction Devices – Keyboard and function keys, pointing devices"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Augmented & Virtual Reality",
        code: "KCD 601 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "VIRTUAL REALITY AND VIRTUAL ENVIRONMENTS: The historical development of VR: Scientific landmarks, Computer Graphics, Real-time computer graphics, Flight simulation, Virtual environments",
              "Requirements for VR, benefits of Virtual reality",
              "HARDWARE TECHNOLOGIES FOR 3D USER INTERFACES: Visual Displays, Auditory Displays, Haptic Displays",
              "Choosing Output Devices for 3D User Interfaces"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "3D USER INTERFACE INPUT HARDWARE: Input device characteristics, Desktop input devices, Tracking Devices",
              "3D Mice, Special Purpose Input Devices, Direct Human Input",
              "Home-Brewed Input Devices, Choosing Input Devices for 3D Interfaces"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "SOFTWARE TECHNOLOGIES: Database - World Space, World Coordinate, World Environment",
              "Objects - Geometry, Position / Orientation, Hierarchy, Bounding Volume, Scripts and other attributes",
              "VR Environment - VR Database, Tessellated Data, LODs, Cullers and Occluders",
              "Lights and Cameras, Scripts, Interaction - Simple, Feedback, Graphical User Interface",
              "Control Panel, 2D Controls, Hardware Controls, Room / Stage / Area Descriptions",
              "World Authoring and Playback, VR toolkits, Available software in the market"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "3D INTERACTION TECHNIQUES: 3D Manipulation tasks, Manipulation Techniques and Input Devices",
              "Interaction Techniques for 3D Manipulation, Design Guidelines - 3D Travel Tasks, Travel Techniques",
              "Design Guidelines - Theoretical Foundations of Wayfinding, User Centered Wayfinding Support",
              "Environment Centered Wayfinding Support, Evaluating Wayfinding Aids",
              "Design Guidelines - System Control, Classification, Graphical Menus, Voice Commands, Gestural Commands",
              "Tools, Multimodal System Control Techniques, Design Guidelines, Case Study: Mixing System Control Methods",
              "Symbolic Input Tasks, Symbolic Input Techniques, Design Guidelines, Beyond Text and Number entry",
              "DESIGNING AND DEVELOPING 3D USER INTERFACES: Strategies for Designing and Developing Guidelines and Evaluation"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "VIRTUAL REALITY APPLICATIONS: Engineering, Architecture, Education, Medicine, Entertainment, Science, Training",
              "Augmented and Mixed Reality, Taxonomy, technology and features of augmented reality",
              "Difference between AR and VR, Challenges with AR, AR systems and functionality",
              "Augmented reality methods, visualization techniques for augmented reality",
              "Wireless displays in educational augmented reality applications, mobile projection interfaces",
              "Marker-less tracking for augmented reality, enhancing interactivity in AR environments",
              "Evaluating AR systems"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Web Technology",
        code: "KCS602 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction: Introduction and Web Development Strategies, History of Web and Internet",
              "Protocols Governing Web, Writing Web Projects, Connecting to Internet",
              "Introduction to Internet services and tools, Introduction to client-server computing",
              "Core Java: Introduction, Operator, Data type, Variable, Arrays, Methods & Classes",
              "Inheritance, Package and Interface, Exception Handling, Multithread programming",
              "I/O, Java Applet, String handling, Event handling, Introduction to AWT",
              "AWT controls, Layout managers"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Web Page Designing: HTML: List, Table, Images, Frames, forms",
              "CSS, Document type definition, XML: DTD, XML schemes",
              "Object Models, presenting and using XML, Using XML Processors: DOM and SAX",
              "Dynamic HTML"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Scripting: Java script: Introduction, documents, forms, statements, functions, objects",
              "Introduction to AJAX",
              "Networking: Internet Addressing, InetAddress, Factory Methods, Instance Methods",
              "TCP/IP Client Sockets, URL, URL Connection, TCP/IP Server Sockets, Datagram"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Enterprise Java Bean: Preparing a Class to be a JavaBeans, Creating a JavaBeans",
              "JavaBeans Properties, Types of beans, Stateful Session bean, Stateless Session bean, Entity bean",
              "Java Database Connectivity (JDBC): Merging Data from Multiple Tables: Joining, Manipulating",
              "Databases with JDBC, Prepared Statements, Transaction Processing, Stored Procedures"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Servlets: Servlet Overview and Architecture, Interface Servlet and the Servlet Life Cycle",
              "Handling HTTP get Requests, Handling HTTP post Requests, Redirecting Requests to Other Resources",
              "Session Tracking, Cookies, Session Tracking with Http Session",
              "Java Server Pages (JSP): Introduction, Java Server Pages Overview",
              "A First Java Server Page Example, Implicit Objects, Scripting, Standard Actions, Directives",
              "Custom Tag Libraries"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Computer Networks",
        code: "KCS603",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introductory Concepts: Goals and applications of networks, Categories of networks",
              "Organization of the Internet, ISP, Network structure and architecture (layering principles, services, protocols and standards)",
              "The OSI reference model, TCP/IP protocol suite, Network devices and components",
              "Physical Layer: Network topology design, Types of connections",
              "Transmission media, Signal transmission and encoding, Network performance and transmission impairments",
              "Switching techniques and multiplexing"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Link layer: Framing, Error Detection and Correction, Flow control (Elementary Data Link Protocols, Sliding Window protocols)",
              "Medium Access Control and Local Area Networks: Channel allocation, Multiple access protocols",
              "LAN standards, Link layer switches & bridges (learning bridge and spanning tree algorithms)"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Network Layer: Point-to-point networks, Logical addressing, Basic internetworking (IP, CIDR, ARP, RARP, DHCP, ICMP)",
              "Routing, forwarding and delivery, Static and dynamic routing",
              "Routing algorithms and protocols, Congestion control algorithms, IPv6"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Transport Layer: Process-to-process delivery, Transport layer protocols (UDP and TCP)",
              "Multiplexing, Connection management, Flow control and retransmission",
              "Window management, TCP Congestion control, Quality of service"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Application Layer: Domain Name System, World Wide Web and Hyper Text Transfer Protocol",
              "Electronic mail, File Transfer Protocol, Remote login, Network management",
              "Data compression, Cryptography – basic concepts"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Big Data",
        code: "KCS061",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction to Big Data: Types of digital data, history of Big Data innovation",
              "Introduction to Big Data platform, drivers for Big Data, Big Data architecture and characteristics",
              "5 Vs of Big Data, Big Data technology components, Big Data importance and applications",
              "Big Data features – security, compliance, auditing and protection, Big Data privacy and ethics",
              "Big Data Analytics, Challenges of conventional systems, intelligent data analysis",
              "Nature of data, analytic processes and tools, analysis vs reporting, modern data analytic tools"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Hadoop: History of Hadoop, Apache Hadoop, the Hadoop Distributed File System",
              "Components of Hadoop, data format, analyzing data with Hadoop, scaling out",
              "Hadoop streaming, Hadoop pipes, Hadoop Echo System",
              "Map Reduce: Map Reduce framework and basics, how Map Reduce works",
              "Developing a Map Reduce application, unit tests with MR unit, test data and local tests",
              "Anatomy of a Map Reduce job run, failures, job scheduling, shuffle and sort",
              "Task execution, Map Reduce types, input formats, output formats, Map Reduce features",
              "Real-world Map Reduce"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "HDFS (Hadoop Distributed File System): Design of HDFS, HDFS concepts, benefits and challenges",
              "File sizes, block sizes and block abstraction in HDFS, data replication",
              "How does HDFS store, read, and write files, Java interfaces to HDFS",
              "Command line interface, Hadoop file system interfaces, data flow",
              "Data ingest with Flume and Scoop, Hadoop archives, Hadoop I/O: compression, serialization, Avro and file-based data structures",
              "Hadoop Environment: Setting up a Hadoop cluster, cluster specification, cluster setup and installation",
              "Hadoop configuration, security in Hadoop, administering Hadoop",
              "HDFS monitoring & maintenance, Hadoop benchmarks, Hadoop in the cloud"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Hadoop Eco System and YARN: Hadoop ecosystem components, schedulers, fair and capacity",
              "Hadoop 2.0 New Features - NameNode high availability, HDFS federation",
              "MRv2, YARN, Running MRv1 in YARN",
              "NoSQL Databases: Introduction to NoSQL",
              "MongoDB: Introduction, data types, creating, updating and deleting documents, querying",
              "Introduction to indexing, capped collections",
              "Spark: Installing spark, spark applications, jobs, stages and tasks, Resilient Distributed Databases",
              "Anatomy of a Spark job run, Spark on YARN",
              "SCALA: Introduction, classes and objects, basic types and operators, built-in control structures",
              "Functions and closures, inheritance"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Hadoop Eco System Frameworks: Applications on Big Data using Pig, Hive and HBase",
              "Pig - Introduction to PIG, Execution Modes of Pig, Comparison of Pig with Databases",
              "Grunt, Pig Latin, User Defined Functions, Data Processing operators",
              "Hive - Apache Hive architecture and installation, Hive shell, Hive services, Hive metastore",
              "Comparison with traditional databases, HiveQL, tables, querying data and user defined functions",
              "Sorting and aggregating, Map Reduce scripts, joins & subqueries",
              "HBase – Hbase concepts, clients, example, Hbase vs RDBMS, advanced usage",
              "Schema design, advance indexing, Zookeeper – how it helps in monitoring a cluster",
              "How to build applications with Zookeeper",
              "IBM Big Data strategy, introduction to Infosphere, BigInsights and Big Sheets, introduction to Big SQL"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Image Processing",
        code: "KCS062 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "DIGITAL IMAGE FUNDAMENTALS: Steps in Digital Image Processing – Components",
              "Elements of Visual Perception – Image Sensing and Acquisition – Image Sampling and Quantization",
              "Relationships between pixels – Color image fundamentals – RGB, HSI models",
              "Two-dimensional mathematical preliminaries, 2D transforms – DFT, DCT"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "IMAGE ENHANCEMENT: Spatial Domain: Gray level transformations – Histogram processing",
              "Basics of Spatial Filtering– Smoothing and Sharpening Spatial Filtering",
              "Frequency Domain: Introduction to Fourier Transform– Smoothing and Sharpening frequency domain filters",
              "Ideal, Butterworth and Gaussian filters, Homomorphic filtering",
              "Color image enhancement"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "IMAGE RESTORATION: Image Restoration – degradation model, Properties",
              "Noise models – Mean Filters – Order Statistics – Adaptive filters",
              "Band reject Filters – Band pass Filters – Notch Filters – Optimum Notch Filtering",
              "Inverse Filtering – Wiener filtering"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "IMAGE SEGMENTATION: Edge detection, Edge linking via Hough transform",
              "Thresholding – Region based segmentation – Region growing",
              "Region splitting and merging – Morphological processing- erosion and dilation",
              "Segmentation by morphological watersheds – basic concepts – Dam construction – Watershed segmentation algorithm"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "IMAGE COMPRESSION AND RECOGNITION: Need for data compression",
              "Huffman, Run Length Encoding, Shift codes, Arithmetic coding, JPEG standard, MPEG",
              "Boundary representation, Boundary description, Fourier Descriptor",
              "Regional Descriptors – Topological feature, Texture – Patterns and Pattern classes",
              "Recognition based on matching"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Digital Marketing",
        code: "KCD061 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "INTRODUCTION TO ONLINE MARKET: Online Market space",
              "Digital Marketing Strategy- Components",
              "Opportunities for building Brand Website",
              "Planning and Creation",
              "Content Marketing"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "SEARCH ENGINE OPTIMISATION: Search Engine optimisation",
              "Keyword Strategy- SEO Strategy",
              "SEO success factors - OnPage Techniques",
              "Off-Page Techniques",
              "Search Engine Marketing- How Search Engine works",
              "SEM components",
              "PPC advertising",
              "Display Advertisement"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "E- MAIL MARKETING: E-Mail Marketing",
              "Types of E-Mail Marketing",
              "Email Automation",
              "Lead Generation",
              "Integrating Email with Social Media and Mobile",
              "Measuring and maximizing email campaign effectiveness",
              "Mobile Marketing- Mobile Inventory/channels",
              "Location based; Context based; Coupons and offers",
              "Mobile Apps, Mobile Commerce, SMS Campaigns",
              "Profiling and targeting"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "SOCIAL MEDIA MARKETING: Social Media Marketing",
              "Social Media Channels",
              "Leveraging Social media for brand conversations and buzz",
              "Successful /benchmark Social media campaigns",
              "Engagement Marketing- Building Customer relationships",
              "Creating Loyalty drivers",
              "Influencer Marketing"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "DIGITAL TRANSFORMATION: Digital Transformation & Channel Attribution",
              "Analytics- Ad-words, Email, Mobile, Social Media, Web Analytics",
              "Changing your strategy based on analysis",
              "Recent trends in Digital marketing"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Game Design",
        code: "KCD062",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "GAME DESIGN FUNDAMENTALS: Role of Game Designer",
              "Structure of Games",
              "Major genres",
              "Game concepts",
              "Game worlds",
              "Working with formal elements",
              "Dramatic elements and system dynamics",
              "Storytelling",
              "Gameplay",
              "Core mechanics",
              "Game balancing",
              "Principles of Level Design",
              "Conceptualization",
              "Prototyping",
              "Playtesting"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "GAME AI: Game AI",
              "AI model",
              "Algorithms for Movement",
              "Pathfinding",
              "Decision making",
              "Tactical and Strategic AI",
              "Procedural Content Generation",
              "Board Games"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "GAME ENGINE: Rendering engine and pipeline",
              "Scene Graph",
              "Level of Detail",
              "Sorting",
              "Animation Systems",
              "Collision and Rigid Body dynamics"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "2D GAME DESIGN AND IMPLEMENTATION: GoDot game engine",
              "Designing and Prototyping a simple 2D Game",
              "Character design",
              "Storytelling",
              "Levels",
              "Implementing the Game in pygame or Godot engine or equivalent"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "3D GAME DESIGN AND IMPLEMENTATION: Designing and Prototyping a simple 3D Game",
              "Character design",
              "Storytelling",
              "Levels",
              "Implementing the Game in pygame or Godot engine or Blender or equivalent"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
    ],
    "4" : [
      {
        name: "IOT Security",
        code: "KOT071 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Security Requirements in IoT Architecture",
              "Security in Enabling Technologies",
              "Security Concerns in IoT Applications",
              "Security Architecture in the Internet of Things",
              "Security Requirements in IoT",
              "Insufficient Authentication/Authorization",
              "Insecure Access Control",
              "Threats to Access Control",
              "Privacy and Availability",
              "Attacks Specific to IoT",
              "Vulnerabilities",
              "Secrecy and Secret",
              "Key Capacity",
              "Authentication/Authorization for Smart Devices",
              "Transport Encryption",
              "Attack and Fault Trees",
              "Security IoT System Implementation Lifecycle"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Cryptographic Primitives and Its Role in IoT",
              "Encryption and Decryption",
              "Hashes",
              "Digital Signatures",
              "Random Number Generation",
              "Cipher Suites",
              "Key Management Fundamentals",
              "Cryptographic Controls Built into IoT Messaging and Communication Protocols",
              "IoT Node Authentication"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Identity Lifecycle",
              "Authentication Credentials",
              "IoT IAM Infrastructure",
              "Authorization with Publish/Subscribe Schemes",
              "Access Control"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Privacy Preservation Data Dissemination",
              "Privacy Preservation for IoT Used in Smart Building",
              "Exploiting Mobility Social Features for Location Privacy Enhancement in Internet of Vehicles",
              "Lightweight and Robust Schemes for Privacy Protection in Key Personal IoT Applications",
              "Mobile WBSN and Participatory Sensing"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Cloud Services and IoT",
              "Offerings Related to IoT from Cloud Service Providers",
              "Cloud IoT Security Controls",
              "An Enterprise IoT Cloud Security Architecture",
              "New Directions in Cloud Enabled IoT Computing"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Natural Language Processing",
        code: "KCS072 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Origins and challenges of NLP",
              "Language Modeling: Grammar-based LM",
              "Statistical LM – Regular Expressions, Finite-State Automata",
              "English Morphology, Transducers for lexicon and rules",
              "Tokenization",
              "Detecting and Correcting Spelling Errors",
              "Minimum Edit Distance",
              "Unsmoothed N-grams",
              "Evaluating N-grams",
              "Smoothing",
              "Interpolation and Backoff",
              "Word Classes",
              "Part-of-Speech Tagging",
              "Rule-based, Stochastic and Transformation-based tagging",
              "Issues in PoS tagging",
              "Hidden Markov and Maximum Entropy models"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Context Free Grammars",
              "Grammar rules for English",
              "Treebanks",
              "Normal Forms for grammar",
              "Dependency Grammar",
              "Syntactic Parsing",
              "Ambiguity",
              "Dynamic Programming parsing",
              "Shallow parsing",
              "Probabilistic CFG",
              "Probabilistic CYK",
              "Probabilistic Lexicalized CFGs",
              "Feature structures",
              "Unification of feature structures"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Requirements for representation",
              "First-Order Logic",
              "Description Logics",
              "Syntax-Driven Semantic analysis",
              "Semantic attachments",
              "Word Senses",
              "Relations between Senses",
              "Thematic Roles",
              "Selectional restrictions",
              "Word Sense Disambiguation",
              "WSD using Supervised, Dictionary & Thesaurus",
              "Bootstrapping methods",
              "Word Similarity using Thesaurus and Distributional methods"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Basic Concepts of Speech Processing",
              "Speech Fundamentals: Articulatory Phonetics",
              "Production and Classification of Speech Sounds",
              "Acoustic Phonetics – Acoustics of Speech Production",
              "Review of Digital Signal Processing Concepts",
              "Short-Time Fourier Transform",
              "FilterBank and LPC Methods"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Speech Analysis: Features, Feature Extraction and Pattern Comparison Techniques",
              "Speech Distortion Measures – Mathematical and Perceptual",
              "Log–Spectral Distance, Cepstral Distances",
              "Weighted Cepstral Distances and Filtering",
              "Likelihood Distortions",
              "Spectral Distortion Using A Warped Frequency Scale",
              "LPC, PLP, and MFCC Coefficients",
              "Time Alignment and Normalization",
              "Dynamic Time Warping, Multiple Time – Alignment Paths",
              "Speech Modeling: Hidden Markov Models",
              "Markov Processes",
              "HMMs – Evaluation",
              "Optimal State Sequence – Viterbi Search",
              "Baum-Welch Parameter Re-Estimation",
              "Implementation Issues"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Text Analytics and Natural Language Processing",
        code: "KAI073",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction to natural language processing (NLP) and text analytics",
              "Linguistics Essentials",
              "Foundations of text processing: tokenization",
              "stemming",
              "stopwords",
              "lemmatization",
              "part-of-speech tagging",
              "syntactic parsing"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Unsmoothed N-grams",
              "Evaluating N-grams",
              "Smoothing",
              "Interpolation and Backoff",
              "Word Classes",
              "Part-of-Speech Tagging",
              "Rule-based, Stochastic and Transformation-based tagging",
              "Issues in PoS tagging",
              "Hidden Markov and Maximum Entropy models"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Requirements for representation",
              "First-Order Logic",
              "Description Logics",
              "Syntax-Driven Semantic analysis",
              "Semantic attachments",
              "Word Senses",
              "Relations between Senses",
              "Thematic Roles",
              "Selectional restrictions",
              "Word Sense Disambiguation",
              "WSD using Supervised, Dictionary & Thesaurus",
              "Bootstrapping methods",
              "Word Similarity using Thesaurus and Distributional methods"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Speech Fundamentals: Articulatory Phonetics",
              "Production and Classification of Speech Sounds",
              "Acoustic Phonetics – Acoustics of Speech Production",
              "Review of Digital Signal Processing Concepts",
              "Short-Time Fourier Transform",
              "FilterBank and LPC Methods"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Speech Analysis: Features, Feature Extraction and Pattern Comparison Techniques",
              "Speech Distortion Measures – Mathematical and Perceptual",
              "Log–Spectral Distance, Cepstral Distances",
              "Weighted Cepstral Distances and Filtering",
              "Likelihood Distortions",
              "Spectral Distortion Using A Warped Frequency Scale",
              "LPC, PLP, and MFCC Coefficients",
              "Time Alignment and Normalization",
              "Dynamic Time Warping, Multiple Time – Alignment Paths",
              "Speech Modeling: Hidden Markov Models",
              "Markov Processes",
              "HMMs – Evaluation",
              "Optimal State Sequence – Viterbi Search",
              "Baum-Welch Parameter Re-Estimation",
              "Implementation Issues"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Cryptography & Network Security",
        code: "KCS074 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction to security attacks, services and mechanism",
              "Classical encryption techniques: substitution ciphers and transposition ciphers",
              "Cryptanalysis",
              "Steganography",
              "Stream and block ciphers",
              "Modern Block Ciphers: Block ciphers principles",
              "Shannon’s theory of confusion and diffusion",
              "Feistel structure",
              "Data Encryption Standard (DES)",
              "Strength of DES",
              "Idea of differential cryptanalysis",
              "Block cipher modes of operations",
              "Triple DES"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Introduction to group, field, finite field of the form GF(p), modular arithmetic",
              "Prime and relative prime numbers",
              "Extended Euclidean Algorithm",
              "Advanced Encryption Standard (AES) encryption and decryption",
              "Fermat’s and Euler’s theorem",
              "Primarily testing",
              "Chinese Remainder theorem",
              "Discrete Logarithmic Problem",
              "Principals of public key crypto systems",
              "RSA algorithm",
              "Security of RSA"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Message Authentication Codes: Authentication requirements",
              "Authentication functions",
              "Message authentication code",
              "Hash functions",
              "Birthday attacks",
              "Security of hash functions",
              "Secure Hash Algorithm (SHA)",
              "Digital Signatures: Digital Signatures",
              "Elgamal Digital Signature Techniques",
              "Digital signature standards (DSS)",
              "Proof of digital signature algorithm"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Key Management and distribution: Symmetric key distribution",
              "Diffie-Hellman Key Exchange",
              "Public key distribution",
              "X.509 Certificates",
              "Public key Infrastructure",
              "Authentication Applications: Kerberos",
              "Electronic mail security: Pretty Good Privacy (PGP)",
              "S/MIME"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "IP Security: Architecture",
              "Authentication header",
              "Encapsulating security payloads",
              "Combining security associations",
              "Key management",
              "Introduction to Secure Socket Layer",
              "Secure Electronic Transaction (SET) System Security : ",
              "Introductory idea of Intrusion",
              "Intrusion detection",
              "Viruses and related threats",
              " firewalls ",
            ]
              ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Real Time Operating System",
        code: "KOT075 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction to Real Time Systems: Need for RTOS",
              "Structure of RTOS",
              "Classification of Real Time System",
              "Difference between GPOS and RTOS: Real Time",
              "Issues in real time operating systems",
              "Performance measures for real time system: Properties",
              "Traditional performance measures",
              "Cost functions",
              "Hard deadlines",
              "Estimating program run times",
              "Introduction to LINUX/ UNIX OS"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Performance metrics and scheduling algorithms: Performance Metrics of RTOS",
              "Task Specifications",
              "Task state",
              "Real Time Scheduling algorithms: Cyclic executive",
              "Rate monotonic",
              "IRIS and Least laxity scheduling",
              "Schedulability Analysis"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Features of Real Time Operating System: Messages, queues, mailboxes, pipes",
              "Timer function events",
              "Memory management",
              "Interrupt basic system design using an RT (OS design principles)",
              "Interrupt routines",
              "Task structures and priority",
              "Current research in RTOS"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Real Time Databases: Real time vs general purpose databases",
              "Main memory databases",
              "Transaction priorities",
              "Transaction aborts",
              "Concurrency control issues: Pessimistic concurrency control",
              "Optimistic concurrency control",
              "Disk scheduling algorithms"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Fault Tolerance Techniques: Causes of failure",
              "Fault types",
              "Fault detection",
              "Fault and error containment",
              "Redundancy: hardware redundancy",
              "Software redundancy",
              "Time redundancy",
              "Information redundancy",
              "Data diversity",
              "Integrated failure handling"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Deep Learning",
        code: "KOT076",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction to machine learning",
              "Linear models (SVMs and Perceptrons, logistic regression)",
              "Intro to Neural Nets: What a shallow network computes",
              "Training a network: loss functions, back propagation and stochastic gradient descent",
              "Neural networks as universal function approximates"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "History of Deep Learning",
              "A Probabilistic Theory of Deep Learning",
              "Backpropagation and regularization",
              "Batch normalization",
              "VC Dimension and Neural Nets",
              "Deep Vs Shallow Networks",
              "Convolutional Networks",
              "Generative Adversarial Networks (GAN)",
              "Semi-supervised Learning"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Dimensionality Reduction: Linear (PCA, LDA) and manifolds",
              "Metric learning",
              "Auto encoders and dimensionality reduction in networks",
              "Introduction to Convnet",
              "Architectures: AlexNet, VGG, Inception, ResNet",
              "Training a Convnet: weights initialization, batch normalization, hyperparameter optimization"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Optimization in deep learning: Non-convex optimization for deep networks",
              "Stochastic Optimization",
              "Generalization in neural networks",
              "Spatial Transformer Networks",
              "Recurrent networks, LSTM",
              "Recurrent Neural Network Language Models",
              "Word-Level RNNs & Deep Reinforcement Learning",
              "Computational & Artificial Neuroscience"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Case Study and Applications: Imagenet",
              "Detection",
              "Audio WaveNet",
              "Natural Language Processing: Word2Vec",
              "Joint Detection",
              "Bioinformatics",
              "Face Recognition",
              "Scene Understanding",
              "Gathering Image Captions"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "DATA ANALYTICS FOR IOT",
        code: "KOT077",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Defining IoT Analytics and Challenges",
              "Introduction to IoT",
              "Applications of IoT",
              "IoT Architectures",
              "Introduction to Analytics",
              "IoT Analytics Challenges"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "IoT Devices",
              "Networking Basics",
              "IoT Networking Connectivity Protocols",
              "IoT Networking Data Messaging Protocols",
              "Analyzing Data to Infer Protocol and Device Characteristics"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "IoT Analytics for the Cloud",
              "Introduction to Elastic Analytics",
              "Decouple Key Components",
              "Cloud Security and Analytics",
              "Designing Data Processing for Analytics",
              "Applying Big Data Technology to Storage"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Exploring IoT Data",
              "Exploring and Visualizing Data",
              "Techniques to Understand Data Quality",
              "Basic Time Series Analysis",
              "Statistical Analysis"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Data Science for IoT Analytics",
              "Introduction to Machine Learning",
              "Feature Engineering with IoT Data",
              "Validation Methods",
              "Understanding the Bias–Variance Tradeoff",
              "Use Cases for Deep Learning with IoT Data"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Architecting Smart IoT Devices",
        code: "KOT078",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "From Nature to Nature Computing",
              "Philosophy",
              "Three Branches of IoT",
              "Design Principles of IoT",
              "Design Principles of Connected Devices",
              "Data Acquiring, Organizing, and Analytics in IoT",
              "System Architecture of IoT"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Prototyping the Embedded Devices for IoT",
              "System Hardware and Prototyping",
              "Sensors and Actuators for IoT",
              "Radio Module and Wireless Sensor Network",
              "Gateways Internet and Web",
              "Software Components for IoT"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Embedded Programming for IoT",
              "Programming Connected Devices",
              "C and Python for IoT",
              "Case Study: Temperature Controller",
              "Smart Irrigation System"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Embedded RTOS",
              "Program Structure and Real-Time Systems",
              "Multitasking and Scheduling",
              "RTOS Services",
              "Signals and Semaphores in RTOS",
              "Nucleus SE",
              "Application Timers and Interrupts in Nucleus SE",
              "Nucleus SE Initialization and Startup"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Tools for IoT",
              "Introduction to Chef and Puppet",
              "NETCONF - YANG Case Studies",
              "IoT Physical Devices",
              "Basic Building Blocks of an IoT Device and Endpoints",
              "Family of IoT Devices",
              "pcDuino, BeagleBone Black, Cubie Board",
              "Domain-Specific IoTs"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Distributed Computing System",
        code: "KAI079 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Characterization of Distributed Systems",
              "Examples of Distributed Systems",
              "Resource Sharing and the Web Challenges",
              "Architectural Models",
              "Fundamental Models",
              "Theoretical Foundation for Distributed Systems",
              "Limitations of Distributed Systems",
              "Absence of Global Clock",
              "Shared Memory",
              "Logical Clocks: Lamport's & Vectors Logical Clocks",
              "Concepts in Message Passing Systems",
              "Causal Order",
              "Total Order",
              "Total Causal Order",
              "Techniques for Message Ordering",
              "Causal Ordering of Messages",
              "Global State",
              "Termination Detection"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Distributed Mutual Exclusion",
              "Classification of Distributed Mutual Exclusion",
              "Requirement of Mutual Exclusion Theorem",
              "Token-Based and Non-Token-Based Algorithms",
              "Performance Metric for Distributed Mutual Exclusion Algorithms",
              "Distributed Deadlock Detection",
              "System Model",
              "Resource vs Communication Deadlocks",
              "Deadlock Prevention, Avoidance, Detection & Resolution",
              "Centralized Deadlock Detection",
              "Distributed Deadlock Detection",
              "Path Pushing Algorithms",
              "Edge Chasing Algorithms"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Agreement Protocols",
              "System Models",
              "Classification of Agreement Problems",
              "Byzantine Agreement Problem",
              "Consensus Problem",
              "Interactive Consistency Problem",
              "Solution to Byzantine Agreement Problem",
              "Applications of Agreement Problems",
              "Atomic Commit in Distributed Database System",
              "Distributed Resource Management",
              "Issues in Distributed File Systems",
              "Mechanisms for Building Distributed File Systems",
              "Design Issues in Distributed Shared Memory",
              "Algorithm for Implementation of Distributed Shared Memory"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Failure Recovery in Distributed Systems",
              "Concepts in Backward and Forward Recovery",
              "Recovery in Concurrent Systems",
              "Obtaining Consistent Checkpoints",
              "Recovery in Distributed Database Systems",
              "Fault Tolerance",
              "Issues in Fault Tolerance",
              "Commit Protocols",
              "Voting Protocols",
              "Dynamic Voting Protocols"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Transactions and Concurrency Control",
              "Transactions",
              "Nested Transactions",
              "Locks",
              "Optimistic Concurrency Control",
              "Timestamp Ordering",
              "Comparison of Methods for Concurrency Control",
              "Distributed Transactions",
              "Flat and Nested Distributed Transactions",
              "Atomic Commit Protocols",
              "Concurrency Control in Distributed Transactions",
              "Distributed Deadlocks",
              "Transaction Recovery",
              "Replication",
              "System Model and Group Communication",
              "Fault-Tolerant Services",
              "Highly Available Services",
              "Transactions with Replicated Data"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "IoT System Architectures",
        code: "KOT710",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "The IoT Landscape: What Is IoT?",
              "Applications of IoT",
              "Architectures in IoT",
              "Wireless Networks in IoT",
              "IoT Devices",
              "Security and Privacy in IoT",
              "Event-Driven Systems in IoT",
              "IoT System Architectures",
              "Introduction to IoT-Oriented Protocols",
              "Databases in IoT",
              "Time Bases in IoT",
              "Security in IoT Systems"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "IoT Devices & Event-Driven System Analysis",
              "The IoT Device Design Space",
              "Cost of Ownership and Power Consumption in IoT Devices",
              "Cost per Transistor and Chip Size",
              "Duty Cycle and Power Consumption",
              "Platform Design for IoT",
              "Event-Driven System Analysis Introduction",
              "Motivating Example for IoT Event-Driven Systems",
              "IoT Network Model",
              "Events in IoT Networks",
              "Networks and Devices in IoT",
              "Hubs in IoT Networks",
              "Single-Hub Networks in IoT",
              "Multi-Hub Networks in IoT",
              "Network Models in IoT",
              "Physical Networks in IoT",
              "IoT Event Analysis",
              "Event Populations",
              "Stochastic Event Populations",
              "Environmental Interaction Modeling in IoT",
              "Event Transport and Migration in IoT"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Industrial Internet of Things",
              "Introduction to Industry 4.0",
              "Industrial Internet of Things (IIoT)",
              "IIoT Architecture",
              "Basic Technologies in IIoT",
              "Applications of IIoT",
              "Challenges in IIoT"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Security and Safety in IoT",
              "Introduction to Systems Security",
              "Network Security in IoT",
              "Generic Application Security in IoT",
              "Application Process Security and Safety",
              "Reliable-and-Secure-by-Design IoT Applications",
              "Run-Time Monitoring in IoT Systems",
              "The ARMET Approach in IoT Security",
              "Privacy and Dependability in IoT"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Security Testing IoT Systems",
              "Introduction to Fuzz Testing for IoT Security",
              "White-Box Fuzzing for IoT Security",
              "Black-Box Fuzzing for IoT Security",
              "Fuzzing Industrial Control Network Systems",
              "Fuzzing Modbus Protocol in IoT Systems",
              "The Modbus Protocol in IoT",
              "Modbus/TCP Fuzzer for IoT Security"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Operating Systems for IoT",
        code: "KOT711",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Processes, Tools, Toolchains and Hardware: Design to Code - A Practical Approach",
              "The STM32Cube Software Tool",
              "The Practical Tool Set for STM32",
              "STM32 Graphical Tool - STM32CubeMX Details",
              "The STM32CubeHAL",
              "FreeRTOS Configuration in a Cube Project",
              "The STM32CubeIDE Development Platform"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Introducing Micropython",
              "Micropython Features",
              "Micropython Limitations",
              "What Does Micropython Run On?",
              "Experimenting With Python On Your PC",
              "How Micropython Works",
              "Off and Running With Micropython"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Micropython Hardware: Getting Started with Micropython Boards",
              "Micropython-Ready Boards",
              "Networking with the Pyboard",
              "Getting Started with WiPy",
              "Connecting to Your Wifi Network",
              "Micropython-Compatible Boards",
              "Other Boards, Breakout Boards and Add-Ons"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "How to Program in Micropython",
              "Basic Concepts in Micropython Programming",
              "Basic Data Structures in Micropython",
              "Statements in Micropython",
              "Modularization in Micropython",
              "Modules, Functions, and Classes in Micropython",
              "Learning Python by Example"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Introducing the Windows 10 IoT Core",
              "Windows 10 IoT Core Features",
              "Things You’ll Need for Windows 10 IoT Core",
              "Getting Started with Windows 10 IoT Core"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Mobile Application Development for IoT",
        code: "KOT712",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "IoT Product Conceptualization: IoT Product Development Lifecycle",
              "IoT Product Conceptualizations",
              "IoT Programming Fundamentals: Getting Started",
              "IoT Programming setup for LED flashing",
              "Program to display message on screen",
              "Program to read LDR level and display on screen",
              "Android APK to perform read-write operation",
              "Particle Android APK to control LED intensity",
              "LED switching with HTML interface",
              "Cloud-based motion detection",
              "Displaying temperature sensor data on terminal",
              "Publishing sensor values on the cloud",
              "Performing computation on sensor values"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "IoT Programming Applications: Gas level detection using MQ2 sensor",
              "Blink Android Application for controlling LED from mobile",
              "Integration of Temperature and Gas Sensor with Blynk Mobile Application",
              "Printing real-time Date and Time values on serial terminal",
              "Display temperature value on serial terminal",
              "Display temperature values on 16*2 LCD display",
              "Interfacing: Interfacing of Nokia 5110 display",
              "Display image on Nokia 5110",
              "Particle Electron displaying battery charging level status",
              "GPS tracking device interface to get coordinates"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "IoT Product Hardware Development: Product realization",
              "Connection diagram of IoT product",
              "Engineering board development",
              "Product board customization and optimization",
              "Flowchart of IoT warehouse monitoring system",
              "Wireless communication between the multiple kits",
              "Particle cloud IDE"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "IoT Advance Wireless Interfaces: Bluetooth communication between master and slave module",
              "Data visualization on ThingSpeak cloud using webhook services",
              "Storing data into Google excel sheet and sending the sheets to emails"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "IoT Production System: IoT Warehouse Monitoring System",
              "IoT Product Packaging",
              "Future of IoT Product Development"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Cloud Computing",
        code: "KCS713 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction To Cloud Computing: Definition of Cloud",
              "Evolution of Cloud Computing",
              "Underlying Principles of Parallel and Distributed Computing",
              "Cloud Characteristics",
              "Elasticity in Cloud",
              "On-demand Provisioning"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Cloud Enabling Technologies Service Oriented Architecture: REST and Systems of Systems",
              "Web Services",
              "Publish, Subscribe Model",
              "Basics of Virtualization",
              "Types of Virtualization",
              "Implementation Levels of Virtualization",
              "Virtualization Structures",
              "Tools and Mechanisms",
              "Virtualization of CPU",
              "Memory",
              "I/O Devices",
              "Virtualization Support and Disaster Recovery"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Cloud Architecture, Services And Storage: Layered Cloud Architecture Design",
              "NIST Cloud Computing Reference Architecture",
              "Public, Private and Hybrid Clouds",
              "IaaS",
              "PaaS",
              "SaaS",
              "Architectural Design Challenges",
              "Cloud Storage",
              "Storage-as-a-Service",
              "Advantages of Cloud Storage",
              "Cloud Storage Providers",
              "S3"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Resource Management And Security In Cloud: Inter Cloud Resource Management",
              "Resource Provisioning and Resource Provisioning Methods",
              "Global Exchange of Cloud Resources",
              "Security Overview",
              "Cloud Security Challenges",
              "Software-as-a-Service Security",
              "Security Governance",
              "Virtual Machine Security",
              "IAM",
              "Security Standards"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Cloud Technologies And Advancements Hadoop: MapReduce",
              "Virtual Box",
              "Google App Engine",
              "Programming Environment for Google App Engine",
              "Open Stack",
              "Federation in the Cloud",
              "Four Levels of Federation",
              "Federated Services and Applications",
              "Future of Federation"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
      {
        name: "Block chain Architecture Design",
        code: "KCS714 ",
        Units: [
          {
            name: "Unit-1",
            number: 1,
            topics: [
              "Introduction to Blockchain: Digital Money to Distributed Ledgers",
              "Design Primitives: Protocols, Security, Consensus, Permissions, Privacy",
              "Blockchain Architecture and Design: Basic crypto primitives: Hash, Signature",
              "Hashchain to Blockchain",
              "Basic consensus mechanisms"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-2",
            number: 2,
            topics: [
              "Consensus: Requirements for the consensus protocols",
              "Proof of Work (PoW)",
              "Scalability aspects of Blockchain consensus protocols",
              "Permissioned Blockchains: Design goals",
              "Consensus protocols for Permissioned Blockchains"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-3",
            number: 3,
            topics: [
              "Hyperledger Fabric (A): Decomposing the consensus process",
              "Hyperledger fabric components",
              "Chaincode Design and Implementation",
              "Hyperledger Fabric (B): Beyond Chaincode: fabric SDK and Front End",
              "Hyperledger composer tool"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-4",
            number: 4,
            topics: [
              "Use case 1 : Blockchain in Financial Software and Systems (FSS): (i) Settlements, (ii) KYC, (iii) Capital markets, (iv) Insurance",
              "Use case 2: Blockchain in trade/supply chain: (i) Provenance of goods, visibility, trade/supply chain finance, invoice management discounting, etc"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
          {
            name: "Unit-5",
            number: 5,
            topics: [
              "Use case 3: Blockchain for Government: (i) Digital identity, land records and other kinds of record keeping between government entities, (ii) public distribution system social welfare systems",
              "Blockchain Cryptography, Privacy and Security on Blockchain"
            ]
            ,
            youtube: [],
            notes: [],
            ppt: [],
            important: [],
          },
        ],
        STs: [
          {
            year: 2024,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2024,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Odd",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
          {
            year: 2023,
            semester: "Even",
            papers: [
              { name: "ST1", file: "Soon" },
              { name: "ST2", file: "Soon" },
              { name: "ST3", file: "Soon" },
            ],
          },
        ],
        AKTU: [
          {
            year: 2024,
            file: "Soon",
          },
          {
            year: 2023,
            file: "Soon",
          },
          {
            year: 2022,
            file: "Soon",
          },
          {
            year: 2021,
            file: "Soon",
          },
          {
            year: 2020,
            file: "Soon",
          },
        ],
      },
    ],
  },
};
