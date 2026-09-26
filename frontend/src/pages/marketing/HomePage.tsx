import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  Smartphone,
  Cloud,
  Database,
  Compass,
  Cpu,
  CheckCircle2,
  Star,
  Building2,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 pb-16 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#D4B483]/20 dark:bg-[#D4B483]/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4B483]/20 border border-[#D4B483]/40 text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                <Zap className="w-3.5 h-3.5" /> Next-Gen Enterprise Technology & SaaS Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB] leading-[1.15]">
                Technology for a <span className="text-[#A6815B] dark:text-[#D4B483]">Brighter Tomorrow.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#6B4E3A]/90 dark:text-[#D4B483]/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                We design, engineer, and deploy high-impact digital solutions, cloud infrastructure, and custom SaaS platforms that help global businesses operate, scale, and evolve.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/signup">
                  <Button variant="gold" size="lg" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                    Explore Platform Portal
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Start a Conversation
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 border-t border-[#D4B483]/30 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">50+</div>
                  <div className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/70">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">30+</div>
                  <div className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/70">Happy Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">100%</div>
                  <div className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/70">Client Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Visual Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D4B483]/40 group">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
                  alt="Aevona Enterprise Building"
                  className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E1F17] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#2E1F17]/90 backdrop-blur-md border border-[#D4B483]/40 text-[#F8F4EB] space-y-1">
                  <div className="text-xs font-bold text-[#D4B483] uppercase tracking-wider">AEVONA SOLUTION</div>
                  <div className="text-sm font-serif font-bold">Enterprise Digital Transformation Platform</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SUMMARY CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4B483] font-serif">
            Our Core Competencies
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
            Comprehensive Technology Solutions
          </h2>
          <p className="text-sm text-[#6B4E3A] dark:text-[#D4B483]/80">
            From strategic cloud migration to modern application development, we provide end-to-end technology services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Web Application Development', icon: Code2, desc: 'Modern, responsive, high-performance web solutions built for enterprise scale.' },
            { title: 'Mobile App Development', icon: Smartphone, desc: 'Native & cross-platform iOS & Android mobile applications with offline sync.' },
            { title: 'Cloud Solutions & DevOps', icon: Cloud, desc: 'Scalable multi-region AWS/Azure infrastructure powered by Terraform & Docker.' },
            { title: 'Database & Data Pipelines', icon: Database, desc: 'ACID-compliant relational schemas, real-time data streaming & BI warehouses.' },
            { title: 'IT Consulting & Stack Audit', icon: Compass, desc: 'Strategic technology stack advisory to eliminate technical debt & risk.' },
            { title: 'Business Automation & AI', icon: Cpu, desc: 'Streamline repetitive enterprise operations with custom automation workflows.' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-[#241812] border border-[#D4B483]/30 shadow-md hover:shadow-2xl transition-all duration-300 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#D4B483]/20 border border-[#D4B483]/40 text-[#6B4E3A] dark:text-[#D4B483] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6B4E3A]/80 dark:text-[#D4B483]/70 leading-relaxed">
                  {item.desc}
                </p>
                <Link to="/services" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B4E3A] dark:text-[#D4B483] hover:underline pt-2">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED PROJECTS SHOWCASE */}
      <section className="bg-[#2E1F17] text-[#F8F4EB] py-20 border-y border-[#6B4E3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4B483] font-serif">
                Featured Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-1">
                Turning Ideas into Digital Reality
              </h2>
            </div>
            <Link to="/portfolio">
              <Button variant="gold" size="sm" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                View All Projects
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'EduFlow Portal', type: 'EdTech Platform', img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=400' },
              { name: 'FinTrack Dashboard', type: 'Finance & Wealth', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400' },
              { name: 'HealConnect Mobile Suite', type: 'Healthcare App', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400' },
              { name: 'CloudOps Platform', type: 'Cloud Infrastructure', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400' },
            ].map((p, idx) => (
              <div key={idx} className="rounded-2xl bg-[#241812] border border-[#6B4E3A]/40 overflow-hidden shadow-lg group">
                <div className="h-44 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4 space-y-1">
                  <div className="text-[10px] font-bold text-[#D4B483] uppercase">{p.type}</div>
                  <div className="text-sm font-serif font-bold text-[#F8F4EB]">{p.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-[#D4B483] via-[#A6815B] to-[#6B4E3A] text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold">
              Let's Build Something That Lasts.
            </h2>
            <p className="text-sm text-white/90 leading-relaxed">
              Have an idea, challenge, or digital transformation project in mind? Access our SaaS platform or connect with our senior technical advisory team.
            </p>
          </div>
          <Link to="/signup">
            <Button variant="primary" size="lg" className="bg-[#2E1F17] hover:bg-[#1E130D] text-white border-none">
              Start Free Trial / Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
