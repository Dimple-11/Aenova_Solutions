import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4B483] font-serif">
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
          Let's Build Something Great Together.
        </h1>
        <p className="text-base text-[#6B4E3A] dark:text-[#D4B483]/80 max-w-2xl mx-auto">
          Have a project in mind or want to learn more about our services? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-8 bg-white dark:bg-[#241812] border border-[#D4B483]/30 p-8 rounded-3xl shadow-xl">
          <h3 className="text-xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Contact Information</h3>

          <div className="space-y-6 text-sm text-[#6B4E3A] dark:text-[#D4B483]/80">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#D4B483] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Headquarters</div>
                <div>One Market Tower, Suite 1400, San Francisco, CA 94105</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-[#D4B483] shrink-0" />
              <div>
                <div className="font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Email Us</div>
                <div>contact@aevona.com</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-[#D4B483] shrink-0" />
              <div>
                <div className="font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Call Us</div>
                <div>+1 (555) 234-5678</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-[#241812] border border-[#D4B483]/30 p-8 sm:p-10 rounded-3xl shadow-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Message Sent!</h3>
              <p className="text-xs text-[#6B4E3A] dark:text-[#D4B483]">Thank you for reaching out. An Aevona solution architect will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Send Us a Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">Full Name *</label>
                  <input type="text" required placeholder="Alex Morgan" className="w-full px-3.5 py-2.5 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">Work Email *</label>
                  <input type="email" required placeholder="alex@company.com" className="w-full px-3.5 py-2.5 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">Company / Organization</label>
                <input type="text" placeholder="Aevona Enterprises" className="w-full px-3.5 py-2.5 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">Message *</label>
                <textarea rows={5} required placeholder="Tell us about your project requirements..." className="w-full px-3.5 py-2.5 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm" />
              </div>

              <Button type="submit" variant="gold" size="lg" fullWidth disabled={loading} icon={<Send className="w-4 h-4" />}>
                {loading ? 'Sending Message...' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
