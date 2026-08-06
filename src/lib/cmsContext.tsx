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

export interface CMSData {
  siteConfig: typeof SITE_CONFIG;
  ingredients: Ingredient[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  disclaimer: string;
  heroText: HeroTextConfig;
  blogPosts: BlogPost[];
  seoSettings: AdvancedSEOSettings;
}

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
