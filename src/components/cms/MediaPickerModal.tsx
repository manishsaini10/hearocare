"use client";

import React, { useState } from "react";
import { useCMS } from "@/lib/cmsContext";
import { X, Upload, Check, Image as ImageIcon, Trash2 } from "lucide-react";

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (url: string) => void;
}

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelectImage,
}: MediaPickerModalProps) {
  const { mediaList, uploadMediaItem, deleteMediaItem } = useCMS();
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const dataUrl = evt.target?.result as string;
      await uploadMediaItem(file.name, dataUrl);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-600/20 text-pink-400 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Media Library & Picker</h3>
              <p className="text-xs text-slate-400">Select an image or upload a new one</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Upload Area */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-dashed border-slate-800 text-center space-y-3">
          <Upload className="w-8 h-8 text-pink-500 mx-auto" />
          <p className="text-sm font-extrabold text-white">Upload New Image</p>
          <p className="text-xs text-slate-400">PNG, JPG, SVG, WebP supported</p>
          <label className="inline-block px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-extrabold text-xs cursor-pointer shadow-lg transition-all">
            {uploading ? "Uploading..." : "Browse File..."}
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-4 gap-4 p-2 scrollbar-thin">
          {mediaList.map((item) => (
            <div
              key={item.id}
              className="group relative bg-slate-950 border border-slate-800 rounded-2xl p-2 flex flex-col justify-between hover:border-pink-500 transition-all"
            >
              <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="pt-2 flex justify-between items-center">
                <span className="text-[11px] font-bold text-slate-300 truncate max-w-[120px]">{item.name}</span>
                <button
                  onClick={() => deleteMediaItem(item.id)}
                  className="p-1 text-slate-500 hover:text-red-400"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <button
                onClick={() => {
                  onSelectImage(item.url);
                  onClose();
                }}
                className="mt-2 w-full py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Select</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
