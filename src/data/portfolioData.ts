export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  tags: string[];
  category: 'ai-ml' | 'fullstack' | 'backend';
  metrics?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Internship {
  id: string;
  role: string;
  company: string;
  period: string;
  internshipId?: string;
  bullets: string[];
  tags: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  gradeOrFocus?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  badge: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const portfolioData = {
  personal: {
    name: "Ayush Jawane",
    role: "Software Developer | Java Full Stack | AI/ML Enthusiast",
    shortRole: "Software Developer",
    tagline: "Building scalable software solutions and progressing toward AI/ML-focused development.",
    summary:
      "Result-driven Software Developer with a strong foundation in Java, Full Stack development, Artificial Intelligence, and Machine Learning. Skilled in OOPs, SQL, HTML, CSS, JavaScript, Spring, REST APIs, and backend development concepts. Familiar with SQL, and database integration. Proficient in Python and core ML workflows, with a passion for building scalable software solutions and progressing toward AI/ML-focused development.",
    email: "ayush.jawane27@gmail.com",
    phone: "+91-9826647678",
    location: "Rau, Indore-452001, Madhya Pradesh, India",
    linkedin: "https://linkedin.com/in/ayush-jawane",
    github: "https://github.com/ayushjawane27",
    resumeUrl: "/resume.pdf",
    college: "IPS Academy, Indore",
    degree: "B.Tech in Artificial Intelligence & Machine Learning Engineering",
    batch: "2023 – Present (Graduating 2027)",
  },

  skills: {
    programming: [
      { name: "Java", level: "Advanced", desc: "Core Java, OOP, Collections, Multithreading, Streams API" },
      { name: "Python", level: "Proficient", desc: "Data pipelines, NLP, Scikit-learn, TensorFlow, Scripting" },
      { name: "C++", level: "Proficient", desc: "Data structures, Algorithm optimization, System fundamentals" },
    ],
    backend: [
      { name: "Spring", level: "Proficient", desc: "Inversion of Control, Dependency Injection, MVC" },
      { name: "Spring Boot", level: "Advanced", desc: "Enterprise microservices, Auto-configuration, Starters" },
      { name: "Microservices", level: "Proficient", desc: "Service discovery, API Gateway, Decoupled architectures" },
      { name: "REST APIs", level: "Advanced", desc: "Stateless HTTP contracts, JSON, Secure endpoints" },
    ],
    frontend: [
      { name: "HTML5", level: "Advanced", desc: "Semantic structure, Accessibility, Responsive layouts" },
      { name: "CSS3", level: "Advanced", desc: "Flexbox, Grid, Animations, Modern responsive UI" },
      { name: "JavaScript", level: "Proficient", desc: "ES6+, Async/Await, DOM manipulation, APIs" },
      { name: "React.js", level: "Proficient", desc: "Hooks, Functional components, State management, SPA" },
      { name: "Bootstrap", level: "Proficient", desc: "Component systems, Rapid responsive layout prototyping" },
    ],
    database: [
      { name: "SQL", level: "Advanced", desc: "Relational modeling, Normalization, Query optimization, Joins" },
      { name: "MySQL", level: "Proficient", desc: "Schema design, Indexing, Transactions, Stored routines" },
      { name: "PostgreSQL", level: "Proficient", desc: "Certified RDBMS training, Relational integrity" },
    ],
    tools: [
      { name: "Git", level: "Proficient", desc: "Branching, Version control, Merging, Workflows" },
      { name: "GitHub", level: "Proficient", desc: "Repository management, Collaboration, Open source" },
      { name: "VS Code", level: "Advanced", desc: "Primary development IDE, Debugging, Extensions" },
      { name: "Eclipse", level: "Proficient", desc: "Enterprise Java & Spring enterprise workspace" },
    ],
    competencies: [
      { name: "OOP", level: "Advanced", desc: "Encapsulation, Inheritance, Polymorphism, Abstraction" },
      { name: "Data Structures", level: "Advanced", desc: "Arrays, Linked Lists, Trees, Graphs, Hashing" },
      { name: "Problem Solving", level: "Advanced", desc: "Algorithmic thinking, Complexity analysis, Optimization" },
      { name: "AI / ML Workflows", level: "Proficient", desc: "Model evaluation, Confusion matrices, NLP intent classification" },
    ],
  },

  internships: [
    {
      id: "internpe",
      role: "Software Developer Intern",
      company: "InternPe",
      period: "23 June 2025 – 20 July 2025",
      bullets: [
        "Designed and developed an AI-powered chat application capable of generating context-aware responses using Python and NLP techniques.",
        "Implemented and optimized chatbot features using Python, Scikit-learn, and TensorFlow to improve response quality.",
        "Collaborated within an agile team to integrate AI/ML components into software applications.",
      ],
      tags: ["Python", "NLP", "Scikit-learn", "TensorFlow", "Agile"],
    },
    {
      id: "maincrafts",
      role: "AI/ML Intern",
      company: "MaincraftsTechnology",
      period: "20 June 2026 – 05 July 2026",
      internshipId: "MT6608",
      bullets: [
        "Successfully completed an intensive internship in Artificial Intelligence & Machine Learning, contributing to production-oriented pipelines.",
        "Demonstrated dedication, analytical problem-solving, and active contribution to client and internal ML prototypes (InternshipID: MT6608).",
      ],
      tags: ["AI / ML", "Model Evaluation", "Python", "Data Workflows"],
    },
  ] as Internship[],

  projects: [
    {
      id: "ai-chat-processor",
      title: "AI Chat Processor",
      subtitle: "Context-Aware Intelligent Chatbot & API",
      category: "ai-ml",
      description:
        "Developed a Python-based AI chatbot using machine learning libraries for intent classification and context-aware response generation, deployed as a robust REST API.",
      bullets: [
        "Leveraged NLP pipelines for tokenization, feature extraction, and intent classification.",
        "Implemented context-aware conversational memory for responsive multi-turn dialogues.",
        "Packaged and deployed as a stateless RESTful endpoint for seamless client integrations.",
      ],
      tags: ["Python", "NLP", "Machine Learning", "REST API", "Scikit-Learn"],
      metrics: "Sub-second response latency with high intent classification precision",
      githubUrl: "https://github.com/ayushjawane27",
    },
    {
      id: "predictive-model-eval",
      title: "Predictive Model Evaluation System",
      subtitle: "Machine Learning Metrics & Visualization Dashboard",
      category: "ai-ml",
      description:
        "Built a comprehensive web-based dashboard using HTML, CSS, JavaScript, and a Python backend to visualize model metrics, confusion matrices, and training accuracy curves.",
      bullets: [
        "Interactive graphical evaluation of ROC-AUC curves, precision-recall tradeoffs, and confusion matrices.",
        "Python backend orchestrating scikit-learn model performance metrics and JSON serialization.",
        "Modular UI allowing data scientists to upload test sets and compare competing classifier benchmarks.",
      ],
      tags: ["Python", "HTML5", "CSS3", "JavaScript", "Data Visualization", "Scikit-Learn"],
      metrics: "Real-time interactive matrix rendering and validation curve graphing",
      githubUrl: "https://github.com/ayushjawane27",
    },
    {
      id: "divya-yatri",
      title: "Divya-Yatri",
      subtitle: "Smart Pilgrimage Assistance & Planning Platform",
      category: "fullstack",
      description:
        "Developed a web-based platform to simplify pilgrimage planning and provide relevant destination information. Designed user-focused workflows for destination discovery, trip planning, and pilgrimage assistance.",
      bullets: [
        "Designed structured user workflows for spiritual destination discovery, itineraries, and live logistical updates.",
        "Integrated database functionality and REST APIs to manage, store, and display application datasets cleanly.",
        "Built an accessible, responsive user interface focused on high usability and simplified travel itineraries.",
      ],
      tags: ["Web Technologies", "REST APIs", "Database Integration", "UI/UX", "Travel Tech"],
      metrics: "End-to-end itinerary planner with structured database schemas",
      githubUrl: "https://github.com/ayushjawane27",
    },
    {
      id: "trial-equity-backtesting",
      title: "Trial Equity Backtesting Platform",
      subtitle: "Quantitative Financial Analytics on 115 NSE Stocks",
      category: "backend",
      description:
        "Developed a financial analytic platform to evaluate trading strategies using historical market data. Integrated OHLCV and financial data for 115 NSE stocks for historical strategy analysis.",
      bullets: [
        "Integrated high-density OHLCV time-series data for 115 National Stock Exchange (NSE) securities.",
        "Engineered backtesting execution algorithms, drawdown calculations, and cumulative P&L analytics.",
        "Designed backend APIs and high-efficiency database workflows to stream and process heavy financial datasets.",
      ],
      tags: ["Python", "Financial Analytics", "OHLCV", "115 NSE Stocks", "SQL Database", "Algorithms"],
      metrics: "Historical backtest simulation across 115 NSE equity tickers",
      githubUrl: "https://github.com/ayushjawane27",
    },
  ] as Project[],

  education: [
    {
      id: "btech",
      degree: "Bachelor of Technology — AI & Machine Learning Engineering",
      institution: "IPS Academy, Indore",
      period: "2023 – Present (Class of 2027)",
      gradeOrFocus: "Core focus on Java, OOP, Data Structures, Algorithms, Computer Networks, and Machine Learning Systems.",
    },
    {
      id: "hsc",
      degree: "HSC — Science",
      institution: "HSM Global Public School, Bilaspur",
      period: "2022 – 2023",
      gradeOrFocus: "Strong foundational curriculum in Physics, Chemistry, and Advanced Mathematics.",
    },
  ] as Education[],

  certifications: [
    {
      id: "hp-life",
      title: "Effective Presentation",
      issuer: "HP LIFE Online Course",
      badge: "Professional Communication",
    },
    {
      id: "rdbms-postgres",
      title: "RDBMS PostgreSQL Training",
      issuer: "Database Management Certification",
      badge: "Database Systems",
    },
    {
      id: "division-quiz",
      title: "Division Level Quiz",
      issuer: "Academic Excellence Recognition",
      badge: "Excellence Award",
    },
  ] as Certification[],

  softSkills: [
    "Leadership",
    "Team Management",
    "Technical Communication",
    "Analytical Thinking",
    "Algorithmic Problem-Solving",
    "Critical Thinking",
  ],

  languages: [
    { name: "English", proficiency: "Professional Proficiency" },
    { name: "Hindi", proficiency: "Native Proficiency" },
  ],

  voiceTourScript: [
    {
      section: "hero",
      title: "Welcome to Ayush Jawane's Portfolio",
      text: "Hello and welcome! I am Ayush Jawane, a Software Developer and Java Full Stack Engineer pursuing my Bachelor of Technology in AI and Machine Learning at IPS Academy, Indore. I build scalable backend architectures and integrate artificial intelligence to solve real-world problems.",
    },
    {
      section: "about",
      title: "About Ayush",
      text: "Ayush has strong expertise in Object Oriented Programming, Java, Spring Boot, Microservices, and REST APIs, alongside modern frontend interfaces and core machine learning workflows in Python.",
    },
    {
      section: "skills",
      title: "Technical Skills",
      text: "Ayush's technical arsenal spans Java, Python, C++, Spring Boot, Microservices, REST APIs, SQL, MySQL, and PostgreSQL, along with HTML5, CSS3, JavaScript, React.js, and version control with Git and GitHub.",
    },
    {
      section: "internships",
      title: "Professional Internships",
      text: "Ayush has completed internships as a Software Developer Intern at InternPe, where he engineered an AI-powered conversational chatbot with NLP and TensorFlow, and an AI/ML Internship at MaincraftsTechnology.",
    },
    {
      section: "projects",
      title: "Featured Engineering Projects",
      text: "His portfolio highlights four major engineering solutions: the AI Chat Processor, the Predictive Model Evaluation System, the Divya-Yatri pilgrimage platform, and the Trial Equity Backtesting Platform analyzing 115 NSE stocks.",
    },
    {
      section: "contact",
      title: "Get In Touch",
      text: "Ayush is based in Rau, Indore and is actively open to software engineering roles. You can download his verified resume, email him directly, or connect with him on LinkedIn.",
    },
  ],

  faq: [
    {
      question: "What is Ayush's core technical stack?",
      answer: "Ayush specializes in Java Full Stack development with Java, Spring Boot, Microservices, REST APIs, and SQL/MySQL databases. He is also proficient in Python and machine learning libraries such as Scikit-learn and TensorFlow, along with modern frontend development using React.js, HTML5, CSS3, and JavaScript.",
      category: "Skills",
    },
    {
      question: "Where is Ayush studying and what is his batch?",
      answer: "Ayush is pursuing his Bachelor of Technology in Artificial Intelligence & Machine Learning Engineering at IPS Academy in Indore, Madhya Pradesh. He is part of the 2023–Present batch graduating in 2027.",
      category: "Education",
    },
    {
      question: "What internships has Ayush completed?",
      answer: "Ayush completed a Software Developer Internship at InternPe (June–July 2025), where he built an NLP-based AI chatbot with Python and TensorFlow. He also completed an AI/ML Internship at MaincraftsTechnology (Internship ID: MT6608).",
      category: "Experience",
    },
    {
      question: "What are Ayush's main projects?",
      answer: "Ayush has built 4 key projects: 1) AI Chat Processor (Python NLP chatbot with REST API), 2) Predictive Model Evaluation System (accuracy and confusion matrix dashboard), 3) Divya-Yatri (Smart pilgrimage assistance and planning platform), and 4) Trial Equity Backtesting Platform (quantitative OHLCV analytics for 115 NSE stocks).",
      category: "Projects",
    },
    {
      question: "How can I download Ayush's resume?",
      answer: "You can download Ayush's verified resume PDF directly by clicking the 'Download Resume' button in the navigation or Hero section, or by visiting /resume.pdf.",
      category: "Resume",
    },
    {
      question: "How can recruiters contact Ayush?",
      answer: "Recruiters can email Ayush directly at ayush.jawane27@gmail.com, call +91-9826647678, or connect on LinkedIn at https://linkedin.com/in/ayush-jawane.",
      category: "Contact",
    },
  ] as FAQItem[],
};
