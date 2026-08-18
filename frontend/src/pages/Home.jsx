import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { api } from '../services/api';
import { 
  Sun, Moon, Menu, X, ExternalLink, Mail, Code, 
  GraduationCap, Briefcase, Award, CheckCircle2, Send, ChevronRight, Terminal, BookOpen, Layers
} from 'lucide-react';

const LinkedInIcon = (props) => (
  <svg className={props.className || "w-4 h-4"} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const GitHubIcon = (props) => (
  <svg className={props.className || "w-4 h-4"} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LeetCodeIcon = (props) => (
  <svg className={props.className || "w-4 h-4"} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863 0-.713.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.607-2.636a4.912 4.912 0 00-3.856-1.428c-1.34 0-2.6.522-3.551 1.472l-4.32 4.381c-.95.951-1.472 2.211-1.472 3.551s.522 2.6 1.472 3.551l4.332 4.364c.95.95 2.211 1.472 3.551 1.472 1.34 0 2.6-.522 3.551-1.472l2.607-2.607c.514-.514.496-1.365-.039-1.9-.535-.536-1.386-.553-1.9-.039zM20.811 13.01H10.666c-.733 0-1.328.595-1.328 1.328 0 .733.595 1.328 1.328 1.328h10.145c.733 0 1.328-.595 1.328-1.328 0-.733-.595-1.328-1.328-1.328z"/>
  </svg>
);

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data states
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactStatus, setContactStatus] = useState({ submitting: false, success: null, error: null });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [pRes, sRes, eRes, edRes, cRes, aRes] = await Promise.allSettled([
          api.getProjects(),
          api.getSkills(),
          api.getExperiences(),
          api.getEducation(),
          api.getCertifications(),
          api.getAchievements(),
        ]);

        if (pRes.status === 'fulfilled') setProjects(pRes.value.data?.data || []);
        if (sRes.status === 'fulfilled') setSkills(sRes.value.data?.data || []);
        if (eRes.status === 'fulfilled') setExperiences(eRes.value.data?.data || []);
        if (edRes.status === 'fulfilled') setEducation(edRes.value.data?.data || []);
        if (cRes.status === 'fulfilled') setCertifications(cRes.value.data?.data || []);
        if (aRes.status === 'fulfilled') setAchievements(aRes.value.data?.data || []);
      } catch (err) {
        console.error('Error loading portfolio data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus({ submitting: true, success: null, error: null });
    try {
      await api.sendMessage(contactForm);
      setContactStatus({ submitting: false, success: 'Thank you! Your message has been sent.', error: null });
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const msg = err.response?.data?.error?.message || 'Failed to send message. Please try again.';
      setContactStatus({ submitting: false, success: null, error: msg });
    }
  };

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/himanshu-tripathi-22111a324/',
      icon: LinkedInIcon,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/himanshu07-12',
      icon: GitHubIcon,
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/u/tripathihimanshu/',
      icon: LeetCodeIcon,
    },
    {
      name: 'Email',
      url: 'mailto:tripathihimanshu694@gmail.com',
      icon: Mail,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="font-mono text-xl font-bold text-sky-600 dark:text-sky-400 tracking-tight flex items-center gap-2">
            <Terminal className="w-5 h-5 text-sky-500" />
            <span>Himanshu Tripathi</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-700 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-sky-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:text-sky-400 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
            </button>
            <a
              href="/admin/login"
              className="text-xs px-3 py-1.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              Admin
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 dark:bg-slate-950 dark:border-slate-800 px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-700 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 py-1 text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white py-1"
            >
              Admin Portal
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 border-b border-slate-200 dark:border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 dark:bg-sky-950/80 dark:border-sky-800/60 dark:text-sky-300 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 animate-pulse"></span>
            Available for Engineering Opportunities
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 dark:from-sky-400 dark:to-indigo-400">Himanshu Tripathi</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-normal max-w-2xl mx-auto mb-8 leading-relaxed">
            3rd Year Electronics & Communication Engineering student at ABES Engineering College.
            Full Stack Development Intern at Thiranex, building practical web solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-sky-500/20 flex items-center gap-2"
            >
              View My Work <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-200 font-semibold text-sm transition-all flex items-center gap-2"
            >
              Contact Me
            </a>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-sky-600 hover:border-sky-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:text-sky-400 dark:hover:border-slate-700 transition-all flex items-center gap-2 text-xs font-medium shadow-sm"
                >
                  <Icon className="w-4 h-4 text-sky-500" />
                  <span>{social.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-6 h-6 text-sky-500 dark:text-sky-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">About Me</h2>
          </div>
          <div className="bg-white border border-slate-200/80 shadow-sm dark:bg-slate-900/60 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              I am a passionate third-year Electronics and Communication Engineering (ECE) student at ABES Engineering College, Ghaziabad (affiliated with AKTU). I specialize in Full Stack Web Development, combining hardware-level analytical thinking with modern software craftsmanship.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              Currently serving as a Full Stack Development Intern at Thiranex, I work on database-driven web applications using Node.js, Express, MySQL, Python, Flask, React, and Tailwind CSS.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/60 text-center">
              <div className="p-3 bg-slate-50 dark:bg-slate-950/50 rounded-lg border border-slate-200 dark:border-slate-800/40">
                <span className="block text-xs text-slate-500">Degree</span>
                <span className="text-sm font-semibold text-sky-600 dark:text-sky-300">B.Tech (ECE)</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950/50 rounded-lg border border-slate-200 dark:border-slate-800/40">
                <span className="block text-xs text-slate-500">Year</span>
                <span className="text-sm font-semibold text-sky-600 dark:text-sky-300">3rd Year (2024–28)</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950/50 rounded-lg border border-slate-200 dark:border-slate-800/40">
                <span className="block text-xs text-slate-500">CGPA</span>
                <span className="text-sm font-semibold text-sky-600 dark:text-sky-300">7.5</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-950/50 rounded-lg border border-slate-200 dark:border-slate-800/40">
                <span className="block text-xs text-slate-500">Role</span>
                <span className="text-sm font-semibold text-sky-600 dark:text-sky-300">Intern @ Thiranex</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <Code className="w-6 h-6 text-sky-500 dark:text-sky-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Technical Skills</h2>
          </div>

          {loading ? (
            <div className="text-slate-500 text-sm">Loading skills...</div>
          ) : Object.keys(skillsByCategory).length === 0 ? (
            <div className="text-slate-500 text-sm">No skills added yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(skillsByCategory).map(([category, catSkills]) => (
                <div key={category} className="bg-white border border-slate-200/80 shadow-sm dark:bg-slate-900/60 dark:border-slate-800/80 rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 text-xs font-medium hover:border-sky-400 transition-colors"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <Layers className="w-6 h-6 text-sky-500 dark:text-sky-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Featured Projects</h2>
          </div>

          {loading ? (
            <div className="text-slate-500 text-sm">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-slate-500 text-sm">No projects added yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white border border-slate-200/80 shadow-sm dark:bg-slate-900/60 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                      {project.featured && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-100 border border-sky-200 text-sky-800 dark:bg-sky-950 dark:border-sky-800 dark:text-sky-300">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {project.description || project.shortDescription}
                    </p>
                  </div>
                  <div>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="text-[11px] px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-800">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-3 pt-3 border-t border-slate-200 dark:border-slate-800/60 text-xs">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline">
                          Live Demo <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {project.sourceUrl && (
                        <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:underline">
                          Source Code <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-6 h-6 text-sky-500 dark:text-sky-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Experience</h2>
          </div>

          {loading ? (
            <div className="text-slate-500 text-sm">Loading experience...</div>
          ) : experiences.length === 0 ? (
            <div className="text-slate-500 text-sm">No experience added yet.</div>
          ) : (
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-white border border-slate-200/80 shadow-sm dark:bg-slate-900/60 dark:border-slate-800/80 rounded-xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                      <span className="text-sm text-sky-600 dark:text-sky-400 font-medium">{exp.organization}</span>
                      {exp.location && <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">({exp.location})</span>}
                    </div>
                    {exp.isCurrent ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-300 text-xs font-medium">
                        Ongoing (Aug 2026 – Sept 2026)
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 text-xs font-medium">
                        Jul 2024 – Oct 2024
                      </span>
                    )}
                  </div>
                  {exp.description && <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-6 h-6 text-sky-500 dark:text-sky-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Education</h2>
          </div>

          {loading ? (
            <div className="text-slate-500 text-sm">Loading education...</div>
          ) : education.length === 0 ? (
            <div className="text-slate-500 text-sm">No education added yet.</div>
          ) : (
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="bg-white border border-slate-200/80 shadow-sm dark:bg-slate-900/60 dark:border-slate-800/80 rounded-xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{edu.degree} in {edu.fieldOfStudy}</h3>
                      <p className="text-sm text-sky-600 dark:text-sky-400">{edu.institution} {edu.boardOrUniversity ? `(${edu.boardOrUniversity})` : ''}</p>
                      {edu.location && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{edu.location} • September 2024 – July 2028</p>}
                    </div>
                    <div className="text-right">
                      {edu.cgpa && <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">CGPA: {edu.cgpa}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-6 h-6 text-sky-500 dark:text-sky-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Workshops & Certifications</h2>
          </div>

          {loading ? (
            <div className="text-slate-500 text-sm">Loading certifications...</div>
          ) : certifications.length === 0 ? (
            <div className="text-slate-500 text-sm">No certifications added yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-white border border-slate-200/80 shadow-sm dark:bg-slate-900/60 dark:border-slate-800/80 rounded-xl p-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{cert.title}</h3>
                  {cert.issuer && <p className="text-xs text-sky-600 dark:text-sky-400 mb-1">{cert.issuer}</p>}
                  {cert.description && <p className="text-xs text-slate-500 dark:text-slate-400">{cert.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 className="w-6 h-6 text-sky-500 dark:text-sky-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Achievements</h2>
          </div>

          {loading ? (
            <div className="text-slate-500 text-sm">Loading achievements...</div>
          ) : achievements.length === 0 ? (
            <div className="text-slate-500 text-sm">No achievements added yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((ach) => (
                <div key={ach.id} className="bg-white border border-slate-200/80 shadow-sm dark:bg-slate-900/60 dark:border-slate-800/80 rounded-xl p-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-100 text-sky-600 border border-sky-200 dark:bg-sky-950 dark:text-sky-400 dark:border-sky-800 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{ach.title}</h3>
                    {ach.organization && <p className="text-xs text-slate-500 dark:text-slate-400">{ach.organization}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Mail className="w-6 h-6 text-sky-500 dark:text-sky-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Get In Touch</h2>
          </div>

          {/* Social Links in Contact */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-sky-600 hover:border-sky-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:text-sky-400 dark:hover:border-slate-700 transition-all flex items-center gap-2 text-xs font-medium shadow-sm"
                >
                  <Icon className="w-4 h-4 text-sky-500" />
                  <span>{social.name}</span>
                </a>
              );
            })}
          </div>

          <form onSubmit={handleContactSubmit} className="bg-white border border-slate-200/80 shadow-sm dark:bg-slate-900/60 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
            {contactStatus.success && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/80 dark:border-emerald-800 dark:text-emerald-300 text-sm">
                {contactStatus.success}
              </div>
            )}
            {contactStatus.error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 dark:bg-rose-950/80 dark:border-rose-800 dark:text-rose-300 text-sm">
                {contactStatus.error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500 text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Your Email *</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500 text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Subject</label>
              <input
                type="text"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500 text-sm"
                placeholder="Inquiry / Feedback"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-400 mb-1">Message *</label>
              <textarea
                required
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500 text-sm"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              disabled={contactStatus.submitting}
              className="w-full py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> {contactStatus.submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-500 border-t border-slate-200 dark:border-slate-900">
        <div className="max-w-5xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Himanshu Tripathi. Built for Thiranex Internship Evaluation.</p>
        </div>
      </footer>
    </div>
  );
}
