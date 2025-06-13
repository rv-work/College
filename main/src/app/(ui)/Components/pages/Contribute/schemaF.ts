export interface SchemaA {
  [branch: string]: {
    [year: string]: string[];
  };
}

export interface SchemaC {
  [tech: string]: {
    [field: string]: string[];
  };
}

//https://aktuhub.in/wp-content/uploads/2024/08/Syllabus_BTech_First_Yr_Common_other_than_AG__BT_effective_from_2022_23_R.pdf
//https://aktuhub.in/wp-content/uploads/2024/08/B.Tech_2nd_Yr_CSE_v3.pdf
//https://aktuhub.in/wp-content/uploads/2024/08/B.Tech_CS_Design-3rd-Year-Year-2023-24.pdf
//https://aktuhub.in/wp-content/uploads/2024/08/BTech.-4th-Year_Computer-Science-and-Engineering-Internet-of-Things_2023-24_v2.pdf

export const schemaF: SchemaA = {
  "CSE/IT": {
    "1st": [
      "ENGINEERING PHYSICS",
      "ENGINEERING CHEMISTRY",
      "ENGINEERING MATHEMATICS-I",
      "ENGINEERING MATHEMATICS-II",
      "FUNDAMENTALS OF ELECTRICAL ENGINEERING",
      "FUNDAMENTALS OF ELECTRONICS ENGINEERING",
      "PROGRAMMING FOR PROBLEM SOLVING",
      "FUNDAMENTALS OF MECHANICAL ENGINEERING",
      "ENVIRONMENT AND ECOLOGY",
      "SOFT SKILLS",
    ],
    "2nd": [
      "DATA STRUCTURE",
      "COMPUTER ORGANIZATION AND ARCHITECTURE",
      "Discrete Structures & Theory of Logic",
      "Operating system",
      "Theory of Automata and Formal Languages",
      "Object Oriented Programming with Java",
      "Technical Communication",
      "Universal Human Value and Professional Ethics",
      "Cyber Security",
      "Python Programming",
      "Maths IV",
      "Maths III",
      "Maths V",
      "Digital Electronics",
    ],
    "3rd": [
      "Database Management System",
      "Web Designing and Development",
      "Design and Analysis of Algorithm",
      "Data Analytics",
      "Metaverse",
      "Computer Graphics",
      "Object Oriented System Design",
      "Machine Learning Techniques",
      "Multimedia and Animation",
      "Software Engineering",
      "Human Computer Interface",
      "Web Technology",
      "Computer Networks",
      "Big Data",
      "Image Processing",
      "Digital Marketing",
      "Game Design",
    ],
    "4th": [
      "IOT Security",
      "Natural Language Processing",
      "Text Analytics and Natural Language Processing",
      "Cryptography & Network Security",
      "Real Time Operating System",
      "Deep Learning",
      "DATA ANALYTICS FOR IOT",
      "Architecting Smart IoT Devices",
      "IoT System Architectures",
      "Operating Systems for IoT",
      "Mobile Application Development for IoT",
      "Cloud Computing",
      "Block chain Architecture Design",
    ],
  },
  "ECE": {
    "1st": ["Soon"],
    "2nd": ["Soon"],
    "3rd": ["Soon"],
    "4th": ["Soon"],
  },
  "ME": {
    "1st": ["Soon"],
    "2nd": ["Soon"],
    "3rd": ["Soon"],
    "4th": ["Soon"],
  },
  "EE": {
    "1st": ["Soon"],
    "2nd": ["Soon"],
    "3rd": ["Soon"],
    "4th": ["Soon"],
  },
};
