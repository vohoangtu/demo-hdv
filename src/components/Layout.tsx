import React from 'react';
import { LayoutDashboard, BadgeCheck, Route, Wallet, Settings, HelpCircle, LogOut, Search, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import NotificationCenter from './NotificationCenter';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole?: 'admin' | 'guide';
}

export default function Layout({ children, activeTab, setActiveTab, userRole = 'admin' }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'hdv-management', label: 'HDV Management', icon: BadgeCheck },
    { id: 'tour-assignment', label: 'Tour & Assignment', icon: Route },
    { id: 'settlement', label: 'Settlement', icon: Wallet },
  ];

  const guideNavItems = [
    { id: 'guide-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-schedule', label: 'My Schedule', icon: Route },
    { id: 'settlements', label: 'Settlements', icon: Wallet },
  ];

  const currentNavItems = userRole === 'admin' ? navItems : guideNavItems;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-surface-container-low border-r border-outline-variant/15 transition-all duration-300 z-50 flex flex-col",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 aero-gradient rounded-lg flex items-center justify-center text-white shrink-0">
            <Route size={24} />
          </div>
          {isSidebarOpen && (
            <div>
              <h1 className="text-lg font-black tracking-tight text-primary leading-none">Guide Navigator</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Global Logistics</p>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {currentNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                activeTab === item.id
                  ? "bg-surface-container-lowest text-primary shadow-sm border border-outline-variant/20"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:translate-x-1"
              )}
            >
              <item.icon size={20} className={cn(activeTab === item.id ? "text-primary" : "text-on-surface-variant group-hover:text-primary")} />
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-outline-variant/15 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary transition-colors">
            <Settings size={20} />
            {isSidebarOpen && <span className="text-sm font-medium">Settings</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-primary transition-colors">
            <HelpCircle size={20} />
            {isSidebarOpen && <span className="text-sm font-medium">Support</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-error hover:bg-error-container/20 rounded-lg transition-colors">
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn("flex-1 flex flex-col transition-all duration-300", isSidebarOpen ? "ml-64" : "ml-20")}>
        {/* Top Bar */}
        <header className="h-16 bg-surface-container-lowest border-b border-outline-variant/15 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-surface-container-low rounded-lg transition-colors">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
              <input
                type="text"
                placeholder="Search operations, guides, tours..."
                className="w-full bg-surface-container-low border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <NotificationCenter />
            <div className="h-8 w-px bg-outline-variant/30"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-primary leading-none">Admin Operator</p>
                <p className="text-[10px] text-on-surface-variant mt-1">Global Operations</p>
              </div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7os8XSktIpaxOn2ctA_3hBlOcfI5SwnvsWVEXuDPF5TJ67aVCAgRsq0oy53h1WMER-Z2WhPDtt0TsKALpbI7br9Y7tpjsPR3bl6W_i2INMfPe_-f9s5h_Cn0XKHAyzFYVT2BYffBdPiOQQUWbs_0BOvrsUE4K02bGOnqm4qrId6vrUxitsLjb15SnY5l2ssZuv-FFfAgn9v-RgzMHdzgDHKFE8V7i_YP9TBKds6Dfer8CIxbiKBDW18VLbEDkBNeG7GDEzL8cbFWk"
                alt="Profile"
                className="w-9 h-9 rounded-full border border-outline-variant/30 object-cover"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
