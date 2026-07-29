export interface Ingredient {
  name: string;
  description: string;
  color: string;
  iconBg: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const SITE_CONFIG = {
  name: "Hear O Care",
  title: "hearing loss supplement",
  description: "Looking for ways to support your hearing health? hear o care is a hearing loss supplement for hearing loss issue.",
  keywords: "hearing loss supplement, sensorineural hearing loss, tinnitus supplement, hear o care, hearing health, natural ear supplement",
  url: "https://hearocare.com",
  ogImage: "/images/hearing-problem.jpg",
  logo: "/images/logo.png",
  amazonUrl: "https://www.amazon.in/Hear-O-Care/dp/B07TC8FMGH",
  cataloguePdf: "/downloads/hearocarecatalogue.pdf",
  social: {
    facebook: "https://www.facebook.com/hearocare",
    twitter: "https://x.com/hearocare",
    instagram: "https://www.instagram.com/hearocare",
    youtube: "https://www.youtube.com/@hearocare",
  },
  contact: {
    email: "support@hearocare.com",
    phone: "+91 98765 43210",
    address: "Yamunanagar, Haryana, India",
    workingHours: "Mon - Sat: 9:00 AM - 6:00 PM IST",
  },
};

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Blog", path: "/blog" },
  { name: "Customer Review", path: "/reviews" },
  { name: "Contact Us", path: "/contact-us" },
  { name: "FAQ", path: "/faq" },
];

export const INGREDIENTS: Ingredient[] = [
  {
    name: "Vitamin D3",
    description: "A lack of vitamin D weakens your bones, this can lead to hearing loss and even deafness.",
    color: "#e92467",
    iconBg: "bg-pink-100 text-pink-600 border-pink-200",
  },
  {
    name: "Methylcobalamin",
    description: "A powerful antioxidant that helps maintaining neuronal health and auditory nerve transmission.",
    color: "#f34336",
    iconBg: "bg-red-100 text-red-600 border-red-200",
  },
  {
    name: "Magnesium",
    description: "Helps maintain normal nerve and muscle function, supports a healthy immune system.",
    color: "#00bcd4",
    iconBg: "bg-cyan-100 text-cyan-600 border-cyan-200",
  },
  {
    name: "Acetyl-L-Carnitine",
    description: "A well-known nutrient that reduces inner-ear hair cell loss and mitochondrial fatigue.",
    color: "#2083ee",
    iconBg: "bg-blue-100 text-blue-600 border-blue-200",
  },
  {
    name: "L-Glutathione",
    description: "An enzyme used to protect cells from oxidative damage and protect the nerves in your inner ear.",
    color: "#fe9a07",
    iconBg: "bg-amber-100 text-amber-600 border-amber-200",
  },
  {
    name: "Alpha Lipoic Acid",
    description: "Works as an antioxidant in both water and fatty tissue, protecting nerve cells from damage.",
    color: "#4caf50",
    iconBg: "bg-emerald-100 text-emerald-600 border-emerald-200",
  },
  {
    name: "Quercetin",
    description: "Acts as a potent bioflavonoid antioxidant, scavenging free radicals that can destroy hearing.",
    color: "#8224e3",
    iconBg: "bg-purple-100 text-purple-600 border-purple-200",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Manish Saini",
    location: "Yamunanagar",
    quote: "Results have been excellent with no side effects to date. Hearing clarity improved remarkably after regular usage.",
    rating: 5,
    avatar: "/images/manish.jpg",
  },
  {
    id: "2",
    name: "Deepak",
    location: "K. Khurd",
    quote: "I began to notice clear sounds after around 60 days. There is a noticeable difference in understanding background chatter.",
    rating: 5,
    avatar: "/images/deepak.jpg",
  },
  {
    id: "3",
    name: "Amaira",
    location: "Navi Mumbai",
    quote: "Three months my hearing seems to be much better. I can now hear the phone and television much better without turning volume to maximum.",
    rating: 5,
    avatar: "/images/amaira.png",
  },
];

export const FAQS: FAQItem[] = [
  {
    question: "How long should I take Hear O Care to see results?",
    answer: "For better and noticeable results, we recommend using Hear O Care continuously for at least 6 weeks (around 60 days).",
    category: "Usage & Dosage",
  },
  {
    question: "Does Hear O Care work for Sensorineural Hearing Loss?",
    answer: "Yes! Hear O Care is specifically formulated with antioxidants and neuro-supportive nutrients designed to work for people suffering from Sensorineural Hearing Loss and Tinnitus.",
    category: "Effectiveness",
  },
  {
    question: "How does Hear O Care compare to a traditional Hearing Aid?",
    answer: "Hearing aids work by amplifying sound volume rather than dealing with the underlying cause. Hear O Care works to restore natural cell and nerve functions that process sound, improving speech clarity and understanding.",
    category: "Comparison",
  },
  {
    question: "Are there any known side effects?",
    answer: "Hear O Care contains high-quality pharmaceutical grade vitamins, antioxidants, and essential minerals (Vitamin D3, Methylcobalamin, Magnesium, L-Glutathione, Alpha Lipoic Acid). Users report zero side effects.",
    category: "Safety",
  },
  {
    question: "Where can I buy authentic Hear O Care?",
    answer: "You can purchase authentic Hear O Care directly via our official Amazon India store page with 100% secure payment gateways and fast shipping.",
    category: "Orders",
  },
];

export const DISCLAIMER_TEXT = 
  "Information on this website has been posted in public interest for awareness about hearing loss due to old age / general health. In event of any copyright conflicts, please inform so that we may take appropriate remedial measures. The products and the claims made on this site have not been evaluated by the FDA and are not approved to diagnose, treat, cure or prevent diseases. Results can vary from person to person.";
