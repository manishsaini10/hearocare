import ContactForm from "@/components/ContactForm";
import { Mail } from "lucide-react";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Hear O Care support team for product inquiries, dosage guidance, or order assistance.",
};

export default function ContactUsPage() {
  return (
    <div className="bg-slate-50 py-20 sm:py-28">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 space-y-20">
        
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-extrabold text-xs uppercase tracking-wider">
            <Mail className="w-4 h-4 text-pink-600" />
            <span>Customer Assistance</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            Contact <span className="gradient-text">Our Team</span>
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl font-medium">
            Have questions about Hear O Care ingredients, usage, or orders? We are here to help.
          </p>
        </div>

        {/* Contact Form Section */}
        <ContactForm />

      </div>
    </div>
  );
}
