
import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
  Clock3,
  Sparkles,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
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
    <div className="min-h-screen bg-[#F8F4EB] dark:bg-[#1A110B] text-[#2E1F17] dark:text-[#F8F4EB] overflow-hidden">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative pt-16 sm:pt-20 lg:pt-24 pb-14">

        {/* Ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-[#D4B483]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="absolute left-[7%] top-40 w-40 h-40 rounded-full bg-[#7C8B78]/5 blur-3xl" />

        <div className="absolute right-[7%] top-52 w-40 h-40 rounded-full bg-[#A9684F]/5 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4B483]/10 border border-[#D4B483]/35">

            <Sparkles className="w-3.5 h-3.5 text-[#D4B483]" />

            <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.22em] text-[#6B4E3A] dark:text-[#D4B483]">
              Let's Connect
            </span>

          </div>

          <h1 className="mt-7 font-Clarkson font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-[-0.055em] leading-[1.02]">

            <span className="text-[#2E1F17] dark:text-[#F8F4EB]">
              Have an idea?
            </span>

            <br />

            <span className="text-[#6B4E3A] dark:text-[#D4B483]">
              Let's build it.
            </span>

          </h1>

          <p className="mt-7 max-w-2xl mx-auto text-sm sm:text-base leading-8 font-Clarkson text-[#6B4E3A]/75 dark:text-[#D4B483]/70">
            Tell us what you're working on, what you're trying to solve,
            or where your current system is falling apart. We'll take it
            from there.
          </p>

          {/* Response indicators */}
          <div className="mt-9 flex flex-wrap justify-center gap-3">

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">

              <Clock3 className="w-3.5 h-3.5 text-[#D4B483]" />

              <span className="text-[9px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                Response within 24 hours
              </span>

            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">

              <ShieldCheck className="w-3.5 h-3.5 text-[#7C8B78]" />

              <span className="text-[9px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                Your information stays private
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTACT AREA
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-7 items-stretch">


          {/* =================================================
              CONTACT INFORMATION
          ================================================== */}

          <div className="relative overflow-hidden rounded-[2rem] bg-[#2E1F17] dark:bg-[#241812] border border-[#D4B483]/30 p-7 sm:p-9 shadow-xl">

            {/* Decorative glow */}
            <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[#D4B483]/10 blur-3xl" />

            <div className="relative h-full flex flex-col">

              <div>

                <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
                  Contact Information
                </span>

                <h2 className="mt-4 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.04em] text-[#F8F4EB]">
                  Start a conversation.
                </h2>

                <p className="mt-4 text-xs leading-6 font-Clarkson text-[#F8F4EB]/55">
                  Whether you're planning a new product or improving an
                  existing system, we're ready to understand the problem
                  before proposing the solution.
                </p>

              </div>


              {/* Contact cards */}
              <div className="mt-9 space-y-3">


                {/* Location */}
                <div className="group p-4 rounded-2xl bg-[#F8F4EB]/5 border border-[#F8F4EB]/10 hover:bg-[#F8F4EB]/10 transition-colors">

                  <div className="flex items-start gap-4">

                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#D4B483]/10 flex items-center justify-center">

                      <MapPin className="w-4 h-4 text-[#D4B483]" />

                    </div>

                    <div>

                      <div className="text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#F8F4EB]/40">
                        Headquarters
                      </div>

                      <div className="mt-1 text-xs font-Clarkson leading-5 text-[#F8F4EB]/75">
                        Studio 51
                        <br />
                        Birmingham B4 7AH
                      </div>

                    </div>

                  </div>

                </div>


                {/* Email */}
                <div className="group p-4 rounded-2xl bg-[#F8F4EB]/5 border border-[#F8F4EB]/10 hover:bg-[#F8F4EB]/10 transition-colors">

                  <div className="flex items-start gap-4">

                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#D4B483]/10 flex items-center justify-center">

                      <Mail className="w-4 h-4 text-[#D4B483]" />

                    </div>

                    <div>

                      <div className="text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#F8F4EB]/40">
                        Email Us
                      </div>

                      <div className="mt-1 space-y-1 text-xs font-Clarkson text-[#F8F4EB]/75">
                        <div>info@aevonasolution.com</div>
                        <div>aevonasolution@gmail.com</div>
                      </div>

                    </div>

                  </div>

                </div>


                {/* Phone */}
                <div className="group p-4 rounded-2xl bg-[#F8F4EB]/5 border border-[#F8F4EB]/10 hover:bg-[#F8F4EB]/10 transition-colors">

                  <div className="flex items-start gap-4">

                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#D4B483]/10 flex items-center justify-center">

                      <Phone className="w-4 h-4 text-[#D4B483]" />

                    </div>

                    <div>

                      <div className="text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#F8F4EB]/40">
                        Call Us
                      </div>

                      <div className="mt-1 space-y-1 text-xs font-Clarkson text-[#F8F4EB]/75">
                        <div>+44 7404 010483</div>
                        <div>+91 98756 43914</div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>


              {/* Bottom note */}
              <div className="mt-auto pt-8">

                <div className="flex items-center gap-3">

                  <div className="w-8 h-8 rounded-lg bg-[#7C8B78]/15 flex items-center justify-center">

                    <MessageCircle className="w-3.5 h-3.5 text-[#9CAB93]" />

                  </div>

                  <div>

                    <div className="text-[9px] font-Clarkson font-semibold text-[#F8F4EB]/70">
                      Prefer a quick conversation?
                    </div>

                    <div className="mt-1 text-[8px] font-Clarkson text-[#F8F4EB]/40">
                      Email us directly and we'll get back to you.
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              FORM
          ================================================== */}

          <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-[2rem] p-7 sm:p-10 shadow-xl">

            {submitted ? (

              /* =============================================
                 SUCCESS STATE
              ============================================== */

              <div className="min-h-[560px] flex items-center justify-center">

                <div className="text-center max-w-md">

                  <div className="relative mx-auto w-20 h-20">

                    <div className="absolute inset-0 rounded-full bg-[#7C8B78]/10 animate-pulse" />

                    <div className="relative w-20 h-20 rounded-full bg-[#7C8B78]/15 border border-[#7C8B78]/30 flex items-center justify-center">

                      <CheckCircle2 className="w-9 h-9 text-[#687763]" />

                    </div>

                  </div>

                  <h3 className="mt-7 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.04em] text-[#2E1F17] dark:text-[#F8F4EB]">
                    Message received.
                  </h3>

                  <p className="mt-4 text-xs sm:text-sm leading-7 font-Clarkson text-[#6B4E3A]/65 dark:text-[#D4B483]/65">
                    Thanks for reaching out to Aevona Solution. Your
                    message has been received and our team will get back
                    to you within 24 hours.
                  </p>

                  <div className="mt-7 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/20">

                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7C8B78]" />

                    <span className="text-[9px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                      Successfully submitted
                    </span>

                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-7 flex items-center gap-2 mx-auto text-[10px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483] hover:gap-3 transition-all"
                  >
                    Send another message
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                </div>

              </div>

            ) : (

              /* =============================================
                 CONTACT FORM
              ============================================== */

              <form onSubmit={handleSubmit} className="space-y-6">

                <div>

                  <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
                    Send a Message
                  </span>

                  <h2 className="mt-3 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.04em] text-[#2E1F17] dark:text-[#F8F4EB]">
                    Tell us what you're building.
                  </h2>

                  <p className="mt-3 text-xs leading-6 font-Clarkson text-[#6B4E3A]/55 dark:text-[#D4B483]/55">
                    Give us a little context and we'll take it from there.
                  </p>

                </div>


                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>

                    <label className="block mb-2 text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#2E1F17] dark:text-[#F8F4EB]">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      className="w-full h-12 px-4 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/25 text-xs font-Clarkson text-[#2E1F17] dark:text-[#F8F4EB] placeholder:text-[#6B4E3A]/35 dark:placeholder:text-[#D4B483]/35 outline-none focus:border-[#D4B483] focus:ring-2 focus:ring-[#D4B483]/10 transition-all"
                    />

                  </div>


                  <div>

                    <label className="block mb-2 text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#2E1F17] dark:text-[#F8F4EB]">
                      Work Email *
                    </label>

                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      className="w-full h-12 px-4 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/25 text-xs font-Clarkson text-[#2E1F17] dark:text-[#F8F4EB] placeholder:text-[#6B4E3A]/35 dark:placeholder:text-[#D4B483]/35 outline-none focus:border-[#D4B483] focus:ring-2 focus:ring-[#D4B483]/10 transition-all"
                    />

                  </div>

                </div>


                {/* Company */}
                <div>

                  <label className="block mb-2 text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#2E1F17] dark:text-[#F8F4EB]">
                    Company / Organization
                  </label>

                  <input
                    type="text"
                    placeholder="Aevona Enterprises"
                    className="w-full h-12 px-4 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/25 text-xs font-Clarkson text-[#2E1F17] dark:text-[#F8F4EB] placeholder:text-[#6B4E3A]/35 dark:placeholder:text-[#D4B483]/35 outline-none focus:border-[#D4B483] focus:ring-2 focus:ring-[#D4B483]/10 transition-all"
                  />

                </div>


                {/* Project Type */}
                <div>

                  <label className="block mb-2 text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#2E1F17] dark:text-[#F8F4EB]">
                    What can we help with?
                  </label>

                  <select
                    defaultValue=""
                    className="w-full h-12 px-4 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/25 text-xs font-Clarkson text-[#2E1F17] dark:text-[#F8F4EB] outline-none focus:border-[#D4B483] focus:ring-2 focus:ring-[#D4B483]/10 transition-all"
                  >

                    <option value="" disabled>
                      Select a service
                    </option>

                    <option value="web">
                      Web & Application Development
                    </option>

                    <option value="data">
                      Data & Analytics
                    </option>

                    <option value="cloud">
                      Cloud Infrastructure
                    </option>

                    <option value="mobile">
                      Mobile App Development
                    </option>

                    <option value="automation">
                      Business Automation
                    </option>

                    <option value="design">
                      UI/UX & Product Design
                    </option>

                    <option value="other">
                      Something Else
                    </option>

                  </select>

                </div>


                {/* Message */}
                <div>

                  <label className="block mb-2 text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#2E1F17] dark:text-[#F8F4EB]">
                    Message *
                  </label>

                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us about your project, requirements, timeline, or the problem you're trying to solve..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/25 text-xs leading-6 font-Clarkson text-[#2E1F17] dark:text-[#F8F4EB] placeholder:text-[#6B4E3A]/35 dark:placeholder:text-[#D4B483]/35 outline-none resize-none focus:border-[#D4B483] focus:ring-2 focus:ring-[#D4B483]/10 transition-all"
                  />

                </div>


                {/* Submit */}
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  fullWidth
                  disabled={loading}
                  icon={<Send className="w-4 h-4" />}
                >
                  {loading ? 'Sending Message...' : 'Send Message'}
                </Button>


                {/* Privacy note */}
                <div className="flex items-center justify-center gap-2">

                  <ShieldCheck className="w-3 h-3 text-[#7C8B78]" />

                  <span className="text-[8px] font-Clarkson text-[#6B4E3A]/40 dark:text-[#D4B483]/40">
                    Your information is only used to respond to your enquiry.
                  </span>

                </div>

              </form>

            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <div className="relative overflow-hidden rounded-[2rem] bg-white dark:bg-[#241812] border border-[#D4B483]/30 px-7 py-10 sm:px-12">

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            <div className="text-center md:text-left">

              <div className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
                Prefer email?
              </div>

              <div className="mt-2 text-lg sm:text-xl font-Clarkson font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
                info@aevonasolution.com
              </div>

            </div>

            <a
              href="mailto:info@aevonasolution.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6B4E3A] text-white dark:bg-[#D4B483] dark:text-[#1A110B] text-[10px] font-Clarkson font-bold hover:-translate-y-0.5 transition-all"
            >
              Email Aevona
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

          </div>

        </div>

      </section>

    </div>
  );
};