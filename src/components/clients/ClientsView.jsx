import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Search,
  Plus,
  Key,
  Dog,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  ShieldAlert,
  ChevronRight,
  FileText
} from 'lucide-react';

export const ClientsView = () => {
  const { clients, addClient } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Client Form
  const [name, setName] = useState('');
  const [company, setCompany] = useState('Homeowner');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [entryCode, setEntryCode] = useState('');
  const [pets, setPets] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [frequency, setFrequency] = useState('Bi-Weekly');
  const [rate, setRate] = useState(200);

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClientSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    addClient({
      name,
      company,
      email,
      phone,
      address,
      entryCode: entryCode || 'None specified',
      pets: pets || 'No pets',
      specialInstructions: specialInstructions || 'Standard cleaning preferences',
      frequency,
      rate: Number(rate)
    });

    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setEntryCode('');
    setPets('');
    setSpecialInstructions('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-obsidian-900 tracking-tight">
            Client Profiles & Directory
          </h1>
          <p className="text-obsidian-500 text-xs mt-1 font-medium">
            Manage residential homeowners and commercial accounts with entry codes & pet notes.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft text-xs flex items-center gap-2 border border-purple-300/40">
          <Plus className="w-4 h-4 text-yellow-300" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Search Filter Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-purple-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by client name, address, or email..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-purple-200 rounded-2xl text-xs outline-none focus:border-purple-600 shadow-soft"
          />
        </div>
        <span className="text-xs text-obsidian-500 font-medium">
          Showing {filteredClients.length} Active Clients
        </span>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            onClick={() => setSelectedClient(client)}
            className="bg-white p-6 rounded-3xl border border-purple-200 shadow-soft hover:shadow-soft-lg hover:border-purple-300 transition-all cursor-pointer space-y-4 flex flex-col justify-between">
            
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base text-obsidian-900">{client.name}</h3>
                  <div className="text-xs text-purple-700 font-semibold">{client.company}</div>
                </div>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                  {client.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-obsidian-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span className="truncate font-medium">{client.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-yellow-600 shrink-0" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span className="truncate">{client.email}</span>
                </div>
              </div>

              {/* Instructions Pill */}
              <div className="p-3 bg-purple-50/80 rounded-xl border border-purple-200/80 text-[11px] space-y-1">
                <div className="font-semibold text-purple-950 flex items-center gap-1.5">
                  <Key className="w-3 h-3 text-purple-700" />
                  <span>Entry: {client.entryCode}</span>
                </div>
                <div className="text-obsidian-600 flex items-center gap-1.5">
                  <Dog className="w-3 h-3 text-yellow-600" />
                  <span>Pets: {client.pets}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-purple-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-obsidian-400 text-[10px]">Total Revenue:</span>
                <div className="font-heading font-bold text-obsidian-900">${client.totalSpent}</div>
              </div>
              <div className="text-right">
                <span className="text-obsidian-400 text-[10px]">Frequency:</span>
                <div className="font-bold text-purple-700">{client.frequency}</div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-purple-300 shadow-soft-lg relative">
            
            <button
              onClick={() => setSelectedClient(null)}
              className="absolute top-4 right-4 text-obsidian-400 hover:text-obsidian-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100">
              ×
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-lg">
                {selectedClient.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-obsidian-900">{selectedClient.name}</h2>
                <div className="text-xs text-purple-700 font-semibold">{selectedClient.company} • Joined {selectedClient.joinedDate}</div>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-2">
                <div className="font-bold text-purple-950 flex items-center gap-2 text-sm">
                  <Key className="w-4 h-4 text-purple-700" />
                  <span>Entry & Access Instructions</span>
                </div>
                <p className="text-obsidian-700 font-medium">{selectedClient.entryCode}</p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-200 space-y-2">
                <div className="font-bold text-yellow-950 flex items-center gap-2 text-sm">
                  <Dog className="w-4 h-4 text-yellow-700" />
                  <span>Pet Details</span>
                </div>
                <p className="text-obsidian-700 font-medium">{selectedClient.pets}</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-purple-200 space-y-2">
                <div className="font-bold text-obsidian-900 flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Special Cleaning Preferences</span>
                </div>
                <p className="text-obsidian-600">{selectedClient.specialInstructions}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-purple-100/50 rounded-xl text-center">
                  <div className="text-obsidian-500 font-medium">Recurring Service Rate</div>
                  <div className="font-heading text-lg font-bold text-obsidian-900">${selectedClient.rate} / visit</div>
                </div>
                <div className="p-3 bg-purple-100/50 rounded-xl text-center">
                  <div className="text-obsidian-500 font-medium">Total Lifetime Spend</div>
                  <div className="font-heading text-lg font-bold text-emerald-700">${selectedClient.totalSpent}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-purple-300 shadow-soft-lg relative">
            
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-obsidian-400 hover:text-obsidian-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100">
              ×
            </button>

            <h2 className="font-heading text-2xl font-bold text-obsidian-900 mb-1">Add New Client Profile</h2>
            <p className="text-xs text-obsidian-500 mb-5">Create active client record with entry codes & rate.</p>

            <form onSubmit={handleAddClientSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Account Type</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Homeowner or Business Name"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(512) 555-0188"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Full property address"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Entry Code / Access Instructions</label>
                <input
                  type="text"
                  value={entryCode}
                  onChange={(e) => setEntryCode(e.target.value)}
                  placeholder="Keypad code #1234, garage code, or key under mat..."
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-obsidian-700 mb-1">Pet Details</label>
                <input
                  type="text"
                  value={pets}
                  onChange={(e) => setPets(e.target.value)}
                  placeholder="e.g. 1 Golden Retriever (friendly)"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Cleaning Frequency</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none">
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-Weekly">Bi-Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="One-Time">One-Time</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-obsidian-700 mb-1">Per-Visit Rate ($)</label>
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft text-sm flex items-center justify-center gap-2 border border-purple-300/40">
                <Users className="w-4 h-4 text-yellow-300" />
                <span>Save Client Profile</span>
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
