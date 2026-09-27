
import React, { useMemo, useState } from 'react';
import { catalogServicesMock } from '../../data/mockData';
import {
  ArrowRight,
  CheckCircle2,
  Search,
  Sparkles,
  Clock3,
  Code2,
  Palette,
  Database,
  Cloud,
  ShieldCheck,
  BarChart3,
  BrainCircuit,
  Layers3,
  Lightbulb,
  X,
  Cpu,
  Globe2,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

/* =========================================================
   FRONTEND SERVICE DATA
   These do NOT require any backend changes.
========================================================= */

const additionalServices = [
  {
    id: 'design',
    title: 'UI/UX Design',
    shortTitle: 'Design',
    category: 'Design',
    description:
      'Thoughtful interfaces and user experiences designed to make digital products intuitive, elegant, and memorable.',
    features: [
      'Product UI Design',
      'UX Research',
      'Design Systems',
      'Wireframes & Prototypes',
      'Responsive Design',
      'Usability Improvements',
    ],
    timeline: '2–4 Weeks',
    icon: Palette,
    accent: 'rose',
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    shortTitle: 'Data',
    category: 'Data',
    description:
      'Turn raw data into useful insights with analytics systems, dashboards, data pipelines, and intelligent reporting.',
    features: [
      'Data Analytics',
      'Interactive Dashboards',
      'Data Visualization',
      'ETL Pipelines',
      'Business Intelligence',
      'Predictive Analytics',
    ],
    timeline: '3–6 Weeks',
    icon: BarChart3,
    accent: 'sage',
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    shortTitle: 'AI / ML',
    category: 'AI',
    description:
      'Intelligent solutions using machine learning and modern AI technologies to automate workflows and unlock new capabilities.',
    features: [
      'ML Models',
      'AI Automation',
      'NLP Solutions',
      'Recommendation Systems',
      'LLM Integrations',
      'Model Deployment',
    ],
    timeline: '4–8 Weeks',
    icon: BrainCircuit,
    accent: 'gold',
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    shortTitle: 'Cloud',
    category: 'Cloud',
    description:
      'Modern infrastructure and deployment workflows that keep applications secure, scalable, observable, and reliable.',
    features: [
      'Cloud Deployment',
      'CI/CD Pipelines',
      'Docker & Containers',
      'Infrastructure Setup',
      'Monitoring',
      'Performance Optimization',
    ],
    timeline: '2–5 Weeks',
    icon: Cloud,
    accent: 'olive',
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    shortTitle: 'Security',
    category: 'Security',
    description:
      'Security-focused engineering practices that help protect applications, infrastructure, and sensitive business data.',
    features: [
      'Security Audits',
      'Application Security',
      'Access Control',
      'API Security',
      'Risk Assessment',
      'Security Best Practices',
    ],
    timeline: '2–5 Weeks',
    icon: ShieldCheck,
    accent: 'terracotta',
  },
  {
    id: 'consulting',
    title: 'Technology Consulting',
    shortTitle: 'Consulting',
    category: 'Consulting',
    description:
      'Practical technology guidance for businesses deciding what to build, how to build it, and how to scale it.',
    features: [
      'Technical Strategy',
      'Architecture Planning',
      'Technology Selection',
      'Product Roadmaps',
      'Digital Transformation',
      'Technical Audits',
    ],
    timeline: '1–3 Weeks',
    icon: Lightbulb,
    accent: 'gold',
  },
];

/* =========================================================
   EXISTING MOCK SERVICES + NEW FRONTEND SERVICES
========================================================= */

const baseServices = catalogServicesMock.map((service: any) => ({
  ...service,
  category: service.category || 'Development',
  timeline: service.estimatedTimeline,
  description: service.fullDesc,
  icon: Code2,
  accent: 'brown',
}));

const allServices = [
  ...baseServices,
  ...additionalServices,
];

/* =========================================================
   CATEGORY CONFIG
========================================================= */

const categories = [
  {
    name: 'All',
    icon: Layers3,
  },
  {
    name: 'Development',
    icon: Code2,
  },
  {
    name: 'Design',
    icon: Palette,
  },
  {
    name: 'Data',
    icon: Database,
  },
  {
    name: 'AI',
    icon: BrainCircuit,
  },
  {
    name: 'Cloud',
    icon: Cloud,
  },
  {
    name: 'Security',
    icon: ShieldCheck,
  },
  {
    name: 'Consulting',
    icon: Lightbulb,
  },
];

/* =========================================================
   ACCENT STYLES
========================================================= */

const accentStyles: Record<
  string,
  {
    icon: string;
    glow: string;
    badge: string;
    line: string;
  }
> = {
  gold: {
    icon: 'bg-[#D4B483]/20 text-[#8B6F3D] dark:text-[#D4B483]',
    glow: 'bg-[#D4B483]/10',
    badge: 'bg-[#D4B483]/10 text-[#8B6F3D] dark:text-[#D4B483]',
    line: 'bg-[#D4B483]',
  },

  sage: {
    icon: 'bg-[#7C8B78]/15 text-[#667562]',
    glow: 'bg-[#7C8B78]/10',
    badge: 'bg-[#7C8B78]/10 text-[#667562]',
    line: 'bg-[#7C8B78]',
  },

  rose: {
    icon: 'bg-[#A87878]/15 text-[#8F6262]',
    glow: 'bg-[#A87878]/10',
    badge: 'bg-[#A87878]/10 text-[#8F6262]',
    line: 'bg-[#A87878]',
  },

  olive: {
    icon: 'bg-[#85805D]/15 text-[#706B4D]',
    glow: 'bg-[#85805D]/10',
    badge: 'bg-[#85805D]/10 text-[#706B4D]',
    line: 'bg-[#85805D]',
  },

  terracotta: {
    icon: 'bg-[#A9684F]/15 text-[#8D513C]',
    glow: 'bg-[#A9684F]/10',
    badge: 'bg-[#A9684F]/10 text-[#8D513C]',
    line: 'bg-[#A9684F]',
  },

  brown: {
    icon: 'bg-[#6B4E3A]/10 text-[#6B4E3A] dark:text-[#D4B483]',
    glow: 'bg-[#6B4E3A]/10',
    badge: 'bg-[#6B4E3A]/10 text-[#6B4E3A] dark:text-[#D4B483]',
    line: 'bg-[#6B4E3A]',
  },
};

export const ServicesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  /* =======================================================
     FILTER SERVICES
  ======================================================= */

  const filteredServices = useMemo(() => {
    const query = search.toLowerCase().trim();

    return allServices.filter((service: any) => {
      const matchesCategory =
        activeCategory === 'All' ||
        service.category?.toLowerCase() === activeCategory.toLowerCase();

      const matchesSearch =
        !query ||
        service.title?.toLowerCase().includes(query) ||
        service.description?.toLowerCase().includes(query) ||
        service.fullDesc?.toLowerCase().includes(query) ||
        service.features?.some((feature: string) =>
          feature.toLowerCase().includes(query)
        );

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const clearFilters = () => {
    setSearch('');
    setActiveCategory('All');
  };

  return (
    <div className="min-h-screen bg-[#F8F4EB] dark:bg-[#1A110B] text-[#2E1F17] dark:text-[#F8F4EB] overflow-hidden">

      {/* ===================================================
          HERO
      ==================================================== */}

      <section className="relative pt-16 sm:pt-20 lg:pt-24 pb-14">

        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4B483]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="absolute left-[8%] top-28 w-20 h-20 rounded-full bg-[#7C8B78]/5 blur-2xl" />

        <div className="absolute right-[8%] top-44 w-24 h-24 rounded-full bg-[#A9684F]/5 blur-2xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4B483]/40 bg-[#D4B483]/10">

            <Sparkles className="w-3.5 h-3.5 text-[#D4B483]" />

            <span className="text-[10px] sm:text-[11px] font-Clarkson font-bold uppercase tracking-[0.22em] text-[#6B4E3A] dark:text-[#D4B483]">
              Aevona Services
            </span>

          </div>

          {/* Heading */}
          <h1 className="mt-7 font-Clarkson font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.03] tracking-[-0.05em]">

            <span className="text-[#2E1F17] dark:text-[#F8F4EB]">
              Everything you need
            </span>

            <br />

            <span className="text-[#6B4E3A] dark:text-[#D4B483]">
              to build what's next.
            </span>

          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl mx-auto text-sm sm:text-base leading-8 font-Clarkson text-[#6B4E3A]/80 dark:text-[#D4B483]/75">
            From product design and software development to data,
            AI, cloud, and strategy, we bring the pieces together
            to create digital experiences that actually work.
          </p>

          {/* Service stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">
              <Layers3 className="w-3.5 h-3.5 text-[#D4B483]" />

              <span className="text-[10px] sm:text-[11px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                {allServices.length}+ Services
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">
              <Globe2 className="w-3.5 h-3.5 text-[#7C8B78]" />

              <span className="text-[10px] sm:text-[11px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                End-to-End Solutions
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-[#A9684F]" />

              <span className="text-[10px] sm:text-[11px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                Modern Technology
              </span>
            </div>

          </div>

        </div>
      </section>


      {/* ===================================================
          SEARCH + CATEGORY NAV
      ==================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">

        <div className="rounded-[1.75rem] bg-white dark:bg-[#241812] border border-[#D4B483]/30 p-4 sm:p-5 shadow-sm">

          <div className="flex flex-col lg:flex-row gap-4">

            {/* Search */}
            <div className="relative flex-1">

              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B4E3A]/45 dark:text-[#D4B483]/45" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services, features, technologies..."
                className="w-full h-12 pl-11 pr-11 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/20 outline-none font-Clarkson text-xs text-[#2E1F17] dark:text-[#F8F4EB] placeholder:text-[#6B4E3A]/40 dark:placeholder:text-[#D4B483]/40 focus:border-[#D4B483] focus:ring-2 focus:ring-[#D4B483]/10 transition-all"
              />

              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B4E3A]/50 hover:text-[#6B4E3A] dark:text-[#D4B483]/50 dark:hover:text-[#D4B483]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

            </div>

          </div>

          {/* Categories */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">

            {categories.map((category) => {

              const Icon = category.icon;

              const isActive = activeCategory === category.name;

              return (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`
                    shrink-0 flex items-center gap-2
                    px-4 py-2.5 rounded-xl
                    border text-[10px] sm:text-[11px]
                    font-Clarkson font-semibold
                    transition-all duration-300
                    ${
                      isActive
                        ? 'bg-[#2E1F17] text-[#F8F4EB] border-[#2E1F17] shadow-md dark:bg-[#D4B483] dark:text-[#2E1F17] dark:border-[#D4B483]'
                        : 'bg-[#F8F4EB] dark:bg-[#1A110B] text-[#6B4E3A] dark:text-[#D4B483] border-[#D4B483]/20 hover:border-[#D4B483]/60'
                    }
                  `}
                >

                  <Icon className="w-3.5 h-3.5" />

                  {category.name}

                </button>
              );
            })}

          </div>

        </div>

      </section>


      {/* ===================================================
          FEATURED SERVICE
      ==================================================== */}

      {!search && activeCategory === 'All' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#2E1F17] dark:bg-[#241812] border border-[#D4B483]/30">

            {/* Decorative circles */}
            <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#D4B483]/10 blur-3xl" />

            <div className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-[#7C8B78]/5 blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 p-7 sm:p-10 lg:p-14">

              <div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4B483]/10 border border-[#D4B483]/20">

                  <Sparkles className="w-3 h-3 text-[#D4B483]" />

                  <span className="text-[9px] font-Clarkson uppercase tracking-[0.2em] text-[#D4B483]">
                    Featured Capability
                  </span>

                </div>

                <h2 className="mt-5 max-w-2xl font-Clarkson font-bold text-2xl sm:text-3xl lg:text-4xl tracking-[-0.035em] text-[#F8F4EB]">
                  Digital products that
                  <span className="text-[#D4B483]"> feel effortless.</span>
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 font-Clarkson text-[#F8F4EB]/65">
                  We combine engineering, design, data, and strategy to
                  create products that are practical today and ready for
                  tomorrow.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">

                  {[
                    'Development',
                    'UI/UX',
                    'Data & AI',
                    'Cloud',
                  ].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-full border border-[#F8F4EB]/10 bg-[#F8F4EB]/5 text-[10px] font-Clarkson text-[#F8F4EB]/70"
                    >
                      {item}
                    </span>
                  ))}

                </div>

              </div>

              <div className="hidden lg:flex items-center justify-center">

                <div className="relative w-32 h-32 rounded-[2rem] border border-[#D4B483]/20 bg-[#D4B483]/5">

                  <div className="absolute inset-5 rounded-[1.5rem] bg-[#D4B483]/10 flex items-center justify-center">

                    <Cpu className="w-10 h-10 text-[#D4B483]" />

                  </div>

                  <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#7C8B78] border-4 border-[#2E1F17]" />

                  <div className="absolute -bottom-3 -left-3 w-7 h-7 rounded-full bg-[#A9684F] border-4 border-[#2E1F17]" />

                </div>

              </div>

            </div>

          </div>

        </section>
      )}


      {/* ===================================================
          SERVICES GRID
      ==================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <div className="flex items-end justify-between mb-7">

          <div>

            <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
              Explore
            </span>

            <h2 className="mt-2 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.035em] text-[#2E1F17] dark:text-[#F8F4EB]">
              What we can build together
            </h2>

          </div>

          <span className="hidden sm:block text-[10px] font-Clarkson text-[#6B4E3A]/45 dark:text-[#D4B483]/45">
            {filteredServices.length} available
          </span>

        </div>


        {filteredServices.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {filteredServices.map((service: any, index: number) => {

              const Icon = service.icon || Code2;

              const accent =
                accentStyles[service.accent] || accentStyles.brown;

              return (
                <div
                  key={service.id || index}
                  className="group relative overflow-hidden rounded-[1.75rem] bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-[#D4B483]/55 transition-all duration-500"
                >

                  {/* Accent glow */}
                  <div
                    className={`absolute -right-20 -top-20 w-48 h-48 rounded-full ${accent.glow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative p-6 sm:p-8">

                    {/* Top */}
                    <div className="flex items-start justify-between">

                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${accent.icon}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <span className="text-[10px] font-Clarkson font-semibold text-[#6B4E3A]/30 dark:text-[#D4B483]/30">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                    </div>


                    {/* Title */}
                    <div className="mt-6 flex items-center gap-3 flex-wrap">

                      <h3 className="text-xl font-Clarkson font-bold tracking-[-0.025em] text-[#2E1F17] dark:text-[#F8F4EB]">
                        {service.title}
                      </h3>

                      <span
                        className={`px-2.5 py-1 rounded-full text-[8px] font-Clarkson font-bold uppercase tracking-wider ${accent.badge}`}
                      >
                        {service.category}
                      </span>

                    </div>


                    {/* Description */}
                    <p className="mt-3 text-xs sm:text-sm leading-7 font-Clarkson text-[#6B4E3A]/75 dark:text-[#D4B483]/70">
                      {service.description || service.fullDesc}
                    </p>


                    {/* Features */}
                    <div className="mt-7">

                      <div className="flex items-center gap-2 mb-3">

                        <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.18em] text-[#6B4E3A]/45 dark:text-[#D4B483]/45">
                          Includes
                        </span>

                        <div className="h-px flex-1 bg-[#EFE7D5] dark:bg-[#3D2C23]" />

                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                        {service.features?.map(
                          (feature: string, featureIndex: number) => (

                            <div
                              key={featureIndex}
                              className="flex items-start gap-2 text-[10px] sm:text-[11px] leading-5 font-Clarkson text-[#6B4E3A] dark:text-[#D4B483]"
                            >

                              <CheckCircle2
                                className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${accent.icon.split(' ')[1]}`}
                              />

                              <span>{feature}</span>

                            </div>

                          )
                        )}

                      </div>

                    </div>


                    {/* Footer */}
                    <div className="mt-7 pt-5 border-t border-[#EFE7D5] dark:border-[#3D2C23] flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                      <div className="flex items-center gap-2">

                        <Clock3 className="w-3.5 h-3.5 text-[#D4B483]" />

                        <span className="text-[10px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                          {service.timeline || service.estimatedTimeline}
                        </span>

                      </div>

                      <Link to="/signup">

                        <Button
                          variant="gold"
                          size="sm"
                          icon={<ArrowRight className="w-4 h-4" />}
                        >
                          Request Service
                        </Button>

                      </Link>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        ) : (

          /* Empty state */

          <div className="py-20 rounded-[2rem] bg-white dark:bg-[#241812] border border-[#D4B483]/30 text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#D4B483]/10 flex items-center justify-center">

              <Search className="w-6 h-6 text-[#D4B483]" />

            </div>

            <h3 className="mt-5 font-Clarkson font-bold text-lg text-[#2E1F17] dark:text-[#F8F4EB]">
              No matching services
            </h3>

            <p className="mt-2 text-xs font-Clarkson text-[#6B4E3A]/60 dark:text-[#D4B483]/60">
              Try another search term or category.
            </p>

            <button
              onClick={clearFilters}
              className="mt-5 text-xs font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483] underline underline-offset-4"
            >
              Clear filters
            </button>

          </div>

        )}

      </section>


      {/* ===================================================
          PROCESS
      ==================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <div className="text-center mb-11">

          <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
            How we work
          </span>

          <h2 className="mt-3 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.035em] text-[#2E1F17] dark:text-[#F8F4EB]">
            From idea to impact.
          </h2>

          <p className="mt-3 max-w-xl mx-auto text-xs sm:text-sm leading-6 font-Clarkson text-[#6B4E3A]/65 dark:text-[#D4B483]/65">
            A simple process designed to keep projects clear,
            collaborative, and moving forward.
          </p>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {[
            {
              number: '01',
              title: 'Discover',
              description:
                'Understand the problem, goals, users, and technical requirements.',
              accent: 'gold',
            },
            {
              number: '02',
              title: 'Design',
              description:
                'Shape the experience, architecture, and solution before development.',
              accent: 'rose',
            },
            {
              number: '03',
              title: 'Build',
              description:
                'Develop, test, integrate, and refine the solution with care.',
              accent: 'sage',
            },
            {
              number: '04',
              title: 'Launch',
              description:
                'Deploy, monitor, optimize, and help the product keep growing.',
              accent: 'terracotta',
            },
          ].map((step) => {

            const accent = accentStyles[step.accent];

            return (
              <div
                key={step.number}
                className="group relative p-6 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/25 hover:-translate-y-1 transition-all duration-300"
              >

                <div className="flex items-center justify-between">

                  <span
                    className={`text-[10px] font-Clarkson font-bold ${accent.badge} px-2.5 py-1 rounded-full`}
                  >
                    {step.number}
                  </span>

                  <ArrowRight className="w-3.5 h-3.5 text-[#D4B483]/40 group-hover:text-[#D4B483] group-hover:translate-x-1 transition-all" />

                </div>

                <h3 className="mt-6 text-sm font-Clarkson font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
                  {step.title}
                </h3>

                <p className="mt-2 text-[11px] leading-5 font-Clarkson text-[#6B4E3A]/65 dark:text-[#D4B483]/65">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

      </section>


      {/* ===================================================
          FINAL CTA
      ==================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <div className="relative overflow-hidden rounded-[2rem] bg-[#2E1F17] dark:bg-[#241812] border border-[#D4B483]/30 px-7 py-14 sm:px-12 sm:py-16 text-center">

          {/* Decorative lights */}
          <div className="absolute left-[20%] top-0 w-40 h-40 rounded-full bg-[#D4B483]/10 blur-3xl" />

          <div className="absolute right-[20%] bottom-0 w-40 h-40 rounded-full bg-[#7C8B78]/10 blur-3xl" />

          <div className="relative">

            <div className="inline-flex items-center gap-2">

              <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483]" />

              <span className="text-[10px] font-Clarkson uppercase tracking-[0.25em] text-[#D4B483]">
                Build something better
              </span>

              <span className="w-1.5 h-1.5 rounded-full bg-[#D4B483]" />

            </div>

            <h2 className="mt-5 max-w-3xl mx-auto text-2xl sm:text-3xl lg:text-4xl font-Clarkson font-bold tracking-[-0.04em] text-[#F8F4EB]">

              Have a problem worth solving?

              <br />

              <span className="text-[#D4B483]">
                Let's build the solution.
              </span>

            </h2>

            <p className="mt-5 max-w-xl mx-auto text-xs sm:text-sm leading-7 font-Clarkson text-[#F8F4EB]/60">
              Tell us what you are trying to build, improve, or automate.
              We will help turn the idea into a practical digital product.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3">

              <Link to="/signup">

                <Button
                  variant="gold"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Get Started
                </Button>

              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};
