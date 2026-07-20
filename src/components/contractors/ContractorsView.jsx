import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserCheck,
  Star,
  ShieldCheck,
  Phone,
  Mail,
  DollarSign,
  Plus,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export const ContractorsView = () => {
  const { contractors } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-obsidian-900 tracking-tight">
            Cleaners & Contractor Directory
          </h1>
          <p className="text-obsidian-500 text-xs mt-1 font-medium">
            Track cleaner availability, background check verification, ratings, and hourly payout rates.
          </p>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contractors.map((cleaner) => (
          <div
            key={cleaner.id}
            className="bg-white p-6 rounded-3xl border border-purple-200 shadow-soft hover:shadow-soft-lg transition-all space-y-4 flex flex-col justify-between">
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={cleaner.avatar}
                  alt={cleaner.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-300 shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-base text-obsidian-900">{cleaner.name}</h3>
                  <div className="text-xs text-purple-700 font-semibold">{cleaner.role}</div>
                  <div className="flex items-center gap-1 text-xs text-yellow-600 font-bold mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    <span>{cleaner.rating} / 5.0</span>
                    <span className="text-obsidian-400 font-normal">({cleaner.jobsCompleted} jobs)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-obsidian-600 font-medium">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-yellow-600 shrink-0" />
                  <span>{cleaner.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span className="truncate">{cleaner.email}</span>
                </div>
                <div className="flex items-center gap-2 text-purple-900 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>{cleaner.assignedRouteToday}</span>
                </div>
              </div>

              {/* Background Check Badge */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex items-center gap-2 text-emerald-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{cleaner.backgroundCheck}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-purple-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-obsidian-400 text-[10px]">Hourly Rate:</span>
                <div className="font-heading font-bold text-obsidian-900">${cleaner.hourlyRate}.00 / hr</div>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-900 font-bold rounded-full text-[10px]">
                {cleaner.status}
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
