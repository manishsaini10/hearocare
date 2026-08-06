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

export interface CMSData {
  siteConfig: typeof SITE_CONFIG;
  ingredients: Ingredient[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  disclaimer: string;
  heroText: HeroTextConfig;
  blogPosts: BlogPost[];
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
          setData(json.data);
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json.data));
          } catch {}
          return;
        }
      }
    } catch {
      // Offline or dynamic worker API unavailable, keep cached / default data
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 1. Try local cache first for instant UI response
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        setData(JSON.parse(cached));
      }
    } catch {}

    // 2. Fetch fresh data from Worker API
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
