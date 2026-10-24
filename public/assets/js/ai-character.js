/**
 * ==========================================================================
 * AYUSH JAWANE — HUMAN TALKING CHARACTER CONTROLLER
 * Features:
 *  - Photorealistic Human Persona with Multi-Frame Natural Animation
 *  - Idle Floating & Natural Eyelid Blinking (3.5 - 5s intervals)
 *  - Dynamic Speech-Synchronized Mouth Articulation (TTS sync)
 *  - 3D Parallax Mouse Tracking & Head Angle Tilting
 *  - Web Speech API Speech Synthesis (TTS) & Speech Recognition (STT / Mic)
 *  - Ayush Jawane Portfolio Knowledge Base
 *  - Audio Mute / Unmute Toggle
 * ==========================================================================
 */

class HumanCharacterController {
  constructor() {
    // Character Frame Elements
    this.frameIdle = document.getElementById('char-frame-idle');
    this.frameBlink = document.getElementById('char-frame-blink');
    this.frameTalk = document.getElementById('char-frame-talk');
    this.characterCard = document.getElementById('human-character-card');
    this.characterWrapper = document.getElementById('human-character-wrapper');
    this.speakingWave = document.getElementById('speaking-wave');
    this.statusText = document.getElementById('ai-status-text');
    this.speechBubble = document.getElementById('speech-bubble-text');

    // Controls & Input
    this.chatForm = document.getElementById('ai-chat-form');
    this.userInput = document.getElementById('ai-user-input');
    this.micBtn = document.getElementById('ai-mic-btn');
    this.audioToggleBtn = document.getElementById('audio-toggle-btn');
    this.audioLabel = document.getElementById('audio-label');
    this.audioIcon = document.getElementById('audio-icon');
    this.mobileAudioToggle = document.getElementById('mobile-audio-toggle');
    this.chips = document.querySelectorAll('.ai-chip');

    // State Variables
    this.isMuted = localStorage.getItem('ayush_portfolio_muted') === 'true';
    this.isSpeaking = false;
    this.isListening = false;
    this.hasGreeted = false;
    this.synth = window.speechSynthesis || null;
    this.recognition = null;
    this.typingInterval = null;
    this.blinkTimer = null;
    this.talkAnimationTimer = null;

    // Knowledge Base specifically tailored to Ayush Jawane
    this.knowledgeBase = {
      greeting: "Hello! I'm Ayush Jawane. Welcome to my portfolio! I'm a Java Full Stack Developer pursuing my B.Tech in AI and Machine Learning at IPS Academy, Indore (Batch 2027). Feel free to explore my work or ask me anything!",

      skills: "My core technical stack includes Java, Spring, Spring Boot, Microservices, REST APIs, SQL, and Python. On the frontend, I build responsive UIs using HTML, CSS, JavaScript, React.js, and Bootstrap. I also work on Python-based AI and Machine Learning algorithms.",

      projects: "I've engineered several high-impact projects including an Enterprise Banking & E-Commerce Microservices Backend using Spring Cloud and PostgreSQL, an AI-Powered Predictive Analytics Engine with Scikit-learn, and a Full-Stack Cloud Workflow Orchestrator with React and Spring Boot.",

      education: "I am pursuing a B.Tech in Artificial Intelligence and Machine Learning at IPS Academy, Indore, graduating in 2027. My coursework covers Data Structures, Object-Oriented Programming with Java, Database Systems, Computer Networks, and Machine Learning Mathematics.",

      experience: "I am actively preparing for and open to Software Development and Java Full Stack Internships for 2024–2025. I bring strong skills in building scalable microservices, clean code, and AI integration.",

      resume: "My complete resume is available for download! You can click the 'Download Resume' button right on this page, which will download my official PDF resume from assets/resume.pdf.",

      contact: "You can reach me directly by email at ayush.jawane27@gmail.com, or connect with me on LinkedIn at linkedin.com/in/ayush-jawane-234541317. You can also send me a message through the contact form below!"
    };

    this.init();
  }

  init() {
    this.setupAudioSettings();
    this.setupSpeechRecognition();
    this.setupEventListeners();
    this.setupParallaxTilt();
    this.startBlinkLoop();

    // Initial greeting in speech bubble
    this.typeText(this.knowledgeBase.greeting, false);

    // Prompt speech on first user click
    const firstInteraction = () => {
      if (!this.hasGreeted && !this.isMuted) {
        this.speak(this.knowledgeBase.greeting);
        this.hasGreeted = true;
      }
      window.removeEventListener('click', firstInteraction);
    };
    window.addEventListener('click', firstInteraction);
  }

  // ------------------------------------------------------------------------
  // Human Frame State Transitions
  // ------------------------------------------------------------------------
  showFrame(frameName) {
    if (!this.frameIdle || !this.frameBlink || !this.frameTalk) return;

    this.frameIdle.classList.remove('active');
    this.frameBlink.classList.remove('active');
    this.frameTalk.classList.remove('active');

    if (frameName === 'blink') {
      this.frameBlink.classList.add('active');
    } else if (frameName === 'talk') {
      this.frameTalk.classList.add('active');
    } else {
      this.frameIdle.classList.add('active');
    }
  }

