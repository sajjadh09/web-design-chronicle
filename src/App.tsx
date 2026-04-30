import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Check, Copy, Menu, X, Code, BookOpen, Layers, LayoutTemplate, Search, Globe, Layout, Lock, Github, Linkedin, MessageCircle, Send, ArrowRight, Sparkles, ChevronDown, Mail, Eye, EyeOff, Star, CheckCircle2 } from 'lucide-react';
import * as Snippets from './snippets';

// --- Types ---
type ViewMode = 'preview' | 'code';
type NavItem = 'Introduction' | 'Installation' | 'Hero Banner' | 'Call to Action' | 'Testimonials' | 'Bento Grid' | 'Split Screen' | 'Feature Grid' | 'Pricing Table' | 'Glass Card' | 'Interactive Tabs' | 'Animated Accordion' | 'Form Controls' | 'Modal Dialog';

type ExplanationData = {
  whenToUse: string;
  benefits: string;
  effects: string;
  importance: string;
};

const NAV_STRUCTURE = [
  {
    category: 'Getting Started',
    icon: <BookOpen size={14} />,
    items: ['Introduction', 'Installation'] as NavItem[]
  },
  {
    category: 'Layouts',
    icon: <LayoutTemplate size={14} />,
    items: ['Hero Banner', 'Call to Action', 'Testimonials', 'Bento Grid', 'Split Screen', 'Feature Grid', 'Pricing Table'] as NavItem[]
  },
  {
    category: 'Components',
    icon: <Layers size={14} />,
    items: ['Glass Card', 'Interactive Tabs', 'Animated Accordion', 'Form Controls', 'Modal Dialog'] as NavItem[]
  }
];

