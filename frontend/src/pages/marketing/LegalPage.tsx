import React from 'react';
import { useLocation } from 'react-router-dom';

export const LegalPage: React.FC = () => {
  const location = useLocation();

  const getDoc = () => {
    if (location.pathname === '/terms') {
      return {
        title: 'Terms & Conditions',
        subtitle: 'Last updated: September 2024',
        content: `Welcome to AEVONA SOLUTION. By accessing or using our SaaS platform and corporate website, you agree to be bound by these Terms and Conditions.
1. Service Terms: Aevona Solution provides enterprise SaaS platform management, cloud deployment, and digital advisory.
2. User Accounts: You are responsible for maintaining the confidentiality of your credentials.
3. Intellectual Property: All proprietary code, algorithms, design tokens, and trademarks belong to AEVONA SOLUTION.
4. Limitation of Liability: AEVONA SOLUTION is provided on an "as-is" basis for mock and production environments.`
      };
    }

    if (location.pathname === '/cookies') {
      return {
        title: 'Cookie Policy',
        subtitle: 'Last updated: September 2024',
        content: `AEVONA SOLUTION uses essential cookies and local browser storage to persist user authentication state and theme preferences.
1. Essential Cookies: Required for navigation and security token verification.
2. Performance Cookies: Used to store dashboard layout state and session metrics.
3. Managing Preferences: You can clear localStorage or cookie tokens at any time via browser settings.`
      };
    }

    // Default Privacy Policy
    return {
      title: 'Privacy Policy',
      subtitle: 'Last updated: September 2024',
      content: `Your privacy is paramount to AEVONA SOLUTION.
1. Data Collection: We collect work email, company name, and usage metrics necessary to provide enterprise cloud services.
2. Data Security: All data is processed following SOC2 Type II guidelines with end-to-end TLS 1.3 encryption.
3. Third-Party Sharing: We never sell or share client data with third-party advertisers.`
    };
  };

  const doc = getDoc();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">{doc.title}</h1>
        <p className="text-xs text-[#6B4E3A] dark:text-[#D4B483] mt-1">{doc.subtitle}</p>
      </div>

      <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-3xl p-8 shadow-md whitespace-pre-line text-xs sm:text-sm text-[#6B4E3A]/90 dark:text-[#D4B483]/80 leading-relaxed font-sans">
        {doc.content}
      </div>
    </div>
  );
};
