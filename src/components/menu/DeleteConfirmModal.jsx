import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150 text-center">
        
        {/* Warning Icon */}
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
          <Trash2 className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-black text-slate-900 mb-1">
          Delete Menu Item?
        </h3>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Are you sure you want to remove <span className="font-bold text-slate-800">"{itemName}"</span> from the menu catalog? This action cannot be undone.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md shadow-rose-600/25 transition cursor-pointer"
          >
            Yes, Delete
          </button>
        </div>

      </div>
    </div>
  );
}
