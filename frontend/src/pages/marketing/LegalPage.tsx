
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  FileText,
  Cookie,
  LockKeyhole,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface LegalSection {
  title: string;
  content: string;
  points?: string[];
}

interface LegalDocument {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  sections: LegalSection[];
  highlights: string[];
}

export const LegalPage: React.FC = () => {
  const location = useLocation();

  const getDocument = (): LegalDocument => {
    if (location.pathname === '/terms') {
      return {
        title: 'Terms & Conditions',
        subtitle: 'Last updated: September 2024',
        description:
          'These terms describe the rules and conditions that apply when you access or use Aevona Solution services, products, and website.',
        icon: FileText,
        highlights: [
          'Use our services responsibly',
          'Protect your account credentials',
          'Respect intellectual property',
        ],
        sections: [
          {
            title: '1. Service Terms',
            content:
              'Aevona Solution provides digital technology services including SaaS platform development, cloud deployment, software engineering, data solutions, automation, and digital advisory services.',
          },
          {
            title: '2. User Accounts',
            content:
              'Certain services may require an account. You are responsible for maintaining the confidentiality of your account credentials and for activities performed through your account.',
            points: [
              'Provide accurate account information.',
              'Keep login credentials confidential.',
              'Notify us of suspected unauthorized access.',
              'Do not attempt to access another user’s account.',
            ],
          },
          {
            title: '3. Intellectual Property',
            content:
              'Unless otherwise agreed in writing, Aevona Solution retains ownership of its proprietary software, source code, frameworks, design systems, documentation, trademarks, and other intellectual property.',
          },
          {
            title: '4. Acceptable Use',
            content:
              'You agree not to misuse our services, interfere with system availability, attempt unauthorized access, introduce malicious code, or use our services for unlawful activities.',
          },
          {
            title: '5. Limitation of Liability',
            content:
              'Services are provided subject to the applicable agreement between Aevona Solution and the client. To the extent permitted by applicable law, Aevona Solution will not be liable for indirect, incidental, or consequential damages arising from use of the services.',
          },
          {
            title: '6. Changes to These Terms',
            content:
              'We may update these Terms & Conditions when necessary to reflect changes in our services, legal requirements, or business practices. Updated terms will be published on this page.',
          },
        ],
      };
    }

    if (location.pathname === '/cookies') {
      return {
        title: 'Cookie Policy',
        subtitle: 'Last updated: September 2024',
        description:
          'This policy explains how Aevona Solution uses cookies and browser storage technologies to provide a reliable and personalized experience.',
        icon: Cookie,
        highlights: [
          'Essential cookies support core functionality',
          'Browser storage may preserve preferences',
          'You can manage storage through your browser',
        ],
        sections: [
          {
            title: '1. What Are Cookies?',
            content:
              'Cookies are small data files stored by a website on your device. They can help websites remember preferences, maintain sessions, and provide essential functionality.',
          },
          {
            title: '2. Essential Cookies',
            content:
              'Essential cookies may be used for core functionality such as authentication, session management, navigation, and security.',
            points: [
              'Authentication state',
              'Security token verification',
              'Session continuity',
              'Basic website functionality',
            ],
          },
          {
            title: '3. Performance & Preferences',
            content:
              'Where applicable, browser storage may be used to remember interface preferences, dashboard configuration, theme selection, or other settings intended to improve the user experience.',
          },
          {
            title: '4. Local Storage',
            content:
              'Some application preferences may be stored using browser localStorage. This information remains within your browser unless the application specifically transmits it as part of a service interaction.',
          },
          {
            title: '5. Managing Cookies',
            content:
              'Most modern browsers allow you to view, delete, or restrict cookies and stored website data through their privacy settings. Disabling essential storage may affect certain website functionality.',
          },
        ],
      };
    }

    return {
      title: 'Privacy Policy',
      subtitle: 'Last updated: September 2024',
      description:
        'Your privacy matters to us. This policy explains what information may be collected, why it is used, and how we approach data protection.',
      icon: ShieldCheck,
      highlights: [
        'We collect information needed to provide services',
        'We use security controls to protect information',
        'We do not sell client data to advertisers',
      ],
      sections: [
        {
          title: '1. Information We Collect',
          content:
            'Depending on the services you use, we may collect information such as your name, work email, company information, account details, communications, and service usage information.',
          points: [
            'Contact and account information',
            'Company or organization information',
            'Service and usage information',
            'Information you voluntarily provide',
          ],
        },
        {
          title: '2. How We Use Information',
          content:
            'Information may be used to provide and maintain services, respond to requests, improve our products, communicate with users, maintain security, and meet applicable legal obligations.',
        },
        {
          title: '3. Data Security',
          content:
            'We use reasonable administrative, technical, and organizational safeguards designed to protect information against unauthorized access, alteration, disclosure, or destruction.',
        },
        {
          title: '4. Third-Party Services',
          content:
            'We may use trusted service providers to support hosting, infrastructure, analytics, communication, authentication, or other business operations. Such providers may process information only as necessary to provide their services.',
        },
        {
          title: '5. Data Sharing',
          content:
            'Aevona Solution does not sell personal or client information to third-party advertisers. Information may be disclosed where necessary to provide requested services, comply with legal obligations, protect our systems, or enforce applicable agreements.',
        },
        {
          title: '6. Data Retention',
          content:
            'We retain information only for as long as reasonably necessary for the purposes described in this policy, including contractual, operational, security, and legal requirements.',
        },
        {
          title: '7. Your Choices',
          content:
            'Depending on applicable law and the nature of the information, you may have rights relating to access, correction, deletion, restriction, or portability of certain personal information.',
        },
        {
          title: '8. Policy Updates',
          content:
            'We may update this Privacy Policy periodically. Changes will be reflected on this page together with an updated revision date.',
        },
      ],
    };
  };

  const doc = getDocument();
  const Icon = doc.icon;

  return (
    <div className="min-h-screen bg-[#F8F4EB] dark:bg-[#1A110B] text-[#2E1F17] dark:text-[#F8F4EB]">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="relative overflow-hidden">

        <div className="absolute top-[-160px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#D4B483]/10 blur-[130px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-12">

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">

            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#D4B483]/10 border border-[#D4B483]/30">

                <Icon className="w-3.5 h-3.5 text-[#D4B483]" />

                <span className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.2em] text-[#6B4E3A] dark:text-[#D4B483]">
                  Aevona Solution
                </span>

              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-Clarkson font-bold tracking-[-0.055em] leading-[1.02] text-[#2E1F17] dark:text-[#F8F4EB]">
                {doc.title}
              </h1>

              <p className="mt-5 max-w-2xl text-sm sm:text-base leading-7 font-Clarkson text-[#6B4E3A]/70 dark:text-[#D4B483]/65">
                {doc.description}
              </p>

            </div>

            <div className="shrink-0">

              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-sm">

                <LockKeyhole className="w-3.5 h-3.5 text-[#D4B483]" />

                <span className="text-[9px] font-Clarkson font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
                  {doc.subtitle}
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN DOCUMENT AREA
      ====================================================== */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-8 lg:gap-12">

          {/* =================================================
              TABLE OF CONTENTS
          ================================================== */}

          <aside className="hidden lg:block">

            <div className="sticky top-24">

              <div className="rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/25 p-5 shadow-sm">

                <div className="text-[9px] font-Clarkson font-bold uppercase tracking-[0.18em] text-[#A6815B]">
                  On this page
                </div>

                <div className="mt-4 space-y-1.5">

                  {doc.sections.map((section, index) => (

                    <a
                      key={index}
                      href={`#section-${index}`}
                      className="group flex items-start gap-2 px-2.5 py-2 rounded-lg hover:bg-[#D4B483]/10 transition-colors"
                    >

                      <ChevronRight className="w-3 h-3 mt-0.5 shrink-0 text-[#D4B483] group-hover:translate-x-0.5 transition-transform" />

                      <span className="text-[9px] leading-4 font-Clarkson text-[#6B4E3A]/70 dark:text-[#D4B483]/65">
                        {section.title.replace(/^\d+\.\s*/, '')}
                      </span>

                    </a>

                  ))}

                </div>

              </div>

            </div>

          </aside>


          {/* =================================================
              DOCUMENT CONTENT
          ================================================== */}

          <div className="min-w-0">

            {/* Highlights */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7">

              {doc.highlights.map((highlight, index) => (

                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-[#241812] border border-[#D4B483]/20"
                >

                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#7C8B78] dark:text-[#9CAB93]" />

                  <span className="text-[9px] leading-5 font-Clarkson font-semibold text-[#6B4E3A]/75 dark:text-[#D4B483]/65">
                    {highlight}
                  </span>

                </div>

              ))}

            </div>


            {/* Main document */}

            <article className="rounded-[2rem] bg-white dark:bg-[#241812] border border-[#D4B483]/25 shadow-lg overflow-hidden">

              {/* Document top bar */}

              <div className="px-6 sm:px-8 lg:px-10 py-5 border-b border-[#EFE7D5] dark:border-[#3D2C23] flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <div className="w-7 h-7 rounded-lg bg-[#D4B483]/15 flex items-center justify-center">

                    <Icon className="w-3.5 h-3.5 text-[#6B4E3A] dark:text-[#D4B483]" />

                  </div>

                  <span className="text-[9px] font-Clarkson font-bold uppercase tracking-wider text-[#6B4E3A]/70 dark:text-[#D4B483]/65">
                    Legal Documentation
                  </span>

                </div>

                <span className="hidden sm:block text-[8px] font-Clarkson text-[#6B4E3A]/45 dark:text-[#D4B483]/45">
                  AEVONA SOLUTION
                </span>

              </div>


              {/* Sections */}

              <div className="px-6 sm:px-8 lg:px-10 py-4">

                {doc.sections.map((section, index) => (

                  <section
                    key={index}
                    id={`section-${index}`}
                    className="py-7 sm:py-8 border-b last:border-b-0 border-[#EFE7D5] dark:border-[#3D2C23] scroll-mt-24"
                  >

                    <div className="flex gap-4">

                      <div className="hidden sm:flex w-8 h-8 rounded-lg bg-[#D4B483]/10 border border-[#D4B483]/20 items-center justify-center shrink-0">

                        <span className="text-[9px] font-Clarkson font-bold text-[#A6815B]">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                      </div>

                      <div className="flex-1">

                        <h2 className="text-base sm:text-lg font-Clarkson font-bold tracking-[-0.025em] text-[#2E1F17] dark:text-[#F8F4EB]">
                          {section.title}
                        </h2>

                        <p className="mt-3 text-[11px] sm:text-xs leading-7 font-Clarkson text-[#6B4E3A]/75 dark:text-[#D4B483]/65">
                          {section.content}
                        </p>


                        {section.points && (

                          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">

                            {section.points.map((point, pointIndex) => (

                              <div
                                key={pointIndex}
                                className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/15"
                              >

                                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#D4B483]" />

                                <span className="text-[9px] leading-5 font-Clarkson text-[#6B4E3A]/70 dark:text-[#D4B483]/60">
                                  {point}
                                </span>

                              </div>

                            ))}

                          </div>

                        )}

                      </div>

                    </div>

                  </section>

                ))}

              </div>


              {/* Document footer */}

              <div className="px-6 sm:px-8 lg:px-10 py-6 bg-[#F8F4EB]/70 dark:bg-[#1A110B]/60 border-t border-[#D4B483]/15">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                  <div>

                    <div className="text-[9px] font-Clarkson font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
                      AEVONA SOLUTION
                    </div>

                    <div className="mt-1 text-[8px] font-Clarkson text-[#6B4E3A]/50 dark:text-[#D4B483]/50">
                      Technology. People. A brighter tomorrow.
                    </div>

                  </div>

                  <div className="text-[8px] font-Clarkson text-[#6B4E3A]/50 dark:text-[#D4B483]/50">
                    {doc.subtitle}
                  </div>

                </div>

              </div>

            </article>

          </div>

        </div>

      </main>

    </div>
  );
};