
import React from 'react';
import { Target, Eye, ArrowUpRight, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F4EB] dark:bg-[#1A110B] text-[#2E1F17] dark:text-[#F8F4EB] overflow-hidden">

      {/* ==================== HERO ==================== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-20">
        
        {/* Decorative background */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#D4B483]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4B483]/40 bg-[#D4B483]/10 mb-7">
            <Sparkles className="w-3.5 h-3.5 text-[#D4B483]" />
            <span className="text-[11px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#6B4E3A] dark:text-[#D4B483]">
              About Aevona Solution
            </span>
          </div>

          <h1 className="font-Clarkson font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-[-0.04em] text-[#2E1F17] dark:text-[#F8F4EB]">
            People.
            <span className="text-[#6B4E3A] dark:text-[#D4B483]"> Technology.</span>
            <br />
            A Brighter Tomorrow.
          </h1>

          <p className="mt-7 max-w-2xl mx-auto text-sm sm:text-base lg:text-[17px] leading-8 text-[#6B4E3A]/80 dark:text-[#D4B483]/75 font-Clarkson">
            We build reliable, scalable, and thoughtful digital solutions
            that help businesses move forward with confidence.
          </p>

          <div className="mt-10 flex justify-center">
            <div className="h-px w-20 bg-[#D4B483]" />
          </div>
        </div>
      </section>


      {/* ==================== STORY ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <div className="relative overflow-hidden rounded-[2rem] border border-[#D4B483]/30 bg-white dark:bg-[#241812] shadow-[0_20px_70px_rgba(46,31,23,0.08)]">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr]">

            {/* Content */}
            <div className="relative p-7 sm:p-10 lg:p-14 xl:p-16 flex flex-col justify-center">

              <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4B483]/10 blur-3xl rounded-full" />

              <span className="relative text-[11px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
                Our Story
              </span>

              <h2 className="relative mt-4 font-Clarkson font-bold text-3xl sm:text-4xl tracking-[-0.03em] text-[#2E1F17] dark:text-[#F8F4EB]">
                Technology with
                <br />
                <span className="text-[#6B4E3A] dark:text-[#D4B483]">
                  purpose.
                </span>
              </h2>

              <p className="relative mt-6 text-sm leading-7 text-[#6B4E3A]/80 dark:text-[#D4B483]/75 font-Clarkson max-w-xl">
                Aevona Solution was founded with a simple belief: technology
                should empower people and businesses to achieve more.
                We bring together technical expertise, creative thinking,
                and a client-centric approach to solve real-world challenges.
              </p>

              {/* Stats */}
              <div className="relative grid grid-cols-2 gap-4 mt-9 max-w-md">

                <div className="group rounded-2xl border border-[#D4B483]/25 bg-[#F8F4EB] dark:bg-[#1A110B] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4B483]/60">
                  <div className="font-Clarkson font-bold text-2xl sm:text-3xl text-[#2E1F17] dark:text-[#F8F4EB]">
                    50<span className="text-[#D4B483]">+</span>
                  </div>

                  <div className="mt-1 text-[10px] sm:text-xs font-Clarkson uppercase tracking-wider text-[#6B4E3A]/70 dark:text-[#D4B483]/70">
                    Projects Delivered
                  </div>
                </div>

                <div className="group rounded-2xl border border-[#D4B483]/25 bg-[#F8F4EB] dark:bg-[#1A110B] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4B483]/60">
                  <div className="font-Clarkson font-bold text-2xl sm:text-3xl text-[#2E1F17] dark:text-[#F8F4EB]">
                    30<span className="text-[#D4B483]">+</span>
                  </div>

                  <div className="mt-1 text-[10px] sm:text-xs font-Clarkson uppercase tracking-wider text-[#6B4E3A]/70 dark:text-[#D4B483]/70">
                    Happy Clients
                  </div>
                </div>

              </div>
            </div>


            {/* Image */}
            <div className="relative min-h-[360px] lg:min-h-[560px] overflow-hidden">

              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=85&w=1200"
                alt="Aevona Solution team collaborating"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E1F17]/55 via-transparent to-transparent" />

              {/* Image badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">

                <div>
                  <p className="text-[10px] font-Clarkson uppercase tracking-[0.2em] text-[#F8F4EB]/70">
                    Built together
                  </p>
                  <p className="mt-1 text-sm font-Clarkson font-semibold text-[#F8F4EB]">
                    Ideas into impact.
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#F8F4EB]/90 backdrop-blur flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 text-[#2E1F17]" />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ==================== MISSION & VISION ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        <div className="text-center mb-12">

          <span className="text-[11px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
            What drives us
          </span>

          <h2 className="mt-3 font-Clarkson font-bold text-3xl sm:text-4xl tracking-[-0.03em] text-[#2E1F17] dark:text-[#F8F4EB]">
            Built around purpose.
          </h2>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

          {/* Mission */}
          <div className="group relative overflow-hidden p-7 sm:p-9 rounded-[1.75rem] bg-white dark:bg-[#241812] border border-[#D4B483]/30 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">

            <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-[#D4B483]/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-2xl bg-[#D4B483]/15 border border-[#D4B483]/20 text-[#6B4E3A] dark:text-[#D4B483] flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>

                <span className="font-Clarkson text-[10px] uppercase tracking-widest text-[#6B4E3A]/40 dark:text-[#D4B483]/40">
                  01
                </span>

              </div>

              <h3 className="mt-7 font-Clarkson font-bold text-xl text-[#2E1F17] dark:text-[#F8F4EB]">
                Our Mission
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#6B4E3A]/80 dark:text-[#D4B483]/75 font-Clarkson">
                To empower businesses with reliable, scalable, and innovative
                digital solutions that create meaningful and lasting impact.
              </p>

              <div className="mt-7 h-px w-12 bg-[#D4B483] transition-all duration-300 group-hover:w-20" />

            </div>
          </div>


          {/* Vision */}
          <div className="group relative overflow-hidden p-7 sm:p-9 rounded-[1.75rem] bg-white dark:bg-[#241812] border border-[#D4B483]/30 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">

            <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-[#D4B483]/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-2xl bg-[#D4B483]/15 border border-[#D4B483]/20 text-[#6B4E3A] dark:text-[#D4B483] flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>

                <span className="font-Clarkson text-[10px] uppercase tracking-widest text-[#6B4E3A]/40 dark:text-[#D4B483]/40">
                  02
                </span>

              </div>

              <h3 className="mt-7 font-Clarkson font-bold text-xl text-[#2E1F17] dark:text-[#F8F4EB]">
                Our Vision
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#6B4E3A]/80 dark:text-[#D4B483]/75 font-Clarkson">
                A world where technology quietly enables people and businesses
                to achieve more, without getting in the way.
              </p>

              <div className="mt-7 h-px w-12 bg-[#D4B483] transition-all duration-300 group-hover:w-20" />

            </div>
          </div>

        </div>
      </section>


      {/* ==================== BOTTOM STATEMENT ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <div className="relative overflow-hidden rounded-[2rem] border border-[#D4B483]/30 bg-[#2E1F17] dark:bg-[#241812] px-7 py-12 sm:px-12 sm:py-16 text-center">

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-40 bg-[#D4B483]/10 blur-3xl rounded-full" />

          <div className="relative">

            <span className="text-[10px] font-Clarkson uppercase tracking-[0.25em] text-[#D4B483]">
              The Aevona Approach
            </span>

            <h2 className="mt-4 font-Clarkson font-bold text-2xl sm:text-3xl lg:text-4xl tracking-[-0.03em] text-[#F8F4EB]">
              Simple ideas.
              <span className="text-[#D4B483]"> Meaningful technology.</span>
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-sm leading-7 text-[#F8F4EB]/65 font-Clarkson">
              We believe the best technology feels effortless.
              Behind that simplicity is thoughtful engineering,
              purposeful design, and a relentless focus on people.
            </p>

          </div>
        </div>

      </section>

    </div>
  );
};

