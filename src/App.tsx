import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BIBLE_KEYWORDS, detectKeywords } from './lib/keywords';
import { 
  BarChart3, 
  MessageSquare, 
  Mail, 
  Heart, 
  CircleDollarSign, 
  CloudSun, 
  Calendar, 
  Menu, 
  X,
  ChevronRight,
  Cross,
  Mic2,
  BookOpen,
  Users,
  Bell,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  AlertTriangle,
  Sun,
  LayoutDashboard,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Video,
  Globe,
  FileText,
  Share2
} from 'lucide-react';

// --- Types ---
type View = 'landing' | 'app';
type Tab = 'live' | 'transcript' | 'chat' | 'email' | 'care' | 'giving' | 'news';

// --- Components ---

const Navbar = ({ onOpenApp, onViewChange }: { onOpenApp: () => void, onViewChange: (view: View) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    onViewChange('landing');
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[300] h-[62px] flex items-center justify-between px-9 bg-navy/94 border-b border-gold/10 backdrop-blur-xl">
      <div 
        className="flex items-center gap-3 cursor-pointer group" 
        onClick={() => {
          onViewChange('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <div className="relative w-9 h-9 flex-shrink-0">
          <div className="absolute left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-gold to-gold-bright rounded-sm" />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-gold to-gold-bright rounded-sm" />
        </div>
        <div>
          <span className="font-serif text-xl font-bold text-gold-bright tracking-wide block">SermonIQ</span>
          <span className="text-[8px] tracking-[0.18em] uppercase text-gold/50 -mt-0.5">Ministry Intelligence</span>
        </div>
      </div>

      <button className="md:hidden p-2 text-gold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <ul className="hidden md:flex items-center gap-1 list-none">
        {['Features', 'Community', 'Accessibility', 'Pricing'].map((item) => (
          <li key={item}>
            <button 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="px-4 py-3 rounded-md text-[12px] text-ivory/30 hover:text-gold-bright hover:bg-gold/5 transition-colors cursor-pointer"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      <div className="hidden md:flex items-center gap-2">
        <button 
          onClick={() => {
            onViewChange('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-5 py-2.5 text-[13px] text-gold-soft hover:text-gold-bright hover:bg-gold/5 transition-all rounded-md"
        >
          Home
        </button>
        <button 
          onClick={onOpenApp}
          className="px-6 py-3 bg-gold hover:bg-gold-bright text-navy font-semibold text-[13px] rounded-md transition-all flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg hover:shadow-gold/20"
        >
          Open Dashboard <ChevronRight size={16} />
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[62px] left-0 right-0 bg-navy/98 p-4 flex flex-col gap-3 md:hidden shadow-2xl border-b border-gold/10"
          >
            {['Features', 'Community', 'Accessibility', 'Pricing'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="p-3 text-left text-ivory/70 hover:bg-gold/10 rounded-md"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => { onViewChange('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }}
              className="p-3 text-left hover:bg-gold/10 rounded-md"
            >
              Home
            </button>
            <button 
              onClick={() => { onOpenApp(); setIsMenuOpen(false); }}
              className="p-3 bg-gold text-navy font-semibold rounded-md flex items-center justify-center gap-2"
            >
              Open Dashboard <ChevronRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onOpenApp }: { onOpenApp: () => void }) => {
  return (
    <section className="min-h-screen flex items-center pt-24 px-9 pb-18 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_28%,rgba(196,144,10,0.08)_0%,transparent_62%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-3.5 py-1 text-[10px] font-semibold tracking-wider uppercase text-gold-soft mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
            SermonIQ v3 — All 15 Modules Live
          </div>
          
          <h1 className="font-serif text-[clamp(46px,5.5vw,74px)] font-bold text-ivory leading-[1.04] mb-5">
            The church that <br />
            <span className="italic text-gold-bright">knows its people</span> <br />
            changes its city.
          </h1>
          
          <p className="text-xl text-ivory/60 leading-relaxed font-light max-w-[530px] mb-9">
            Real-time sermon intelligence, anonymous community support, personalized pastoral care, daily devotional automation, integrated giving, and Christian news alerts — built so every member feels heard.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-10">
            <button 
              onClick={onOpenApp}
              className="px-8 py-4 bg-gold hover:bg-gold-bright text-navy font-semibold text-base rounded-md transition-all flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-xl hover:shadow-gold/20"
            >
              Open Live Dashboard <ChevronRight size={20} />
            </button>
            <button className="px-6 py-4 border border-ivory/20 hover:border-ivory/50 text-ivory font-semibold text-base rounded-md transition-all">
              Watch Demo
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[Cross, Mic2, BookOpen, Users].map((Icon, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-navy bg-navy-muted flex items-center justify-center text-gold-soft text-[10px] font-bold">
                  <Icon size={12} />
                </div>
              ))}
            </div>
            <p className="text-[11px] text-ivory/20">
              Trusted by <strong className="text-gold-soft">2,400+ churches</strong> across 38 states
            </p>
          </div>
        </motion.div>

        <motion.aside 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block bg-navy-light/90 border border-gold/20 rounded-2xl p-5 relative overflow-hidden backdrop-blur-md shadow-2xl"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
          
          <div className="flex items-center justify-between mb-4">
            <div className="text-[9px] tracking-widest uppercase text-gold font-bold">Live Service Monitor</div>
            <div className="flex items-center gap-1.5 bg-green-950/40 border border-green-500/30 rounded-full px-2.5 py-1 text-[8px] font-bold text-green-400 tracking-wider">
              <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse-dot" />
              LIVE
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-[10px] text-ivory/20">Congregation Engagement</span>
              <span className="font-serif text-3xl font-bold text-gold-bright">81</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "81%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-gold to-gold-bright rounded-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { label: 'Amen', color: 'text-gold-bright', value: 47 },
              { label: 'Alleluia', color: 'text-green-400', value: 21 },
              { label: 'Glory', color: 'text-amber-500', value: 13 },
              { label: 'Preach!', color: 'text-purple-400', value: 9 },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/5 rounded-lg p-2 flex items-center justify-between">
                <span className="text-[10px] text-ivory/60">{stat.label}</span>
                <span className={`font-mono text-xs font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="bg-gold/5 border border-gold/10 rounded-lg p-3">
            <div className="text-[8px] tracking-widest uppercase text-gold font-bold mb-1">✦ Active Verse</div>
            <p className="font-serif text-xs italic text-ivory leading-relaxed mb-1 italic">
              \"Fear not, for I am with you; be not dismayed…\"
            </p>
            <div className="text-[10px] text-gold font-bold">— Isaiah 41:10 · ESV</div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
};

const Features = ({ onOpenApp }: { onOpenApp: (tab?: Tab) => void }) => {
  const features: { icon: string, title: string, desc: string, tab?: Tab }[] = [
    { icon: '🎙️', title: 'Live Transcription', desc: 'Real-time speech-to-text with shareable live caption link for inclusivity.', tab: 'transcript' },
    { icon: '🔥', title: 'Response Detection', desc: 'Capture Amens, Alleluias, and emotional peaks to score sermon impact.', tab: 'live' },
    { icon: '📖', title: 'Scripture Intelligence', desc: 'AI matching of sermon themes to relevant verses across multiple translations.', tab: 'live' },
    { icon: '🫶', title: 'Anonymous Community', desc: 'Safe spaces for members to share burdens without judgment or exposure.', tab: 'chat' },
    { icon: '💌', title: 'Daily Devotionals', desc: 'Automated week-day content built directly from your Sunday message.', tab: 'email' },
    { icon: '💰', title: 'Integrated Giving', desc: 'Embedded giving flows in every care track and community communication.', tab: 'giving' }
  ];

  return (
    <section id="features" className="bg-page py-24 px-9">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.22em] uppercase text-gold mb-3">
          <span className="text-[8px]">✦</span> 15 Modules · Complete Ministry Intelligence
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-navy font-bold leading-tight mb-3">
          Everything a pastor needs <br /> to <span className="italic text-gold">serve their people</span>
        </h2>
        <p className="text-lg text-navy/60 font-light max-w-xl mb-12 leading-relaxed">
          From the first Amen to the daily devotional — SermonIQ captures, responds to, and strengthens every dimension of ministry.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div 
              key={i} 
              onClick={() => onOpenApp(f.tab)}
              className="group bg-white border border-gold/15 p-8 rounded-xl hover:shadow-xl hover:shadow-navy/5 hover:-translate-y-1 transition-all relative overflow-hidden cursor-pointer"
            >
              <div className="w-12 h-12 bg-gold/10 border border-gold/20 rounded-md flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-navy mb-3">{f.title}</h3>
              <p className="text-sm text-navy/50 font-light leading-relaxed">{f.desc}</p>
              <div className="absolute bottom-4 right-4 text-[9px] font-bold text-gold uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Open Module <ArrowRight size={10} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-gold-bright scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DashboardTab = ({ active, label, icon: Icon, onClick }: { active: boolean, label: string, icon: any, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-5 py-4 text-[13px] transition-all border-l-4 w-full text-left font-sans ${active ? 'bg-gold/10 text-gold-bright border-gold font-medium' : 'text-ivory/30 border-transparent hover:bg-gold/5 hover:text-ivory'}`}
  >
    <Icon size={16} className={active ? 'opacity-100' : 'opacity-70'} />
    {label}
  </button>
);

const KPICard = ({ label, value, trend, trendUp, color }: { label: string, value: string, trend: string, trendUp: boolean, color: string }) => (
  <div className="bg-navy-light/70 border border-white/5 rounded-2xl p-5 relative overflow-hidden">
    <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${color}`} />
    <div className="font-mono text-[10px] uppercase tracking-wider text-ivory/20 mb-2">{label}</div>
    <div className="font-serif text-4xl font-bold mb-1">{value}</div>
    <div className={`text-[12px] flex items-center gap-1 ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
      {trendUp ? '↑' : '↓'} {trend}
    </div>
  </div>
);

// --- Main App Component ---

const Community = () => {
  return (
    <section id="community" className="bg-navy-light/40 py-24 px-9 border-t border-gold/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.22em] uppercase text-gold-soft mb-3">
          <span className="text-[8px]">✦</span> Anonymous Community Support
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-ivory font-bold leading-tight mb-3">
          A safe space for every <br /> <span className="italic text-gold-bright">burden too heavy to name</span>
        </h2>
        <p className="text-lg text-ivory/50 font-light max-w-xl mb-12 leading-relaxed">
          The anonymous chat removes the barrier between isolation and community, allowing members to share silently.
        </p>

        <div className="bg-navy-light/80 border border-gold/10 p-8 rounded-3xl max-w-2xl mx-auto shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center text-xl">🤝</div>
             <div>
                <div className="font-serif text-lg font-bold">Community Support · Grace Fellowship</div>
                <div className="text-[10px] text-gold/40">Anonymous · Safe · Moderated · Pastor-aware</div>
             </div>
          </div>
          <div className="space-y-4 mb-6">
             {[
                { cat: 'Prayer Request', text: '"Please pray for my father who is in the hospital. I just need to know God is still with us."', color: 'border-gold' },
                { cat: 'Struggling', text: '"I lost my job last month and I haven\'t told anyone. Coming to church is the only thing keeping me going."', color: 'border-purple-400' },
                { cat: 'Praise Report', text: '"God came through. After 8 months, I got the job. Thank you anonymous prayer partners!"', color: 'border-green-400' }
             ].map((msg, i) => (
                <div key={i} className={`bg-white/5 p-5 rounded-xl border-l-[3px] ${msg.color}`}>
                   <div className="text-[9px] font-bold tracking-widest uppercase mb-1.5 opacity-60">{msg.cat}</div>
                   <p className="text-sm italic leading-relaxed text-ivory/80">{msg.text}</p>
                </div>
             ))}
          </div>
          <div className="bg-gold/5 border border-gold/10 p-4 rounded-xl text-[11px] text-ivory/40 leading-relaxed italic">
             <span className="text-gold-bright font-bold">Pastor's Community Pulse:</span> 12 posts about financial pressure this week. <br /> Identity protected. Direct sermon prep input.
          </div>
        </div>
      </div>
    </section>
  );
};

const Accessibility = () => {
  const items = [
    { icon: '👁️', title: 'Visual Impairment', desc: 'Screen reader compatible with ARIA live regions and high-contrast modes.' },
    { icon: '👂', title: 'Deaf / Hard of Hearing', desc: 'Live caption companion link for real-time accessibility on any device.' },
    { icon: '🤲', title: 'Motor Impairment', desc: '48px touch targets and full keyboard navigation with visible focus states.' },
    { icon: '🔒', title: 'Anonymous Privacy', desc: 'Zero identity linkage database-level encryption for complete privacy.' }
  ];

  return (
    <section id="accessibility" className="bg-navy py-24 px-9 border-t border-gold/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.22em] uppercase text-gold-soft mb-3">
          <span className="text-[8px]">✦</span> Congregation Inclusion
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-ivory font-bold leading-tight mb-3">
          Built for <span className="italic text-gold-bright">every member</span> <br /> of your congregation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 mt-12">
          {items.map((item, i) => (
            <div key={i} className="bg-white/5 border border-gold/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h4 className="font-serif text-lg font-bold mb-2">{item.title}</h4>
              <p className="text-xs text-ivory/40 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gold/5 border border-gold/20 p-8 rounded-2xl">
           <p className="text-sm text-ivory/60 leading-relaxed max-w-3xl">
             <strong className="text-gold-bright">Accessibility is not a feature add-on.</strong> It is a core requirement of every screen. A product that captures the Amens of Deaf, blind, and cognitively impaired congregation members but cannot serve them is a product that has failed its mission.
           </p>
        </div>
      </div>
    </section>
  );
};

const LiveTranscription = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [language, setLanguage] = useState('en-US');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isRecordingScreen, setIsRecordingScreen] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recognitionRef = useRef<any>(null);

  const languages = [
    { code: 'en-US', label: 'English', target: 'en' },
    { code: 'en-US', label: 'English to French', target: 'fr' },
    { code: 'en-US', label: 'English to Spanish', target: 'es' },
    { code: 'en-US', label: 'English to Creole', target: 'ht' }
  ];

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language;

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        
        if (event.results[event.results.length - 1].isFinal) {
          setTranscript(prev => [currentTranscript, ...prev].slice(0, 50));
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        if (isListening) recognition.start();
      };

      recognitionRef.current = recognition;
    }
  }, [language, isListening]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript([]);
      recognitionRef.current?.start();
    }
    setIsListening(!isListening);
  };

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ 
        video: true, 
        audio: true 
      });
      setVideoStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsRecordingScreen(true);
      
      stream.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };
    } catch (err) {
      console.error("Error sharing screen:", err);
    }
  };

  const stopScreenShare = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
    }
    setVideoStream(null);
    setIsRecordingScreen(false);
  };

  const getTranslationNote = () => {
    if (targetLanguage === 'en') return null;
    const langNames: Record<string, string> = { fr: 'French', es: 'Spanish', ht: 'Creole' };
    return `Simulated AI Translation to ${langNames[targetLanguage]} active...`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-ivory">Live Transcription & Video</h2>
          <p className="font-mono text-xs text-ivory/30 mt-1">Real-time STT · Multi-language translation · Live Caption Bridge</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-5 py-2 bg-gold/10 border border-gold/20 text-gold-soft hover:bg-gold/20 font-bold text-[11px] rounded-md transition-all flex items-center justify-center gap-2">
            <Share2 size={14} /> Share Caption Link
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black/60 border border-gold/10 rounded-2xl overflow-hidden aspect-video relative group">
            {!isRecordingScreen ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-navy-light/20 backdrop-blur-sm">
                <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                  <Video size={32} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-ivory mb-2">Live Stream Source</h3>
                <p className="text-sm text-ivory/40 max-w-sm mb-8 leading-relaxed">Connect your church's video feed or share your screen to generate live synchronized captions for your congregation.</p>
                <button 
                  onClick={startScreenShare}
                  className="px-8 py-4 bg-gold hover:bg-gold-bright text-navy font-bold rounded-full text-xs transition-all shadow-xl shadow-gold/10 flex items-center gap-3"
                >
                  <Video size={18} /> Share Screen + System Audio
                </button>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-contain bg-black" />
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white text-[9px] font-bold px-3 py-1 rounded-full shadow-lg border border-red-400/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  LIVE CAPTURE
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={stopScreenShare}
                    className="p-3 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-all backdrop-blur-md shadow-lg"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            )}
            
            <AnimatePresence>
              {isListening && transcript.length > 0 && (
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  className="absolute bottom-6 left-6 right-6 bg-black/70 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-gold-bright text-[9px] font-bold tracking-[0.2em] uppercase font-mono">Live Captions · {targetLanguage.toUpperCase()}</div>
                    <div className="flex-1 h-[1px] bg-gold/10" />
                  </div>
                  <p className="text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-tight">
                    {transcript[0]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-navy-light/50 border border-gold/10 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-4 w-full md:w-auto">
              <div className="text-[10px] uppercase tracking-widest text-gold/40 font-bold mb-1">Translation & Inclusivity</div>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setLanguage(lang.code);
                      setTargetLanguage(lang.target);
                    }}
                    className={`px-4 py-2 text-[11px] rounded-lg transition-all border ${targetLanguage === lang.target ? 'bg-gold text-navy border-gold font-bold shadow-lg shadow-gold/10' : 'bg-white/5 border-white/10 text-ivory/40 hover:border-gold/30'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={toggleListening}
              className={`w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-sm transition-all shadow-xl ${isListening ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30' : 'bg-gold text-navy hover:bg-gold-bright shadow-gold/20'}`}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              {isListening ? 'STOP REAL-TIME STT' : 'START LIVE TRANSCRIPTION'}
            </button>
          </div>
        </div>

        <div className="bg-navy-light/60 border border-gold/10 rounded-2xl flex flex-col h-[600px] lg:h-auto overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                <FileText size={16} />
              </div>
              <h3 className="font-serif font-bold text-lg text-ivory">Event History</h3>
            </div>
            <button className="text-ivory/20 hover:text-gold-bright transition-colors p-2 rounded-lg hover:bg-white/5">
              <Share2 size={16} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin scrollbar-thumb-gold/10">
            {transcript.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 px-8">
                <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center mb-4 opacity-10">
                  <Mic size={24} />
                </div>
                <p className="text-xs text-ivory/20 font-mono tracking-widest leading-loose">WAITING FOR AUDIO INPUT...</p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {transcript.map((line, i) => (
                  <motion.div 
                    key={`${i}-${line}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-white/5 border border-white/5 rounded-xl group hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[9px] text-gold/40 font-mono font-bold">STAMP 00:0{i}</span>
                       <span className="text-[8px] px-1.5 py-0.5 rounded-sm bg-gold/10 text-gold font-bold">{targetLanguage.toUpperCase()}</span>
                    </div>
                    <p className="text-[13px] text-ivory/70 leading-relaxed">{line}</p>
                    {targetLanguage !== 'en' && (
                       <div className="mt-3 pt-3 border-t border-white/5 text-[11px] text-gold-soft/40 italic leading-relaxed">
                          SIMULATED TRANSLATION: {line}
                       </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          <div className="p-5 bg-black/40 border-t border-white/5 backdrop-blur-md">
             <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[10px] text-ivory/40">
                  <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-white/10'}`} />
                  {isListening ? 'Voice capture active - Capturing Sermon' : 'STT Engine Standby'}
                </div>
                {getTranslationNote() && (
                  <div className="flex items-center gap-2 text-[10px] text-gold-bright/60 bg-gold/10 p-2 rounded-md font-medium">
                     <Globe size={12} /> {getTranslationNote()}
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AudioEqualizer = ({ onKeywordDetected }: { onKeywordDetected: (word: string) => void }) => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [isOutputEnabled, setIsOutputEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const detectionIntervalRef = useRef<number | null>(null);

  const startMonitor = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const gainNode = audioContext.createGain();
      gainNode.gain.value = isOutputEnabled ? 1 : 0;
      gainNodeRef.current = gainNode;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.connect(gainNode);
      gainNode.connect(audioContext.destination);

      setIsMonitoring(true);
      draw();

      detectionIntervalRef.current = window.setInterval(() => {
        const randomIndex = Math.floor(Math.random() * BIBLE_KEYWORDS.length);
        const word = BIBLE_KEYWORDS[randomIndex];
        onKeywordDetected(word);
      }, 3500);

    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopMonitor = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (detectionIntervalRef.current) clearInterval(detectionIntervalRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) audioContextRef.current.close();
    setIsMonitoring(false);
  };

  const toggleOutput = () => {
    const newState = !isOutputEnabled;
    setIsOutputEnabled(newState);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newState ? 1 : 0;
    }
  };

  const draw = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderFrame = () => {
      animationRef.current = requestAnimationFrame(renderFrame);
      analyserRef.current!.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height;
        
        ctx.fillStyle = `rgba(196, 144, 10, ${0.3 + (dataArray[i] / 255) * 0.7})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 2;
      }
    };
    renderFrame();
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <div className="bg-navy-light/50 border border-gold/10 rounded-2xl p-6 shadow-xl">
       <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
             <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-ivory/10'}`} />
             <h3 className="font-serif text-lg font-bold">Live Audio Monitor</h3>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
             <button 
               onClick={isMonitoring ? stopMonitor : startMonitor}
               className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md font-bold text-[10px] transition-all ${isMonitoring ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-gold hover:bg-gold-bright text-navy'}`}
             >
                {isMonitoring ? <MicOff size={14} /> : <Mic size={14} />}
                {isMonitoring ? 'STOP SYSTEM' : 'START LIVE'}
             </button>
             <button 
               onClick={toggleOutput}
               disabled={!isMonitoring}
               className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md font-bold text-[10px] transition-all ${!isMonitoring ? 'bg-white/5 text-ivory/10 cursor-not-allowed' : isOutputEnabled ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/10 text-ivory/50 border border-transparent'}`}
             >
                {isOutputEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                {isOutputEnabled ? 'AUDIO ON' : 'AUDIO OFF'}
             </button>
          </div>
       </div>
       <div className="relative h-28 bg-black/40 rounded-xl overflow-hidden border border-white/5 group">
          {!isMonitoring && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10 transition-opacity group-hover:opacity-100">
               <Mic size={24} className="text-ivory/10" />
               <div className="text-[10px] text-ivory/20 font-mono tracking-widest">CONNECT AUDIO SYSTEM</div>
            </div>
          )}
          <canvas ref={canvasRef} className="w-full h-full block" width={800} height={200} />
          <div className="absolute bottom-2 right-4 flex gap-1 items-end h-4">
             {[1,2,3,4,5].map(i => (
               <motion.div 
                 key={i}
                 animate={isMonitoring ? { height: [4, 12, 6, 16, 4] } : { height: 4 }}
                 transition={{ repeat: Infinity, duration: 0.5 + i * 0.1 }}
                 className="w-1 bg-gold rounded-full opacity-30"
               />
             ))}
          </div>
       </div>
       <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="p-3 bg-white/5 rounded-lg border border-white/5">
             <div className="text-[8px] uppercase tracking-widest text-ivory/20 font-bold mb-1">Input Source</div>
             <div className="text-[10px] font-mono text-ivory/60 truncate">Integrated System Audio</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg border border-white/5">
             <div className="text-[8px] uppercase tracking-widest text-ivory/20 font-bold mb-1">Emission Status</div>
             <div className={`text-[10px] font-mono font-bold ${isMonitoring ? 'text-green-400' : 'text-ivory/20'}`}>
                {isMonitoring ? (isOutputEnabled ? 'EMITTING' : 'SILENCED') : 'SLEEP'}
             </div>
          </div>
       </div>
    </div>
  );
};

const Pricing = ({ onOpenApp }: { onOpenApp: () => void }) => {
  const plans = [
    { name: 'Seed', price: '$49', desc: 'Under 100 members', feat: false },
    { name: 'Growth', price: '$149', desc: '100–500 members', feat: true },
    { name: 'Revival', price: '$299', desc: '500–2,000 members', feat: false },
    { name: 'Cathedral', price: 'Custom', desc: '2,000+ members', feat: false }
  ];

  return (
    <section id="pricing" className="bg-page py-24 px-9">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.22em] uppercase text-gold mb-3">
          <span className="text-[8px]">✦</span> Pricing
        </div>
        <h2 className="font-serif text-4xl text-navy font-bold leading-tight mb-3">
          Plans for every <span className="italic text-gold">congregation</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {plans.map((plan, i) => (
            <div key={i} className={`p-8 rounded-2xl border transition-all ${plan.feat ? 'bg-navy border-gold shadow-2xl scale-105 z-10' : 'bg-white border-gold/15'}`}>
              {plan.feat && <div className="text-[8px] tracking-widest text-gold font-bold uppercase mb-4 text-center">Most Popular</div>}
              <div className={`text-[9px] tracking-widest font-bold uppercase mb-2 ${plan.feat ? 'text-gold' : 'text-gold/60'}`}>{plan.name}</div>
              <div className={`font-serif text-4xl font-bold mb-1 ${plan.feat ? 'text-gold-bright' : 'text-navy'}`}>{plan.price}</div>
              <div className={`text-[10px] mb-6 ${plan.feat ? 'text-ivory/20' : 'text-navy/30'}`}>{plan.desc}</div>
              <div className={`h-[1px] mb-6 ${plan.feat ? 'bg-white/5' : 'bg-navy/5'}`} />
              <button 
                onClick={onOpenApp}
                className={`w-full py-3 text-[11px] font-bold rounded-md transition-all ${plan.feat ? 'bg-gold text-navy hover:bg-gold-bright' : 'border border-gold/20 text-navy hover:text-gold hover:border-gold'}`}
              >
                Start Free Trial
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [activeTab, setActiveTab] = useState<Tab>('live');
  const [detectedKeywords, setDetectedKeywords] = useState<string[]>([]);

  const handleKeywordDetected = (word: string) => {
    setDetectedKeywords(prev => {
      const newList = [word, ...prev];
      return newList.slice(0, 10); // Keep last 10
    });
  };

  const openApp = (initialTab?: Tab) => {
    if (initialTab) {
      setActiveTab(initialTab);
    } else {
      setActiveTab('live'); // Default
    }
    setView('app');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  if (view === 'landing') {
    return (
      <div className="relative">
        <div className="grid-bg fixed inset-0 z-0 pointer-events-none" />
        <Navbar onOpenApp={openApp} onViewChange={setView} />
        <main>
          <Hero onOpenApp={openApp} />
          <Features onOpenApp={openApp} />
          <Community />
          <Accessibility />
          <Pricing onOpenApp={openApp} />
          <section className="bg-navy-light py-24 px-9 border-t border-gold/5 text-center">
            <h2 className="font-serif text-4xl md:text-6xl text-ivory mb-6">
              The mission is <span className="italic text-gold-bright">ministry.</span>
            </h2>
            <p className="text-ivory/60 max-w-lg mx-auto mb-10 text-lg font-light leading-relaxed">
              Join 2,400+ churches using SermonIQ to preach with purpose, care for every member, and keep no one invisible.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={openApp}
                className="px-8 py-4 bg-gold hover:bg-gold-bright text-navy font-semibold text-lg rounded-md transition-all shadow-xl shadow-gold/10"
              >
                Open Live Dashboard →
              </button>
              <button className="px-8 py-4 border border-ivory/20 hover:border-ivory/50 text-ivory font-semibold text-lg rounded-md transition-all">
                Schedule a Demo
              </button>
            </div>
          </section>
        </main>
        <footer className="bg-black/40 py-8 px-9 border-t border-gold/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] text-ivory/20 leading-relaxed text-center md:text-left">
              <strong className="text-ivory/40">SermonIQ™</strong> · Ministry Intelligence Platform v3 <br />
              © 2026 SermonIQ Inc. · WCAG 2.1 AA · GDPR · CCPA · Privacy · Terms 
            </div>
            <div className="font-serif italic text-xs text-gold/40 text-center md:text-right max-w-sm">
              \"Your word is a lamp to my feet and a light to my path.\" — Psalm 119:105
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-navy text-ivory font-sans">
      <Navbar onOpenApp={() => {}} onViewChange={setView} />
      
      <div className="flex flex-1 pt-[62px]">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-[236px] bg-navy-light border-r border-gold/10 flex-col sticky top-[62px] h-[calc(100vh-62px)] overflow-y-auto py-4">
          <div className="px-3 mb-6">
             <div className="bg-gold/5 border border-gold/10 rounded-md p-3">
                <div className="font-serif text-sm font-semibold text-ivory">Grace Fellowship</div>
                <div className="text-[8px] uppercase tracking-widest text-gold font-bold">✦ Growth Plan · Active</div>
             </div>
          </div>

          <div className="text-[8px] tracking-[0.18em] uppercase text-gold/30 px-4 mb-2 font-bold select-none">Live Service</div>
          <DashboardTab active={activeTab === 'live'} label="Live Dashboard" icon={BarChart3} onClick={() => setActiveTab('live')} />
          <DashboardTab active={activeTab === 'transcript'} label="Live Transcription" icon={Video} onClick={() => setActiveTab('transcript')} />
          <DashboardTab active={false} label="Scripture Feed" icon={BookOpen} onClick={() => {}} />

          <div className="text-[8px] tracking-[0.18em] uppercase text-gold/30 px-4 mt-6 mb-2 font-bold select-none">Community</div>
          <DashboardTab active={activeTab === 'chat'} label="Anonymous Chat" icon={MessageSquare} onClick={() => setActiveTab('chat')} />
          <DashboardTab active={false} label="Community Pulse" icon={Heart} onClick={() => {}} />

          <div className="text-[8px] tracking-[0.18em] uppercase text-gold/30 px-4 mt-6 mb-2 font-bold select-none">Communication</div>
          <DashboardTab active={activeTab === 'email'} label="Email & SMS" icon={Mail} onClick={() => setActiveTab('email')} />
          <DashboardTab active={false} label="Announcements" icon={Bell} onClick={() => {}} />

          <div className="text-[8px] tracking-[0.18em] uppercase text-gold/30 px-4 mt-6 mb-2 font-bold select-none">Giving</div>
          <DashboardTab active={activeTab === 'giving'} label="Giving Dashboard" icon={CircleDollarSign} onClick={() => setActiveTab('giving')} />

          <div className="text-[8px] tracking-[0.18em] uppercase text-gold/30 px-4 mt-6 mb-2 font-bold select-none">Intelligence</div>
          <DashboardTab active={activeTab === 'news'} label="News & Alerts" icon={Zap} onClick={() => setActiveTab('news')} />
          <DashboardTab active={false} label="Analytics" icon={TrendingUp} onClick={() => {}} />

          <div className="mt-auto p-3">
            <div className="bg-gold/10 border border-gold/20 rounded-md p-3">
              <div className="text-[7px] tracking-widest uppercase text-gold/40 font-bold mb-0.5">Today</div>
              <div className="font-serif text-xl font-bold text-gold-bright">Sun AM</div>
              <div className="text-[9px] text-ivory/20">April 20, 2026</div>
            </div>
          </div>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-navy px-4 md:px-0">
          {/* Mobile Tabs */}
          <div className="sticky top-0 z-20 bg-navy/95 border-b border-gold/10 backdrop-blur-md px-4 flex items-center lg:hidden overflow-x-auto gap-6 scrollbar-none">
             <button onClick={() => setActiveTab('live')} className={`py-5 text-[13px] font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === 'live' ? 'text-gold-bright border-gold' : 'text-ivory/30 border-transparent'}`}>Live Service</button>
             <button onClick={() => setActiveTab('transcript')} className={`py-5 text-[13px] font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === 'transcript' ? 'text-gold-bright border-gold' : 'text-ivory/30 border-transparent'}`}>Transcription</button>
             <button onClick={() => setActiveTab('chat')} className={`py-5 text-[13px] font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === 'chat' ? 'text-gold-bright border-gold' : 'text-ivory/30 border-transparent'}`}>Chat</button>
             <button onClick={() => setActiveTab('email')} className={`py-5 text-[13px] font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === 'email' ? 'text-gold-bright border-gold' : 'text-ivory/30 border-transparent'}`}>Email</button>
             <button onClick={() => setActiveTab('giving')} className={`py-5 text-[13px] font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === 'giving' ? 'text-gold-bright border-gold' : 'text-ivory/30 border-transparent'}`}>Giving</button>
             <button onClick={() => setActiveTab('care')} className={`py-5 text-[13px] font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === 'care' ? 'text-gold-bright border-gold' : 'text-ivory/30 border-transparent'}`}>Care</button>
             <button onClick={() => setActiveTab('news')} className={`py-5 text-[13px] font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === 'news' ? 'text-gold-bright border-gold' : 'text-ivory/30 border-transparent'}`}>News</button>
          </div>

          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 md:p-8"
          >
            {activeTab === 'live' && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-ivory">Sunday Morning Service</h2>
                    <p className="font-mono text-xs text-ivory/30 mt-1">April 20 · 10:45 AM Service Active</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setView('landing')} className="flex items-center gap-2 px-4 py-2 border border-gold/20 text-gold-soft text-[11px] rounded-md hover:border-gold-bright transition-all">
                      <ArrowLeft size={14} /> Back to Site
                    </button>
                    <button className="px-5 py-2 bg-gold hover:bg-gold-bright text-navy font-bold text-[11px] rounded-md transition-all">
                      Get Coaching ✦
                    </button>
                  </div>
                </div>

                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
                  <p className="font-mono text-xs text-green-400">
                    Caption companion active — sermoniq.live/grace · Accessible to all members
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  <KPICard label="Engagement Score" value="81" trend="12pts vs last Sun" trendUp={true} color="from-gold to-gold-bright" />
                  <KPICard label="Total Responses" value="187" trend="34 above average" trendUp={true} color="from-green-600 to-green-400" />
                  <KPICard label="Verses Surfaced" value="24" trend="8 used by pastor" trendUp={true} color="from-blue-700 to-blue-400" />
                  <KPICard label="Attendance" value="342" trend="28 vs last Sunday" trendUp={true} color="from-red-900 to-rose-500" />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 bg-navy-light/50 border border-gold/10 rounded-2xl p-6 relative">
                     <div className="absolute top-4 right-5 bg-green-500/20 border border-green-500/30 text-green-400 text-[8px] font-bold px-2 py-0.5 rounded-full">LIVE</div>
                     <h3 className="font-serif text-xl font-bold mb-4">Service Engagement Dynamics</h3>
                     
                     {detectedKeywords.length > 0 && (
                       <div className="flex flex-wrap gap-2 mb-8">
                         {detectedKeywords.map((word, i) => (
                           <motion.span 
                             key={`${word}-${i}`}
                             initial={{ opacity: 0, scale: 0.8 }}
                             animate={{ opacity: 1, scale: 1 }}
                             className="px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-[10px] text-gold-bright font-bold"
                           >
                             {word}
                           </motion.span>
                         ))}
                       </div>
                     )}

                     <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-shrink-0 text-center">
                           <div className="font-mono text-[9px] uppercase text-ivory/30 mb-2">Live Pulse</div>
                           <div className="w-32 h-32 relative flex items-center justify-center">
                              <svg className="w-full h-full -rotate-90">
                                <circle cx="64" cy="64" r="58" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/5" />
                                <motion.circle 
                                  cx="64" cy="64" r="58" fill="none" stroke="currentColor" strokeWidth="8" 
                                  className="text-gold" strokeDasharray="364.4" strokeDashoffset={364.4 * (1 - 0.81)}
                                  initial={{ strokeDashoffset: 364.4 }}
                                  animate={{ strokeDashoffset: 364.4 * (1 - 0.81) }}
                                  transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                              </svg>
                              <div className="absolute flex flex-col items-center">
                                 <span className="font-serif text-4xl font-bold text-gold-bright">81</span>
                                 <span className="text-[8px] text-ivory/20 font-mono">/ 100</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex-1 w-full space-y-4">
                           {[
                             { label: 'Amen', color: 'bg-gold-bright', value: 82, count: 147 },
                             { label: 'Alleluia', color: 'bg-green-400', value: 38, count: 64 },
                             { label: 'Glory', color: 'bg-amber-500', value: 26, count: 42 },
                             { label: 'Preach!', color: 'bg-purple-400', value: 16, count: 25 },
                           ].map((bar) => (
                             <div key={bar.label}>
                                <div className="flex justify-between items-center mb-1.5 font-mono text-[10px]">
                                   <span className="text-ivory/60">{bar.label}</span>
                                   <span className="font-bold">{bar.count}</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                   <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${bar.value}%` }}
                                      className={`h-full ${bar.color} rounded-full`}
                                   />
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                    <AudioEqualizer onKeywordDetected={handleKeywordDetected} />
                    <div className="bg-navy-light/50 border border-gold/10 rounded-2xl p-6">
                      <h3 className="font-serif text-lg font-bold mb-4">Verse Suggestions</h3>
                    <div className="space-y-4">
                      {[
                        { trigger: 'breakthrough', text: '"Behold, I am doing a new thing; now it springs forth…"', ref: 'Isaiah 43:19 · ESV' },
                        { trigger: 'faith', text: '"Now faith is the assurance of things hoped for…"', ref: 'Hebrews 11:1 · ESV' }
                      ].map((v, i) => (
                        <div key={i} className="bg-gold/5 border border-gold/10 p-4 rounded-xl">
                           <div className="text-[8px] uppercase tracking-widest text-gold/40 font-bold mb-1.5">✦ Triggered by: "{v.trigger}"</div>
                           <p className="font-serif italic text-[13px] leading-relaxed mb-1.5">
                              {v.text}
                           </p>
                           <div className="text-[10px] text-gold font-bold">{v.ref}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              </div>
            )}
            
            {activeTab === 'transcript' && (
               <LiveTranscription />
            )}

            {activeTab === 'chat' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-ivory">Anonymous Community Chat</h2>
                    <p className="font-mono text-xs text-ivory/30 mt-1">Safe · Private · Pastor-aware · Zero identity linkage</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-6">
                   <div className="bg-navy-light/50 border border-gold/10 rounded-2xl overflow-hidden flex flex-col h-[600px]">
                      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                         <span className="font-serif font-semibold">Community Feed</span>
                         <span className="text-[10px] text-ivory/20 font-mono">24 posts this week</span>
                      </div>
                      <div className="flex-1 overflow-y-auto p-6 space-y-4">
                         {[
                           { cat: 'Prayer Request', text: '"Please pray for my father who is in the hospital. I haven\'t been able to sleep. I just need to know God is still with us."', sub: 'Member of Grace · 2h ago', color: 'border-gold' },
                           { cat: 'Praise Report', text: '"God came through. After 8 months of searching, I got the job. Thank you church family!"', sub: 'Member of Grace · 1d ago', color: 'border-green-400' },
                           { cat: 'Struggling', text: '"I lost my job last month and I haven\'t told anyone. Coming to church is the only thing keeping me going."', sub: 'A neighbor · 5h ago', color: 'border-purple-400' }
                         ].map((post, i) => (
                           <div key={i} className={`bg-white/5 p-4 rounded-xl border-l-[3px] ${post.color}`}>
                              <div className="text-[9px] font-bold tracking-widest uppercase mb-1.5 opacity-60">{post.cat}</div>
                              <p className="text-[13px] italic leading-relaxed mb-3 text-ivory">
                                 {post.text}
                              </p>
                              <div className="flex justify-between items-center text-[10px] text-ivory/20 font-mono">
                                 <span>{post.sub}</span>
                                 <div className="flex items-center gap-4">
                                    <span className="hover:text-gold cursor-pointer transition-colors">🙏 14</span>
                                    <span className="hover:text-gold cursor-pointer transition-colors">💛 8</span>
                                 </div>
                              </div>
                           </div>
                         ))}
                      </div>
                      <div className="p-4 border-t border-white/5 flex gap-2">
                         <input 
                           className="flex-1 bg-white/5 border border-white/10 rounded-md px-4 py-2 text-[13px] outline-none focus:border-gold/50 transition-all text-ivory"
                           placeholder="Post anonymously..."
                         />
                         <button className="px-6 py-2 bg-gold hover:bg-gold-bright text-navy font-bold text-[13px] rounded-md transition-all">
                           Post
                         </button>
                      </div>
                   </div>

                   <aside className="space-y-6">
                      <div className="bg-navy-light/50 border border-gold/10 rounded-2xl p-5">
                         <h3 className="font-serif font-bold mb-4">Community Pulse</h3>
                         <div className="space-y-5">
                            {[
                              { label: 'Financial anxiety', value: 85, count: 12, color: 'bg-gold' },
                              { label: 'Family conflict', value: 60, count: 8, color: 'bg-purple-600' },
                              { label: 'Grief/loss', value: 45, count: 6, color: 'bg-blue-600' },
                              { label: 'Praise reports', value: 70, count: 10, color: 'bg-green-600' }
                            ].map((p) => (
                              <div key={p.label}>
                                 <div className="flex justify-between items-center mb-1 font-mono text-[9px] text-ivory/50">
                                    <span>{p.label}</span>
                                    <span>{p.count}</span>
                                 </div>
                                 <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${p.value}%` }} className={`h-full ${p.color}`} />
                                 </div>
                              </div>
                            ))}
                         </div>
                         <div className="mt-8 p-3 bg-gold/5 border border-gold/10 rounded-lg text-[10px] text-ivory/50 leading-relaxed">
                            <span className="text-gold-bright font-bold">Sermon Prep Insight:</span> Financial pressure and family conflict are the dominant themes. Consider weaving Philippians 4:19 into Sunday's message.
                         </div>
                      </div>

                      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
                         <div className="text-xl mb-2">⚠️</div>
                         <h4 className="font-serif font-bold text-red-100 text-sm mb-1">Crisis Detection Active</h4>
                         <p className="text-[10px] text-red-100/40 leading-relaxed mb-4">
                            AI monitors every post for language suggesting self-harm or domestic violence. Alerts fire immediately.
                         </p>
                         <button className="w-full py-2 bg-red-950/40 border border-red-500/30 text-red-200 font-bold text-[9px] rounded-md hover:bg-red-900/40 transition-all">
                           View Crisis Protocols
                         </button>
                      </div>
                   </aside>
                </div>
              </div>
            )}
            
            {activeTab === 'email' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-ivory">Email & Announcements</h2>
                    <p className="font-mono text-xs text-ivory/30 mt-1">Monday–Saturday devotionals · Sunday announcements · Reminder Center</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-navy-light/50 border border-gold/10 p-6 rounded-2xl">
                    <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-gold mb-3 font-mono">📧 Monday Devotional — Auto-Draft</div>
                    <h4 className="font-serif text-lg font-bold text-ivory mb-2">Walking in Breakthrough Faith</h4>
                    <p className="text-xs text-ivory/60 leading-relaxed font-light mb-4 text-tm">
                      "This Sunday Pastor Marcus reminded us that breakthrough doesn't come from striving — it comes from surrender. Isaiah 43:19 says, 'Behold, I am doing a new thing; now it springs forth, do you not perceive it?' Today, ask yourself: where am I striving instead of resting in what God is already doing?"
                    </p>
                    <div className="text-[10px] text-ivory/20 font-mono mb-4">📖 Isaiah 43:19 · ESV · Generated from Sunday sermon transcript · Sends 7:00am Mon</div>
                    <div className="flex gap-2">
                       <button className="px-4 py-2 bg-gold/10 border border-gold/20 text-gold-soft text-[10px] font-bold rounded-md hover:border-gold-bright transition-all">
                          ✓ Approve & Schedule
                       </button>
                       <button className="px-4 py-2 text-ivory/40 text-[10px] hover:text-ivory transition-all">✏ Edit</button>
                    </div>
                  </div>

                  <div className="bg-navy-light/50 border border-gold/10 p-6 rounded-2xl">
                     <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-gold mb-3 font-mono">📢 Sunday Announcements — Auto-Extracted</div>
                     <div className="space-y-3">
                        {[
                          { icon: '🎵', title: 'Choir Rehearsal — Wednesday 7pm', sub: 'Extracted from sermon transcript', status: 'Sent', statusColor: 'text-green-400 bg-green-500/10 border-green-500/20' },
                          { icon: '🍳', title: 'Men\'s Breakfast — Saturday 8am', sub: 'Extracted from bulletin', status: 'Pending', statusColor: 'text-gold-soft bg-gold/10 border-gold/20' },
                          { icon: '🙏', title: 'Prayer Night — Friday 7:30pm', sub: 'Manually added by admin', status: 'Sent', statusColor: 'text-green-400 bg-green-500/10 border-green-500/20' }
                        ].map((ann, i) => (
                          <div key={i} className="bg-white/5 border border-white/5 p-3 rounded-lg flex items-start gap-3">
                             <div className="text-lg flex-shrink-0 mt-1">{ann.icon}</div>
                             <div className="flex-1">
                                <div className="text-[11px] font-semibold">{ann.title}</div>
                                <div className="text-[9px] text-ivory/30 font-mono">{ann.sub}</div>
                             </div>
                             <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${ann.statusColor}`}>{ann.status}</span>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-ivory">Care & Prayer Track</h2>
                    <p className="font-mono text-xs text-ivory/30 mt-1">Active care tracks · Daily personalized emails · Pastoral prayer log</p>
                  </div>
                  <button className="px-5 py-2 bg-gold hover:bg-gold-bright text-navy font-bold text-[11px] rounded-md transition-all">
                    + Add Member
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   <div className="bg-navy-light/50 border border-gold/10 rounded-2xl overflow-hidden">
                      <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                         <span className="font-serif font-semibold">Active Care Tracks</span>
                         <span className="text-[10px] text-ivory/20 font-mono">6 members</span>
                      </div>
                      <div className="divide-y divide-white/5">
                         {[
                           { name: 'Sister Dorothy Wallace', cat: 'Bereavement / Grief · Day 14', tag: 'Grief', tagColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
                           { name: 'Brother James Okoro', cat: 'Serious illness · Day 8', tag: 'Illness', tagColor: 'text-red-400 bg-red-500/10 border-red-500/20' },
                           { name: 'Deacon Paul Mensah', cat: 'Job loss / Financial hardship · Day 22', tag: 'Job Loss', tagColor: 'text-gold-soft bg-gold/10 border-gold/20' },
                           { name: 'Anonymous Member #7', cat: 'Self-enrolled via chat · Day 3', tag: 'Mental Health', tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20' }
                         ].map((m, i) => (
                           <div key={i} className="px-5 py-3.5 flex items-center gap-4">
                              <div className="w-9 h-9 rounded-full bg-navy-muted flex items-center justify-center text-sm">🫶</div>
                              <div className="flex-1">
                                 <div className="text-[11px] font-semibold">{m.name}</div>
                                 <div className="text-[9px] text-ivory/30 font-mono">{m.cat}</div>
                              </div>
                              <span className={`text-[8px] px-2 py-0.5 rounded-full border font-bold ${m.tagColor}`}>{m.tag}</span>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="bg-navy-light/50 border border-gold/10 rounded-2xl p-6">
                      <h3 className="font-serif text-lg font-bold mb-4">Today's Care Insights</h3>
                      <div className="space-y-4">
                         {[
                           { name: 'Dorothy Wallace', text: '"Blessed are those who mourn..." (Matt 5:4). Grief is not the absence of faith; it is faith walking through darkness.' },
                           { name: 'James Okoro', text: '"He heals the brokenhearted and binds up their wounds" (Psalm 147:3). God is present in every waiting room.' }
                         ].map((c, i) => (
                           <div key={i} className="flex gap-3 items-start bg-white/5 p-4 rounded-xl">
                              <div className="text-lg">💛</div>
                              <div>
                                 <div className="text-[11px] font-bold mb-1">{c.name}</div>
                                 <p className="text-[11px] text-ivory/60 leading-relaxed italic">{c.text}</p>
                              </div>
                           </div>
                         ))}
                         <button className="w-full py-3 bg-gold/5 border border-gold/20 text-gold-soft text-[10px] font-bold rounded-md hover:bg-gold/10 transition-all">
                            Generate Care Report ✦
                         </button>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'giving' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-ivory">Giving Dashboard</h2>
                    <p className="font-mono text-xs text-ivory/30 mt-1">This week · All destinations · Secure via Stripe</p>
                  </div>
                  <button className="px-5 py-2 bg-gold hover:bg-gold-bright text-navy font-bold text-[11px] rounded-md transition-all">
                    Initiate Payout ✦
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                   {[
                     { label: 'General Fund', value: '$4,280', icon: '⛪', color: 'from-green-600 to-green-400' },
                     { label: 'Activity Fund', value: '$1,140', icon: '🎉', color: 'from-gold to-gold-bright' },
                     { label: 'Service Fund', value: '$860', icon: '🎙', color: 'from-blue-600 to-blue-400' },
                     { label: 'Pastor\'s Fund', value: '$620', icon: '✝', color: 'from-purple-600 to-purple-400' }
                   ].map((g, i) => (
                     <div key={i} className="bg-navy-light/50 border border-gold/10 p-5 rounded-2xl text-center flex flex-col items-center">
                        <div className="text-2xl mb-2">{g.icon}</div>
                        <div className="text-[8px] uppercase tracking-widest text-ivory/30 font-bold mb-1">{g.label}</div>
                        <div className="font-serif text-2xl font-bold text-ivory mb-3">{g.value}</div>
                        <button className="text-[9px] text-gold-soft font-bold border border-gold/20 px-3 py-1 rounded-full hover:bg-gold/10 transition-all">Share Link</button>
                     </div>
                   ))}
                </div>

                <div className="bg-navy-light/50 border border-gold/10 rounded-2xl p-6">
                   <h3 className="font-serif text-lg font-bold mb-4">Care Track Support</h3>
                   <div className="space-y-4">
                      {[
                        { title: 'Dorothy Wallace — Bereavement support', raised: '$840', donors: 12 },
                        { title: 'James Okoro — Illness support', raised: '$320', donors: 7 },
                        { title: 'Paul Mensah — Employment support', raised: '$1,240', donors: 18 }
                      ].map((c, i) => (
                        <div key={i} className="bg-white/5 p-4 rounded-xl flex items-center justify-between gap-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-navy-muted flex items-center justify-center">🫶</div>
                              <div>
                                 <div className="text-[11px] font-bold">{c.title}</div>
                                 <div className="text-[9px] text-ivory/30 font-mono">{c.raised} raised · {c.donors} anonymous donors</div>
                              </div>
                           </div>
                           <button className="text-[9px] text-gold-soft font-bold bg-gold/5 border border-gold/20 px-4 py-2 rounded-md hover:bg-gold/10 transition-all">Copy Page Link</button>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-ivory">News & Weather Alerts</h2>
                    <p className="font-mono text-xs text-ivory/30 mt-1">Christian RSS feeds · NWS weather API · Church tragedy detection</p>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center gap-4">
                   <div className="text-xl">🌩</div>
                   <div className="flex-1">
                      <div className="text-[11px] text-amber-200 leading-relaxed font-bold">Severe Thunderstorm Warning</div>
                      <div className="text-[10px] text-amber-200/60 font-mono">Brooklyn, NY until 6:00pm. Sunday service may be affected.</div>
                   </div>
                   <button className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 text-amber-100 text-[9px] font-bold rounded-full hover:bg-amber-500/40 transition-all">
                      Notify Congregation
                   </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   <div className="bg-navy-light/50 border border-gold/10 rounded-2xl overflow-hidden">
                      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                         <span className="font-serif font-semibold">Priority News Alerts</span>
                         <span className="text-[9px] text-red-400 font-bold font-mono">TRAGEDY DETECTED</span>
                      </div>
                      <div className="divide-y divide-white/5">
                         {[
                           { title: 'Church shooting in Memphis — congregation seeking guidance', src: 'Christianity Today · 14m ago', status: 'high' },
                           { title: 'Supreme Court rules in favor of religious freedom in workplace', src: 'Baptist Press · 2h ago', status: 'mid' },
                           { title: 'Open Doors: Christian persecution reached record levels', src: 'Religion News Service · 6h ago', status: 'mid' }
                         ].map((n, i) => (
                           <div key={i} className="px-6 py-4 flex gap-3 hover:bg-white/5 cursor-pointer transition-all">
                              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${n.status === 'high' ? 'bg-red-500' : 'bg-amber-500'}`} />
                              <div>
                                 <div className="text-[11px] font-semibold text-ivory mb-1">{n.title}</div>
                                 <div className="text-[9px] text-ivory/30 font-mono">{n.src}</div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="bg-navy-light/50 border border-gold/10 rounded-2xl p-6">
                      <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-gold mb-3 font-mono">📡 Tragedy Alert — Response Drafted</div>
                      <h4 className="font-serif text-lg font-bold text-ivory mb-2">Pastoral Response: Memphis Tragedy</h4>
                      <p className="text-[11px] text-ivory/60 leading-relaxed font-light mb-4 italic">
                         "Grace Fellowship family — we are praying today for our brothers and sisters in Memphis. Lord, you are our refuge and strength — a very present help in trouble (Psalm 46:1). Cover those who are hurting."
                      </p>
                      <div className="flex gap-2">
                        <button className="px-5 py-2.5 bg-gold hover:bg-gold-bright text-navy font-bold text-[10px] rounded-md transition-all">
                          Send to Congregation →
                        </button>
                        <button className="px-5 py-2.5 border border-gold/20 text-gold-soft font-bold text-[10px] rounded-md hover:border-gold-bright transition-all">
                          ✏ Edit
                        </button>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
