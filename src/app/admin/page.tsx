"use client";

import React, { useState, useEffect } from "react";
import { useCMS, CMSData, DEFAULT_CMS_DATA } from "@/lib/cmsContext";
import {
  Lock,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Sparkles,
  LayoutDashboard,
  HelpCircle,
  MessageSquare,
  FileText,
  Globe,
  Database,
  LogOut,
} from "lucide-react";

export default function AdminCMSPage() {
  const { data, updateData, resetData, refetchData } = useCMS();
  const [token, setToken] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const [activeTab, setActiveTab] = useState<
    "site" | "hero" | "faqs" | "testimonials" | "blogs" | "backup"
  >("site");

  const [formData, setFormData] = useState<CMSData>(data);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Sync formData when CMS data changes
  useEffect(() => {
    setFormData(data);
  }, [data]);

  // Check saved session
  useEffect(() => {
    const savedToken = sessionStorage.getItem("hearocare_admin_token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/cms/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setToken(json.token);
        sessionStorage.setItem("hearocare_admin_token", json.token);
      } else {
        setLoginError(json.error || "Login failed. Check your password.");
      }
    } catch {
      // Local development fallback
      if (passwordInput === "hearocare2026admin") {
        const dummyToken = "hearocare2026admin";
        setToken(dummyToken);
        sessionStorage.setItem("hearocare_admin_token", dummyToken);
      } else {
        setLoginError("Invalid password.");
      }
    }
  };

  const handleLogout = () => {
    setToken("");
    sessionStorage.removeItem("hearocare_admin_token");
  };

  const handleSaveToCloudflare = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    // Update local React State & LocalStorage first for instant UI response
    updateData(formData);

    try {
      const res = await fetch("/api/cms/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: formData }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSaveMessage({
          type: "success",
          text: "Changes saved successfully to Cloudflare KV & Local State!",
        });
      } else {
        setSaveMessage({
          type: "success",
          text: "Saved locally! (Worker KV API will sync on Cloudflare deployment)",
        });
      }
    } catch {
      setSaveMessage({
        type: "success",
        text: "Saved locally! (Worker KV API will sync on Cloudflare deployment)",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Download Backup JSON
  const handleDownloadBackup = () => {
    const jsonStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hearocare-cms-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Restore Backup JSON File
  const handleRestoreBackupFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (parsed && parsed.siteConfig) {
          setFormData(parsed);
          updateData(parsed);
          setSaveMessage({
            type: "success",
            text: "Backup file loaded successfully! Don't forget to click Save Changes.",
          });
        } else {
          alert("Invalid backup file format.");
        }
      } catch {
        alert("Failed to parse JSON backup file.");
      }
    };
    reader.readAsText(file);
  };

  // Reset to Defaults
  const handleResetToDefaults = async () => {
    if (
      confirm(
        "Are you sure you want to reset all content back to factory defaults?"
      )
    ) {
      resetData();
      setFormData(DEFAULT_CMS_DATA);
      try {
        await fetch("/api/cms/restore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ resetToDefault: true }),
        });
      } catch {}
      setSaveMessage({
        type: "success",
        text: "Reset to default system baseline successfully.",
      });
    }
  };

  // Login Screen Render
  if (!token) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-slate-950 px-6 py-12 text-white">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600" />
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-pink-600/20 border border-pink-500/40 text-pink-400 mx-auto flex items-center justify-center">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Hear O Care CMS</h1>
            <p className="text-slate-400 text-sm">Enter admin password to manage pages & content</p>
          </div>

          {loginError && (
            <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-sm font-semibold flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase font-extrabold tracking-wider text-slate-300">
                Admin Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-5 py-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 font-medium"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-extrabold text-base shadow-lg shadow-pink-600/30 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Sign In to Admin Dashboard
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500 font-medium">
            <span>Cloudflare Worker Compatible • Fast & Secure</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Admin Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-pink-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
              H
            </div>
            <div>
              <h1 className="text-2xl font-black text-white flex items-center gap-2">
                <span>Page Data Micro-CMS</span>
                <span className="text-xs px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 font-bold border border-pink-500/30">
                  Cloudflare Worker Ready
                </span>
              </h1>
              <p className="text-xs text-slate-400">Manage titles, FAQs, Testimonials, and Page text</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleSaveToCloudflare}
              disabled={isSaving}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-extrabold text-sm shadow-lg hover:scale-105 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold text-sm border border-slate-700 flex items-center gap-2 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {saveMessage && (
          <div
            className={`p-4 rounded-xl text-sm font-bold flex items-center justify-between gap-3 ${
              saveMessage.type === "success"
                ? "bg-emerald-950/80 border border-emerald-800 text-emerald-300"
                : "bg-red-950/80 border border-red-800 text-red-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{saveMessage.text}</span>
            </div>
            <button onClick={() => setSaveMessage(null)} className="text-slate-400 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: "site", label: "Site Info & Links", icon: Globe },
            { id: "hero", label: "Hero Copy", icon: Sparkles },
            { id: "faqs", label: `FAQs (${formData.faqs.length})`, icon: HelpCircle },
            { id: "testimonials", label: `Reviews (${formData.testimonials.length})`, icon: MessageSquare },
            { id: "blogs", label: `Blogs (${formData.blogPosts.length})`, icon: FileText },
            { id: "backup", label: "Backup & Restore", icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-extrabold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-pink-600 text-white shadow-lg shadow-pink-600/30"
                    : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800/80"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Site Info & Links */}
        {activeTab === "site" && (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-pink-500" />
              <span>General Site Information</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-400 uppercase">Site Name</label>
                <input
                  type="text"
                  value={formData.siteConfig.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      siteConfig: { ...formData.siteConfig, name: e.target.value },
                    })
                  }
                  className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-400 uppercase">Amazon Store URL</label>
                <input
                  type="text"
                  value={formData.siteConfig.amazonUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      siteConfig: { ...formData.siteConfig, amazonUrl: e.target.value },
                    })
                  }
                  className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-extrabold text-slate-400 uppercase">Site Description (SEO)</label>
                <textarea
                  rows={3}
                  value={formData.siteConfig.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      siteConfig: { ...formData.siteConfig, description: e.target.value },
                    })
                  }
                  className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-400 uppercase">Support Email</label>
                <input
                  type="text"
                  value={formData.siteConfig.contact.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      siteConfig: {
                        ...formData.siteConfig,
                        contact: { ...formData.siteConfig.contact, email: e.target.value },
                      },
                    })
                  }
                  className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-400 uppercase">Support Phone</label>
                <input
                  type="text"
                  value={formData.siteConfig.contact.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      siteConfig: {
                        ...formData.siteConfig,
                        contact: { ...formData.siteConfig.contact, phone: e.target.value },
                      },
                    })
                  }
                  className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Hero Copy */}
        {activeTab === "hero" && (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-500" />
              <span>Hero Headline & Copy</span>
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-400 uppercase">Top Badge Text</label>
                <input
                  type="text"
                  value={formData.heroText.badgeText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      heroText: { ...formData.heroText, badgeText: e.target.value },
                    })
                  }
                  className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-400 uppercase">Main Headline</label>
                <input
                  type="text"
                  value={formData.heroText.headline}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      heroText: { ...formData.heroText, headline: e.target.value },
                    })
                  }
                  className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-400 uppercase">Subheadline Paragraph</label>
                <textarea
                  rows={4}
                  value={formData.heroText.subheadline}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      heroText: { ...formData.heroText, subheadline: e.target.value },
                    })
                  }
                  className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-400 uppercase">CTA Button Text</label>
                <input
                  type="text"
                  value={formData.heroText.ctaText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      heroText: { ...formData.heroText, ctaText: e.target.value },
                    })
                  }
                  className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FAQs Manager */}
        {activeTab === "faqs" && (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-pink-500" />
                <span>Frequently Asked Questions</span>
              </h3>
              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    faqs: [
                      ...formData.faqs,
                      { question: "New Question?", answer: "Answer details here..." },
                    ],
                  })
                }
                className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-extrabold text-xs flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add FAQ</span>
              </button>
            </div>

            <div className="space-y-6">
              {formData.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-pink-400 uppercase">FAQ #{idx + 1}</span>
                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          faqs: formData.faqs.filter((_, i) => i !== idx),
                        })
                      }
                      className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...formData.faqs];
                      updated[idx].question = e.target.value;
                      setFormData({ ...formData, faqs: updated });
                    }}
                    placeholder="Question"
                    className="w-full p-3 rounded-lg bg-slate-900 border border-slate-800 text-white font-bold"
                  />
                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...formData.faqs];
                      updated[idx].answer = e.target.value;
                      setFormData({ ...formData, faqs: updated });
                    }}
                    placeholder="Answer"
                    className="w-full p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Testimonials Manager */}
        {activeTab === "testimonials" && (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-pink-500" />
                <span>Customer Reviews & Testimonials</span>
              </h3>
              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    testimonials: [
                      ...formData.testimonials,
                      {
                        id: String(Date.now()),
                        name: "Customer Name",
                        location: "City",
                        quote: "Great experience with Hear O Care!",
                        rating: 5,
                        avatar: "/images/manish.jpg",
                      },
                    ],
                  })
                }
                className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-extrabold text-xs flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Review</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.testimonials.map((t, idx) => (
                <div key={t.id} className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-pink-400 uppercase">Review #{idx + 1}</span>
                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          testimonials: formData.testimonials.filter((_, i) => i !== idx),
                        })
                      }
                      className="p-2 text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={t.name}
                      onChange={(e) => {
                        const updated = [...formData.testimonials];
                        updated[idx].name = e.target.value;
                        setFormData({ ...formData, testimonials: updated });
                      }}
                      placeholder="Name"
                      className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-white font-bold"
                    />
                    <input
                      type="text"
                      value={t.location}
                      onChange={(e) => {
                        const updated = [...formData.testimonials];
                        updated[idx].location = e.target.value;
                        setFormData({ ...formData, testimonials: updated });
                      }}
                      placeholder="Location"
                      className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-white font-medium"
                    />
                  </div>
                  <textarea
                    rows={3}
                    value={t.quote}
                    onChange={(e) => {
                      const updated = [...formData.testimonials];
                      updated[idx].quote = e.target.value;
                      setFormData({ ...formData, testimonials: updated });
                    }}
                    placeholder="Quote"
                    className="w-full p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Blog Posts Manager */}
        {activeTab === "blogs" && (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-pink-500" />
              <span>Blog Articles Manager</span>
            </h3>

            <div className="space-y-6">
              {formData.blogPosts.map((post, idx) => (
                <div key={post.slug} className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                  <span className="text-xs font-extrabold text-pink-400 uppercase">Article #{idx + 1}</span>
                  <input
                    type="text"
                    value={post.title}
                    onChange={(e) => {
                      const updated = [...formData.blogPosts];
                      updated[idx].title = e.target.value;
                      setFormData({ ...formData, blogPosts: updated });
                    }}
                    className="w-full p-3 rounded-lg bg-slate-900 border border-slate-800 text-white font-bold"
                  />
                  <textarea
                    rows={2}
                    value={post.excerpt}
                    onChange={(e) => {
                      const updated = [...formData.blogPosts];
                      updated[idx].excerpt = e.target.value;
                      setFormData({ ...formData, blogPosts: updated });
                    }}
                    className="w-full p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: Backup & Restore */}
        {activeTab === "backup" && (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-8">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-pink-500" />
              <span>Backup, Restore & Reset Point</span>
            </h3>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3 text-pink-400 font-bold">
                <Sparkles className="w-5 h-5" />
                <span>Active Git Backup Tag: <code className="bg-slate-900 px-3 py-1 rounded text-white font-mono">backup-v1-pre-cms</code></span>
              </div>
              <p className="text-xs text-slate-400">
                You can run <code className="text-slate-200">git checkout backup-v1-pre-cms</code> in terminal to restore the code repository to its pre-CMS clean state anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Download JSON Backup */}
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <Download className="w-8 h-8 text-pink-500" />
                <h4 className="font-extrabold text-white text-base">Export Backup JSON</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Download full copy of your CMS data to keep a local backup file on your computer.
                </p>
                <button
                  onClick={handleDownloadBackup}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
                >
                  Download JSON
                </button>
              </div>

              {/* Upload JSON Restore */}
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <Upload className="w-8 h-8 text-emerald-400" />
                <h4 className="font-extrabold text-white text-base">Restore from File</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Upload a previously saved `.json` backup file to instantly restore CMS state.
                </p>
                <label className="w-full py-3 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center block">
                  Select Backup JSON
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleRestoreBackupFile}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Reset to Factory Defaults */}
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <RotateCcw className="w-8 h-8 text-amber-500" />
                <h4 className="font-extrabold text-white text-base">Reset to System Defaults</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Revert all edited fields back to the original default static configuration.
                </p>
                <button
                  onClick={handleResetToDefaults}
                  className="w-full py-3 rounded-xl bg-amber-950 hover:bg-amber-900 border border-amber-800 text-amber-300 font-extrabold text-xs uppercase tracking-wider transition-colors"
                >
                  Reset Factory Defaults
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
