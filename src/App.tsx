import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AIAssistant } from "./components/AIAssistant";
import { ProjectModal } from "./components/ProjectModal";
import { Home } from "./pages/Home";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetail } from "./pages/ServiceDetail";
import { TechnologyPage } from "./pages/TechnologyPage";
import { TechnologyStack } from "./pages/technology/TechnologyStack";
import { AICapabilities } from "./pages/technology/AICapabilities";
import { CloudInfrastructure } from "./pages/technology/CloudInfrastructure";
import { SecurityArchitecture } from "./pages/technology/SecurityArchitecture";
import { DevelopmentProcess } from "./pages/technology/DevelopmentProcess";
import { SolutionsPage } from "./pages/SolutionsPage";
import { HealthcareTechnology } from "./pages/solutions/HealthcareTechnology";
import { FintechPlatforms } from "./pages/solutions/FintechPlatforms";
import { GovernmentSystems } from "./pages/solutions/GovernmentSystems";
import { EducationPlatforms } from "./pages/solutions/EducationPlatforms";
import { LogisticsPlatforms } from "./pages/solutions/LogisticsPlatforms";
import { StartupMVP } from "./pages/solutions/StartupMVP";
import { CaseStudiesPage } from "./pages/CaseStudiesPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { WhitePapersPage } from "./pages/resources/WhitePapersPage";
import { InsightsPage } from "./pages/resources/InsightsPage";
import { BlogPost } from "./pages/resources/BlogPost";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import { CompanyPage } from "./pages/CompanyPage";
import { AboutPage } from "./pages/company/AboutPage";
import { LeadershipPage } from "./pages/company/LeadershipPage";
import { CareersPage } from "./pages/company/CareersPage";
import { PressPage } from "./pages/company/PressPage";
import { ContactPage } from "./pages/ContactPage";
import { BlogAdmin } from "./pages/admin/BlogAdmin";
import { PrivacyPolicyPage } from "./pages/legal/PrivacyPolicyPage";
import { TermsOfServicePage } from "./pages/legal/TermsOfServicePage";
import { CookiePolicyPage } from "./pages/legal/CookiePolicyPage";
import { ScrollToTop } from "./components/ScrollToTop";
import { useSEO } from "./hooks/useSEO";

function AppContent() {
  useSEO();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-bg-dark text-foreground selection:bg-accent-orange selection:text-white">
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <ProjectModal />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/technology/technology-stack" element={<TechnologyStack />} />
        <Route path="/technology/ai-capabilities" element={<AICapabilities />} />
        <Route path="/technology/cloud-infrastructure" element={<CloudInfrastructure />} />
        <Route path="/technology/security-architecture" element={<SecurityArchitecture />} />
        <Route path="/technology/development-process" element={<DevelopmentProcess />} />
        
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/solutions/healthcare-technology" element={<HealthcareTechnology />} />
        <Route path="/solutions/fintech-platforms" element={<FintechPlatforms />} />
        <Route path="/solutions/government-digital-systems" element={<GovernmentSystems />} />
        <Route path="/solutions/education-platforms" element={<EducationPlatforms />} />
        <Route path="/solutions/logistics-platforms" element={<LogisticsPlatforms />} />
        <Route path="/solutions/startup-mvp-development" element={<StartupMVP />} />
        
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/white-papers" element={<WhitePapersPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/resources/:slug" element={<BlogPost />} />
        
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/company/about" element={<AboutPage />} />
        <Route path="/company/leadership" element={<LeadershipPage />} />
        <Route path="/company/careers" element={<CareersPage />} />
        <Route path="/company/press" element={<PressPage />} />
        
        <Route path="/legal/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/legal/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/legal/cookie-policy" element={<CookiePolicyPage />} />
        
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/blog" element={<BlogAdmin />} />
      </Routes>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <AIAssistant />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