// --- Helper Components ---

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative rounded-xl bg-[#0a0a0a] border border-brand-800 overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 border-b border-brand-800/50 bg-brand-900/30">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-brand-800" />
          <div className="w-3 h-3 rounded-full bg-brand-800" />
          <div className="w-3 h-3 rounded-full bg-brand-800" />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-brand-500 font-mono">TypeScript / TSX</span>
          <button 
            onClick={handleCopy} 
            className="text-brand-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            {copied ? <><Check size={14} className="text-green-400" /> Copied!</> : <><Copy size={14} /> Copy</>}
          </button>
        </div>
      </div>
      <pre className="p-6 overflow-x-auto text-sm font-mono text-brand-300 leading-relaxed scrollbar-thin scrollbar-thumb-brand-800 scrollbar-track-transparent">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const ComponentPreview = ({ 
  title, 
  description, 
  code, 
  explanation,
  children,
  centered = false 
}: { 
  title: string, 
  description: string, 
  code: string, 
  explanation?: ExplanationData,
  children: React.ReactNode,
  centered?: boolean
}) => {
  const [view, setView] = useState<ViewMode>('preview');

  return (
    <div className="mb-24 last:mb-0">
      <div className="mb-8">
        <h3 className="editorial-heading text-4xl mb-3 text-white flex items-center gap-3">
          {title}
        </h3>
        <p className="text-brand-400 text-lg leading-relaxed">{description}</p>
      </div>
      
      <div className="border border-brand-800 rounded-3xl overflow-hidden bg-brand-900/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-800/10 blur-[100px] pointer-events-none" />
        
        <div className="flex border-b border-brand-800 bg-brand-900/60 backdrop-blur-sm px-2 sm:px-4 relative z-10">
          <button 
            className={`py-4 px-5 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${view === 'preview' ? 'border-brand-400 text-white' : 'border-transparent text-brand-500 hover:text-brand-300'}`} 
            onClick={() => setView('preview')}
          >
            <LayoutTemplate size={16} /> Preview
          </button>
          <button 
            className={`py-4 px-5 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${view === 'code' ? 'border-brand-400 text-white' : 'border-transparent text-brand-500 hover:text-brand-300'}`} 
            onClick={() => setView('code')}
          >
            <Code size={16} /> Code
          </button>
        </div>
        
        <div className={`p-4 sm:p-8 md:p-12 relative z-10 ${view === 'preview' && centered ? 'flex justify-center items-center py-20 min-h-[400px]' : ''}`}>
          <AnimatePresence mode="wait">
            {view === 'preview' ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full"
              >
                {children}
              </motion.div>
            ) : (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <CodeBlock code={code.trim()} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {explanation && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-brand-900/20 p-8 rounded-3xl border border-brand-800/50 mt-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-brand-300 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              When & Why to use
            </div>
            <p className="text-sm leading-relaxed text-brand-400">{explanation.whenToUse}</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-brand-300 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              Core Benefits
            </div>
            <p className="text-sm leading-relaxed text-brand-400">{explanation.benefits}</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-brand-300 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              Visual Effects
            </div>
            <p className="text-sm leading-relaxed text-brand-400">{explanation.effects}</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-brand-300 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              Importance
            </div>
            <p className="text-sm leading-relaxed text-brand-400">{explanation.importance}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Live Component Demo Instances ---

const LiveBentoGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 gap-4 h-[500px] w-full">
    <motion.div whileHover={{ scale: 0.98 }} className="md:col-span-2 md:row-span-2 glass-card p-8 relative overflow-hidden group">
      <div className="z-10 relative">
        <h3 className="text-3xl font-serif mb-2 text-white">Main Metric</h3>
        <p className="text-brand-400">The central anchor of your layout, providing instant context.</p>
      </div>
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-brand-800/50 rounded-full group-hover:scale-110 transition-transform duration-500" />
    </motion.div>
    <div className="md:col-span-1 md:row-span-1 glass-card p-6 flex flex-col justify-end">
      <span className="text-3xl font-serif text-white">42k</span>
      <span className="text-xs uppercase tracking-widest text-brand-500">Active Users</span>
    </div>
    <div className="md:col-span-1 md:row-span-2 bg-white text-brand-950 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <h3 className="text-xl font-serif mb-4">Quick Stats</h3>
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex justify-between border-b border-brand-200 pb-2">
            <span className="text-sm opacity-70">Metric {i}</span>
            <span className="font-mono font-medium">99%</span>
          </div>
        ))}
      </div>
    </div>
    <div className="md:col-span-1 md:row-span-1 glass-card p-6 flex items-center justify-center">
      <Cpu size={32} className="text-brand-400" />
    </div>
    <div className="md:col-span-2 md:row-span-2 bg-brand-800/20 border border-brand-800 rounded-2xl p-8">
      <h3 className="text-2xl font-serif mb-4 text-white">Timeline</h3>
      <div className="space-y-4">
        {['Phase 1', 'Phase 2'].map((item, i) => (
          <div key={i} className="flex gap-4">
            <span className="font-mono text-brand-500 text-sm">2026</span>
            <p className="text-sm text-brand-300">{item} architecture mapping</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LiveInteractiveTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Overview', 'Features', 'Analytics'];

  return (
    <div className="w-full max-w-md glass-card p-8">
      <div className="flex gap-4 mb-6 border-b border-brand-800">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`pb-3 text-sm font-medium transition-colors relative flex-1 text-center ${
              activeTab === i ? 'text-white' : 'text-brand-400 hover:text-brand-200'
            }`}
          >
            {tab}
            {activeTab === i && (
              <motion.div 
                layoutId="navTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-400 shadow-[0_0_8px_rgba(148,163,184,0.5)]"
              />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="min-h-[100px] text-brand-300 text-sm leading-relaxed"
        >
          {activeTab === 0 && <p>A comprehensive overview of the design system architecture.</p>}
          {activeTab === 1 && <p>Detailed list of interactive patterns and motion primitives.</p>}
          {activeTab === 2 && <p>Real-time analytics and layout performance metrics.</p>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const LiveSplitScreen = () => {
  return (
    <div className="flex flex-col md:flex-row h-[400px] w-full rounded-2xl overflow-hidden border border-brand-800">
      <div className="w-full md:w-1/2 bg-brand-900 border-r border-brand-800 p-8 lg:p-12 flex flex-col justify-center relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
        <h2 className="text-4xl font-serif mb-4 text-white z-10">Editorial Split</h2>
        <p className="text-brand-400 z-10 max-w-sm leading-relaxed">
          Perfect for distinct separation of visual and textual priorities on landing pages.
        </p>
      </div>
      <div className="w-full md:w-1/2 bg-brand-950 relative overflow-hidden flex items-center justify-center group">
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop" alt="Abstract architectural rendering" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-brand-950/40 mix-blend-multiply" />
        <span className="text-white font-mono text-sm tracking-widest uppercase z-10 relative bg-brand-900/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-brand-800 shadow-xl">Visual Focus Area</span>
      </div>
    </div>
  );
};

const LivePricingTable = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
      {[ 'Starter', 'Professional', 'Enterprise' ].map((tier, i) => (
        <motion.div 
          key={tier}
          whileHover={{ y: -8 }}
          className={`glass-card p-8 flex flex-col relative overflow-hidden ${i === 1 ? 'border-brand-400/50 bg-brand-800/40 shadow-[0_0_40px_rgba(148,163,184,0.1)]' : ''}`}
        >
          {i === 1 && <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-400 to-brand-600" />}
          <h3 className="text-xl font-serif text-white mb-2">{tier}</h3>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-bold text-white">$\{(i + 1) * 29}</span>
            <span className="text-brand-500 text-sm">/mo</span>
          </div>
          <p className="text-brand-400 text-sm mb-8 flex-1">
            Perfect for {tier.toLowerCase()} projects requiring reliable infrastructure.
          </p>
          <ul className="space-y-4 mb-8 text-sm text-brand-300">
            {['Unlimited Projects', 'Custom Analytics', '24/7 Support'].map((feature, j) => (
              <li key={feature} className={`flex items-center gap-3 ${j > i ? 'opacity-40' : ''}`}>
                <Check size={16} className={j > i ? 'text-brand-600' : 'text-brand-400'} />
                {feature}
              </li>
            ))}
          </ul>
          <button className={`w-full py-3 rounded-xl font-medium transition-colors ${i === 1 ? 'bg-white text-brand-950 hover:bg-brand-100' : 'bg-brand-800 text-white hover:bg-brand-700'}`}>
            Get Started
          </button>
        </motion.div>
      ))}
    </div>
  );
};

const LiveFeatureGrid = () => {
  const features = [
    { icon: Globe, title: 'Global Edge', desc: 'Deploy your interactive UI components to the edge.' },
    { icon: Layout, title: 'Fluid Layouts', desc: 'Auto-scaling configurations for any viewport.' },
    { icon: Lock, title: 'Secure Design', desc: 'Enterprise-grade patterns natively.' },
    { icon: Cpu, title: 'Optimal Performance', desc: 'Zero runtime overhead with native CSS layers.' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {features.map((item, i) => (
        <div key={i} className="p-8 rounded-3xl bg-brand-900/30 border border-brand-800 hover:bg-brand-800/40 hover:border-brand-700 transition-all duration-300 group">
          <div className="w-12 h-12 bg-brand-800/80 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-700 group-hover:shadow-[0_0_15px_rgba(148,163,184,0.2)] transition-all">
            <item.icon size={24} className="text-brand-300 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
          <p className="text-brand-400 text-sm leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};


const LiveHeroBanner = () => {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden glass-card p-12 lg:p-24 flex items-center justify-center text-center">
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-brand-500/20 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/50 border border-brand-800 text-brand-300 text-xs font-mono mb-8"
        >
          <Sparkles size={14} className="text-brand-400" />
          <span>New Feature Release v2.0</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-serif text-white mb-6 leading-tight"
        >
          Design perfectly. <br />
          <span className="italic text-brand-400">Ship instantly.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-brand-400 mb-10 font-light"
        >
          A comprehensive suite of unstyled primitives ready to be customized and deployed to the edge.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-brand-950 font-medium hover:bg-brand-100 transition-colors flex items-center justify-center gap-2">
            Get Started <ArrowRight size={18} />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-900 text-white font-medium border border-brand-800 hover:bg-brand-800 transition-colors">
            View Components
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const LiveAnimatedAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = [
    { title: "What is this framework?", content: "This is a collection of React components tailored for modern, aesthetic web applications." },
    { title: "Can I use it in production?", content: "Absolutely. The components are built using solid primitives and native CSS properties for optimal performance." },
    { title: "Do I need Tailwind CSS?", content: "Yes, Tailwind CSS is strictly required as the components heavily utilize its utility classes." },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className={`glass-card overflow-hidden transition-colors ${isOpen ? 'border-brand-600 bg-brand-900/60' : ''}`}>
            <button 
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            >
              <span className={`font-medium transition-colors ${isOpen ? 'text-white' : 'text-brand-300 hover:text-white'}`}>{item.title}</span>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                <ChevronDown size={20} className={isOpen ? 'text-white' : 'text-brand-500'} />
              </motion.div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="px-6 pb-5 text-brand-400 font-light leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const LiveCallToAction = () => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-brand-900 border border-brand-800 p-12 md:p-20 text-center flex flex-col items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-brand-800/10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
      
      <div className="relative z-10 max-w-xl">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Ready to scale your vision?</h2>
        <p className="text-brand-400 text-lg mb-10 leading-relaxed">
          Join thousands of developers building the next generation of web applications with our primitive components.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 rounded-xl font-medium bg-white text-brand-950 hover:bg-brand-100 transition-colors flex items-center justify-center gap-2 group">
            Start Building <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 rounded-xl font-medium bg-brand-800 text-white hover:bg-brand-700 transition-colors">
            Talk to Sales
          </button>
        </div>
      </div>
    </div>
  );
};

const LiveTestimonialSlider = () => {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "CTO, TechNova",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      text: "The aesthetic out of the box is unmatched. It completely elevated our product's perceived value within days."
    },
    {
      name: "David Chen",
      role: "Lead Designer, Loom & Co",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      text: "Finally, a framework that understands editorial typography and architectural spacing. It's a breath of fresh air."
    },
    {
      name: "Elena Rodriguez",
      role: "Founder, Minimal Studio",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
      text: "The component library we've been waiting for. It feels bespoke, yet scales infinitely across all our client projects."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {testimonials.map((t, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -5 }}
          className="glass-card p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, j) => <Star key={j} size={16} className="text-brand-400 fill-brand-400" />)}
            </div>
            <p className="text-brand-300 text-sm leading-relaxed mb-8">"{t.text}"</p>
          </div>
          <div className="flex items-center gap-4">
            <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-brand-800" />
            <div>
              <p className="text-white text-sm font-medium">{t.name}</p>
              <p className="text-brand-500 text-xs">{t.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const LiveFormControls = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto glass-card p-8 space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-300">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={16} className="text-brand-500" />
            </div>
            <input 
              type="email" 
              className="w-full pl-10 pr-4 py-3 bg-brand-900/50 border border-brand-800 rounded-xl text-white placeholder-brand-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-300">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={16} className="text-brand-500" />
            </div>
            <input 
              type={showPassword ? "text" : "password"} 
              className="w-full pl-10 pr-10 py-3 bg-brand-900/50 border border-brand-800 rounded-xl text-white placeholder-brand-600 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
              placeholder="••••••••"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-500 hover:text-brand-300 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
      </div>
      
      <button className="w-full py-3 bg-white text-brand-950 font-medium rounded-xl hover:bg-brand-100 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        Sign In
      </button>
    </div>
  );
};

const LiveModalDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <button 
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-brand-800 text-white rounded-xl hover:bg-brand-700 transition-colors"
      >
        Trigger Modal
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-brand-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md glass-card p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-brand-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={24} className="text-emerald-500" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Action Successful</h3>
                <p className="text-brand-400 text-sm leading-relaxed mb-8">
                  Your component has been successfully deployed to the edge. Changes will propagate globally within seconds.
                </p>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-white text-brand-950 font-medium rounded-xl hover:bg-brand-100 transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Document Page Views ---

const DocumentContainer = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="pb-32"
  >
    {children}
  </motion.div>
);

const IntroDoc = () => (
  <DocumentContainer>
    <div className="max-w-3xl">
      <div className="inline-block px-3 py-1 rounded-full bg-brand-800 text-brand-300 text-xs font-mono uppercase tracking-widest mb-6">Version 2.0 Docs</div>
      <h1 className="editorial-heading text-5xl md:text-6xl lg:text-7xl mb-8 text-white">Introduction</h1>
      <p className="text-xl md:text-2xl text-brand-300 leading-relaxed mb-12 font-light">
        Welcome to the Web Design Chronicle Documentation. This is a curated, production-ready collection of meticulously crafted layout patterns and UI components.
      </p>

      <div className="w-full h-px bg-gradient-to-r from-brand-800 via-brand-600 to-transparent my-12" />

      <h2 className="editorial-heading text-3xl mt-12 mb-6 text-white">Core Principles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-brand-400 leading-relaxed">
        <div className="glass-card p-8 group">
          <div className="w-10 h-10 bg-brand-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-700 transition-colors">
            <Globe className="text-brand-300 group-hover:text-white" size={20} />
          </div>
          <strong className="text-white block mb-2 text-lg">Aesthetic Harmony</strong>
          Shadows are replaced with subtle borders or faint glow effects to maintain depth natively, providing an elegant and modern mood to every component.
        </div>
        <div className="glass-card p-8 group">
          <div className="w-10 h-10 bg-brand-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-700 transition-colors">
            <Layout className="text-brand-300 group-hover:text-white" size={20} />
          </div>
          <strong className="text-white block mb-2 text-lg">Editorial Typography</strong>
          We pair <em>Playfair Display</em> for structured reasoning and <em>Inter</em> for functional readability. Code and data rely on <em>JetBrains Mono</em>.
        </div>
        <div className="glass-card p-8 md:col-span-2 group">
          <div className="w-10 h-10 bg-brand-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-700 transition-colors">
            <Code className="text-brand-300 group-hover:text-white" size={20} />
          </div>
          <strong className="text-white block mb-2 text-lg">Copy & Paste Ready</strong>
          Find the component you need in the sidebar, observe its interactive preview, click "Code," and drop it straight into your React + Tailwind project.
        </div>
      </div>
    </div>
  </DocumentContainer>
);

const InstallationDoc = () => (
  <DocumentContainer>
    <div className="max-w-3xl">
      <h1 className="editorial-heading text-5xl md:text-6xl mb-6 text-white">Installation</h1>
      <p className="text-xl text-brand-300 leading-relaxed mb-12 font-light">
        Before importing components, ensure your project's foundational CSS and configuration are aligned with our design system.
      </p>

      <div className="p-8 border border-brand-800 rounded-3xl bg-brand-900/30 mb-12">
        <h2 className="editorial-heading text-3xl mb-4 text-white">1. Environment Setup</h2>
        <p className="text-brand-400 mb-6 font-light">
          Every component relies on Tailwind CSS and Motion. Ensure they are installed in your React project.
        </p>
        <CodeBlock code="npm install motion lucide-react" />
      </div>

      <div className="p-8 border border-brand-800 rounded-3xl bg-brand-900/30 mb-12">
        <h2 className="editorial-heading text-3xl mb-4 text-white">2. Typography & Globals</h2>
        <p className="text-brand-400 mb-6 font-light">
          Update your root <code>index.css</code> to inject the brand palette, custom fonts, and core layer classes used across the component library.
        </p>
        <CodeBlock code={`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Playfair Display", ui-serif, Georgia, serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  --color-brand-50: #f8fafc;
  --color-brand-400: #94a3b8;
  --color-brand-500: #64748b;
  --color-brand-600: #475569;
  --color-brand-800: #1e293b;
  --color-brand-900: #0f172a;
  --color-brand-950: #020617;
}

@layer base {
  body {
    @apply bg-brand-950 text-brand-50 antialiased selection:bg-brand-800 selection:text-white;
  }
}

@layer components {
  .editorial-heading {
    @apply font-serif tracking-tight leading-tight;
  }
  .glass-card {
    @apply bg-brand-900/80 backdrop-blur-md border border-brand-800 rounded-2xl;
  }
}`} />
      </div>
    </div>
  </DocumentContainer>
);


// --- Main Application ---

export default function App() {
  const [activeItem, setActiveItem] = useState<NavItem>('Introduction');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNav = useMemo(() => {
    if (!searchQuery) return NAV_STRUCTURE;
    const lowerQuery = searchQuery.toLowerCase();
    
    return NAV_STRUCTURE.map(group => {
      const filteredItems = group.items.filter(item => item.toLowerCase().includes(lowerQuery));
      return { ...group, items: filteredItems };
    }).filter(group => group.items.length > 0);
  }, [searchQuery, NAV_STRUCTURE]);

  return (
    <div className="flex h-screen bg-brand-950 text-brand-50 font-sans overflow-hidden">
      
      {/* Mobile Header Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-brand-800 bg-brand-950/90 backdrop-blur-md z-50 flex items-center justify-between px-6">
        <div className="font-serif font-bold flex items-center gap-2">
          <div className="w-6 h-6 bg-white text-black rounded flex items-center justify-center text-xs">W</div>
          Chronicle
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-brand-300">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-[280px] border-r border-brand-800 bg-brand-950/80 backdrop-blur-xl md:backdrop-blur-none md:bg-brand-950 pt-20 md:pt-8 flex flex-col
        transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="px-6 mb-8">
          <div className="hidden md:flex mb-8 font-serif text-2xl font-bold items-center gap-3">
            <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center text-lg shadow-[0_0_15px_rgba(255,255,255,0.1)]">W</div>
            Chronicle
          </div>
          
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-500" />
            <input 
              type="text" 
              placeholder="Search components..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-900 border border-brand-800 text-white rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 transition-colors placeholder:text-brand-600"
            />
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-6 space-y-8 scrollbar-thin scrollbar-thumb-brand-800 scrollbar-track-transparent pb-8">
          {filteredNav.length === 0 ? (
            <p className="text-sm text-brand-500 text-center py-4">No results found.</p>
          ) : (
            filteredNav.map(group => (
              <div key={group.category}>
                <h4 className="text-[11px] font-mono uppercase tracking-widest text-brand-500 mb-4 flex items-center gap-2">
                  {group.icon}
                  {group.category}
                </h4>
                <ul className="space-y-1">
                  {group.items.map(item => (
                    <li key={item}>
                      <button 
                        onClick={() => {
                          setActiveItem(item);
                          setMobileMenuOpen(false);
                          setSearchQuery('');
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                          activeItem === item 
                            ? 'bg-brand-800 border border-brand-700 text-white font-medium shadow-sm' 
                            : 'border border-transparent text-brand-400 hover:text-brand-100 hover:bg-brand-900/50'
                        }`}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-brand-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,41,59,0.3),transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-800/10 blur-[120px] pointer-events-none rounded-full" />
        
        <main className="flex-1 overflow-y-auto z-10 scrollbar-thin scrollbar-thumb-brand-800 scrollbar-track-transparent">
          <div className="max-w-5xl mx-auto p-6 md:p-12 pt-24 md:pt-16 min-h-full flex flex-col">
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {activeItem === 'Introduction' && <IntroDoc key="intro" />}
                {activeItem === 'Installation' && <InstallationDoc key="install" />}
                
                {activeItem === 'Hero Banner' && (
                  <DocumentContainer key="hero">
                    <ComponentPreview 
                      title="Hero Banner" 
                      description="A commanding entry point designed to establish brand authority instantaneously upon page load."
                      code={Snippets.HERO_BANNER_CODE}
                      explanation={{
                        whenToUse: "The very first container a user encounters on a landing page. Essential for establishing the brand's primary value proposition boldly.",
                        benefits: "Captures immediate attention. Its generous padding and centralized text alignment funnel the user's focus straight to the primary Call-to-Action.",
                        effects: "Employs staggered fade-up animations on load, coupled with an ambient backing glow behind the main typographic centerpiece.",
                        importance: "You have less than three seconds to hook a visitor. A commanding hero banner determines whether the user decides to scroll down or bounce."
                      }}
                    >
                      <LiveHeroBanner />
                    </ComponentPreview>
                  </DocumentContainer>
                )}

                {activeItem === 'Bento Grid' && (
                  <DocumentContainer key="bento">
                    <ComponentPreview 
                      title="The Bento Grid" 
                      description="A robust, responsive dashboard layout organizing hierarchical information into digestible, card-based zones using CSS Grids."
                      code={Snippets.BENTO_GRID_CODE}
                      explanation={{
                        whenToUse: "Use when you have diverse content formats—metrics, charts, small notes, imagery—that need to be presented coherently on a dashboard or landing page without causing visual clutter.",
                        benefits: "It inherently provides a robust and responsive grid system that adapts perfectly to different viewports, establishing clear hierarchy and organization naturally.",
                        effects: "Creates a modular, tile-based appearance. Includes subtle hover scale effects on individual tiles to provide tactile feedback and maintain engagement without shifting the entire layout.",
                        importance: "It serves as a highly scalable pattern. As new data elements need to be added, they can simply be inserted into a new module within the overall grid framework, preserving harmony."
                      }}
                    >
                      <LiveBentoGrid />
                    </ComponentPreview>
                  </DocumentContainer>
                )}

                {activeItem === 'Feature Grid' && (
                  <DocumentContainer key="feature">
                    <ComponentPreview 
                      title="Feature Grid" 
                      description="A balanced 2x2 layout showcasing product capabilities with elegant hover state transitions."
                      code={Snippets.FEATURE_GRID_CODE}
                      explanation={{
                        whenToUse: "Ideal for product landing pages and documentation sections to highlight sets of independent but equally important capabilities. Typically used with 4 to 6 core features.",
                        benefits: "Groups related information into easily scannable segments. The consistent size and iconography quickly convey value propositions to readers.",
                        effects: "Features aesthetic hover transitions where internal icons lift or glow, and borders subtly illuminate. This invites the user's cursor to interact with the elements.",
                        importance: "It breaks text-heavy pages into digestible visuals. Instead of a long monotonous list, features become a captivating display that boosts user retention."
                      }}
                    >
                      <LiveFeatureGrid />
                    </ComponentPreview>
                  </DocumentContainer>
                )}

                {activeItem === 'Pricing Table' && (
                  <DocumentContainer key="pricing">
                    <ComponentPreview 
                      title="Pricing Table" 
                      description="A tiered pricing format featuring prominent highlights for the middle option with animated structural elevations."
                      code={Snippets.PRICING_TABLE_CODE}
                      explanation={{
                        whenToUse: "Crucial for SaaS and subscription-based products. Use it to present tiered offerings and distinguish the best value plan cleanly.",
                        benefits: "Clearly delineates pricing boundaries and feature limits. Centralizing and visually elevating the most popular tier increases conversion rates.",
                        effects: "The middle tier uses structural elevation (y-axis offsets), heavier borders, and background gradients to command authority. Interaction highlights differences.",
                        importance: "The pricing table is often the final hurdle prior to checkout. Confidence-inspiring typography and distinct separation are critical for a positive checkout mentality."
                      }}
                    >
                      <LivePricingTable />
                    </ComponentPreview>
                  </DocumentContainer>
                )}

                {activeItem === 'Glass Card' && (
                  <DocumentContainer key="glasscard">
                    <ComponentPreview 
                      title="Glass Card" 
                      description="Our foundational container element combining semantic layer grouping with an aesthetic frosted-glass blur over brand-colored backgrounds."
                      code={Snippets.GLASS_CARD_CODE}
                      centered
                      explanation={{
                        whenToUse: "Serve as the foundational base for any floating content, modals, or grid items. Perfect for dark interfaces requiring depth without using stark solid colors.",
                        benefits: "By bleeding background colors and gradients softly through the card, it naturally roots the component to its environment, creating a cohesive atmospheric layer.",
                        effects: "Achieves depth via backdrop blurring (`backdrop-blur-md`) and semi-transparent backgrounds (`bg-brand-900/80`), entirely dropping standard box shadows.",
                        importance: "Standardizes visual grouping logic across the entire application interface. Providing a single unified 'surface' component ensures a consistent aesthetic experience."
                      }}
                    >
                      <div className="glass-card p-12 max-w-sm w-full text-center group cursor-pointer hover:bg-brand-900/90 transition-colors">
                        <div className="w-16 h-16 bg-brand-800 rounded-2xl mx-auto flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-700 transition-all duration-300">
                          <LayoutTemplate size={24} className="text-white" />
                        </div>
                        <h3 className="font-serif text-2xl mb-2 text-white">Glass Base</h3>
                        <p className="text-brand-400 text-sm">Provides depth without requiring drop shadows.</p>
                      </div>
                    </ComponentPreview>
                  </DocumentContainer>
                )}

                {activeItem === 'Interactive Tabs' && (
                  <DocumentContainer key="tabs">
                    <ComponentPreview 
                      title="Interactive Tabs" 
                      description="Fluid segment navigation using animated layout projections to indicate current active state."
                      code={Snippets.TABS_CODE}
                      centered
                      explanation={{
                        whenToUse: "Apply when there are multiple related views or complex settings that reside in the same context, yet displaying them all simultaneously would overwhelm the user.",
                        benefits: "Maintains context while saving screen real estate. Prevents layout jumps when navigating between closely tied pieces of information.",
                        effects: "Implements fluid layout projections (using Framer Motion) to animate the active indicator line smoothly underneath the selected segment without sudden snaps.",
                        importance: "They provide a direct spatial mapping constraint, enabling users to effortlessly form a mental model of where related categories reside within a single view."
                      }}
                    >
                      <LiveInteractiveTabs />
                    </ComponentPreview>
                  </DocumentContainer>
                )}

                {activeItem === 'Split Screen' && (
                  <DocumentContainer key="split">
                    <ComponentPreview 
                      title="Editorial Split Screen" 
                      description="A balanced page-level primitive mapping strong typographic headlines to dedicated visual stages."
                      code={Snippets.SPLIT_SCREEN_CODE}
                      explanation={{
                        whenToUse: "Best for login screens, sign-up flows, or distinct section heroes where textual messaging holds equal footing with a primary visual element.",
                        benefits: "Provides a balanced 50/50 division that prevents either text or imagery from overpowering the other, maintaining pure asymmetrical balance.",
                        effects: "Typically paired with subtle parralax on the image side and consistent geometric patterns behind the text to reinforce its architectural solidity.",
                        importance: "Directs user attention efficiently. It forces an editorial standard that aligns with magazine layouts, establishing high brand authority instantaneously."
                      }}
                    >
                      <LiveSplitScreen />
                    </ComponentPreview>
                  </DocumentContainer>
                )}
                
                {activeItem === 'Animated Accordion' && (
                  <DocumentContainer key="accordion">
                    <ComponentPreview 
                      title="Animated Accordion" 
                      description="A space-saving disclosure widget that smoothly expands and collapses detailed information panes."
                      code={Snippets.ACCORDION_CODE}
                      explanation={{
                        whenToUse: "Strictly for FAQs, dense technical details, or nested navigation structures where users need the agency to reveal information only when interested.",
                        benefits: "Drastically reduces the perceived complexity and vertical length of a page. Users are only shown what they actively seek to read.",
                        effects: "A smooth, physics-based expansion and contraction effect that accurately calculates content height, preventing jarring layout shifts during interaction.",
                        importance: "Essential for content density control. It respects the user's cognitive load by hiding secondary explanations until explicitly requested."
                      }}
                    >
                      <LiveAnimatedAccordion />
                    </ComponentPreview>
                  </DocumentContainer>
                )}

                {activeItem === 'Call to Action' && (
                  <DocumentContainer key="calltoaction">
                    <ComponentPreview 
                      title="Call to Action" 
                      description="A high-contrast conversion section engineered to drive immediate user engagement at page endpoints."
                      code={Snippets.CTA_CODE}
                      explanation={{
                        whenToUse: "Place at the bottom of landing pages, documentation sites, or feature pages right before the footer. It represents the final pitch.",
                        benefits: "Cuts through visual noise to present a singular, unavoidable directive. Offers primary and secondary paths (e.g. 'Start Building' vs 'Talk to Sales').",
                        effects: "Employs an underlying radial ambient gradient and dot-matrix grid to provide technical depth, paired with a noticeable button hover translation.",
                        importance: "If the user has scrolled to the bottom, they are interested. A weak CTA abandons them; a strong one converts them into active users."
                      }}
                    >
                      <LiveCallToAction />
                    </ComponentPreview>
                  </DocumentContainer>
                )}

                {activeItem === 'Testimonials' && (
                  <DocumentContainer key="testimonials">
                    <ComponentPreview 
                      title="Testimonial Slider" 
                      description="A grid of social proof cards elevating customer feedback through elegant typography and rating markers."
                      code={Snippets.TESTIMONIALS_CODE}
                      explanation={{
                        whenToUse: "Crucial for marketing and landing pages where establishing trust is required prior to introducing pricing or signup flows.",
                        benefits: "Humanizes the framework by showcasing real-world adoption. The consistent card structure allows varied text lengths to reside harmoniously.",
                        effects: "Subtle localized card lifting on hover (`-y: 5`) and persistent architectural glowing via the underlying glass card primitive.",
                        importance: "Social proof is consistently the highest converting element in modern design. Displaying it natively within the component language reinforces credibility."
                      }}
                    >
                      <LiveTestimonialSlider />
                    </ComponentPreview>
                  </DocumentContainer>
                )}

                {activeItem === 'Form Controls' && (
                  <DocumentContainer key="formcontrols">
                    <ComponentPreview 
                      title="Form Controls" 
                      description="Accessible, aesthetic inputs complete with icon integration, focus states, and interactive toggles."
                      code={Snippets.FORM_CONTROLS_CODE}
                      centered
                      explanation={{
                        whenToUse: "For authentication panels, settings pages, and any data-mutation interfaces. Replaces standard browser default inputs immediately.",
                        benefits: "Provides immediate visual feedback upon interaction. Integrates localized icons to reinforce placeholder intent without requiring external wrappers.",
                        effects: "Subtle but crisp ring highlighting (`focus:ring-brand-500`) upon active focus, with smooth transition timings on border coloration.",
                        importance: "Forms are the most sensitive interaction points. Polished, trusted inputs directly correlate with lower abandonment rates during signup."
                      }}
                    >
                      <LiveFormControls />
                    </ComponentPreview>
                  </DocumentContainer>
                )}

                {activeItem === 'Modal Dialog' && (
                  <DocumentContainer key="modal">
                    <ComponentPreview 
                      title="Modal Dialog" 
                      description="A highly-focused interception overlay utilizing backdrop blurring and physics-based entrance scaling."
                      code={Snippets.MODAL_DIALOG_CODE}
                      centered
                      explanation={{
                        whenToUse: "When critical information must be acknowledged, or when a branched workflow (like setting up a new project) requires full, undivided attention.",
                        benefits: "Prevents navigating away from the current context while forcing resolution of the presented task.",
                        effects: "AnimatePresence manages an elegant backdrop fade while the modal itself employs a slight scale-up (`0.95` to `1.0`) mimicking natural physical emergence.",
                        importance: "Proper z-index stacking and visual obfuscation (backdrop-blur) guarantee that the user understands the underlying application state is temporarily paused."
                      }}
                    >
                      <LiveModalDialog />
                    </ComponentPreview>
                  </DocumentContainer>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <footer className="pt-12 pb-6 mt-12 border-t border-brand-800/50 flex flex-col items-center justify-center gap-6 opacity-80">
              <div className="flex flex-col gap-3 items-center text-center">
                <p className="text-brand-400 text-sm flex items-center gap-2">
                  Built with precision by <strong className="text-white font-medium">Sajjad</strong>
                </p>
                <div className="flex items-center justify-center gap-4">
                  <a href="https://github.com/sajjadh09" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-white transition-colors" title="GitHub">
                    <Github size={18} />
                  </a>
                  <a href="https://ng.linkedin.com/in/sajjad-hassan-031ab1366" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-white transition-colors" title="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                  <a href="https://wa.me/2349162443993" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-white transition-colors" title="WhatsApp">
                    <MessageCircle size={18} />
                  </a>
                  <a href="https://t.me/sajdexx" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-white transition-colors" title="Telegram">
                    <Send size={18} />
                  </a>
                </div>
              </div>
              <div className="flex justify-center gap-6 text-sm font-mono text-brand-500">
                <a href="#" className="hover:text-white transition-colors">v2.0.0</a>
                <a href="#" className="hover:text-white transition-colors">MIT License</a>
              </div>
            </footer>
          </div>
        </main>
      </div>

    </div>
  );
}
