# Ayush Jawane — Premium Interactive Developer Portfolio

> **Java Full Stack Developer | B.Tech Artificial Intelligence & Machine Learning (2027)**  
> **IPS Academy, Indore**  
> *Inspired by the cinematic, high-interactivity aesthetics of `amitmanmode.me`.*

---

## 🌟 Highlights & Key Features

1. **Essential Talking AI Character**:
   - Original cybernetic AI avatar with floating physics, natural blinking eyes, eye-tracking cursor, and speech waveform mouth.
   - Browser **Text-to-Speech (TTS)** voice synthesis greeting visitors and explaining Ayush's background.
   - Built-in **Microphone Voice Interaction** (Web Speech API) allowing visitors to talk to the bot.
   - Built-in Knowledge Base capable of answering questions about Ayush's skills, projects, college, experience, resume, and contact details.
   - Audio mute/unmute control with local storage persistence.
   - Interactive prompt chips for 1-click answers.

2. **Cinematic Dark & Neon Visual Aesthetic**:
   - Deep cinematic background (`#080C14`) paired with electric **neon lime-green** (`#00FF87`) and cyan highlights.
   - Typography: **Kanit** for bold modern headlines and **Inter** for crisp readability.
   - Dynamic particle canvas constellation with gentle mouse repulsion.
   - Smooth custom glowing neon cursor with interactive scaling on buttons and cards.
   - Glassmorphic cards with frosted glass blur and hover elevations.

3. **Complete Portfolio Sections**:
   - **Hero**: Personalized introduction, dynamic role highlight, quick stats, action CTAs, and the interactive talking companion.
   - **About Me**: Narrative bio, B.Tech AIML (Batch 2027) details at IPS Academy Indore, and core architectural principles.
   - **Technical Arsenal**: Filterable skill grid covering:
     - **Programming**: Java, Python, JavaScript
     - **Backend**: Spring, Spring Boot, Microservices, REST APIs
     - **Frontend**: HTML, CSS, React.js, Bootstrap
     - **Database & Tools**: SQL, Git, GitHub
     - **AI / ML**: Machine Learning, Artificial Intelligence, Python-based AI/ML projects
   - **Experience & Education**: Timeline with clear, authentic placeholders for internships (no fake companies) and B.Tech AIML education.
   - **Featured Projects**: Filterable project cards with titles, descriptions, tech badges, GitHub links, and live demo buttons.
   - **Resume Section**: Dedicated callout with 1-click download button pointing to `assets/resume.pdf`.
   - **Contact Section**: 1-click email copy button (`ayush.jawane27@gmail.com`), direct LinkedIn link, and a validated interactive contact form.

---

## 🚀 How to Run & Preview

This portfolio is built to be **zero-friction and instant**:

1. **Instant Preview (No Installation Required)**:
   - Simply navigate to `C:\Users\ayush\.gemini\antigravity\scratch\ayush-portfolio\`
   - **Double-click `index.html`** in File Explorer to open it immediately in Google Chrome, Microsoft Edge, Brave, or Firefox!

2. **Using VS Code Live Server (Optional)**:
   - Open the `ayush-portfolio` folder in VS Code.
   - Right-click `index.html` and select **"Open with Live Server"**.

3. **Using any local HTTP server**:
   ```bash
   npx serve .
   # or
   python -m http.server 3000
   ```

---

## 🛠️ Step-by-Step Customization Guide

### 1. Replacing Your Resume
- Replace the placeholder file at `assets/resume.pdf` with your actual PDF resume.
- Keep the filename as `resume.pdf` and all download links across the website will instantly download your latest resume.

### 2. Adding / Updating Project Details
- Open `index.html` and search for `<section id="projects">`.
- In each `.project-card`:
  - Update the `<h3>` with your project name.
  - Update the `<p>` description with your specific project achievements.
  - Update the `<a href="...">` links with your actual GitHub repository URL (`https://github.com/ayushjawane/your-repo`).

### 3. Adding Your Internship & Experience Details
- Open `index.html` and find the `<section id="experience">`.
- Locate the card with the badge `READY FOR ACTIVATION`.
- Replace the placeholder text with your:
  - **Company Name**
  - **Role** (e.g. *Java Full Stack Intern*)
  - **Duration** (e.g. *June 2024 - Present*)
  - **Key Contributions & Achievements**
  - Optionally add a link to your completion certificate.

### 4. Customizing the AI Character's Brain
- Open `assets/js/ai-character.js`.
- Look at the `this.knowledgeBase` object:
  ```javascript
  this.knowledgeBase = {
    greeting: "...",
    skills: "...",
    projects: "...",
    education: "...",
    experience: "...",
    resume: "...",
    contact: "..."
  };
  ```
- Edit any of the answers to add more personalized anecdotes or specific project details!

---

## 🌐 Free 1-Click Deployment

### Deploy to GitHub Pages:
1. Initialize git in this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Ayush Jawane Portfolio"
   ```
2. Create a new repository on GitHub named `ayushjawane.github.io` (or `portfolio`).
3. Push your code:
   ```bash
   git remote add origin https://github.com/ayushjawane/ayushjawane.github.io.git
   git branch -M main
   git push -u origin main
   ```
4. In GitHub repository Settings -> Pages, select branch `main` and root `/`. Your website will be live in seconds!

### Deploy to Vercel or Netlify:
- Drag and drop the `ayush-portfolio` folder directly into [netlify.com/drop](https://app.netlify.com/drop) or import from GitHub on [vercel.com](https://vercel.com) for instantaneous deployment with free SSL.
