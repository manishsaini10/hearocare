"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  SITE_CONFIG,
  INGREDIENTS,
  TESTIMONIALS,
  FAQS,
  DISCLAIMER_TEXT,
  Ingredient,
  Testimonial,
  FAQItem,
} from "@/data/siteData";
import { BLOG_POSTS as defaultBlogPosts, BlogPost } from "@/data/blogPosts";

export interface HeroTextConfig {
  headline: string;
  subheadline: string;
  badgeText: string;
  ctaText: string;
}

export interface AdvancedSEOSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterHandle: string;
  canonicalUrl: string;
  googleVerification: string;
  bingVerification: string;
  yandexVerification: string;
  googleAnalyticsId: string;
  facebookPixelId: string;
  allowIndexing: boolean;
}

export interface PageItem {
  id: string;
  slug: string;
  title: string;
  badgeText: string;
  headline: string;
  subheadline: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  isSystemPage?: boolean;
}

export interface CMSData {
  siteConfig: typeof SITE_CONFIG;
  ingredients: Ingredient[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  disclaimer: string;
  heroText: HeroTextConfig;
  blogPosts: BlogPost[];
  seoSettings: AdvancedSEOSettings;
  pages: Record<string, PageItem>;
}

export const DEFAULT_PAGES: Record<string, PageItem> = {
  "about-us": {
    id: "about-us",
    slug: "/about-us",
    title: "About Us",
    badgeText: "Our Mission & Vision",
    headline: "About Hear O Care",
    subheadline:
      "Dedicated to bringing science-backed, natural nutritional solutions to individuals experiencing sensorineural hearing loss and tinnitus across India.",
    content:
      "Partial or progressive hearing loss affects millions of adults, impacting their ability to participate in conversations with loved ones, hear the television clearly, and enjoy natural sounds.\n\nWhile traditional hearing aids amplify sound, they do not replenish the diminishing enzymes and nerve nutrients required by your inner ear hair cells. We formulated Hear O Care to fill this critical gap using a blend of 7 powerful antioxidants and essential vitamins.",
    metaTitle: "About Us | Hear O Care",
    metaDescription:
      "Learn about Hear O Care's mission to support hearing health and combat sensorineural hearing loss with high-potency antioxidants.",
    isSystemPage: true,
  },
  "contact-us": {
    id: "contact-us",
    slug: "/contact-us",
    title: "Contact Us",
    badgeText: "We Are Here To Help",
    headline: "Get in Touch with Hear O Care",
    subheadline:
      "Have questions about Hear O Care dosage, orders, or suitability for your hearing condition? Our dedicated support team is ready to assist you.",
    content:
      "Fill out the contact form or reach out directly to support@hearocare.com. We operate Monday to Saturday, 9:00 AM to 6:00 PM IST.",
    metaTitle: "Contact Us | Hear O Care Support",
    metaDescription: "Contact Hear O Care customer support team for inquiries, product support, or dosage guidance.",
    isSystemPage: true,
  },
  "privacy-policy": {
    id: "privacy-policy",
    slug: "/privacy-policy",
    title: "Privacy Policy",
    badgeText: "Legal Document",
    headline: "Privacy Policy",
    subheadline: "Last Updated: July 28, 2026",
    content:
      "### 1. Introduction\nWelcome to **Hear O Care**. We respect your privacy and are committed to protecting personal data that you share with us when visiting our website or purchasing our products.\n\n### 2. Information We Collect\nWe may collect personal identification data such as name, email address, phone number, shipping address when you contact us or place an order.\n\n### 3. Data Protection\nWe employ administrative and technical security measures to protect your personal data.",
    metaTitle: "Privacy Policy | Hear O Care",
    metaDescription: "Read the official Privacy Policy for Hear O Care. Learn how we collect, protect, and handle your information.",
    isSystemPage: true,
  },
  "terms-and-conditions": {
    id: "terms-and-conditions",
    slug: "/terms-and-conditions",
    title: "Terms and Conditions",
    badgeText: "Terms of Service",
    headline: "Terms & Conditions",
    subheadline: "Last Updated: July 28, 2026",
    content:
      "### 1. Acceptance of Terms\nBy accessing and using the Hear O Care website, you accept and agree to be bound by the terms and provision of this agreement.\n\n### 2. Product Usage & Disclaimer\nInformation on this website is for educational and nutritional awareness purposes.",
    metaTitle: "Terms and Conditions | Hear O Care",
    metaDescription: "Read the terms and conditions governing the use of Hear O Care website and services.",
    isSystemPage: true,
  },
};

export const DEFAULT_CMS_DATA: CMSData = {
  siteConfig: SITE_CONFIG,
  ingredients: INGREDIENTS,
  testimonials: TESTIMONIALS,
  faqs: FAQS,
  disclaimer: DISCLAIMER_TEXT,
  heroText: {
    badgeText: "Target Sensorineural Hearing Loss & Tinnitus",
    headline: "Restore Hearing Clarity Naturally",
    subheadline:
      "Hear O Care is formulated with pharmaceutical grade antioxidants and neuro-nutrients designed to protect auditory nerves and reduce inner ear cellular damage.",
    ctaText: "Buy Authentic on Amazon",
  },
  blogPosts: defaultBlogPosts,
  seoSettings: {
    metaTitle: "hearing loss supplement | Hear O Care",
    metaDescription: SITE_CONFIG.description,
    metaKeywords: SITE_CONFIG.keywords,
    ogTitle: "Hear O Care - Restoring Hearing Clarity Naturally",
    ogDescription: SITE_CONFIG.description,
    ogImage: SITE_CONFIG.ogImage,
    twitterHandle: "@hearocare",
    canonicalUrl: SITE_CONFIG.url,
    googleVerification: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE",
    bingVerification: "YOUR_BING_VERIFICATION_CODE",
    yandexVerification: "YOUR_YANDEX_CODE",
    googleAnalyticsId: "",
    facebookPixelId: "",
    allowIndexing: true,
  },
  pages: DEFAULT_PAGES,
};

interface CMSContextType {
  data: CMSData;
  isLoading: boolean;
  updateData: (newData: CMSData) => void;
  resetData: () => void;
  refetchData: () => Promise<void>;
}

const CMSContext = createContext<CMSContextType>({
  data: DEFAULT_CMS_DATA,
  isLoading: false,
  updateData: () => {},
  resetData: () => {},
  refetchData: async () => {},
});

const LOCAL_STORAGE_KEY = "hearocare_cms_cache";

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<CMSData>(DEFAULT_CMS_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchRemoteData = async () => {
    try {
      const res = await fetch("/api/cms/data");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setData({
            ...DEFAULT_CMS_DATA,
            ...json.data,
            siteConfig: { ...DEFAULT_CMS_DATA.siteConfig, ...json.data.siteConfig },
            seoSettings: { ...DEFAULT_CMS_DATA.seoSettings, ...json.data.seoSettings },
            heroText: { ...DEFAULT_CMS_DATA.heroText, ...json.data.heroText },
            pages: { ...DEFAULT_CMS_DATA.pages, ...(json.data.pages || {}) },
          });
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json.data));
          } catch {}
          return;
        }
      }
    } catch {
      // Offline fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        setData({
          ...DEFAULT_CMS_DATA,
          ...parsed,
          siteConfig: { ...DEFAULT_CMS_DATA.siteConfig, ...parsed.siteConfig },
          seoSettings: { ...DEFAULT_CMS_DATA.seoSettings, ...parsed.seoSettings },
          heroText: { ...DEFAULT_CMS_DATA.heroText, ...parsed.heroText },
          pages: { ...DEFAULT_CMS_DATA.pages, ...(parsed.pages || {}) },
        });
      }
    } catch {}

    fetchRemoteData();
  }, []);

  const updateData = (newData: CMSData) => {
    setData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch {}
  };

  const resetData = () => {
    setData(DEFAULT_CMS_DATA);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {}
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        isLoading,
        updateData,
        resetData,
        refetchData: fetchRemoteData,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