  startBlinkLoop() {
    const triggerBlink = () => {
      if (!this.isSpeaking) {
        this.showFrame('blink');
        setTimeout(() => {
          if (!this.isSpeaking) {
            this.showFrame('idle');
          }
        }, 160);
      }
      const nextBlinkDelay = Math.random() * 2000 + 3500; // 3.5s - 5.5s
      this.blinkTimer = setTimeout(triggerBlink, nextBlinkDelay);
    };
    this.blinkTimer = setTimeout(triggerBlink, 3000);
  }

  startTalkingAnimation() {
    if (this.talkAnimationTimer) clearInterval(this.talkAnimationTimer);
    let state = false;

    this.talkAnimationTimer = setInterval(() => {
      state = !state;
      this.showFrame(state ? 'talk' : 'idle');
    }, 160);
  }

  stopTalkingAnimation() {
    if (this.talkAnimationTimer) {
      clearInterval(this.talkAnimationTimer);
      this.talkAnimationTimer = null;
    }
    this.showFrame('idle');
  }

  // ------------------------------------------------------------------------
  // Audio & Speech Synthesis (TTS)
  // ------------------------------------------------------------------------
  setupAudioSettings() {
    this.updateAudioUI();

    const toggleMute = () => {
      this.isMuted = !this.isMuted;
      localStorage.setItem('ayush_portfolio_muted', this.isMuted);
      this.updateAudioUI();

      if (this.isMuted && this.synth) {
        this.synth.cancel();
        this.setSpeakingState(false);
      } else {
        this.speak("Voice enabled! Feel free to ask me anything.");
      }
    };

    if (this.audioToggleBtn) this.audioToggleBtn.addEventListener('click', toggleMute);
    if (this.mobileAudioToggle) this.mobileAudioToggle.addEventListener('click', toggleMute);
  }

  updateAudioUI() {
    if (this.isMuted) {
      if (this.audioLabel) this.audioLabel.textContent = 'Voice: OFF';
      if (this.audioIcon) this.audioIcon.innerHTML = `<i data-lucide="volume-x" class="w-4 h-4 text-gray-400"></i>`;
      if (this.mobileAudioToggle) this.mobileAudioToggle.innerHTML = `<i data-lucide="volume-x" class="w-5 h-5 text-gray-400"></i>`;
    } else {
      if (this.audioLabel) this.audioLabel.textContent = 'Voice: ON';
      if (this.audioIcon) this.audioIcon.innerHTML = `<i data-lucide="volume-2" class="w-4 h-4 text-neon"></i>`;
      if (this.mobileAudioToggle) this.mobileAudioToggle.innerHTML = `<i data-lucide="volume-2" class="w-5 h-5 text-neon"></i>`;
    }
    if (window.lucide) window.lucide.createIcons();
  }

