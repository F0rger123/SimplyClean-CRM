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
  Smartphone,
  CreditCard,
  FileText,
  Lock,
  ChevronRight,
  Play,
  ShieldCheck,
  Camera,
  Video
} from 'lucide-react';

export const LandingPage = () => {
  const { setIsLoggedIn, setActiveTab, setActiveRole, showToast } = useApp();

  // ROI Calculator State
  const [cleanersCount, setCleanersCount] = useState(6);
  const [jobsPerMonth, setJobsPerMonth] = useState(120);

  // Pricing State
  const [isAnnual, setIsAnnual] = useState(true);

  // Active Feature Preview Tab
  const [activeFeatureTab, setActiveFeatureTab] = useState('contractor_portal');

  // Auth Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('owner'); // 'owner' | 'contractor' | 'client'
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
    setActiveRole(role);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
    showToast(`Welcome to SimplyClean! Logged in to ${role.toUpperCase()} workspace.`);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    handleLaunchCRM(selectedPersona);
    setShowAuthModal(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8FC] text-obsidian-900 font-sans selection:bg-purple-200">
      
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-purple-200/60 transition-all">
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
            <a href="#features" className="hover:text-purple-600 transition-colors">Features & Portals</a>
            <a href="#roi-calculator" className="hover:text-purple-600 transition-colors">ROI Calculator</a>
            <a href="#pricing" className="hover:text-purple-600 transition-colors">Subscription Plans</a>
            <a href="#integrations" className="hover:text-purple-600 transition-colors">Integrations</a>
            <a href="#reviews" className="hover:text-purple-600 transition-colors">Reviews</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setSelectedPersona('contractor'); setShowAuthModal(true); }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-yellow-900 bg-yellow-100 hover:bg-yellow-200 rounded-xl border border-yellow-300 transition-colors">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Cleaner Portal</span>
            </button>
            <button
              onClick={() => { setSelectedPersona('owner'); setShowAuthModal(true); }}
              className="px-4 py-2.5 text-sm font-semibold text-obsidian-800 hover:text-purple-700 transition-colors">
              Sign In
            </button>
            <button
              onClick={() => { setSelectedPersona('owner'); setShowAuthModal(true); }}
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
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-300/80 text-purple-900 text-xs font-bold mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Dedicated Owner Workspace + Mobile Cleaner Companion App</span>
          </div>

          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-obsidian-900 leading-[1.1] max-w-4xl mx-auto">
            The Complete OS for<br />
            <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-yellow-600 bg-clip-text text-transparent">
              Modern Cleaning Fleets
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-obsidian-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Equip your cleaners with mobile checklists and real photo/video proof. Give business owners instant quoting, dispatch GPS routes, custom SOP standards, and automatic Stripe billing.
          </p>

          {/* Persona Launch Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleLaunchCRM('owner')}
              className="px-8 py-4 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft-lg hover:scale-[1.02] transition-all flex items-center gap-3 text-base border border-purple-300/40">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>Launch Owner CRM Workspace</span>
            </button>
            <button
              onClick={() => handleLaunchCRM('contractor')}
              className="px-7 py-4 bg-yellow-300 hover:bg-yellow-400 text-obsidian-950 font-bold rounded-2xl shadow-soft flex items-center gap-2 text-base transition-all">
              <Smartphone className="w-5 h-5" />
              <span>Launch Cleaner Mobile App</span>
            </button>
          </div>

          {/* Guarantee Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-obsidian-600 font-semibold">
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Live Photo & Video Proof</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-yellow-600" /> Granular RBAC Permissions</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-purple-600" /> 1-Click QuickBooks & Stripe</div>
          </div>

          {/* Dual Mockup Showcase: Desktop Owner Workspace + Mobile Cleaner App */}
          <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Desktop View Card */}
            <div className="md:col-span-8 bg-white rounded-3xl p-4 shadow-soft-lg border border-purple-200 text-left">
              <div className="bg-obsidian-900 rounded-2xl p-5 text-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-obsidian-800 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="ml-2 font-mono text-obsidian-400 text-[11px]">simplyclean-os.com/standards</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-purple-900 text-purple-200 rounded-full font-bold text-[10px]">
                    Owner Control Center
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-obsidian-800 rounded-xl border border-purple-500/20">
                    <div className="text-obsidian-400 text-[10px]">Today's Revenue</div>
                    <div className="font-heading font-bold text-lg text-white mt-1">$1,840.00</div>
                  </div>
                  <div className="p-3 bg-obsidian-800 rounded-xl border border-purple-500/20">
                    <div className="text-obsidian-400 text-[10px]">Active Shift GPS</div>
                    <div className="font-heading font-bold text-lg text-yellow-300 mt-1">3 Crews En Route</div>
                  </div>
                  <div className="p-3 bg-obsidian-800 rounded-xl border border-purple-500/20">
                    <div className="text-obsidian-400 text-[10px]">Checklist SOPs</div>
                    <div className="font-heading font-bold text-lg text-emerald-400 mt-1">100% Compliant</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View Card */}
            <div className="md:col-span-4 bg-white rounded-3xl p-4 shadow-soft-lg border-2 border-purple-400 text-left">
              <div className="bg-purple-50 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-purple-950">
                  <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5 text-purple-700" /> Cleaner App</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Clocked In</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-purple-200 space-y-1">
                  <div className="font-bold text-xs text-obsidian-900">742 Evergreen Terrace</div>
                  <div className="text-[11px] text-purple-700 font-semibold">Keycode: #7721 (Copied)</div>
                  <div className="text-[10px] text-emerald-600 font-bold">✓ 4 Before Photos Uploaded</div>
                </div>
                <button
                  onClick={() => handleLaunchCRM('contractor')}
                  className="w-full py-2 bg-obsidian-900 text-yellow-300 rounded-xl text-xs font-bold shadow-sm">
                  Open Cleaner View →
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Interactive ROI Calculator */}
      <section id="roi-calculator" className="py-20 bg-white border-y border-purple-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 text-xs font-bold bg-yellow-100 text-yellow-800 rounded-full border border-yellow-300">
              Interactive ROI Calculator
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-obsidian-900">
              Calculate Your Monthly Savings & Unlocked Revenue
            </h2>
            <p className="mt-3 text-obsidian-600 text-base">
              See the direct impact of automated scheduling, cleaner mobile checklists, and auto-invoicing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-purple-50/50 p-8 rounded-3xl border border-purple-200 shadow-soft">
            
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-obsidian-800 flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span>Number of Cleaners on Staff:</span>
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

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-obsidian-800 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-600" />
                    <span>Estimated Monthly Cleaning Jobs:</span>
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
                <div className="font-semibold text-purple-900">✨ How SimplyClean eliminates friction:</div>
                <div>• Saves ~14.5 admin hours per cleaner each month with mobile checklists and auto-invoices.</div>
                <div>• Increases quote booking rate by ~18% through instant SMS quote links and calculators.</div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-obsidian-900 text-white rounded-2xl p-8 border border-purple-300/40 shadow-soft-lg space-y-6">
              <div className="text-xs text-purple-300 font-bold uppercase tracking-wider">
                Monthly ROI Breakdown
              </div>

              <div>
                <div className="text-xs text-obsidian-400">Admin Hours Saved Monthly</div>
                <div className="text-4xl font-bold font-heading text-yellow-300 mt-1">
                  {hoursSavedPerMonth} Hours
                </div>
                <div className="text-xs text-obsidian-400 mt-1">Freeing your office from manual dispatch calls</div>
              </div>

              <div className="pt-4 border-t border-obsidian-800">
                <div className="text-xs text-obsidian-400">Estimated Additional Monthly Revenue</div>
                <div className="text-4xl font-bold font-heading text-purple-300 mt-1">
                  +${additionalRevenuePerMonth.toLocaleString()} / mo
                </div>
                <div className="text-xs text-obsidian-400 mt-1">From instant quote follow-ups & zero missed invoices</div>
              </div>

              <button
                onClick={() => handleLaunchCRM('owner')}
                className="w-full py-3.5 bg-yellow-300 hover:bg-yellow-400 text-obsidian-950 font-bold rounded-xl shadow-soft text-sm flex items-center justify-center gap-2">
                <span>Start 14-Day Free Trial</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Feature Portals Showcase */}
      <section id="features" className="py-24 bg-[#FAF8FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 text-xs font-bold bg-purple-100 text-purple-800 rounded-full border border-purple-300">
              Multi-Persona Operating System
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-5xl font-bold text-obsidian-900">
              Designed for Owners, Cleaners & Clients
            </h2>
            <p className="mt-3 text-obsidian-600 text-base">
              Every participant in your cleaning company gets a specialized, polished interface.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: 'contractor_portal', label: 'Cleaner Mobile Companion App', icon: Smartphone },
              { id: 'standards_hub', label: 'Owner Standards & SOP Builder', icon: ShieldCheck },
              { id: 'smart_dispatch', label: 'Smart Scheduling & Route Matrix', icon: Calendar },
              { id: 'invoicing_sync', label: 'Stripe & QuickBooks Invoicing', icon: FileText }
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

          {/* Active Feature Showcase Box */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-purple-200 shadow-soft-lg">
            {activeFeatureTab === 'contractor_portal' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-900 flex items-center justify-center font-bold">
                    <Smartphone className="w-6 h-6 text-yellow-700" />
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-obsidian-900">
                    Mobile-First Contractor Companion App
                  </h3>
                  <p className="text-obsidian-600 text-sm md:text-base leading-relaxed">
                    Give cleaners an intuitive mobile web app to clock in, view gate keycodes, complete room checklists, and upload real photo and video inspection proof.
                  </p>
                  <ul className="space-y-3 text-sm text-obsidian-700 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Real photo and 360° video walkthrough uploads</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Pre-existing damage flagger with photo proof</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Instant Stripe Express earnings cash-out</li>
                  </ul>
                  <button
                    onClick={() => handleLaunchCRM('contractor')}
                    className="px-5 py-3 bg-yellow-300 hover:bg-yellow-400 text-obsidian-950 font-bold rounded-2xl text-xs flex items-center gap-2 shadow-soft">
                    <span>Try Cleaner Mobile App Now →</span>
                  </button>
                </div>

                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200 space-y-3">
                  <div className="text-xs font-bold text-purple-950">Cleaner Companion Live Preview:</div>
                  <div className="p-4 bg-white rounded-xl border border-purple-200 shadow-sm space-y-2 text-xs">
                    <div className="flex justify-between font-bold">
                      <span>Kitchen & Stovetop</span>
                      <span className="text-emerald-700">✓ Completed</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Shower Glass Water Spots</span>
                      <span className="text-purple-700">📸 Photo Uploaded</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeFeatureTab === 'standards_hub' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6 text-purple-700" />
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-obsidian-900">
                    Owner Standards & SOP Template Builder
                  </h3>
                  <p className="text-obsidian-600 text-sm md:text-base leading-relaxed">
                    Create standard operating procedures for Deep Cleans, Airbnb turnovers, and commercial jobs. Enforce mandatory photo counts and cleaner rating minimums.
                  </p>
                  <ul className="space-y-3 text-sm text-obsidian-700 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Custom room task definitions and mandatory checks</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Granular RBAC permissions matrix (Owner, Manager, Cleaner, Client)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600" /> Automated compliance scorecards for all staff</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200 space-y-3 text-xs">
                  <div className="font-bold text-yellow-950">Master SOP Standards:</div>
                  <div className="p-3 bg-white rounded-xl border border-yellow-200 space-y-1">
                    <div className="font-semibold text-obsidian-900">Deep Clean Standard Protocol</div>
                    <div className="text-obsidian-500">Requires 4 photos + 360° Video Walkthrough</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-yellow-200 space-y-1">
                    <div className="font-semibold text-obsidian-900">Minimum Rating Benchmark</div>
                    <div className="text-obsidian-500">4.80 / 5.00 Star Cleaner Threshold</div>
                  </div>
                </div>
              </div>
            )}

            {activeFeatureTab === 'smart_dispatch' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold">
                    <Calendar className="w-6 h-6 text-purple-700" />
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-obsidian-900">
                    Smart Route Optimization & GPS Scheduling
                  </h3>
                  <p className="text-obsidian-600 text-sm md:text-base leading-relaxed">
                    Group cleaning jobs by neighborhood, automatically cluster cleaner routes, and give contractors 1-tap Google Maps navigation.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200 text-xs space-y-2">
                  <div className="font-bold text-purple-950">Active Route Clusters:</div>
                  <div className="p-3 bg-white rounded-xl border border-purple-200 font-medium text-obsidian-800">
                    📍 South Austin Route: 3 Jobs (~22% Drive Time Saved)
                  </div>
                </div>
              </div>
            )}

            {activeFeatureTab === 'invoicing_sync' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-900 flex items-center justify-center font-bold">
                    <FileText className="w-6 h-6 text-yellow-700" />
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-obsidian-900">
                    Stripe Auto-Invoicing & QuickBooks Sync
                  </h3>
                  <p className="text-obsidian-600 text-sm md:text-base leading-relaxed">
                    Auto-charge cards on file when jobs complete. Sync sales tax and invoices to QuickBooks Online with 1 click.
                  </p>
                </div>

                <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200 text-xs space-y-2">
                  <div className="p-3 bg-white rounded-xl border border-yellow-200 font-bold text-emerald-800">
                    ⚡ Auto-Invoice #INV-2026-001 ($211.09) Paid via Stripe
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 5. Pricing Plans */}
      <section id="pricing" className="py-24 bg-white border-t border-purple-200">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3.5 py-1 text-xs font-bold bg-yellow-100 text-yellow-800 rounded-full border border-yellow-300">
              Subscription Plans
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-5xl font-bold text-obsidian-900">
              Choose the Plan for Your Fleet
            </h2>
            <p className="mt-3 text-obsidian-600 text-base">
              All plans include the Owner Workspace, Cleaner Mobile App, and Stripe Invoicing.
            </p>

            <div className="mt-8 inline-flex items-center p-1.5 bg-purple-100/70 rounded-2xl border border-purple-300/60">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  !isAnnual ? 'bg-obsidian-900 text-white shadow-soft' : 'text-obsidian-700'
                }`}>
                Monthly Billing
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isAnnual ? 'bg-obsidian-900 text-white shadow-soft' : 'text-obsidian-700'
                }`}>
                <span>Annual Billing</span>
                <span className="px-2 py-0.5 bg-yellow-300 text-obsidian-950 text-[10px] rounded-full font-extrabold">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Starter */}
            <div className="bg-[#FAF8FC] rounded-3xl p-8 border border-purple-200 shadow-soft flex flex-col justify-between">
              <div>
                <div className="text-sm font-bold text-purple-900">Starter Plan</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold text-obsidian-900">${isAnnual ? '39' : '49'}</span>
                  <span className="text-obsidian-500 text-sm font-medium">/ month</span>
                </div>
                <div className="mt-8 space-y-3 text-xs text-obsidian-700 font-medium">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Up to 3 Cleaners</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Mobile Checklist App</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Photo Uploads</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Standard Invoicing</div>
                </div>
              </div>
              <button
                onClick={() => handleLaunchCRM('owner')}
                className="mt-8 w-full py-3.5 bg-white hover:bg-purple-50 text-obsidian-900 font-bold rounded-2xl border border-purple-300 text-sm">
                Start Free Trial
              </button>
            </div>

            {/* Growth */}
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
                <div className="mt-8 space-y-3 text-xs text-obsidian-200 font-medium">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-yellow-300" /> Up to 12 Cleaners</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-yellow-300" /> Standards & SOP Builder</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-yellow-300" /> 360° Video Walkthrough Vault</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-yellow-300" /> Stripe Payments & QuickBooks Sync</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-yellow-300" /> Twilio SMS Dispatch Alerts</div>
                </div>
              </div>
              <button
                onClick={() => handleLaunchCRM('owner')}
                className="mt-8 w-full py-4 bg-yellow-300 hover:bg-yellow-400 text-obsidian-950 font-bold rounded-2xl shadow-soft text-sm flex items-center justify-center gap-2">
                <span>Start Free Growth Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Scale */}
            <div className="bg-[#FAF8FC] rounded-3xl p-8 border border-purple-200 shadow-soft flex flex-col justify-between">
              <div>
                <div className="text-sm font-bold text-purple-900">Scale Plan</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold text-obsidian-900">${isAnnual ? '159' : '199'}</span>
                  <span className="text-obsidian-500 text-sm font-medium">/ month</span>
                </div>
                <div className="mt-8 space-y-3 text-xs text-obsidian-700 font-medium">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Unlimited Cleaners</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Multi-Branch Permissions (RBAC)</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Route Matrix Optimization</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Dedicated Account VIP Support</div>
                </div>
              </div>
              <button
                onClick={() => handleLaunchCRM('owner')}
                className="mt-8 w-full py-3.5 bg-white hover:bg-purple-50 text-obsidian-900 font-bold rounded-2xl border border-purple-300 text-sm">
                Start Free Trial
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-obsidian-950 text-white pt-16 pb-12 border-t border-purple-900/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-obsidian-800 text-xs">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </div>
              <span className="font-heading text-xl font-bold">SimplyClean</span>
            </div>
            <p className="text-obsidian-400">The modern operating system for residential & commercial cleaning businesses.</p>
          </div>

          <div>
            <div className="font-bold text-purple-300 mb-3 uppercase tracking-wider text-[11px]">Portals & Views</div>
            <ul className="space-y-2 text-obsidian-400">
              <li><button onClick={() => handleLaunchCRM('owner')} className="hover:text-white">Owner Workspace</button></li>
              <li><button onClick={() => handleLaunchCRM('contractor')} className="hover:text-white">Cleaner Mobile App</button></li>
              <li><button onClick={() => handleLaunchCRM('client')} className="hover:text-white">Client Portal</button></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-purple-300 mb-3 uppercase tracking-wider text-[11px]">Core Features</div>
            <ul className="space-y-2 text-obsidian-400">
              <li><a href="#features" className="hover:text-white">Standards & SOP Builder</a></li>
              <li><a href="#features" className="hover:text-white">Photo & Video Proof</a></li>
              <li><a href="#features" className="hover:text-white">Stripe Invoicing</a></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-purple-300 mb-3 uppercase tracking-wider text-[11px]">Status</div>
            <div className="p-3 bg-obsidian-900 rounded-xl border border-purple-500/20 text-emerald-400 font-bold flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Live & Operational</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-6 text-center text-xs text-obsidian-500">
          © 2026 SimplyClean CRM Inc. All rights reserved.
        </div>
      </footer>

      {/* 7. Multi-Persona Login / Auth Modal */}
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

            <h3 className="font-heading text-2xl font-bold text-obsidian-900 mt-2">
              Sign In to Your Workspace
            </h3>
            <p className="text-xs text-obsidian-500 mt-0.5 mb-4">Choose your role to open the corresponding interface.</p>

            {/* Persona Selector Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-5 p-1 bg-purple-100/70 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setSelectedPersona('owner')}
                className={`py-2 rounded-xl transition-all ${
                  selectedPersona === 'owner' ? 'bg-obsidian-900 text-white shadow-soft' : 'text-obsidian-700'
                }`}>
                Owner
              </button>
              <button
                type="button"
                onClick={() => setSelectedPersona('contractor')}
                className={`py-2 rounded-xl transition-all ${
                  selectedPersona === 'contractor' ? 'bg-obsidian-900 text-yellow-300 shadow-soft' : 'text-obsidian-700'
                }`}>
                Cleaner App
              </button>
              <button
                type="button"
                onClick={() => setSelectedPersona('client')}
                className={`py-2 rounded-xl transition-all ${
                  selectedPersona === 'client' ? 'bg-obsidian-900 text-white shadow-soft' : 'text-obsidian-700'
                }`}>
                Client
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Email / Phone / Cleaner PIN</label>
                <input
                  type="text"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={selectedPersona === 'contractor' ? 'Enter cleaner PIN (e.g. 1234)' : 'sarah@simplyclean.com'}
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft text-sm flex items-center justify-center gap-2 border border-purple-300/40 mt-2">
                <span>Open {selectedPersona.toUpperCase()} Portal</span>
                <ArrowRight className="w-4 h-4 text-yellow-300" />
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => handleLaunchCRM(selectedPersona)}
                className="text-xs text-obsidian-400 hover:text-purple-700 underline">
                Skip & Launch Demo Account Directly →
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
