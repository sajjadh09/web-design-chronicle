export const BENTO_GRID_CODE = `import { Cpu } from 'lucide-react';
import { motion } from 'motion/react';

export const BentoGrid = () => (
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

    <div className="md:col-span-1 md:row-span-2 bg-white text-brand-950 rounded-2xl p-6 shadow-xl">
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
);`;

export const GLASS_CARD_CODE = `import React from 'react';

/**
 * A reusable Glass Card component providing a modern frosted glass effect.
 * Add @apply bg-brand-900/80 backdrop-blur-md border border-brand-800 rounded-2xl to a .glass-card class in index.css.
 */
export const GlassCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={\`glass-card p-8 \${className}\`}>
      {children}
    </div>
  );
};`;

export const TABS_CODE = `import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const InteractiveTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Overview', 'Features', 'Analytics'];

  return (
    <div className="w-full max-w-md glass-card p-8">
      <div className="flex gap-4 mb-6 border-b border-brand-800">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={\`pb-3 text-sm font-medium transition-colors relative flex-1 text-center \${
              activeTab === i ? 'text-white' : 'text-brand-400 hover:text-brand-200'
            }\`}
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
};`;

export const SPLIT_SCREEN_CODE = `export const SplitScreen = () => {
  return (
    <div className="flex flex-col md:flex-row h-[400px] w-full rounded-2xl overflow-hidden border border-brand-800">
      <div className="w-full md:w-1/2 bg-brand-900 border-r border-brand-800 p-12 flex flex-col justify-center relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
        
        <h2 className="text-4xl font-serif mb-4 text-white z-10">Editorial Split</h2>
        <p className="text-brand-400 z-10 max-w-sm leading-relaxed">
          Perfect for distinct separation of visual and textual priorities on landing pages.
        </p>
      </div>
      <div className="w-full md:w-1/2 bg-brand-950 relative overflow-hidden flex items-center justify-center group">
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Abstract architectural rendering" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-brand-950/40 mix-blend-multiply" />
        <span className="text-white font-mono text-sm tracking-widest uppercase z-10 relative bg-brand-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-brand-800">Visual Focus Area</span>
      </div>
    </div>
  );
};`;

export const PRICING_TABLE_CODE = `import { Check } from 'lucide-react';
import { motion } from 'motion/react';

export const PricingTable = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
      {[ 'Starter', 'Professional', 'Enterprise' ].map((tier, i) => (
        <motion.div 
          key={tier}
          whileHover={{ y: -8 }}
          className={\`glass-card p-8 flex flex-col relative overflow-hidden \${i === 1 ? 'border-brand-400/50 bg-brand-800/40' : ''}\`}
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
              <li key={feature} className={\`flex items-center gap-3 \${j > i ? 'opacity-40' : ''}\`}>
                <Check size={16} className={j > i ? 'text-brand-600' : 'text-brand-400'} />
                {feature}
              </li>
            ))}
          </ul>
          <button className={\`w-full py-3 rounded-xl font-medium transition-colors \${i === 1 ? 'bg-white text-brand-950 hover:bg-brand-100' : 'bg-brand-800 text-white hover:bg-brand-700'}\`}>
            Get Started
          </button>
        </motion.div>
      ))}
    </div>
  );
};`;

export const FEATURE_GRID_CODE = `import { motion } from 'motion/react';
import { Cpu, Layout, Globe, Lock } from 'lucide-react';

export const FeatureGrid = () => {
  const features = [
    { icon: Globe, title: 'Global Edge', desc: 'Deploy your interactive UI components to the edge.' },
    { icon: Layout, title: 'Fluid Layouts', desc: 'Auto-scaling configurations for any viewport.' },
    { icon: Lock, title: 'Secure Design', desc: 'Enterprise-grade patterns natively.' },
    { icon: Cpu, title: 'Optimal Performance', desc: 'Zero runtime overhead with native CSS layers.' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {features.map((item, i) => (
        <div key={i} className="p-8 rounded-2xl bg-brand-900/30 border border-brand-800 hover:bg-brand-800/30 transition-colors group">
          <div className="w-12 h-12 bg-brand-800/80 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-700 transition-colors">
            <item.icon size={24} className="text-brand-300 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
          <p className="text-brand-400 text-sm leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};`;

export const HERO_BANNER_CODE = `import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroBanner = () => {
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
};`;

export const ACCORDION_CODE = `import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export const AnimatedAccordion = () => {
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
          <div key={i} className={\`glass-card overflow-hidden transition-colors \${isOpen ? 'border-brand-600 bg-brand-900/60' : ''}\`}>
            <button 
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            >
              <span className={\`font-medium transition-colors \${isOpen ? 'text-white' : 'text-brand-300 hover:text-white'}\`}>{item.title}</span>
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
};`;

export const CTA_CODE = `import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const CallToAction = () => {
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
};`;

export const TESTIMONIALS_CODE = `import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export const TestimonialSlider = () => {
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
};`;

export const FORM_CONTROLS_CODE = `import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export const FormControls = () => {
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
};`;

export const MODAL_DIALOG_CODE = `import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';

export const ModalDialog = () => {
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
};`;