  speak(text) {
    if (!this.synth || this.isMuted) return;

    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.02;
    utterance.pitch = 1.0;

    // Pick natural voice
    const voices = this.synth.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('David')));
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => {
      this.setSpeakingState(true);
    };

    utterance.onend = () => {
      this.setSpeakingState(false);
    };

    utterance.onerror = () => {
      this.setSpeakingState(false);
    };

    this.synth.speak(utterance);
  }

  setSpeakingState(speaking) {
    this.isSpeaking = speaking;
    if (speaking) {
      this.startTalkingAnimation();
      if (this.characterCard) this.characterCard.classList.add('human-speaking-active');
      if (this.speakingWave) this.speakingWave.classList.remove('hidden');
      if (this.statusText) this.statusText.textContent = 'Ayush is speaking...';
    } else {
      this.stopTalkingAnimation();
      if (this.characterCard) this.characterCard.classList.remove('human-speaking-active');
      if (this.speakingWave) this.speakingWave.classList.add('hidden');
      if (this.statusText) this.statusText.textContent = 'Online & Interactive';
    }
  }

  // ------------------------------------------------------------------------
  // Speech Recognition (Voice Interaction / Microphone)
  // ------------------------------------------------------------------------
  setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

    if (!SpeechRecognition) {
      if (this.micBtn) {
        this.micBtn.title = "Voice recognition not supported in this browser. Please type your query.";
      }
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
      if (this.statusText) this.statusText.textContent = 'Listening to you... Speak now!';
      if (this.micBtn) {
        this.micBtn.classList.add('bg-cyanAccent', 'text-black', 'border-cyanAccent');
        this.micBtn.classList.remove('bg-white/5', 'text-gray-300');
      }
      if (this.characterCard) this.characterCard.classList.add('human-listening-active');
      this.typeText("Listening... Say: 'Tell me about your skills', 'What projects have you built?', or 'Where do you study?'", false);
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (this.userInput) this.userInput.value = transcript;
      this.handleQuery(transcript);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      this.stopListeningUI();
      if (event.error === 'not-allowed') {
        this.typeText("Microphone access was denied. Please allow microphone permissions or type your question below!", true);
      } else {
        this.typeText("I couldn't hear that clearly. Feel free to try again or type below!", true);
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.stopListeningUI();
    };
  }

  toggleListening() {
    if (!this.recognition) {
      this.typeText("Speech recognition is not supported in this browser. You can type in the box below!", true);
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
    } else {
      if (this.synth) this.synth.cancel();
      try {
        this.recognition.start();
      } catch (err) {
        console.warn("Recognition error:", err);
      }
    }
  }

  stopListeningUI() {
    if (this.statusText) this.statusText.textContent = 'Online & Interactive';
    if (this.micBtn) {
      this.micBtn.classList.remove('bg-cyanAccent', 'text-black', 'border-cyanAccent');
      this.micBtn.classList.add('bg-white/5', 'text-gray-300');
    }
    if (this.characterCard) this.characterCard.classList.remove('human-listening-active');
  }

  // ------------------------------------------------------------------------
  // Event Listeners & Interaction Handlers
  // ------------------------------------------------------------------------
  setupEventListeners() {
    if (this.micBtn) {
      this.micBtn.addEventListener('click', () => this.toggleListening());
    }

    if (this.characterCard) {
      this.characterCard.addEventListener('click', () => {
        this.speak(this.knowledgeBase.greeting);
        this.typeText(this.knowledgeBase.greeting, false);
      });
    }

    this.chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        const queryType = e.currentTarget.getAttribute('data-query');
        this.handleChipClick(queryType);
      });
    });

    if (this.chatForm) {
      this.chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = this.userInput.value.trim();
        if (text) {
          this.handleQuery(text);
          this.userInput.value = '';
        }
      });
    }
  }

  handleChipClick(type) {
    let answer = "";
    switch (type) {
      case 'skills':
        answer = this.knowledgeBase.skills;
        break;
      case 'projects':
        answer = this.knowledgeBase.projects;
        break;
      case 'education':
        answer = this.knowledgeBase.education;
        break;
      case 'resume':
        answer = this.knowledgeBase.resume;
        break;
      case 'contact':
        answer = this.knowledgeBase.contact;
        break;
      default:
        answer = this.knowledgeBase.greeting;
        break;
    }
    this.typeText(answer, true);
  }

  handleQuery(query) {
    const q = query.toLowerCase();
    let response = "";

    if (q.includes('skill') || q.includes('stack') || q.includes('java') || q.includes('spring') || q.includes('python') || q.includes('react') || q.includes('sql') || q.includes('api')) {
      response = this.knowledgeBase.skills;
    } else if (q.includes('project') || q.includes('work') || q.includes('built') || q.includes('app') || q.includes('github')) {
      response = this.knowledgeBase.projects;
    } else if (q.includes('college') || q.includes('education') || q.includes('ips') || q.includes('degree') || q.includes('batch') || q.includes('study')) {
      response = this.knowledgeBase.education;
    } else if (q.includes('experience') || q.includes('intern') || q.includes('job') || q.includes('role')) {
      response = this.knowledgeBase.experience;
    } else if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
      response = this.knowledgeBase.resume;
    } else if (q.includes('contact') || q.includes('email') || q.includes('linkedin') || q.includes('hire') || q.includes('reach')) {
      response = this.knowledgeBase.contact;
    } else if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('who are you')) {
      response = this.knowledgeBase.greeting;
    } else {
      response = `Thanks for asking! I'm Ayush Jawane, a Java Full Stack Developer focusing on Spring Boot, Microservices, and AI/ML. You can explore my featured projects below or email me directly at ayush.jawane27@gmail.com!`;
    }

    this.typeText(response, true);
  }

  typeText(text, autoSpeak = true) {
    if (this.typingInterval) clearInterval(this.typingInterval);
    if (!this.speechBubble) return;

    this.speechBubble.textContent = '';
    let i = 0;
    const speed = 18;

    this.typingInterval = setInterval(() => {
      if (i < text.length) {
        this.speechBubble.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(this.typingInterval);
        this.typingInterval = null;
      }
    }, speed);

    if (autoSpeak && !this.isMuted) {
      this.speak(text);
    }
  }

  // ------------------------------------------------------------------------
  // 3D Parallax Tilt Following Mouse
  // ------------------------------------------------------------------------
  setupParallaxTilt() {
    window.addEventListener('mousemove', (e) => {
      if (!this.characterWrapper) return;
      const rect = this.characterWrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);

      const maxTilt = 8;
      const rotY = Math.max(-maxTilt, Math.min(maxTilt, dx * maxTilt));
      const rotX = Math.max(-maxTilt, Math.min(maxTilt, -dy * maxTilt));

      this.characterWrapper.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    window.addEventListener('mouseleave', () => {
      if (this.characterWrapper) {
        this.characterWrapper.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      }
    });
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.humanCharacter = new HumanCharacterController();
});
