/**
 * STUDARA – AI-Powered Learning Guidance Platform
 * Copyright © 2026 STUDARA. All rights reserved.
 */

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen, Cpu, Zap, LogOut, User, Search, Play, Award,
  Bookmark, Menu, X, MoreVertical, ArrowLeft, CheckCircle,
  ChevronDown, ChevronUp, Mail, Phone, School, Star, Users, Layers, Gift
} from "lucide-react";

// --- Types ---
interface UserData { name: string; email: string; }
interface Video { id: string; title: string; description: string; thumbnail: string; badge: "Top 1" | "Top 2" | "Top 3"; }
interface ToastMsg { text: string; type: "success" | "error"; }

// --- Toast ---
const Toast = ({ msg, onDone }: { msg: ToastMsg; onDone: () => void }) => {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
      className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-white text-sm font-medium backdrop-blur-xl border ${
        msg.type === "success" ? "bg-green-600/80 border-green-400/30" : "bg-red-600/80 border-red-400/30"
      }`}>
      <CheckCircle size={18} />{msg.text}
    </motion.div>
  );
};

// --- About Page ---
const AboutPage = ({ onNavigate }: { onNavigate: (p: string) => void }) => (
  <div className="min-h-screen pt-32 px-4 max-w-5xl mx-auto pb-20">
    <button onClick={() => onNavigate("home")} className="text-white/60 hover:text-white flex items-center gap-2 mb-10 transition-colors"><ArrowLeft size={20}/>Back to Home</button>
    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
      <h1 className="text-5xl font-bold mb-4">About <span className="text-red-500">STUDARA</span></h1>
      <p className="text-white/60 text-lg mb-12 max-w-2xl">STUDARA (Smart Tutorial & Unified Data-driven Academic Resource Advisor) is an AI-powered academic guidance platform that helps students discover the best curated video resources for any subject, class, and topic — instantly and for free.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: <BookOpen className="text-red-500" size={28}/>, title:"Our Mission", desc:"To democratize quality education by giving every student — regardless of location or background — access to AI-curated, expert-verified learning resources tailored to their exact academic needs." },
          { icon: <Cpu className="text-red-500" size={28}/>, title:"How It Works", desc:"Students select their class level, subject, and specific topic. STUDARA's AI engine (powered by Google Gemini) then searches, ranks, and surfaces the top 3 most educationally impactful YouTube videos." },
          { icon: <Zap className="text-red-500" size={28}/>, title:"Our Vision", desc:"A future where every student has access to a personalized AI learning companion — one that adapts content to each learner's level and guides them from foundational understanding to mastery." }
        ].map((c,i) => (
          <div key={i} className="glass-card p-6">
            <div className="mb-4">{c.icon}</div>
            <h3 className="text-xl font-bold mb-2">{c.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 mb-16">
        <h2 className="text-2xl font-bold mb-4">Platform Overview</h2>
        <p className="text-white/60 leading-relaxed mb-4">STUDARA addresses a critical gap in digital education: while thousands of high-quality educational videos exist online, students struggle to identify the most relevant and effective ones for their specific syllabus. STUDARA bridges this gap using large language model AI to analyse, score, and rank video content based on educational value, topic relevance, and curriculum alignment.</p>
        <p className="text-white/60 leading-relaxed">The system currently supports Class 9 through Undergraduate levels across 14 subjects, with a personalized Watch Later system, user profiles, and a secure authentication layer — making it a complete academic companion application.</p>
      </div>

      <h2 className="text-3xl font-bold mb-6">Technology Stack</h2>
      <div className="flex flex-wrap gap-3 mb-16">
        {["React 19","TypeScript","Vite 6","Tailwind CSS v4","Framer Motion","Google Gemini AI","Express.js","SQLite","Node.js","Lucide React"].map(t=>(
          <span key={t} className="px-4 py-2 glass-card text-sm font-medium text-red-400 border border-red-500/20">{t}</span>
        ))}
      </div>

    </motion.div>
  </div>
);

// --- Help / FAQ Page ---
const HelpPage = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  const [open, setOpen] = useState<number|null>(null);
  const faqs = [
    { q:"How does STUDARA recommend videos?", a:"STUDARA uses Google's Gemini AI to search and rank YouTube videos based on your selected class, subject, and topic. The AI scores each video for relevance, quality, and educational value." },
    { q:"Is STUDARA free to use?", a:"Yes! STUDARA is completely free for all students. Simply register an account and start getting personalised recommendations immediately." },
    { q:"What subjects are supported?", a:"We currently support Mathematics, Physics, Chemistry, Biology, Computer Science, Social Studies, English, and History across Class 10–12 and Undergraduate levels." },
    { q:"How do I save a video for later?", a:"On the recommendations page, click the 'Save to Watch Later' button below any video card. Access your saved videos from the Dashboard or via your profile menu." },
    { q:"Can I use STUDARA on mobile?", a:"Absolutely. STUDARA is fully responsive and works on all screen sizes — phones, tablets, and desktops." },
    { q:"How do I reset my password?", a:"Click 'Forgot Password?' on the Login page and enter your registered email. A reset link will be sent (feature active after backend launch)." },
  ];
  return (
    <div className="min-h-screen pt-32 px-4 max-w-3xl mx-auto pb-20">
      <button onClick={() => onNavigate("home")} className="text-white/60 hover:text-white flex items-center gap-2 mb-10 transition-colors"><ArrowLeft size={20}/>Back</button>
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
        <h1 className="text-5xl font-bold mb-3">Help & <span className="text-red-500">FAQ</span></h1>
        <p className="text-white/60 mb-10">Common questions about STUDARA answered below.</p>
        <div className="space-y-3">
          {faqs.map((f,i)=>(
            <div key={i} className="glass-card overflow-hidden">
              <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex items-center justify-between px-6 py-5 text-left" aria-expanded={open===i}>
                <span className="font-semibold">{f.q}</span>
                {open===i ? <ChevronUp size={18} className="text-red-500 shrink-0"/> : <ChevronDown size={18} className="text-white/40 shrink-0"/>}
              </button>
              <AnimatePresence>
                {open===i && (
                  <motion.div initial={{ height:0 }} animate={{ height:"auto" }} exit={{ height:0 }} className="overflow-hidden">
                    <p className="px-6 pb-5 text-white/60 text-sm leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// --- Forgot Password Page ---
const ForgotPasswordPage = ({ onNavigate }: { onNavigate: (p:string)=>void }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md mb-4">
        <button onClick={()=>onNavigate("login")} className="text-white/60 hover:text-white flex items-center gap-2 transition-colors"><ArrowLeft size={20}/>Back to Login</button>
      </div>
      <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="glass-card p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-center">Reset Password</h2>
        <p className="text-white/50 text-sm text-center mb-8">Enter your email and we'll send a reset link.</p>
        {!sent ? (
          <form onSubmit={e=>{e.preventDefault();setSent(true);}} className="space-y-5">
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-white/60 mb-2">Email Address</label>
              <input id="reset-email" type="email" className="input-field" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required/>
            </div>
            <button type="submit" className="btn-primary w-full py-4">Send Reset Link</button>
          </form>
        ) : (
          <div className="text-center py-6">
            <CheckCircle className="text-green-400 mx-auto mb-4" size={48}/>
            <p className="text-green-400 font-semibold">Reset link sent!</p>
            <p className="text-white/50 text-sm mt-2">If <span className="text-white">{email}</span> is registered, check your inbox.</p>
            <button onClick={()=>onNavigate("login")} className="btn-primary mt-6">Back to Login</button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// --- Profile Page ---
const ProfilePage = ({ user, onNavigate }: { user: UserData; onNavigate: (p:string)=>void }) => {
  const reg = JSON.parse(localStorage.getItem("studara_registered_user") || "{}");
  const [name, setName] = useState(user.name);
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    const updated = { ...reg, name };
    localStorage.setItem("studara_registered_user", JSON.stringify(updated));
    localStorage.setItem("studara_user", JSON.stringify({ name, email: user.email }));
    setSaved(true); setTimeout(()=>setSaved(false),2000);
  };
  return (
    <div className="min-h-screen pt-32 px-4 max-w-3xl mx-auto pb-20">
      <button onClick={()=>onNavigate("dashboard")} className="text-white/60 hover:text-white flex items-center gap-2 mb-10 transition-colors"><ArrowLeft size={20}/>Dashboard</button>
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
        <h1 className="text-4xl font-bold mb-8">My Profile</h1>
        <div className="glass-card p-8 mb-6">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center"><User className="text-red-500" size={28}/></div>
            <div><p className="font-bold text-xl">{user.name}</p><p className="text-white/50 text-sm">{user.email}</p></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="profile-name" className="block text-sm font-medium text-white/60 mb-2">Full Name</label>
              <input id="profile-name" className="input-field" value={name} onChange={e=>setName(e.target.value)}/>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
              <input className="input-field opacity-50" value={user.email} disabled/>
            </div>
            {reg.phone && <div><label className="block text-sm font-medium text-white/60 mb-2">Phone</label><input className="input-field opacity-50" value={reg.phone} disabled/></div>}
            {reg.school && <div><label className="block text-sm font-medium text-white/60 mb-2">School / College</label><input className="input-field opacity-50" value={reg.school} disabled/></div>}
          </div>
          <button onClick={handleSave} className="btn-primary mt-6">{saved?"Saved ✓":"Save Changes"}</button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[{label:"Topics Explored",val:"12"},{label:"Videos Saved",val:"5"},{label:"Sessions",val:"8"}].map(s=>(
            <div key={s.label} className="glass-card p-5 text-center"><p className="text-3xl font-bold text-red-500">{s.val}</p><p className="text-white/50 text-xs mt-1">{s.label}</p></div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// --- Watch Later Page ---
const WatchLaterPage = ({ videos, onRemove, onNavigate }: { videos: Video[]; onRemove:(id:string)=>void; onNavigate:(p:string)=>void }) => (
  <div className="min-h-screen pt-32 px-4 max-w-7xl mx-auto pb-20">
    <button onClick={()=>onNavigate("dashboard")} className="text-white/60 hover:text-white flex items-center gap-2 mb-10 transition-colors"><ArrowLeft size={20}/>Dashboard</button>
    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
      <h1 className="text-4xl font-bold mb-8">Watch Later</h1>
      {videos.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <Bookmark className="text-white/20 mx-auto mb-4" size={48}/>
          <p className="text-white/40">No saved videos yet. Browse recommendations and save your favourites!</p>
          <button onClick={()=>onNavigate("selection")} className="btn-primary mt-6">Find Videos</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map(v=>(
            <div key={v.id} className="glass-card overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer"/>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform" aria-label="Play video"><Play fill="currentColor" size={20}/></a>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold mb-3 line-clamp-2">{v.title}</h3>
                <button onClick={()=>onRemove(v.id)} className="w-full py-2 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/10 transition-colors text-sm">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  </div>
);

// --- Components ---

const Navbar = ({ user, onLogout, onNavigate }: { user: UserData | null; onLogout: () => void; onNavigate: (page: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center gap-3 cursor-pointer group hover:scale-105 transition-transform duration-300" 
            onClick={() => onNavigate("home")}
            role="link"
            aria-label="STUDARA Home"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <img src="/logo.png" alt="STUDARA Logo" className="h-full w-full object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <Search className="absolute text-red-500 group-hover:text-red-400 transition-colors" size={24} />
            </div>
            <span className="text-3xl font-bold tracking-tighter text-red-500 group-hover:text-red-400 transition-colors">STUDARA</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => onNavigate("home")} className="hover:text-red-500 transition-colors">Home</button>
              <button onClick={() => onNavigate("about")} className="hover:text-red-500 transition-colors">About</button>
              <button onClick={() => onNavigate("help")} className="hover:text-red-500 transition-colors">Help</button>
              {user ? (
                <>
                  <button onClick={() => onNavigate("dashboard")} className="flex items-center gap-2 hover:text-red-500 transition-colors">
                    <User size={18} /> {user.name}
                  </button>
                  <button onClick={onLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => onNavigate("login")} className="hover:text-red-500 transition-colors">Login</button>
                  <button onClick={() => onNavigate("register")} className="btn-primary py-2 px-6 text-sm">Register</button>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 border-b border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => { onNavigate("home"); setIsOpen(false); }} className="block w-full text-left px-3 py-2 hover:bg-red-500/20">Home</button>
              <button onClick={() => { onNavigate("about"); setIsOpen(false); }} className="block w-full text-left px-3 py-2 hover:bg-red-500/20">About</button>
              <button onClick={() => { onNavigate("help"); setIsOpen(false); }} className="block w-full text-left px-3 py-2 hover:bg-red-500/20">Help</button>
              {user ? (
                <>
                  <button onClick={() => { onNavigate("dashboard"); setIsOpen(false); }} className="block w-full text-left px-3 py-2 hover:bg-red-500/20">Dashboard</button>
                  <button onClick={() => { onLogout(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-red-400">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => { onNavigate("login"); setIsOpen(false); }} className="block w-full text-left px-3 py-2 hover:bg-red-500/20">Login</button>
                  <button onClick={() => { onNavigate("register"); setIsOpen(false); }} className="block w-full text-left px-3 py-2 hover:bg-red-500/20">Register</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HomePage = ({ onNavigate, user }: { onNavigate: (page: string) => void; user: UserData | null }) => (
  <div className="pt-20">
    {/* Hero Section */}
    <section className="relative h-[90vh] flex items-center justify-center text-center px-4">
      <div className="glow-center" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl z-10"
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
          Empowering Smart Learning
        </h1>
        <p className="text-xl md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto">
          Your personalized academic & skill guidance platform powered by intelligent content curation.
        </p>
        <div className="flex justify-center gap-4">
          {user ? (
            <button onClick={() => onNavigate("dashboard")} className="btn-primary text-lg">Go to Dashboard</button>
          ) : (
            <button onClick={() => onNavigate("login")} className="btn-primary text-lg">Get Started</button>
          )}
        </div>
      </motion.div>
    </section>

    {/* Features Section */}
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <BookOpen className="text-red-500" size={32} />, title: "Structured Curriculum", desc: "Follow a clear path designed for your academic success." },
          { icon: <Cpu className="text-red-500" size={32} />, title: "AI Assistance", desc: "Get smart recommendations tailored to your learning needs." },
          { icon: <Zap className="text-red-500" size={32} />, title: "Skill-Based Learning", desc: "Master practical skills with curated high-quality resources." }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="glass-card p-8 hover:border-red-500/30 transition-all group"
          >
            <div className="mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-white/60 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

const LoginPage = ({ onLogin, onNavigate }: { onLogin: (user: UserData) => void; onNavigate: (page: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const API = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        onLogin({ name: data.user.name, email: data.user.email });
      } else {
        setError(data.error || 'Invalid email or password.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md mb-4">
        <button onClick={() => onNavigate("home")} className="text-white/60 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft size={20} /> Back to Home
        </button>
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Email / Username</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Password</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="btn-primary w-full py-4" disabled={submitting}>
            {submitting ? 'Signing in...' : 'Login'}
          </button>
          <div className="flex justify-between text-sm">
            <button type="button" onClick={() => onNavigate("forgot")} className="text-white/40 hover:text-white transition-colors">Forgot Password?</button>
            <button type="button" onClick={() => onNavigate("register")} className="text-red-500 hover:text-red-400">Create Account</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const RegisterPage = ({ onRegister, onNavigate }: { onRegister: (user: UserData) => void; onNavigate: (page: string) => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setSubmitting(true);
    try {
      const API = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          school: formData.school,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        onRegister({ name: data.user.name, email: data.user.email });
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-12">
      <div className="w-full max-w-2xl mb-4">
        <button onClick={() => onNavigate("home")} className="text-white/60 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft size={20} /> Back to Home
        </button>
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 w-full max-w-2xl"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Join STUDARA</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white/60 mb-2">Full Name</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Phone</label>
            <input 
              type="tel" 
              className="input-field" 
              placeholder="+1 234 567 890"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white/60 mb-2">School / College</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="University of Learning"
              value={formData.school}
              onChange={(e) => setFormData({...formData, school: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Password</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Confirm Password</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm md:col-span-2">{error}</p>}
          <div className="md:col-span-2">
            <button type="submit" className="btn-primary w-full py-4">Register Now</button>
            <p className="mt-4 text-center text-sm text-white/40">
              Already have an account? <button type="button" onClick={() => onNavigate("login")} className="text-red-500 hover:text-red-400">Login</button>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ user, onNavigate }: { user: UserData; onNavigate: (page: string) => void }) => (
  <div className="min-h-screen pt-32 px-4 max-w-7xl mx-auto">
    <div className="mb-8">
      <button onClick={() => onNavigate("home")} className="text-white/60 hover:text-white flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} /> Back to Home
      </button>
    </div>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}!</h1>
      <p className="text-white/60">Ready to continue your learning journey today?</p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="glass-card p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
          <BookOpen className="text-red-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Start Learning</h3>
        <p className="text-white/60 mb-6">Explore new topics and get personalized recommendations.</p>
        <button onClick={() => onNavigate("selection")} className="btn-primary w-full">Explore Topics</button>
      </div>
      
      <div className="glass-card p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
          <User className="text-red-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">My Profile</h3>
        <p className="text-white/60 mb-6">Manage your account settings and learning preferences.</p>
        <button onClick={() => onNavigate("profile")} className="btn-secondary w-full">View Profile</button>
      </div>

      <div className="glass-card p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
          <Bookmark className="text-red-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Watch Later</h3>
        <p className="text-white/60 mb-6">Access your saved videos and continue where you left off.</p>
        <button onClick={() => onNavigate("watchlater")} className="btn-secondary w-full">View Saved</button>
      </div>
    </div>
  </div>
);

const ContentSelection = ({ onGetRecommendations, onNavigate }: { onGetRecommendations: (params: any) => void; onNavigate: (page: string) => void }) => {
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onGetRecommendations({ className, subject, topic });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <div className="w-full max-w-lg mb-4">
        <button onClick={() => onNavigate("dashboard")} className="text-white/60 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">What are we learning?</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Select Class</label>
            <select 
              className="input-field appearance-none" 
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
            >
              <option value="" disabled>Choose your class</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Select Subject</label>
            <select 
              className="input-field appearance-none" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            >
              <option value="" disabled>Choose subject</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology">Biology</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Social Studies">Social Studies</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Enter Topic</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Quantum Mechanics, Calculus..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2">
            <Search size={20} /> Get Recommendations
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const Recommendations = ({ videos, watchLater, onToggleWatchLater, onBack, onLogout, onNavigate, topic, askAI }: {
  videos: Video[]; watchLater: Video[]; onToggleWatchLater: (v: Video) => void;
  onBack: () => void; onLogout: () => void; onNavigate: (page: string) => void;
  topic: string; askAI: (question: string) => Promise<string>;
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [asking, setAsking] = useState(false);

  const handleAsk = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setAsking(true);
    setAnswer("");
    const reply = await askAI(question);
    setAnswer(reply);
    setAsking(false);
  };

  return (
    <div className="min-h-screen pt-32 px-4 max-w-7xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="text-white/60 hover:text-white flex items-center gap-2 transition-colors"><ArrowLeft size={20}/> Back</button>
          <h2 className="text-4xl font-bold">Top Recommendations</h2>
        </div>
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Menu"><MoreVertical size={24}/></button>
          <AnimatePresence>
            {showMenu && (
              <motion.div initial={{ opacity:0, y:10, scale:0.95 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:10, scale:0.95 }} className="absolute right-0 mt-2 w-48 glass-card overflow-hidden z-[60]">
                <div className="py-1">
                  <button onClick={() => { onNavigate("profile"); setShowMenu(false); }} className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-white/10 transition-colors"><User size={16}/> My Profile</button>
                  <button onClick={() => { onNavigate("watchlater"); setShowMenu(false); }} className="flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-white/10 transition-colors"><Bookmark size={16}/> Watch Later</button>
                  <div className="border-t border-white/10 my-1"/>
                  <button onClick={() => { onLogout(); setShowMenu(false); }} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"><LogOut size={16}/> Logout</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {videos.map((video, i) => {
          const isSaved = watchLater.some(v => v.id === video.id);
          return (
            <motion.div key={video.id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.1 }} className="glass-card overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                {playingId === video.id ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <button onClick={() => setPlayingId(video.id)} className="block w-full h-full text-left" aria-label={`Play ${video.title}`}>
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer"/>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"><Play fill="currentColor"/></span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2 ${
                        video.badge==="Top 1" ? "bg-yellow-500 text-black" : video.badge==="Top 2" ? "bg-gray-300 text-black" : "bg-orange-700 text-white"
                      }`}><Award size={14}/> {video.badge}</span>
                    </div>
                  </button>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{video.title}</h3>
                <p className="text-white/50 text-sm mb-6 line-clamp-3">{video.description}</p>
                <button onClick={() => onToggleWatchLater(video)} className={`w-full py-3 border rounded-xl transition-colors flex items-center justify-center gap-2 ${
                  isSaved ? "border-red-500/50 bg-red-500/10 text-red-400" : "border-white/10 hover:bg-white/5"
                }`}><Bookmark size={18} fill={isSaved ? "currentColor" : "none"}/> {isSaved ? "Saved" : "Save to Watch Later"}</button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* AI Assistant Q&A */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.3 }} className="glass-card p-8 mt-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-3"><Cpu className="text-red-500" size={22}/> Ask the AI Assistant</h3>
        <p className="text-white/50 text-sm mb-6">Have a question about {topic || "this topic"}? Ask below.</p>
        <form onSubmit={handleAsk} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            className="input-field flex-1"
            placeholder={`Ask something about ${topic || "the topic"}...`}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button type="submit" disabled={asking} className="btn-primary px-8 disabled:opacity-50">
            {asking ? "Thinking..." : "Ask"}
          </button>
        </form>
        {answer && (
          <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} className="mt-6 p-5 rounded-xl bg-white/5 border border-white/10 text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
            {answer}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState<UserData | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [watchLater, setWatchLater] = useState<Video[]>([]);
  const [toast, setToast] = useState<ToastMsg | null>(null);
  const [lastQuery, setLastQuery] = useState<{ className: string; subject: string; topic: string } | null>(null);

  const API = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

  const showToast = (text: string, type: "success" | "error" = "success") =>
    setToast({ text, type });

  // On mount — check if a valid session cookie exists
  useEffect(() => {
    fetch(`${API}/api/auth/profile`, { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.user) {
          setUser({ name: data.user.name, email: data.user.email });
          // Also load watch later from backend
          fetch(`${API}/api/watchlater`, { credentials: 'include' })
            .then(r => r.json())
            .then(wl => { if (wl?.videos) setWatchLater(wl.videos.map((v: any) => ({ id: v.videoId, title: v.title, thumbnail: v.thumbnail, badge: v.badge, description: '' }))); })
            .catch(() => {});
        }
      })
      .catch(() => {}); // No session — stay logged out
  }, []);

  const toggleWatchLater = async (video: Video) => {
    const exists = watchLater.find(v => v.id === video.id);
    if (exists) {
      await removeFromWatchLater(video.id);
    } else {
      try {
        const res = await fetch(`${API}/api/watchlater`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ videoId: video.id, title: video.title, thumbnail: video.thumbnail, badge: video.badge }),
        });
        if (res.ok) {
          setWatchLater(prev => [...prev, video]);
          showToast('Saved to Watch Later!');
        } else {
          const err = await res.json();
          showToast(err.error || 'Failed to save.', 'error');
        }
      } catch {
        showToast('Network error. Please try again.', 'error');
      }
    }
  };

  const removeFromWatchLater = async (id: string) => {
    try {
      const res = await fetch(`${API}/api/watchlater/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) {
        setWatchLater(prev => prev.filter(v => v.id !== id));
        showToast('Removed from Watch Later');
      }
    } catch {
      showToast('Failed to remove. Please try again.', 'error');
    }
  };

  const handleLogin = (userData: UserData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = async () => {
    await fetch(`${API}/api/auth/logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
    setUser(null);
    setWatchLater([]);
    setCurrentPage('home');
  };

  const fetchRecommendations = async (params: { className: string; subject: string; topic: string }) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/videos/recommend`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (res.ok && data.videos?.length) {
        setVideos(data.videos);
        setLastQuery(params);
        setCurrentPage('recommendations');
      } else {
        showToast(data.message || data.error || 'Could not load recommendations.', 'error');
        setCurrentPage('comingsoon');
      }
    } catch {
      showToast('Network error. Please try again.', 'error');
      setCurrentPage('comingsoon');
    } finally {
      setLoading(false);
    }
  };

  const askAI = async (question: string): Promise<string> => {
    try {
      const context = lastQuery
        ? `The student is a ${lastQuery.className} student studying ${lastQuery.subject}, topic: "${lastQuery.topic}". `
        : '';
      const res = await fetch(`${API}/api/ai/recommend`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `${context}Answer this question simply and clearly, in a few sentences: ${question}` }),
      });
      const data = await res.json();
      if (res.ok && data.recommendation) return data.recommendation;
      return data.error || "Sorry, I couldn't get an answer right now.";
    } catch {
      return 'Network error. Please try again.';
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="particles" />
      <Navbar user={user} onLogout={handleLogout} onNavigate={setCurrentPage} />
      
      <main>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center"
            >
              <div className="w-20 h-20 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin mb-6" />
              <p className="text-xl font-medium text-white/60">Gemini AI is ranking the best resources for you...</p>
            </motion.div>
          ) : (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentPage === "home" && <HomePage onNavigate={setCurrentPage} user={user} />}
              {currentPage === "about" && <AboutPage onNavigate={setCurrentPage} />}
              {currentPage === "help" && <HelpPage onNavigate={setCurrentPage} />}
              {currentPage === "login" && (user ? <Dashboard user={user} onNavigate={setCurrentPage} /> : <LoginPage onLogin={handleLogin} onNavigate={setCurrentPage} />)}
              {currentPage === "register" && (user ? <Dashboard user={user} onNavigate={setCurrentPage} /> : <RegisterPage onRegister={handleLogin} onNavigate={setCurrentPage} />)}
              {currentPage === "forgot" && <ForgotPasswordPage onNavigate={setCurrentPage} />}
              {currentPage === "dashboard" && user && <Dashboard user={user} onNavigate={setCurrentPage} />}
              {currentPage === "profile" && user && <ProfilePage user={user} onNavigate={setCurrentPage} />}
              {currentPage === "selection" && <ContentSelection onGetRecommendations={fetchRecommendations} onNavigate={setCurrentPage} />}
              {currentPage === "recommendations" && (
                <Recommendations
                  videos={videos}
                  watchLater={watchLater}
                  onToggleWatchLater={toggleWatchLater}
                  onBack={() => setCurrentPage("selection")}
                  onLogout={handleLogout}
                  onNavigate={setCurrentPage}
                  topic={lastQuery?.topic || ""}
                  askAI={askAI}
                />
              )}
              {currentPage === "comingsoon" && (
                <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 text-center">
                  <button onClick={() => setCurrentPage("selection")} className="text-white/60 hover:text-white flex items-center gap-2 mb-10 transition-colors self-start max-w-lg mx-auto w-full"><ArrowLeft size={20}/>Back</button>
                  <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="glass-card p-12 max-w-lg w-full">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Cpu className="text-red-500" size={36}/>
                    </div>
                    <h2 className="text-3xl font-bold mb-3">AI Engine <span className="text-red-500">Coming Soon</span></h2>
                    <p className="text-white/50 leading-relaxed mb-6">Our Gemini-powered recommendation engine is currently under development. Once the backend is live, this page will display your personalised top-ranked video resources.</p>
                    <div className="flex flex-col gap-3">
                      <button onClick={() => setCurrentPage("selection")} className="btn-primary w-full">Try Another Topic</button>
                      <button onClick={() => setCurrentPage("dashboard")} className="btn-secondary w-full">Back to Dashboard</button>
                    </div>
                  </motion.div>
                </div>
              )}
              {currentPage === "watchlater" && <WatchLaterPage videos={watchLater} onRemove={removeFromWatchLater} onNavigate={setCurrentPage} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 bg-black/30 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <span className="text-2xl font-bold text-red-500">STUDARA</span>
              <p className="text-white/40 text-sm mt-3 leading-relaxed">AI-powered personalized learning platform empowering students to discover the best educational resources.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white/80">Quick Links</h4>
              <ul className="space-y-2 text-white/40 text-sm">
                {[["Home","home"],["About","about"],["Help","help"],["Register","register"]].map(([l,p])=>(
                  <li key={p}><button onClick={()=>setCurrentPage(p)} className="hover:text-red-400 transition-colors">{l}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white/80">Project Info</h4>
              <ul className="space-y-2 text-white/40 text-sm">
                <li>Academic Research Project</li>
                <li>AI + Education Technology</li>
                <li>Open Source (coming soon)</li>
                <li>© 2026 STUDARA Team</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 text-center">
            <p className="text-white/20 text-xs">© 2026 STUDARA – Empowering Smart Learning. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
