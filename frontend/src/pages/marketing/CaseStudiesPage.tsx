
import React from 'react';
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  CheckCircle2,
  BarChart3,
  Server,
  Clock3,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CaseStudiesPage: React.FC = () => {
  const caseStudies = [
    {
      id: 'cs-1',
      client: 'Global FinTech Corp',
      category: 'FINTECH • CLOUD • DATA',
      title:
        'High-Performance Financial Analytics & Microservices Migration',
      challenge:
        'The existing monolithic platform struggled with query latency and unpredictable traffic spikes during market opening hours.',
      solution:
        'We redesigned the architecture around event-driven microservices, Redis caching, PostgreSQL partitioning, and horizontally scalable API services.',
      results: [
        '96% reduction in API response time',
        'Zero downtime during 50,000 req/sec spikes',
        '$140k estimated annual cloud savings',
      ],
      metric: '96%',
      metricLabel: 'Faster API Response',
      icon: BarChart3,
      accent: 'gold',
      stats: [
        { label: 'Response Time', value: '120ms' },
        { label: 'Peak Traffic', value: '50K/s' },
        { label: 'Cloud Savings', value: '$140K' },
      ],
    },
    {
      id: 'cs-2',
      client: 'EduFlow Learning Platforms',
      category: 'EDTECH • SAAS • CLOUD',
      title: 'Multi-Tenant Interactive Learning SaaS Architecture',
      challenge:
        'The platform needed to support live video, automated grading, subscriptions, and thousands of simultaneous learning sessions.',
      solution:
        'We built an auto-scaling cloud architecture with Kubernetes, WebRTC-based video distribution, resilient APIs, and integrated multi-currency billing.',
      results: [
        'Scales to 100,000+ active sessions',
        '99.99% system availability target',
        'Integrated multi-currency subscription billing',
      ],
      metric: '100K+',
      metricLabel: 'Active Sessions',
      icon: Server,
      accent: 'olive',
      stats: [
        { label: 'Concurrent Users', value: '100K+' },
        { label: 'Availability', value: '99.99%' },
        { label: 'Billing', value: 'Global' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F4EB] dark:bg-[#1A110B] text-[#2E1F17] dark:text-[#F8F4EB] overflow-hidden">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative pt-16 sm:pt-20 lg:pt-24 pb-16">

        {/* Ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4B483]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="absolute left-[8%] top-48 w-40 h-40 rounded-full bg-[#7C8B78]/5 blur-3xl" />

        <div className="absolute right-[8%] top-64 w-40 h-40 rounded-full bg-[#A9684F]/5 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4B483]/10 border border-[#D4B483]/35">

            <Sparkles className="w-3.5 h-3.5 text-[#D4B483]" />

            <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.22em] text-[#6B4E3A] dark:text-[#D4B483]">
              Case Studies
            </span>

          </div>

          {/* Heading */}
          <h1 className="mt-7 font-Clarkson font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-[-0.055em] leading-[1.02]">

            <span className="text-[#2E1F17] dark:text-[#F8F4EB]">
              Problems solved.
            </span>

            <br />

            <span className="text-[#6B4E3A] dark:text-[#D4B483]">
              Results measured.
            </span>

          </h1>

          <p className="mt-7 max-w-2xl mx-auto text-sm sm:text-base leading-8 font-Clarkson text-[#6B4E3A]/75 dark:text-[#D4B483]/70">
            A closer look at how we turn complex technical challenges into
            scalable products, reliable systems, and measurable business
            outcomes.
          </p>

          {/* Mini metrics */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">

            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">

              <TrendingUp className="w-4 h-4 text-[#D4B483]" />

              <span className="text-[10px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                Performance Driven
              </span>

            </div>

            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">

              <ShieldCheck className="w-4 h-4 text-[#7C8B78]" />

              <span className="text-[10px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                Production Ready
              </span>

            </div>

            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">

              <Zap className="w-4 h-4 text-[#A9684F]" />

              <span className="text-[10px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                Built to Scale
              </span>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          CASE STUDIES
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-10">

        {caseStudies.map((cs, index) => {

          const Icon = cs.icon;

          return (
            <article
              key={cs.id}
              className="group relative overflow-hidden rounded-[2rem] bg-white dark:bg-[#241812] border border-[#D4B483]/30 shadow-md hover:shadow-2xl transition-all duration-500"
            >

              {/* Decorative glow */}
              <div className="absolute -right-32 -top-32 w-80 h-80 rounded-full bg-[#D4B483]/8 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* =================================================
                  TOP BAR
              ================================================== */}

              <div className="relative px-6 sm:px-10 lg:px-12 pt-7">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/20 flex items-center justify-center">

                      <Icon className="w-5 h-5 text-[#6B4E3A] dark:text-[#D4B483]" />

                    </div>

                    <div>

                      <div className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.18em] text-[#D4B483]">
                        {cs.client}
                      </div>

                      <div className="mt-1 text-[8px] font-Clarkson tracking-wider text-[#6B4E3A]/45 dark:text-[#D4B483]/45">
                        {cs.category}
                      </div>

                    </div>

                  </div>

                  <div className="flex items-center gap-2">

                    <span className="text-[9px] font-Clarkson font-semibold text-[#6B4E3A]/35 dark:text-[#D4B483]/35">
                      CASE 0{index + 1}
                    </span>

                  </div>

                </div>

              </div>


              {/* =================================================
                  MAIN CONTENT
              ================================================== */}

              <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_0.75fr] gap-10 px-6 sm:px-10 lg:px-12 py-9">

                {/* LEFT */}
                <div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-Clarkson font-bold tracking-[-0.045em] leading-tight text-[#2E1F17] dark:text-[#F8F4EB] max-w-3xl">
                    {cs.title}
                  </h2>

                  {/* Challenge + Solution */}
                  <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-7">

                    {/* Challenge */}
                    <div>

                      <div className="flex items-center gap-2 mb-3">

                        <div className="w-2 h-2 rounded-full bg-[#A9684F]" />

                        <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.18em] text-[#A9684F]">
                          The Challenge
                        </span>

                      </div>

                      <p className="text-xs sm:text-sm leading-7 font-Clarkson text-[#6B4E3A]/70 dark:text-[#D4B483]/65">
                        {cs.challenge}
                      </p>

                    </div>


                    {/* Solution */}
                    <div>

                      <div className="flex items-center gap-2 mb-3">

                        <div className="w-2 h-2 rounded-full bg-[#7C8B78]" />

                        <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.18em] text-[#687763] dark:text-[#9CAB93]">
                          Our Solution
                        </span>

                      </div>

                      <p className="text-xs sm:text-sm leading-7 font-Clarkson text-[#6B4E3A]/70 dark:text-[#D4B483]/65">
                        {cs.solution}
                      </p>

                    </div>

                  </div>

                </div>


                {/* RIGHT: HERO METRIC */}
                <div className="relative">

                  <div className="h-full min-h-[230px] rounded-[1.5rem] bg-[#2E1F17] dark:bg-[#1A110B] border border-[#D4B483]/20 p-7 flex flex-col justify-between overflow-hidden">

                    <div className="absolute -right-20 -top-20 w-48 h-48 rounded-full bg-[#D4B483]/10 blur-3xl" />

                    <div className="relative">

                      <div className="flex items-center justify-between">

                        <span className="text-[9px] font-Clarkson uppercase tracking-[0.18em] text-[#F8F4EB]/45">
                          Primary Impact
                        </span>

                        <ArrowUpRight className="w-4 h-4 text-[#D4B483]" />

                      </div>

                      <div className="mt-7">

                        <div className="text-5xl sm:text-6xl font-Clarkson font-bold tracking-[-0.06em] text-[#D4B483]">
                          {cs.metric}
                        </div>

                        <div className="mt-2 text-xs font-Clarkson text-[#F8F4EB]/60">
                          {cs.metricLabel}
                        </div>

                      </div>

                    </div>

                    <div className="relative mt-8">

                      <div className="flex items-center gap-2">

                        <CheckCircle2 className="w-4 h-4 text-[#7C8B78]" />

                        <span className="text-[9px] font-Clarkson font-semibold text-[#F8F4EB]/55">
                          Measurable business impact
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>


              {/* =================================================
                  STATS
              ================================================== */}

              <div className="relative mx-6 sm:mx-10 lg:mx-12 mb-8 rounded-[1.5rem] bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/20 overflow-hidden">

                <div className="grid grid-cols-1 sm:grid-cols-3">

                  {cs.stats.map((stat, statIndex) => (

                    <div
                      key={stat.label}
                      className={`
                        p-5 sm:p-6
                        ${
                          statIndex !== cs.stats.length - 1
                            ? 'border-b sm:border-b-0 sm:border-r border-[#D4B483]/20'
                            : ''
                        }
                      `}
                    >

                      <div className="flex items-center gap-2">

                        {statIndex === 0 && (
                          <Clock3 className="w-3.5 h-3.5 text-[#D4B483]" />
                        )}

                        {statIndex === 1 && (
                          <TrendingUp className="w-3.5 h-3.5 text-[#7C8B78]" />
                        )}

                        {statIndex === 2 && (
                          <Zap className="w-3.5 h-3.5 text-[#A9684F]" />
                        )}

                        <span className="text-[8px] font-Clarkson uppercase tracking-wider text-[#6B4E3A]/45 dark:text-[#D4B483]/45">
                          {stat.label}
                        </span>

                      </div>

                      <div className="mt-2 text-lg font-Clarkson font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
                        {stat.value}
                      </div>

                    </div>

                  ))}

                </div>

              </div>


              {/* =================================================
                  RESULTS
              ================================================== */}

              <div className="relative border-t border-[#EFE7D5] dark:border-[#3D2C23] px-6 sm:px-10 lg:px-12 py-7">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                  <div>

                    <div className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.18em] text-[#D4B483]">
                      Key Results
                    </div>

                    <div className="mt-1 text-xs font-Clarkson text-[#6B4E3A]/50 dark:text-[#D4B483]/50">
                      Quantifiable outcomes delivered through the engagement.
                    </div>

                  </div>

                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">

                  {cs.results.map((result, resultIndex) => (

                    <div
                      key={resultIndex}
                      className="group/result flex items-start gap-3 p-4 rounded-xl bg-[#F8F4EB]/70 dark:bg-[#1A110B] border border-[#D4B483]/15 hover:border-[#D4B483]/40 transition-colors"
                    >

                      <div className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-[#D4B483]/15 flex items-center justify-center">

                        <CheckCircle2 className="w-3 h-3 text-[#D4B483]" />

                      </div>

                      <span className="text-[10px] sm:text-[11px] leading-5 font-Clarkson font-medium text-[#6B4E3A]/75 dark:text-[#D4B483]/70">
                        {result}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </article>

          );
        })}

      </section>


      {/* =====================================================
          METHODOLOGY
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <div className="rounded-[2rem] bg-white dark:bg-[#241812] border border-[#D4B483]/30 p-7 sm:p-10 lg:p-12">

          <div className="text-center max-w-2xl mx-auto">

            <span className="text-[10px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#D4B483]">
              Our Approach
            </span>

            <h2 className="mt-3 text-2xl sm:text-3xl font-Clarkson font-bold tracking-[-0.04em] text-[#2E1F17] dark:text-[#F8F4EB]">
              From complexity to clarity.
            </h2>

            <p className="mt-4 text-xs sm:text-sm leading-7 font-Clarkson text-[#6B4E3A]/65 dark:text-[#D4B483]/60">
              Every engagement follows a structured engineering process
              designed to reduce uncertainty and create measurable outcomes.
            </p>

          </div>


          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {[
              {
                number: '01',
                title: 'Discover',
                text: 'Understand the business problem, users, constraints, and success metrics.',
              },
              {
                number: '02',
                title: 'Architect',
                text: 'Design the technical foundation around scalability, security, and reliability.',
              },
              {
                number: '03',
                title: 'Build',
                text: 'Develop, integrate, test, and continuously improve the solution.',
              },
              {
                number: '04',
                title: 'Measure',
                text: 'Track performance and outcomes against the goals defined at the start.',
              },
            ].map((step) => (

              <div
                key={step.number}
                className="p-5 rounded-2xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/15"
              >

                <div className="text-[10px] font-Clarkson font-bold text-[#D4B483]">
                  {step.number}
                </div>

                <h3 className="mt-4 text-sm font-Clarkson font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
                  {step.title}
                </h3>

                <p className="mt-2 text-[10px] leading-5 font-Clarkson text-[#6B4E3A]/60 dark:text-[#D4B483]/55">
                  {step.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <div className="relative overflow-hidden rounded-[2rem] bg-[#2E1F17] dark:bg-[#241812] border border-[#D4B483]/30 px-7 py-14 sm:px-12 sm:py-16 text-center">

          <div className="absolute left-[15%] top-0 w-52 h-52 rounded-full bg-[#D4B483]/10 blur-3xl" />

          <div className="absolute right-[15%] bottom-0 w-52 h-52 rounded-full bg-[#7C8B78]/10 blur-3xl" />

          <div className="relative">

            <span className="text-[10px] font-Clarkson uppercase tracking-[0.25em] text-[#D4B483]">
              Your Challenge
            </span>

            <h2 className="mt-5 max-w-3xl mx-auto text-2xl sm:text-3xl lg:text-4xl font-Clarkson font-bold tracking-[-0.04em] text-[#F8F4EB]">
              Have a problem worth
              <span className="text-[#D4B483]"> solving?</span>
            </h2>

            <p className="mt-5 max-w-xl mx-auto text-xs sm:text-sm leading-7 font-Clarkson text-[#F8F4EB]/60">
              Let's turn your technical challenge into a clear,
              scalable, measurable solution.
            </p>

            <div className="mt-8">

              <Link to="/signup">

                <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4B483] text-[#2E1F17] text-xs font-Clarkson font-bold hover:bg-[#E1C795] hover:-translate-y-0.5 transition-all shadow-lg">

                  Start a Conversation

                  <ArrowRight className="w-4 h-4" />

                </button>

              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};
