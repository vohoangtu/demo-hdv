/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Layout from './components/Layout';
import AdminDashboard from './components/AdminDashboard';
import HDVManagement from './components/HDVManagement';
import TourAssignment from './components/TourAssignment';
import Settlement from './components/Settlement';
import GuideDashboard from './components/GuideDashboard';
import MySchedule from './components/MySchedule';

export default function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [userRole, setUserRole] = React.useState<'admin' | 'guide'>('admin');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard setActiveTab={setActiveTab} />;
      case 'hdv-management':
        return <HDVManagement />;
      case 'tour-assignment':
        return <TourAssignment />;
      case 'settlement':
        return <Settlement userRole="admin" />;
      case 'guide-dashboard':
        return <GuideDashboard setActiveTab={setActiveTab} />;
      case 'my-schedule':
        return <MySchedule />;
      case 'settlements':
        return <Settlement userRole="guide" />;
      default:
        return <AdminDashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="relative">
      {/* Role Switcher for Demo Purposes */}
      <div className="fixed bottom-4 right-4 z-[100] bg-surface-container-lowest p-2 rounded-full ghost-shadow border border-outline-variant/30 flex gap-2">
        <button 
          onClick={() => { setUserRole('admin'); setActiveTab('dashboard'); }}
          className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${userRole === 'admin' ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface-variant'}`}
        >
          Admin
        </button>
        <button 
          onClick={() => { setUserRole('guide'); setActiveTab('guide-dashboard'); }}
          className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${userRole === 'guide' ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface-variant'}`}
        >
          Guide
        </button>
      </div>

      <Layout activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole}>
        {renderContent()}
      </Layout>
    </div>
  );
}

