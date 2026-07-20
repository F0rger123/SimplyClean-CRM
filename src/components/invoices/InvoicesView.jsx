import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  DollarSign,
  Printer,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Plus,
  Sparkles,
  Download,
  Send,
  Zap
} from 'lucide-react';

export const InvoicesView = () => {
  const { invoices, payInvoice, syncQuickBooks, setActiveModal, setSelectedInvoice, showToast } = useApp();

  const [filterStatus, setFilterStatus] = useState('all');
  const [viewInvoiceModal, setViewInvoiceModal] = useState(null);

  const filteredInvoices = invoices.filter(inv =>
    filterStatus === 'all' ? true : inv.status === filterStatus
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-obsidian-900 tracking-tight">
            Invoices & Billing Hub
          </h1>
          <p className="text-obsidian-500 text-xs mt-1 font-medium">
            Generate customized SimplyClean PDF invoices, collect Stripe payments, and sync to QuickBooks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => syncQuickBooks()}
            className="px-4 py-2.5 bg-purple-100 hover:bg-purple-200 text-purple-950 font-bold rounded-2xl border border-purple-300 text-xs flex items-center gap-2 transition-all">
            <Zap className="w-4 h-4 text-purple-700" />
            <span>1-Click QuickBooks Sync</span>
          </button>

          <button
            onClick={() => setActiveModal('new_invoice')}
            className="px-5 py-2.5 bg-obsidian-900 hover:bg-obsidian-800 text-white font-bold rounded-2xl shadow-soft text-xs flex items-center gap-2 border border-purple-300/40">
            <Plus className="w-4 h-4 text-yellow-300" />
            <span>Create Invoice</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['all', 'paid', 'pending', 'overdue'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold capitalize transition-all ${
              filterStatus === status
                ? 'bg-obsidian-900 text-white shadow-soft'
                : 'bg-white text-obsidian-700 hover:bg-purple-50 border border-purple-200'
            }`}>
            {status}
          </button>
        ))}
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-3xl border border-purple-200 shadow-soft overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-purple-50/60 border-b border-purple-200 text-obsidian-600 font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Invoice #</th>
              <th className="px-6 py-4">Client Name</th>
              <th className="px-6 py-4">Issue Date</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100 font-medium text-obsidian-800">
            {filteredInvoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-purple-50/30 transition-colors">
                <td className="px-6 py-4 font-bold text-obsidian-900">{inv.id}</td>
                <td className="px-6 py-4">{inv.clientName}</td>
                <td className="px-6 py-4 text-obsidian-500">{inv.issueDate}</td>
                <td className="px-6 py-4 text-obsidian-500">{inv.dueDate}</td>
                <td className="px-6 py-4 font-heading font-bold text-sm text-obsidian-900">${inv.total?.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-[10px] font-extrabold rounded-full ${
                    inv.status === 'paid' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                    inv.status === 'overdue' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                    'bg-yellow-100 text-yellow-800 border border-yellow-300'
                  }`}>
                    {inv.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => setViewInvoiceModal(inv)}
                    className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold rounded-xl text-xs transition-colors">
                    View & Print
                  </button>
                  {inv.status !== 'paid' && (
                    <button
                      onClick={() => payInvoice(inv.id)}
                      className="px-3 py-1.5 bg-obsidian-900 hover:bg-obsidian-800 text-yellow-300 font-bold rounded-xl text-xs transition-colors">
                      Stripe Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Printable Invoice Modal */}
      {viewInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full border border-purple-300 shadow-soft-lg relative max-h-[90vh] overflow-y-auto space-y-6">
            
            {/* Modal Controls */}
            <div className="flex justify-between items-center pb-4 border-b border-purple-100 print:hidden">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-700">
                <FileText className="w-4 h-4" />
                <span>SimplyClean Printable Invoice Document</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-obsidian-900 text-white font-bold text-xs rounded-xl flex items-center gap-1.5">
                  <Printer className="w-4 h-4 text-yellow-300" /> Print / Save PDF
                </button>
                <button
                  onClick={() => setViewInvoiceModal(null)}
                  className="text-obsidian-400 hover:text-obsidian-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-100">
                  ×
                </button>
              </div>
            </div>

            {/* Invoice Printable Content */}
            <div className="p-6 bg-white border border-purple-200 rounded-2xl space-y-6">
              
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-obsidian-900 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                    </div>
                    <span className="font-heading text-2xl font-bold text-obsidian-900">Simply<span className="text-purple-600">Clean</span></span>
                  </div>
                  <div className="text-xs text-obsidian-500 mt-1">
                    SimplyClean Maid & Commercial Services Inc.<br />
                    100 Congress Ave, Suite 500, Austin, TX 78701<br />
                    support@simplyclean.com • (512) 883-9201
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-heading text-2xl font-bold text-obsidian-900">INVOICE</div>
                  <div className="text-xs font-bold text-purple-700 mt-1">#{viewInvoiceModal.id}</div>
                  <div className="text-[11px] text-obsidian-500 mt-1">Issued: {viewInvoiceModal.issueDate}</div>
                  <div className="text-[11px] text-obsidian-500">Due: {viewInvoiceModal.dueDate}</div>
                </div>
              </div>

              {/* Bill To */}
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 text-xs">
                <div className="font-bold text-purple-950 uppercase tracking-wider text-[10px] mb-1">Billed To</div>
                <div className="font-bold text-sm text-obsidian-900">{viewInvoiceModal.clientName}</div>
                <div className="text-obsidian-600">{viewInvoiceModal.clientEmail}</div>
              </div>

              {/* Line Items */}
              <table className="w-full text-left text-xs">
                <thead className="border-b border-purple-200 text-obsidian-600 font-bold uppercase">
                  <tr>
                    <th className="py-2">Description</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Rate</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-100 text-obsidian-800 font-medium">
                  {viewInvoiceModal.lineItems?.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-3 font-semibold">{item.description}</td>
                      <td className="py-3 text-center">{item.quantity}</td>
                      <td className="py-3 text-right">${item.rate.toFixed(2)}</td>
                      <td className="py-3 text-right font-bold">${(item.quantity * item.rate).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="pt-4 border-t border-purple-200 flex justify-between items-end text-xs">
                <div className="space-y-1">
                  <div className="font-bold text-obsidian-900">Payment Terms: Net 7 Days</div>
                  <div className="text-obsidian-500">Method: {viewInvoiceModal.paymentMethod}</div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-obsidian-500">Subtotal: ${viewInvoiceModal.amount?.toFixed(2)}</div>
                  <div className="text-obsidian-500">Sales Tax (8.25%): ${viewInvoiceModal.tax?.toFixed(2)}</div>
                  <div className="font-heading text-2xl font-bold text-obsidian-900 pt-1 border-t border-purple-200">
                    Total: ${viewInvoiceModal.total?.toFixed(2)}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
