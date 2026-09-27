import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DashboardProvider } from './context/DashboardContext';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { AuthLayout } from './components/layout/AuthLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Marketing Pages
import { HomePage } from './pages/marketing/HomePage';
import { AboutPage } from './pages/marketing/AboutPage';
import { ServicesPage } from './pages/marketing/ServicesPage';
import { SolutionsPage } from './pages/marketing/SolutionsPage';
import { PortfolioPage } from './pages/marketing/PortfolioPage';
import { CaseStudiesPage } from './pages/marketing/CaseStudiesPage';
import { CareersPage } from './pages/marketing/CareersPage';
import { ContactPage } from './pages/marketing/ContactPage';
import { LegalPage } from './pages/marketing/LegalPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { VerifyEmailPage } from './pages/auth/VerifyEmailPage';
import { AuthCallbackPage } from './pages/auth/AuthCallbackPage';

// Onboarding
import { OnboardingPage } from './pages/onboarding/OnboardingPage';

// Dashboard Pages
import { DashboardHomePage } from './pages/dashboard/DashboardHomePage';
import { ProjectsPage } from './pages/dashboard/ProjectsPage';
import { PortfolioManagementPage } from './pages/dashboard/PortfolioManagementPage';
import { ProjectDetailPage } from './pages/dashboard/ProjectDetailPage';
import { ServicesDashboardPage } from './pages/dashboard/ServicesDashboardPage';
import { AnalyticsPage } from './pages/dashboard/AnalyticsPage';
import { TasksPage } from './pages/dashboard/TasksPage';
import { FilesPage } from './pages/dashboard/FilesPage';
import { MessagesPage } from './pages/dashboard/MessagesPage';
import { NotificationsPage } from './pages/dashboard/NotificationsPage';
import { TeamPage } from './pages/dashboard/TeamPage';
import { BillingPage } from './pages/dashboard/BillingPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';
import { SupportPage } from './pages/dashboard/SupportPage';

// System Pages
import { NotFoundPage } from './pages/system/NotFoundPage';
import { ErrorPage } from './pages/system/ErrorPage';
import { LoadingPage } from './pages/system/LoadingPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DashboardProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Marketing Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/solutions" element={<SolutionsPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/case-studies" element={<CaseStudiesPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<LegalPage />} />
                <Route path="/terms" element={<LegalPage />} />
                <Route path="/cookies" element={<LegalPage />} />
              </Route>

              {/* Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route path="/auth/callback" element={<AuthCallbackPage />} />
              </Route>

              {/* Onboarding Flow */}
              <Route path="/onboarding" element={<OnboardingPage />} />

              {/* Authenticated SaaS Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHomePage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="portfolio" element={<PortfolioManagementPage />} />
                <Route path="projects/:id" element={<ProjectDetailPage />} />
                <Route path="services" element={<ServicesDashboardPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="tasks" element={<TasksPage />} />
                <Route path="files" element={<FilesPage />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="team" element={<TeamPage />} />
                <Route path="billing" element={<BillingPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="support" element={<SupportPage />} />
              </Route>

              {/* System & Fallback Pages */}
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/loading" element={<LoadingPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </DashboardProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
