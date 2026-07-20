import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  Calendar,
  DollarSign,
  Users,
  MessageSquare,
  MapPin,
  Clock,
  Star,
  Check,
  Building2,
  Smartphone,
  CreditCard,
  FileText,
  Lock,
  ChevronRight,
  Play
} from 'lucide-react';

export const LandingPage = () => {
  const { setIsLoggedIn, setActiveTab, showToast } = useApp();

  // ROI Calculator State
  const [cleanersCount, setCleanersCount] = useState(6);
  const [jobsPerMonth, setJobsPerMonth] = useState(120);

  // Pricing State
  const [isAnnual, setIsAnnual] = useState(true);

  // Active Feature Preview Tab
  const [activeFeatureTab, setActiveFeatureTab] = useState('scheduling');

  // Auth Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signup'); // 'signup' | 'signin'
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // Calculate ROI Metrics
  const hoursSavedPerMonth = Math.round(cleanersCount * 14.5);
  const additionalRevenuePerMonth = Math.round((jobsPerMonth * 0.18) * 185);

  const handleLaunchCRM = (role = 'owner') => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setIsLoggedIn(true);
    setActiveTab('dashboard');
    showToast(`Welcome to SimplyClean CRM! Logged in as ${role}.`);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    handleLaunchCRM('owner');
  };

  return (
    <div className="min-h-screen bg-[#FAF8FC] text-obsidian-900 font-sans selection:bg-purple-200">
      
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-purple-200/60 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-obsidian-900 rounded-2xl flex items-center justify-center shadow-soft border border-purple-300">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <span className="font-heading text-2xl font-bold tracking-tight text-obsidian-900">Simply<span className="text-purple-600">Clean</span></span>
              <span className="ml-2 px-2 py-0.5 text-[11px] font-semibold bg-yellow-100 text-yellow-800 rounded-full border border-yellow-300/60">CRM</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-obsidian-600">
            <a href="#features" className="hover:text-purple-600 transition-colors">Core Features</a>
            <a href="#roi-calculator" className="hover:text-purple-600 transition-colors">ROI Calculator</a>
            <a href="#pricing" className="hover:text-purple-600 transition-colors">Subscription Plans</a>
            <a href="#integrations" className="hover:text-purple-600 transition-colors">Integrations</a>
            <a href="#reviews" className="hover:text-purple-600 transition-colors">Reviews</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setAuthMode('signin'); setShowAuthModal(true); }}
              className="px-4 py-2.5 text-sm font-semibold text-obsidian-800 hover:text-purple-700 transition-colors">
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
              className="px-5 py-2.5 bg-obsidian-900 hover:bg-obsidian-800 text-white text-sm font-bold rounded-2xl shadow-soft hover:shadow-soft-lg transition-all flex items-center gap-2 border border-purple-300/40">
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4 text-yellow-300" />
            </button>
          </div>

        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-pastel-grid">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-300/80 text-purple-900 text-xs font-semibold mb-8 shadow-sm animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Built Specifically for Residential & Commercial Cleaning Business Owners</span>
          </div>

          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-obsidian-900 leading-[1.1] max-w-4xl mx-auto">
            Clean Operations.<br />
            <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-yellow-600 bg-clip-text text-transparent">
              Brighter Margins.
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-obsidian-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Eliminate paper quotes, missing invoices, and dispatch chaos. SimplyClean gives your cleaning company automated scheduling, instant quote estimation, SMS alerts, and Stripe billing — all in one aesthetic workspace.
          </p>

          {/* Hero Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
              className="w-full sm:w-auto px-8 py-4 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-base border border-purple-300/40">
              <span>Start 14-Day Free Trial</span>
              <ArrowRight className="w-5 h-5 text-yellow-300" />
            </button>
            <button
              onClick={() => handleLaunchCRM('owner')}
              className="w-full sm:w-auto px-7 py-4 bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold rounded-2xl border border-purple-300 transition-all flex items-center justify-center gap-2 text-base">
              <Play className="w-4 h-4 fill-purple-900 text-purple-900" />
              <span>Explore Interactive CRM Demo</span>
            </button>
          </div>

          {/* Guarantee Badges */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-obsidian-500 font-medium">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-purple-600" /> No credit card required</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-yellow-600" /> 1-Click QuickBooks Sync</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Setup in under 5 minutes</div>
          </div>

          {/* Interactive Live Preview Mockup Card */}
          <div className="mt-14 max-w-5xl mx-auto bg-white rounded-3xl p-3 md:p-4 shadow-soft-lg border border-purple-200">
            <div className="bg-obsidian-900 rounded-2xl p-4 md:p-6 text-left text-white shadow-inner">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-obsidian-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="ml-3 text-xs text-obsidian-400 font-mono">simplyclean-app.com/dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[11px] bg-purple-900/80 text-purple-200 rounded-full font-medium border border-purple-500/40">
                    Live SimplyClean Workspace Preview
                  </span>
                </div>
              </div>

              {/* Mockup Dashboard Body */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Card 1 */}
                <div className="p-4 bg-obsidian-800/80 rounded-xl border border-purple-500/20">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-obsidian-400 font-medium">Today's Revenue</span>
                    <span className="px-2 py-0.5 text-[10px] bg-yellow-400/20 text-yellow-300 font-semibold rounded-full">+24% vs last week</span>
                  </div>
                  <div className="mt-2 text-2xl font-bold font-heading text-white">$1,840.00</div>
                  <div className="mt-1 text-xs text-obsidian-400">7 Cleaning jobs completed</div>
                </div>

                {/* Card 2 */}
                <div className="p-4 bg-obsidian-800/80 rounded-xl border border-purple-500/20">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-obsidian-400 font-medium">Active Dispatch Crews</span>
                    <span className="px-2 py-0.5 text-[10px] bg-purple-400/20 text-purple-300 font-semibold rounded-full">3 Routes En Route</span>
                  </div>
                  <div className="mt-2 text-2xl font-bold font-heading text-white">6 Cleaners On Site</div>
                  <div className="mt-1 text-xs text-obsidian-400">South & Commercial Routes</div>
                </div>

                {/* Card 3 */}
                <div className="p-4 bg-obsidian-800/80 rounded-xl border border-purple-500/20">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-obsidian-400 font-medium">Auto-Invoices Paid</span>
                    <span className="px-2 py-0.5 text-[10px] bg-emerald-400/20 text-emerald-300 font-semibold rounded-full">Stripe Instant</span>
                  </div>
                  <div className="mt-2 text-2xl font-bold font-heading text-white">100% Collected</div>
                  <div className="mt-1 text-xs text-obsidian-400">$0 Overdue payments</div>
                </div>

              </div>

              <div className="mt-4 p-4 bg-purple-950/40 rounded-xl border border-purple-400/30 flex items-center justify-between text-xs text-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 text-obsidian-950 flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">SimplyClean AI Assistant:</span> "All 3 morning commercial cleans verified with before/after photos. Invoices sent automatically!"
                  </div>
                </div>
                <button
                  onClick={() => handleLaunchCRM('owner')}
                  className="px-3 py-1.5 bg-yellow-300 hover:bg-yellow-400 text-obsidian-950 font-bold rounded-lg transition-all shrink-0">
                  Open CRM Workspace →
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. Interactive ROI & Time Savings Calculator */}
      <section id="roi-calculator" className="py-20 bg-white border-y border-purple-200">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 text-xs font-bold bg-yellow-100 text-yellow-800 rounded-full border border-yellow-300">
              Interactive ROI Calculator
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-obsidian-900">
              See How Much Time & Revenue You Gain
            </h2>
            <p className="mt-3 text-obsidian-600 text-base">
              Adjust the sliders below to calculate your estimated monthly operational savings when switching to SimplyClean.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-purple-50/50 p-8 rounded-3xl border border-purple-200 shadow-soft">
            
            {/* Sliders Side */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Slider 1: Active Cleaners */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-obsidian-800 flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span>Number of Active Cleaners / Staff:</span>
                  </label>
                  <span className="px-3 py-1 bg-obsidian-900 text-white font-bold rounded-xl text-sm">
                    {cleanersCount} Cleaners
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={cleanersCount}
                  onChange={(e) => setCleanersCount(Number(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Slider 2: Monthly Cleaning Jobs */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-obsidian-800 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-600" />
                    <span>Estimated Monthly Jobs:</span>
                  </label>
                  <span className="px-3 py-1 bg-obsidian-900 text-white font-bold rounded-xl text-sm">
                    {jobsPerMonth} Jobs / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={jobsPerMonth}
                  onChange={(e) => setJobsPerMonth(Number(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              <div className="p-4 bg-white rounded-2xl border border-purple-200 text-xs text-obsidian-600 space-y-1">
                <div className="font-semibold text-purple-900">✨ How this calculation works:</div>
                <div>• Saves ~14.5 hours per cleaner/mo by automating scheduling, SMS dispatch & quote follow-ups.</div>
                <div>• Increases quote conversion by ~18% through instant estimate links & auto-reminders.</div>
              </div>

            </div>

            {/* Results Side */}
            <div className="lg:col-span-5 bg-obsidian-900 text-white rounded-2xl p-8 border border-purple-300/40 shadow-soft-lg space-y-6">
              <div className="text-xs text-purple-300 font-bold uppercase tracking-wider">
                Estimated Monthly Savings
              </div>

              <div>
                <div className="text-xs text-obsidian-400">Admin Hours Saved Each Month</div>
                <div className="text-4xl font-bold font-heading text-yellow-300 mt-1">
                  {hoursSavedPerMonth} Hours
                </div>
                <div className="text-xs text-obsidian-400 mt-1">Equivalent to 2 full work weeks of manual entry saved</div>
              </div>

              <div className="pt-4 border-t border-obsidian-800">
                <div className="text-xs text-obsidian-400">Estimated Monthly Revenue Unlocked</div>
                <div className="text-4xl font-bold font-heading text-purple-300 mt-1">
                  +${additionalRevenuePerMonth.toLocaleString()} / mo
                </div>
                <div className="text-xs text-obsidian-400 mt-1">From faster quote response rates & zero missed invoices</div>
              </div>

              <button
                onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                className="w-full py-3.5 bg-yellow-300 hover:bg-yellow-400 text-obsidian-950 font-bold rounded-xl shadow-soft transition-all text-sm flex items-center justify-center gap-2">
                <span>Claim Your Saved Hours Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Core Features Showcase */}
      <section id="features" className="py-24 bg-[#FAF8FC]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 text-xs font-bold bg-purple-100 text-purple-800 rounded-full border border-purple-300">
              Complete Feature Suite
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-5xl font-bold text-obsidian-900">
              Everything Your Cleaning Business Needs
            </h2>
            <p className="mt-3 text-obsidian-600 text-base">
              Designed from the ground up to handle residential deep cleans, recurring maid services, and commercial janitorial operations.
            </p>
          </div>

          {/* Feature Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: 'scheduling', label: 'Smart Scheduling & Routes', icon: Calendar },
              { id: 'estimator', label: 'Instant Quoting Estimator', icon: DollarSign },
              { id: 'dispatch', label: 'Crew Dispatch & Photo Proof', icon: Smartphone },
              { id: 'invoicing', label: 'Stripe & QuickBooks Invoicing', icon: FileText },
              { id: 'messaging', label: 'Twilio SMS & Multi-Inbox', icon: MessageSquare }
            ].map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeFeatureTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFeatureTab(tab.id)}
                  className={`px-5 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2.5 transition-all ${
                    isActive
                      ? 'bg-obsidian-900 text-white shadow-soft border border-purple-300/40'
                      : 'bg-white text-obsidian-700 hover:bg-purple-100/50 border border-purple-200'
                  }`}>
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-yellow-300' : 'text-purple-600'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Showcase Box */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-purple-200 shadow-soft-lg">
            {activeFeatureTab === 'scheduling' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold">
                    <Calendar className="w-6 h-6 text-purple-700" />
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-obsidian-900">
                    Drag-and-Drop Drag Scheduling & Route Optimization
                  </h3>
                  <p className="text-obsidian-600 leading-relaxed text-sm md:text-base">
                    Organize your cleaning schedule by day, week, or route. SimplyClean automatically groups client jobs by geographic neighborhood to minimize cleaner drive time and fuel costs.
                  </p>
                  <ul className="space-y-3 text-sm text-obsidian-700 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Conflict-free scheduling across multiple cleaner crews</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Automated calendar sync with Google Calendar & iCal</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Live route map view with real-time GPS tracking status</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200 space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-sm flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-obsidian-900">4810 Shoal Creek Blvd</div>
                      <div className="text-xs text-obsidian-500">David & Karen Miller • Weekly Clean</div>
                    </div>
                    <span className="px-3 py-1 text-xs bg-emerald-100 text-emerald-800 font-bold rounded-full">Completed</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-sm flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-obsidian-900">742 Evergreen Terrace</div>
                      <div className="text-xs text-obsidian-500">Emily Watson • Deep Clean (4 Bed)</div>
                    </div>
                    <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 font-bold rounded-full">In Progress</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-sm flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-obsidian-900">800 E 6th St (Commercial)</div>
                      <div className="text-xs text-obsidian-500">Apex Design Studio • 6:00 PM</div>
                    </div>
                    <span className="px-3 py-1 text-xs bg-purple-100 text-purple-800 font-bold rounded-full">Scheduled</span>
                  </div>
                </div>
              </div>
            )}

            {activeFeatureTab === 'estimator' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-900 flex items-center justify-center font-bold">
                    <DollarSign className="w-6 h-6 text-yellow-700" />
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-obsidian-900">
                    Instant Quote Estimator & SMS Quote Link
                  </h3>
                  <p className="text-obsidian-600 leading-relaxed text-sm md:text-base">
                    Calculate accurate quotes in under 10 seconds based on square footage, room counts, and cleaning type (Deep Clean, Standard, Move-in/Move-out, Airbnb). Send quote approval links directly to clients via SMS or email.
                  </p>
                  <ul className="space-y-3 text-sm text-obsidian-700 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-600" /> Instant online booking form widget for your website</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-600" /> Custom add-ons pricing (Oven interior, Fridge, Windows)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-600" /> 1-Click convert approved quotes directly into active jobs</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200 space-y-3">
                  <div className="text-xs font-bold text-yellow-900 uppercase">Live Quote Calculator Widget</div>
                  <div className="bg-white p-4 rounded-xl border border-yellow-200 space-y-3 text-xs">
                    <div className="flex justify-between"><span>Service: Deep Clean (2,400 sqft)</span><span className="font-bold">$220.00</span></div>
                    <div className="flex justify-between"><span>Bedrooms: 4 / Bathrooms: 3</span><span className="font-bold">Included</span></div>
                    <div className="flex justify-between"><span>Add-on: Inside Oven Cleaning</span><span className="font-bold">+$35.00</span></div>
                    <div className="pt-2 border-t flex justify-between font-bold text-sm text-obsidian-900">
                      <span>Total Estimated Price:</span>
                      <span className="text-purple-700">$255.00</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="px-4 py-2 bg-obsidian-900 text-yellow-300 font-bold rounded-xl text-xs inline-block">
                      ⚡ Sent to Client via Twilio SMS
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeFeatureTab === 'dispatch' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold">
                    <Smartphone className="w-6 h-6 text-purple-700" />
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-obsidian-900">
                    Cleaner Mobile Dispatch & Before/After Photo Inspection
                  </h3>
                  <p className="text-obsidian-600 leading-relaxed text-sm md:text-base">
                    Give your cleaners a mobile-friendly view with entry codes, pet warnings, room checklists, and before/after photo uploads for 100% quality assurance.
                  </p>
                  <ul className="space-y-3 text-sm text-obsidian-700 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Secure entry codes & gate instructions visible to assigned crew only</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Room-by-room completion checklist verification</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Photo proof attached automatically to client receipts</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200 grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-purple-200 text-center">
                    <div className="text-[11px] font-bold text-obsidian-500 mb-2">Before Cleaning</div>
                    <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&q=80" className="w-full h-32 object-cover rounded-lg" alt="Before" />
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-200 text-center">
                    <div className="text-[11px] font-bold text-emerald-600 mb-2">After SimplyClean ✨</div>
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80" className="w-full h-32 object-cover rounded-lg" alt="After" />
                  </div>
                </div>
              </div>
            )}

            {activeFeatureTab === 'invoicing' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-900 flex items-center justify-center font-bold">
                    <FileText className="w-6 h-6 text-yellow-700" />
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-obsidian-900">
                    Automated Stripe Invoicing & 1-Click QuickBooks Sync
                  </h3>
                  <p className="text-obsidian-600 leading-relaxed text-sm md:text-base">
                    As soon as a cleaner taps "Job Complete", SimplyClean generates an invoice, applies sales tax, charges the client's saved card on file via Stripe, and syncs directly into QuickBooks Online.
                  </p>
                  <ul className="space-y-3 text-sm text-obsidian-700 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-600" /> Integrated Stripe payment gateway (Credit Card, Apple Pay, ACH)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-600" /> Automatic late payment follow-ups & recurring billing</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-600" /> Printable PDF invoices & client payment receipts</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200 space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-yellow-200 shadow-sm flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-obsidian-900 text-sm">Invoice #INV-2026-001</span>
                      <div className="text-obsidian-500">Client: David & Karen Miller</div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full">PAID ($211.09)</span>
                  </div>
                  <div className="p-3 bg-purple-900 text-white rounded-xl text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-300" />
                      <span>QuickBooks Sync Logged: 1 Record Updated</span>
                    </div>
                    <span className="text-[10px] bg-purple-800 px-2 py-0.5 rounded font-mono">Synced</span>
                  </div>
                </div>
              </div>
            )}

            {activeFeatureTab === 'messaging' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold">
                    <MessageSquare className="w-6 h-6 text-purple-700" />
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-obsidian-900">
                    Twilio SMS Reminders & Multi-Channel Shared Inbox
                  </h3>
                  <p className="text-obsidian-600 leading-relaxed text-sm md:text-base">
                    Keep your office, clients, and cleaners on the same page. Automated SMS reminders are sent 24 hours and 1 hour before scheduled cleans to eliminate locked gate delays.
                  </p>
                  <ul className="space-y-3 text-sm text-obsidian-700 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Automated "Cleaner En Route" SMS notification with estimated arrival</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Post-cleaning Google review request triggered automatically</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Shared inbox for client SMS text replies & email inquiries</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200 space-y-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-purple-200 space-y-1">
                    <div className="text-obsidian-400 font-medium">Twilio Automated SMS • Today 08:30 AM</div>
                    <div className="text-obsidian-900 font-semibold">"Hi Emily! SimplyClean crew (Elena) is scheduled to arrive at 1:00 PM today. Reply 1 to confirm entry."</div>
                  </div>
                  <div className="p-3 bg-purple-200 text-purple-950 rounded-xl space-y-1 ml-4">
                    <div className="text-purple-800 font-medium">Emily Watson • Today 08:32 AM</div>
                    <div className="font-semibold">"Confirmed! Dog is locked in master bedroom."</div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 5. Subscription Plans & Pricing */}
      <section id="pricing" className="py-24 bg-white border-t border-purple-200">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3.5 py-1 text-xs font-bold bg-yellow-100 text-yellow-800 rounded-full border border-yellow-300">
              Simple Transparent Pricing
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-5xl font-bold text-obsidian-900">
              Choose the Right Plan for Your Business
            </h2>
            <p className="mt-3 text-obsidian-600 text-base">
              No hidden contracts. Change plans or cancel anytime. All plans include full CRM access.
            </p>

            {/* Monthly / Annual Switcher */}
            <div className="mt-8 inline-flex items-center p-1.5 bg-purple-100/70 rounded-2xl border border-purple-300/60">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  !isAnnual ? 'bg-obsidian-900 text-white shadow-soft' : 'text-obsidian-700 hover:text-obsidian-950'
                }`}>
                Monthly Billing
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isAnnual ? 'bg-obsidian-900 text-white shadow-soft' : 'text-obsidian-700 hover:text-obsidian-950'
                }`}>
                <span>Annual Billing</span>
                <span className="px-2 py-0.5 bg-yellow-300 text-obsidian-950 text-[10px] rounded-full font-extrabold">Save 20%</span>
              </button>
            </div>

          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Starter Plan */}
            <div className="bg-[#FAF8FC] rounded-3xl p-8 border border-purple-200 shadow-soft flex flex-col justify-between hover:border-purple-300 transition-all">
              <div>
                <div className="text-sm font-bold text-purple-900">Starter Plan</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold text-obsidian-900">${isAnnual ? '39' : '49'}</span>
                  <span className="text-obsidian-500 text-sm font-medium">/ month</span>
                </div>
                <p className="mt-3 text-xs text-obsidian-600">Perfect for solo operators and small cleaning teams starting out.</p>

                <div className="mt-8 space-y-3.5 text-xs text-obsidian-700 font-medium">
                  <div className="flex items-center gap-2.5"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Up to 3 Cleaner Accounts</div>
                  <div className="flex items-center gap-2.5"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Smart Drag & Drop Calendar</div>
                  <div className="flex items-center gap-2.5"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Client Directory & Entry Codes</div>
                  <div className="flex items-center gap-2.5"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Standard Invoicing</div>
                  <div className="flex items-center gap-2.5"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Mobile Cleaner App View</div>
                </div>
              </div>

              <button
                onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                className="mt-8 w-full py-3.5 bg-white hover:bg-purple-50 text-obsidian-900 font-bold rounded-2xl border border-purple-300 transition-all text-sm">
                Start 14-Day Free Trial
              </button>
            </div>

            {/* Growth Plan (Most Popular) */}
            <div className="bg-obsidian-900 text-white rounded-3xl p-8 border-2 border-purple-400 shadow-soft-lg flex flex-col justify-between relative scale-105">
              
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-300 text-obsidian-950 text-xs font-extrabold rounded-full shadow-md">
                MOST POPULAR FOR CLEANING BUSINESSES
              </div>

              <div>
                <div className="text-sm font-bold text-purple-300">Growth Plan</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading text-5xl font-bold text-white">${isAnnual ? '79' : '99'}</span>
                  <span className="text-obsidian-400 text-sm font-medium">/ month</span>
                </div>
                <p className="mt-3 text-xs text-obsidian-400">For growing maid services and commercial cleaners ready to scale.</p>

                <div className="mt-8 space-y-3.5 text-xs text-obsidian-200 font-medium">
                  <div className="flex items-center gap-2.5"><Check className="w-4 h-4 text-yellow-300 shrink-0" /> Up to 12 Cleaner Accounts</div>
                  <div className="flex items-center gap-2.5"><Check className="w-4 h-4 text-yellow-300 shrink-0" /> Instant Quote Estimator</div>
                  <div className="flex items-center gap-2.5"><Check className="w-4 h-4 text-yellow-300 shrink-0" /> Integrated Stripe Payments Gateway</div>
                  <div className="flex items-center gap-2.5"><Check className="w-4 h-4 text-yellow-300 shrink-0" /> 1-Click QuickBooks Sync</div>
                  <div className="flex items-center gap-2.5"><Check className="w-4 h-4 text-yellow-300 shrink-0" /> Twilio Automated SMS Alerts</div>
                  <div className="flex items-center gap-2.5"><Check className="w-4 h-4 text-yellow-300 shrink-0" /> Before / After Photo Inspection</div>
                  <div className="flex items-center gap-2.5"><Check className="w-4 h-4 text-yellow-300 shrink-0" /> SimplyClean AI Assistant</div>
                </div>
              </div>

              <button
                onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                className="mt-8 w-full py-4 bg-yellow-300 hover:bg-yellow-400 text-obsidian-950 font-bold rounded-2xl shadow-soft transition-all text-sm flex items-center justify-center gap-2">
                <span>Start Free Growth Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Scale Plan */}
            <div className="bg-[#FAF8FC] rounded-3xl p-8 border border-purple-200 shadow-soft flex flex-col justify-between hover:border-purple-300 transition-all">
              <div>
                <div className="text-sm font-bold text-purple-900">Scale Plan</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold text-obsidian-900">${isAnnual ? '159' : '199'}</span>
                  <span className="text-obsidian-500 text-sm font-medium">/ month</span>
                </div>
                <p className="mt-3 text-xs text-obsidian-600">For multi-location cleaning franchises and enterprise fleets.</p>

                <div className="mt-8 space-y-3.5 text-xs text-obsidian-700 font-medium">
                  <div className="flex items-center gap-2.5"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Unlimited Cleaner Accounts</div>
                  <div className="flex items-center gap-2.5"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Google Maps Route Optimization</div>
                  <div className="flex items-center gap-2.5"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Multi-branch Office Management</div>
                  <div className="flex items-center gap-2.5"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Zapier Webhooks & Custom Workflows</div>
                  <div className="flex items-center gap-2.5"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Dedicated Account Manager & VIP Support</div>
                </div>
              </div>

              <button
                onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                className="mt-8 w-full py-3.5 bg-white hover:bg-purple-50 text-obsidian-900 font-bold rounded-2xl border border-purple-300 transition-all text-sm">
                Start 14-Day Scale Trial
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Integrations Showcase Grid */}
      <section id="integrations" className="py-20 bg-purple-50/60 border-t border-purple-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3.5 py-1 text-xs font-bold bg-purple-100 text-purple-800 rounded-full border border-purple-300">
              Native Integrations
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-obsidian-900">
              Fully Integrated with Tools You Trust
            </h2>
            <p className="mt-2 text-obsidian-600 text-sm">
              Connect your existing payment processors, accounting software, messaging tools, and navigation services seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="p-6 bg-white rounded-2xl border border-purple-200 shadow-soft text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="font-bold text-sm text-obsidian-900">Stripe Payments</div>
              <div className="text-xs text-obsidian-500">Auto-charge cards & instant payouts</div>
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                Ready & Functional
              </span>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-purple-200 shadow-soft text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <div className="font-bold text-sm text-obsidian-900">QuickBooks Online</div>
              <div className="text-xs text-obsidian-500">1-Click financial sync & invoices</div>
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                Ready & Functional
              </span>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-purple-200 shadow-soft text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="font-bold text-sm text-obsidian-900">Twilio SMS</div>
              <div className="text-xs text-obsidian-500">Automated SMS reminders & alerts</div>
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                Ready & Functional
              </span>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-purple-200 shadow-soft text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center font-bold">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="font-bold text-sm text-obsidian-900">Google Maps</div>
              <div className="text-xs text-obsidian-500">Cleaner route optimization matrix</div>
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                Ready & Functional
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Reviews & Testimonials */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex justify-center gap-1 text-yellow-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400" />
              ))}
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-obsidian-900">
              Loved by 1,200+ Cleaning Companies
            </h2>
            <p className="mt-2 text-obsidian-600 text-sm">
              Here's how SimplyClean transformed daily operations for cleaning business owners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 bg-purple-50/50 rounded-2xl border border-purple-200 space-y-4">
              <div className="flex gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-obsidian-800 leading-relaxed italic">
                "SimplyClean saved my maid service over 20 hours a week in manual invoicing. Our clients love getting the instant SMS reminders with cleaner entry codes!"
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80" className="w-9 h-9 rounded-full object-cover border border-purple-300" alt="Reviewer" />
                <div>
                  <div className="text-xs font-bold text-obsidian-900">Rachel Sterling</div>
                  <div className="text-[10px] text-obsidian-500">Owner, Sterling Sparkle Maids</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-purple-50/50 rounded-2xl border border-purple-200 space-y-4">
              <div className="flex gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-obsidian-800 leading-relaxed italic">
                "The instant quote estimator turned our website leads into booked cleaning jobs automatically. We grew from 4 cleaners to 12 cleaners in 6 months."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80" className="w-9 h-9 rounded-full object-cover border border-purple-300" alt="Reviewer" />
                <div>
                  <div className="text-xs font-bold text-obsidian-900">Marcus Vance</div>
                  <div className="text-[10px] text-obsidian-500">Founder, Austin Pure Commercial</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-purple-50/50 rounded-2xl border border-purple-200 space-y-4">
              <div className="flex gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-obsidian-800 leading-relaxed italic">
                "The before/after photo checklist feature put an end to client dispute calls. We haven't had a single unpaid invoice since using the Stripe integration!"
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80" className="w-9 h-9 rounded-full object-cover border border-purple-300" alt="Reviewer" />
                <div>
                  <div className="text-xs font-bold text-obsidian-900">Elena Gomez</div>
                  <div className="text-[10px] text-obsidian-500">Operations Manager, Clean&Fresh TX</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="bg-obsidian-950 text-white pt-16 pb-12 border-t border-purple-900/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-obsidian-800 text-xs">
          
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </div>
              <span className="font-heading text-xl font-bold">SimplyClean</span>
            </div>
            <p className="text-obsidian-400 leading-relaxed">
              The modern CRM and operating system built exclusively for cleaning companies.
            </p>
          </div>

          <div>
            <div className="font-bold text-purple-300 mb-3 uppercase tracking-wider text-[11px]">Product</div>
            <ul className="space-y-2 text-obsidian-400">
              <li><a href="#features" className="hover:text-white">Smart Scheduling</a></li>
              <li><a href="#features" className="hover:text-white">Quote Estimator</a></li>
              <li><a href="#features" className="hover:text-white">Stripe Invoicing</a></li>
              <li><a href="#integrations" className="hover:text-white">QuickBooks Sync</a></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-purple-300 mb-3 uppercase tracking-wider text-[11px]">Roles & Access</div>
            <ul className="space-y-2 text-obsidian-400">
              <li><button onClick={() => handleLaunchCRM('owner')} className="hover:text-white">Owner Portal</button></li>
              <li><button onClick={() => handleLaunchCRM('manager')} className="hover:text-white">Office Manager View</button></li>
              <li><button onClick={() => handleLaunchCRM('contractor')} className="hover:text-white">Cleaner App View</button></li>
              <li><button onClick={() => handleLaunchCRM('client')} className="hover:text-white">Client Portal View</button></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-purple-300 mb-3 uppercase tracking-wider text-[11px]">Security & Status</div>
            <div className="p-3 bg-obsidian-900 rounded-xl border border-purple-500/20 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All Systems Operational</span>
              </div>
              <div className="text-[10px] text-obsidian-400">256-Bit SSL Encryption • SOC2 Ready</div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-obsidian-500 gap-4">
          <div>© 2026 SimplyClean CRM Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-obsidian-300">Privacy Policy</a>
            <a href="#terms" className="hover:text-obsidian-300">Terms of Service</a>
            <a href="#security" className="hover:text-obsidian-300">Security Audit</a>
          </div>
        </div>
      </footer>

      {/* 9. Interactive Auth / Free Trial Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-purple-300 shadow-soft-lg relative animate-in fade-in zoom-in duration-200">
            
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-obsidian-400 hover:text-obsidian-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100">
              ×
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 bg-obsidian-900 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <span className="font-heading text-xl font-bold">SimplyClean</span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-obsidian-900 mt-3">
              {authMode === 'signup' ? 'Start Your 14-Day Free Trial' : 'Sign In to SimplyClean'}
            </h3>
            <p className="text-xs text-obsidian-500 mt-1">
              {authMode === 'signup' ? 'Instant access to your cleaning company workspace.' : 'Welcome back! Enter your email to open CRM.'}
            </p>

            <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-obsidian-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SimplyClean Austin"
                    defaultValue="SimplyClean Maid Services"
                    className="w-full px-4 py-3 bg-purple-50/50 border border-purple-200 rounded-xl text-sm outline-none focus:border-purple-600 transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-obsidian-700 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="sarah@simplyclean.com"
                  className="w-full px-4 py-3 bg-purple-50/50 border border-purple-200 rounded-xl text-sm outline-none focus:border-purple-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-obsidian-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 bg-purple-50/50 border border-purple-200 rounded-xl text-sm outline-none focus:border-purple-600 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft transition-all text-sm flex items-center justify-center gap-2 border border-purple-300/40 mt-2">
                <span>{authMode === 'signup' ? 'Create Free Workspace & Sign In' : 'Sign In to Workspace'}</span>
                <ArrowRight className="w-4 h-4 text-yellow-300" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-purple-100 text-center text-xs text-obsidian-600">
              {authMode === 'signup' ? (
                <span>Already have an account? <button onClick={() => setAuthMode('signin')} className="font-bold text-purple-700 hover:underline">Sign In</button></span>
              ) : (
                <span>Don't have an account? <button onClick={() => setAuthMode('signup')} className="font-bold text-purple-700 hover:underline">Start Free Trial</button></span>
              )}
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => { setShowAuthModal(false); handleLaunchCRM('owner'); }}
                className="text-xs text-obsidian-400 hover:text-obsidian-700 underline">
                Skip & Jump Directly to Demo Account →
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
