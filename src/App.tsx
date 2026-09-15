import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { HomePage } from './pages/HomePage'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { RiskManagementPage } from './pages/RiskManagementPage'
import { SupportedBrokersPage } from './pages/SupportedBrokersPage'
import { SupportedInstrumentsPage } from './pages/SupportedInstrumentsPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { DashboardPage } from './pages/DashboardPage'
import { AccountsPage } from './pages/AccountsPage'
import { HistoryPage } from './pages/HistoryPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { paths } from './routes/paths'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={paths.home} element={<HomePage />} />
        <Route path={paths.howItWorks} element={<HowItWorksPage />} />
        <Route path={paths.riskManagement} element={<RiskManagementPage />} />
        <Route path={paths.supportedBrokers} element={<SupportedBrokersPage />} />
        <Route path={paths.supportedInstruments} element={<SupportedInstrumentsPage />} />
        <Route path={paths.about} element={<AboutPage />} />
        <Route path={paths.contact} element={<ContactPage />} />
        <Route path={paths.privacy} element={<PrivacyPage />} />
        <Route path={paths.terms} element={<TermsPage />} />
        <Route path={paths.login} element={<LoginPage />} />
        <Route path={paths.register} element={<RegisterPage />} />
        <Route path={paths.dashboard} element={<DashboardPage />} />
        <Route path={paths.accounts} element={<AccountsPage />} />
        <Route path={paths.history} element={<HistoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
