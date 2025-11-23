import type { ReactNode } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Upload from './pages/Upload'
import Sandbox from './pages/Sandbox'
import Rules from './pages/Rules'
import Settings from './pages/Settings'
import About from './pages/About'
import NotFound from './pages/NotFound'
import useAppStore from './store/useAppStore'

const LinkItem = ({ to, children }: { to: string; children: ReactNode }) => (
  <NavLink to={to} end className={({isActive}) =>
    'px-3 py-2 rounded-xl hover:bg-[#1b1c22] transition ' + (isActive ? 'bg-[#1b1c22] text-white' : 'text-muted')
  }>{children}</NavLink>
)

function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col gap-1 p-3 w-64 border-r border-border">
      <div className="flex items-center gap-2 mb-2 p-2">
        <span className="text-2xl">⚖️</span>
        <div>
          <div className="font-bold leading-tight">Legal Sandbox</div>
          <div className="text-xs text-muted">Песочница правок</div>
        </div>
      </div>
      <LinkItem to="/">Дашборд</LinkItem>
      <LinkItem to="/projects">Проекты</LinkItem>
      <LinkItem to="/upload">Загрузка</LinkItem>
      <LinkItem to="/sandbox">Песочница</LinkItem>
      <LinkItem to="/rules">Правила</LinkItem>
      <LinkItem to="/settings">Настройки</LinkItem>
      <div className="mt-auto"></div>
      <LinkItem to="/about">О системе</LinkItem>
    </aside>
  )
}

function Topbar() {
  const { docs } = useAppStore()
  return (
    <header className="flex items-center justify-between p-3 border-b border-border sticky top-0 bg-bg/80 backdrop-blur z-10">
      <div className="md:hidden">
        <span className="font-bold">Legal Sandbox</span>
      </div>
      <div className="text-sm text-muted">Документов: {docs.length}</div>
    </header>
  )
}

export default function App() {
  return (
    <div className="min-h-full grid grid-cols-1 md:grid-cols-[16rem_1fr]">
      <Sidebar />
      <div className="min-h-full grid grid-rows-[auto_1fr]">
        <Topbar />
        <main className="p-4 max-w-[1200px] mx-auto w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/sandbox" element={<Sandbox />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="p-4 border-t border-border text-muted text-sm">
          © {new Date().getFullYear()} Legal Sandbox
        </footer>
      </div>
    </div>
  )
}
