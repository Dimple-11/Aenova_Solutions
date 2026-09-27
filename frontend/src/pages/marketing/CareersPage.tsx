
import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
  Rocket,
  HeartHandshake,
  GraduationCap,
  Globe2,
  X,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

export const CareersPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  const openRoles = [
    {
      id: '1',
      title: 'Senior Cloud & DevOps Architect',
      dept: 'Cloud Engineering',
      location: 'Remote / Hybrid',
      type: 'Full-Time',
      experience: '4+ Years',
      description:
        'Design scalable cloud infrastructure, deployment pipelines, and resilient systems for modern digital products.',
      tags: ['AWS', 'Docker', 'Kubernetes'],
    },
    {
      id: '2',
      title: 'Lead Full Stack Engineer',
      dept: 'Software Development',
      location: 'Remote / Hybrid',
      type: 'Full-Time',
      experience: '3+ Years',
      description:
        'Build high-quality web applications across the frontend and backend while helping shape engineering standards.',
      tags: ['React', 'Node.js', 'TypeScript'],
    },
    {
      id: '3',
      title: 'Senior UI/UX Designer',
      dept: 'Design & Excellence',
      location: 'Remote',
      type: 'Full-Time',
      experience: '3+ Years',
      description:
        'Create thoughtful digital experiences that combine usability, visual systems, and strong product thinking.',
      tags: ['Figma', 'UI/UX', 'Design Systems'],
    },
    {
      id: '4',
      title: 'Data Pipeline Specialist',
      dept: 'Data Solutions',
      location: 'Remote',
      type: 'Full-Time',
      experience: '2+ Years',
      description:
        'Build reliable data pipelines and analytics infrastructure that turn complex information into useful insights.',
      tags: ['Python', 'PostgreSQL', 'ETL'],
    },
    {
      id: '5',
      title: 'Frontend Developer',
      dept: 'Software Development',
      location: 'Remote',
      type: 'Full-Time',
      experience: '1–2 Years',
      description:
        'Develop polished, responsive interfaces and turn product concepts into fast and accessible experiences.',
      tags: ['React', 'Tailwind', 'JavaScript'],
    },
    {
      id: '6',
      title: 'Business Automation Engineer',
      dept: 'Automation & Data',
      location: 'Remote',
      type: 'Full-Time',
      experience: '2+ Years',
      description:
        'Help businesses eliminate repetitive workflows through intelligent automation and system integrations.',
      tags: ['APIs', 'Python', 'Automation'],
    },
  ];

  const benefits = [
    {
      icon: Rocket,
      title: 'Build Real Products',
      description:
        'Work on practical technology that solves meaningful business problems.',
    },
    {
      icon: Users,
      title: 'Collaborative Culture',
      description:
        'Work alongside engineers, designers, strategists, and problem solvers.',
    },
    {
      icon: Globe2,
      title: 'Remote Friendly',
      description:
        'Flexible working arrangements designed around outcomes, not desk time.',
    },
    {
      icon: GraduationCap,
      title: 'Keep Learning',
      description:
        'Grow your technical and professional skills through challenging projects.',
    },
    {
      icon: HeartHandshake,
      title: 'People First',
      description:
        'We value communication, ownership, curiosity, and respectful collaboration.',
    },
    {
      icon: Sparkles,
      title: 'Room to Create',
      description:
        'Bring ideas to the table and help shape how we build and work.',
    },
  ];

  const hiringSteps = [
    {
      number: '01',
      title: 'Application',
      description: 'Share your background, work, and what you would like to build.',
    },
    {
      number: '02',
      title: 'Conversation',
      description: 'A short conversation with our team about your experience and goals.',
    },
    {
      number: '03',
      title: 'Technical / Creative Round',
      description: 'A role-specific discussion or practical assessment.',
    },
    {
      number: '04',
      title: 'Meet the Team',
      description: 'Get to know the people you would collaborate with.',
    },
    {
      number: '05',
      title: 'Welcome to Aevona',
      description: 'If there is a mutual fit, we move forward together.',
    },
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);

    setTimeout(() => {
      setApplied(false);
      setSelectedRole(null);
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#F8F4EB] dark:bg-[#1A110B] text-[#2E1F17] dark:text-[#F8F4EB] overflow-hidden">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative pt-16 sm:pt-20 lg:pt-24 pb-20">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[420px] bg-[#D4B483]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="absolute left-[5%] top-44 w-40 h-40 rounded-full bg-[#7C8B78]/5 blur-3xl" />

        <div className="absolute right-[5%] top-56 w-48 h-48 rounded-full bg-[#A9684F]/5 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4B483]/10 border border-[#D4B483]/35">

            <Sparkles className="w-3.5 h-3.5 text-[#D4B483]" />

            <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.22em] text-[#6B4E3A] dark:text-[#D4B483]">
              Careers at Aevona
            </span>

          </div>

          <h1 className="mt-7 font-Clarkson font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-[-0.055em] leading-[1.02]">

            <span className="text-[#2E1F17] dark:text-[#F8F4EB]">
              Build things
            </span>

            <br />

            <span className="text-[#6B4E3A] dark:text-[#D4B483]">
              worth building.
            </span>

          </h1>

          <p className="mt-7 max-w-2xl mx-auto text-sm sm:text-base leading-8 font-Clarkson text-[#6B4E3A]/75 dark:text-[#D4B483]/70">
            We're building a team of engineers, designers, strategists,
            and curious humans who enjoy solving difficult problems without
            making everything unnecessarily complicated.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">

            <div className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">
              <span className="text-[9px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                Remote-friendly
              </span>
            </div>

            <div className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">
              <span className="text-[9px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                Product-focused
              </span>
            </div>

            <div className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">
              <span className="text-[9px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                Growth-minded
              </span>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          CULTURE INTRO
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <div className="relative overflow-hidden rounded-[2rem] bg-[#2E1F17] dark:bg-[#241812] border border-[#D4B483]/30 p-8 sm:p-12">

          <div className="absolute -right-32 -top-32 w-80 h-80 rounded-full bg-[#D4B483]/10 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            <div>

              <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
                Life at Aevona
              </span>

              <h2 className="mt-4 text-3xl sm:text-4xl font-Clarkson font-bold tracking-[-0.045em] text-[#F8F4EB]">
                Good work needs
                <br />
                good people.
              </h2>

            </div>

            <div className="text-xs sm:text-sm leading-7 font-Clarkson text-[#F8F4EB]/60">
              We believe great products come from teams that communicate
              clearly, take ownership, stay curious, and aren't afraid to
              question the obvious solution. We care about quality without
              worshipping perfection.
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BENEFITS
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        <div className="text-center mb-10">

          <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
            Why Aevona
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl font-Clarkson font-bold tracking-[-0.045em] text-[#2E1F17] dark:text-[#F8F4EB]">
            More than just a job.
          </h2>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div
                key={index}
                className="group p-6 rounded-[1.6rem] bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                <div className="w-11 h-11 rounded-xl bg-[#D4B483]/12 border border-[#D4B483]/20 flex items-center justify-center group-hover:bg-[#D4B483]/20 transition-colors">

                  <Icon className="w-5 h-5 text-[#6B4E3A] dark:text-[#D4B483]" />

                </div>

                <h3 className="mt-5 text-base font-Clarkson font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-[11px] leading-6 font-Clarkson text-[#6B4E3A]/65 dark:text-[#D4B483]/60">
                  {benefit.description}
                </p>

              </div>
            );
          })}

        </div>

      </section>


      {/* =====================================================
          OPEN POSITIONS
      ====================================================== */}

      <section className="bg-white/60 dark:bg-[#241812]/40 border-y border-[#D4B483]/15">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">

            <div>

              <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
                Opportunities
              </span>

              <h2 className="mt-3 text-3xl sm:text-4xl font-Clarkson font-bold tracking-[-0.045em] text-[#2E1F17] dark:text-[#F8F4EB]">
                Open positions
              </h2>

            </div>

            <div className="text-[10px] font-Clarkson text-[#6B4E3A]/60 dark:text-[#D4B483]/60">
              {openRoles.length} roles currently available
            </div>

          </div>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {openRoles.map((role) => (

              <div
                key={role.id}
                className="group p-6 sm:p-7 rounded-[1.7rem] bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm hover:shadow-xl hover:border-[#D4B483]/60 transition-all duration-300"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="w-11 h-11 rounded-xl bg-[#D4B483]/12 border border-[#D4B483]/20 flex items-center justify-center shrink-0">

                    <Briefcase className="w-5 h-5 text-[#6B4E3A] dark:text-[#D4B483]" />

                  </div>

                  <span className="px-3 py-1.5 rounded-full bg-[#7C8B78]/10 border border-[#7C8B78]/20 text-[8px] font-Clarkson font-bold uppercase tracking-wider text-[#687763] dark:text-[#9CAB93]">
                    {role.type}
                  </span>

                </div>


                <div className="mt-6">

                  <span className="text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#A6815B]">
                    {role.dept}
                  </span>

                  <h3 className="mt-2 text-lg sm:text-xl font-Clarkson font-bold tracking-[-0.03em] text-[#2E1F17] dark:text-[#F8F4EB]">
                    {role.title}
                  </h3>

                  <p className="mt-3 text-[11px] leading-6 font-Clarkson text-[#6B4E3A]/65 dark:text-[#D4B483]/60">
                    {role.description}
                  </p>

                </div>


                {/* Tags */}

                <div className="flex flex-wrap gap-2 mt-5">

                  {role.tags.map((tag) => (

                    <span
                      key={tag}
                      className="px-2.5 py-1.5 rounded-lg bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/15 text-[8px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]"
                    >
                      {tag}
                    </span>

                  ))}

                </div>


                {/* Meta + Button */}

                <div className="mt-6 pt-5 border-t border-[#EFE7D5] dark:border-[#3D2C23] flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                  <div className="flex flex-wrap gap-4 text-[9px] font-Clarkson text-[#6B4E3A]/60 dark:text-[#D4B483]/60">

                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D4B483]" />
                      {role.location}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D4B483]" />
                      {role.experience}
                    </span>

                  </div>

                  <button
                    onClick={() => setSelectedRole(role.title)}
                    className="group/btn flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6B4E3A] dark:bg-[#D4B483] text-white dark:text-[#1A110B] text-[9px] font-Clarkson font-bold hover:-translate-y-0.5 transition-all"
                  >
                    Apply Now
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          HIRING PROCESS
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        <div className="text-center mb-12">

          <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
            How We Hire
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl font-Clarkson font-bold tracking-[-0.045em] text-[#2E1F17] dark:text-[#F8F4EB]">
            A simple process.
          </h2>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

          {hiringSteps.map((step) => (

            <div
              key={step.number}
              className="relative p-5 rounded-[1.5rem] bg-white dark:bg-[#241812] border border-[#D4B483]/25"
            >

              <span className="text-3xl font-Clarkson font-bold text-[#D4B483]/35">
                {step.number}
              </span>

              <h3 className="mt-5 text-sm font-Clarkson font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
                {step.title}
              </h3>

              <p className="mt-2 text-[10px] leading-5 font-Clarkson text-[#6B4E3A]/60 dark:text-[#D4B483]/55">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <div className="relative overflow-hidden rounded-[2rem] bg-[#2E1F17] dark:bg-[#241812] border border-[#D4B483]/30 px-7 py-12 sm:px-12 text-center">

          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[#D4B483]/10 blur-3xl" />

          <div className="relative">

            <Sparkles className="w-6 h-6 mx-auto text-[#D4B483]" />

            <h2 className="mt-5 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.04em] text-[#F8F4EB]">
              Don't see your role?
            </h2>

            <p className="mt-3 max-w-xl mx-auto text-xs leading-6 font-Clarkson text-[#F8F4EB]/55">
              We're always interested in meeting talented people who can
              bring something valuable to the team.
            </p>

            <a
              href="mailto:info@aevonasolution.com"
              className="inline-flex items-center gap-2 mt-7 px-5 py-3 rounded-xl bg-[#D4B483] text-[#1A110B] text-[9px] font-Clarkson font-bold hover:-translate-y-0.5 transition-all"
            >
              Send Your Profile
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          APPLICATION MODAL
      ====================================================== */}

      <Modal
        isOpen={!!selectedRole}
        onClose={() => {
          setSelectedRole(null);
          setApplied(false);
        }}
        title=""
      >

        {applied ? (

          <div className="text-center py-8 px-3">

            <div className="w-16 h-16 mx-auto rounded-full bg-[#7C8B78]/10 border border-[#7C8B78]/25 flex items-center justify-center">

              <CheckCircle2 className="w-8 h-8 text-[#687763]" />

            </div>

            <h3 className="mt-6 text-xl font-Clarkson font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
              Application Submitted
            </h3>

            <p className="mt-3 text-xs leading-6 font-Clarkson text-[#6B4E3A]/65 dark:text-[#D4B483]/65">
              Thanks for your interest in Aevona Solution. Our talent
              team will review your application and get back to you.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/20">

              <CheckCircle2 className="w-3.5 h-3.5 text-[#7C8B78]" />

              <span className="text-[8px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                Application received
              </span>

            </div>

          </div>

        ) : (

          <form onSubmit={handleApply} className="space-y-5">

            <div>

              <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.18em] text-[#D4B483]">
                Career Application
              </span>

              <h3 className="mt-2 text-xl font-Clarkson font-bold tracking-[-0.035em] text-[#2E1F17] dark:text-[#F8F4EB]">
                {selectedRole}
              </h3>

              <p className="mt-2 text-[10px] leading-5 font-Clarkson text-[#6B4E3A]/55 dark:text-[#D4B483]/55">
                Tell us a little about yourself and your experience.
              </p>

            </div>


            <div>

              <label className="block mb-2 text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#2E1F17] dark:text-[#F8F4EB]">
                Full Name *
              </label>

              <input
                type="text"
                required
                placeholder="Alex Morgan"
                className="w-full h-11 px-4 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/30 text-xs font-Clarkson text-[#2E1F17] dark:text-[#F8F4EB] placeholder:text-[#6B4E3A]/35 outline-none focus:border-[#D4B483] focus:ring-2 focus:ring-[#D4B483]/10 transition-all"
              />

            </div>


            <div>

              <label className="block mb-2 text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#2E1F17] dark:text-[#F8F4EB]">
                Email Address *
              </label>

              <input
                type="email"
                required
                placeholder="alex@domain.com"
                className="w-full h-11 px-4 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/30 text-xs font-Clarkson text-[#2E1F17] dark:text-[#F8F4EB] placeholder:text-[#6B4E3A]/35 outline-none focus:border-[#D4B483] focus:ring-2 focus:ring-[#D4B483]/10 transition-all"
              />

            </div>


            <div>

              <label className="block mb-2 text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#2E1F17] dark:text-[#F8F4EB]">
                LinkedIn / Portfolio
              </label>

              <input
                type="url"
                placeholder="https://linkedin.com/in/..."
                className="w-full h-11 px-4 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/30 text-xs font-Clarkson text-[#2E1F17] dark:text-[#F8F4EB] placeholder:text-[#6B4E3A]/35 outline-none focus:border-[#D4B483] focus:ring-2 focus:ring-[#D4B483]/10 transition-all"
              />

            </div>


            <div>

              <label className="block mb-2 text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#2E1F17] dark:text-[#F8F4EB]">
                Short Introduction
              </label>

              <textarea
                rows={4}
                placeholder="Tell us about your experience, skills, or why you'd like to join Aevona..."
                className="w-full px-4 py-3 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/30 text-xs leading-5 font-Clarkson text-[#2E1F17] dark:text-[#F8F4EB] placeholder:text-[#6B4E3A]/35 outline-none resize-none focus:border-[#D4B483] focus:ring-2 focus:ring-[#D4B483]/10 transition-all"
              />

            </div>


            <div className="flex justify-end gap-2 pt-2">

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRole(null)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="gold"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Submit Application
              </Button>

            </div>

          </form>

        )}

      </Modal>

    </div>
  );
};
