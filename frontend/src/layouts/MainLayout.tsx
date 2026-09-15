import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { AnnouncementMarquee } from '../components/common/AnnouncementMarquee'
import { useAuth } from '../auth/useAuth'

export function MainLayout() {
  const { isAuthenticated } = useAuth()
  return (
    <div className="app-shell flex min-h-screen flex-col">
      <Navbar />
      {!isAuthenticated && <AnnouncementMarquee />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}