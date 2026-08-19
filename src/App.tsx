import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { Projects } from '@/pages/Projects'
import { ProjectDetail } from '@/pages/ProjectDetail'
import { Experience } from '@/pages/Experience'
import { Contact } from '@/pages/Contact'
import { PrivacyPolicy } from '@/pages/PrivacyPolicy'
import { NotFound } from '@/pages/NotFound'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="experience" element={<Experience />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
