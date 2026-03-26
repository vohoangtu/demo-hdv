import React, { useState, useMemo } from 'react';
import { Filter, Download, UserPlus, Search, Star, MoreVertical, Eye, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';
import { exportToCSV } from '../lib/exportUtils';
import { MOCK_HDVS, MOCK_TOURS } from '../mockData';
import { HDV } from '../types';
import GuideDetailModal from './GuideDetailModal';
import HDVFormModal from './HDVFormModal';
import GuideScheduleModal from './GuideScheduleModal';
import PerformanceCharts from './PerformanceCharts';
import { Award, TrendingUp, ShieldCheck } from 'lucide-react';

export default function HDVManagement() {
  const [selectedGuide, setSelectedGuide] = useState<HDV | null>(null);
  const [scheduleGuide, setScheduleGuide] = useState<HDV | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [editingHDV, setEditingHDV] = useState<HDV | null>(null);
  const [hdvs, setHdvs] = useState<HDV[]>(MOCK_HDVS);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Tất cả các loại');
  const [filterStatus, setFilterStatus] = useState('Tất cả trạng thái');
  const [filterBranch, setFilterBranch] = useState('Toàn quốc');

  const filteredHdvs = useMemo(() => {
    return hdvs.filter(hdv => {
      const matchesSearch = hdv.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           hdv.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'Tất cả các loại' || hdv.type === filterType;
      const matchesStatus = filterStatus === 'Tất cả trạng thái' || hdv.status === filterStatus;
      const matchesBranch = filterBranch === 'Toàn quốc' || hdv.branch.includes(filterBranch);

      return matchesSearch && matchesType && matchesStatus && matchesBranch;
    });
  }, [hdvs, searchTerm, filterType, filterStatus, filterBranch]);

  const handleSaveHDV = (data: any) => {
    if (data.id) {
      // Edit
      setHdvs(prev => prev.map(h => h.id === data.id ? { ...h, ...data } : h));
      if (selectedGuide?.id === data.id) {
        setSelectedGuide({ ...selectedGuide, ...data });
      }
    } else {
      // Create
      const newHDV: HDV = {
        ...data,
        id: `HDV-${Math.floor(Math.random() * 10000)}`,
        avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
        status: 'Pending',
        rating: 0,
        completedTours: 0,
        operationalScore: 0,
        languages: data.languages || [],
        routes: data.routes || [],
        skills: data.skills || [],
        certifications: data.certifications || []
      };
      setHdvs(prev => [newHDV, ...prev]);
    }
    setIsFormOpen(false);
    setEditingHDV(null);
  };

  const handleEdit = (hdv: HDV) => {
    setEditingHDV(hdv);
    setIsFormOpen(true);
  };

  const handleExport = () => {
    const exportData = filteredHdvs.map(h => ({
      ID: h.id,
      Name: h.name,
      Type: h.type,
      Branch: h.branch,
      Status: h.status,
      Rating: h.rating,
      CompletedTours: h.completedTours,
      OperationalScore: h.operationalScore,
      Languages: h.languages.join('; '),
      Routes: h.routes.join('; ')
    }));
    exportToCSV(exportData, `HDV_List_${new Date().toISOString().split('T')[0]}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-primary leading-tight">Quản lý Hướng dẫn viên</h2>
          <p className="text-on-surface-variant text-sm mt-2">Điều hành và theo dõi hiệu suất đội ngũ HDV trên toàn hệ thống.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest text-on-surface border border-outline-variant/30 rounded-lg text-sm font-bold hover:bg-surface-container-high transition-colors"
          >
            <Download size={18} />
            Xuất Excel
          </button>
          <button 
            onClick={() => {
              setEditingHDV(null);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-2.5 aero-gradient text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
          >
            <UserPlus size={18} />
            Tạo HDV mới
          </button>
        </div>
      </div>

      {/* Stats Bento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Tổng HDV Hệ thống', value: hdvs.length.toLocaleString(), tag: 'TOTAL', color: 'bg-primary-fixed text-on-primary-fixed-variant' },
          { label: 'Đang hoạt động', value: hdvs.filter(h => h.status === 'Active').length.toLocaleString(), tag: '+12%', color: 'bg-secondary-container text-on-secondary-container' },
          { label: 'Chờ xét duyệt', value: hdvs.filter(h => h.status === 'Pending').length.toLocaleString(), tag: '42 NEW', color: 'bg-tertiary-fixed text-on-tertiary-fixed-variant' },
          { label: 'Rating Trung Bình', value: (hdvs.reduce((acc, h) => acc + h.rating, 0) / hdvs.length).toFixed(2), tag: 'AVG', color: 'bg-surface-container-highest text-on-surface' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-5 rounded-xl ghost-shadow flex flex-col justify-between min-h-[120px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase tracking-widest text-outline">{stat.label}</span>
              <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider", stat.color)}>{stat.tag}</span>
            </div>
            <p className="text-3xl font-black text-on-surface mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Performance Analytics & Gamification */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <PerformanceCharts hdvs={hdvs} />
        </div>
        <div className="space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 ghost-shadow">
            <h3 className="text-[10px] font-black text-outline uppercase tracking-widest mb-6 flex items-center gap-2">
              <Award size={14} className="text-amber-500" />
              HDV Xuất Sắc Tháng 3
            </h3>
            <div className="space-y-4">
              {hdvs.slice(0, 3).map((hdv, i) => (
                <div key={hdv.id} className="flex items-center gap-4 p-3 bg-surface-container-low rounded-xl border border-transparent hover:border-primary/20 transition-all">
                  <div className="relative">
                    <img src={hdv.avatar} alt={hdv.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className={cn(
                      "absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-surface-container-low",
                      i === 0 ? "bg-amber-400 text-white" : i === 1 ? "bg-slate-300 text-white" : "bg-orange-400 text-white"
                    )}>
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-on-surface truncate">{hdv.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <TrendingUp size={10} className="text-green-500" />
                      <span className="text-[10px] font-black text-primary uppercase tracking-wider">{hdv.operationalScore} PTS</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {i === 0 && <ShieldCheck size={16} className="text-primary" />}
                    {hdv.rating >= 4.9 && <Star size={16} fill="#f59e0b" className="text-amber-500" />}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 bg-surface-container-high text-primary text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-primary/5 transition-all">
              Xem bảng xếp hạng đầy đủ
            </button>
          </div>

          <div className="bg-primary p-6 rounded-xl shadow-lg shadow-primary/20 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-2">Hệ thống Huy hiệu</h3>
            <p className="text-lg font-black text-white leading-tight">Khích lệ đội ngũ bằng các danh hiệu mới</p>
            <div className="flex gap-2 mt-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white" title="Chuyên gia Tây Bắc">🏔️</div>
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white" title="HDV 5 sao">⭐</div>
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white" title="Sơ cứu chuyên nghiệp">🚑</div>
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white" title="Ngoại ngữ xuất sắc">🗣️</div>
            </div>
            <button className="mt-6 text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
              Quản lý huy hiệu <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface-container-low p-6 rounded-xl flex flex-wrap items-end gap-6">
        <div className="flex-1 min-w-[240px]">
          <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-2 ml-1">Tìm kiếm</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
            <input
              type="text"
              placeholder="Tìm tên, mã HDV..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-lowest border-none rounded-lg text-sm font-medium py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-2 ml-1">Loại HDV</label>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full bg-surface-container-lowest border-none rounded-lg text-sm font-medium py-2.5 focus:ring-2 focus:ring-primary/10"
          >
            <option>Tất cả các loại</option>
            <option>Fulltime</option>
            <option>Collaborator</option>
          </select>
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-2 ml-1">Trạng thái</label>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full bg-surface-container-lowest border-none rounded-lg text-sm font-medium py-2.5 focus:ring-2 focus:ring-primary/10"
          >
            <option>Tất cả trạng thái</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Blocked</option>
          </select>
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-2 ml-1">Chi nhánh</label>
          <select 
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
            className="w-full bg-surface-container-lowest border-none rounded-lg text-sm font-medium py-2.5 focus:ring-2 focus:ring-primary/10"
          >
            <option>Toàn quốc</option>
            <option>Hà Nội</option>
            <option>Đà Nẵng</option>
            <option>Hồ Chí Minh</option>
          </select>
        </div>
        <button 
          onClick={() => {
            setSearchTerm('');
            setFilterType('Tất cả các loại');
            setFilterStatus('Tất cả trạng thái');
            setFilterBranch('Toàn quốc');
          }}
          className="p-2.5 bg-surface-container-lowest text-outline rounded-lg hover:text-primary transition-colors border border-outline-variant/20"
          title="Xóa bộ lọc"
        >
          <Filter size={20} />
        </button>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden ghost-shadow border border-outline-variant/10">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline">Thông tin HDV</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline">Loại / Chi nhánh</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline">Trạng thái</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline">Lịch bận (7 ngày)</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline">Rating & Performance</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {filteredHdvs.map((hdv) => (
              <tr 
                key={hdv.id} 
                className="group hover:bg-surface-container-low transition-colors cursor-pointer"
                onClick={() => setSelectedGuide(hdv)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={hdv.avatar} alt={hdv.name} className="w-12 h-12 rounded-lg object-cover border border-outline-variant/20" />
                    <div>
                      <p className="text-sm font-bold text-on-surface">{hdv.name}</p>
                      <p className="text-[10px] text-on-surface-variant font-mono uppercase">{hdv.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-primary">{hdv.type}</p>
                  <p className="text-[10px] text-outline font-medium">{hdv.branch}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-black uppercase tracking-wider",
                    hdv.status === 'Active' ? "bg-secondary-container text-on-secondary-container" : 
                    hdv.status === 'Pending' ? "bg-tertiary-fixed text-on-tertiary-fixed-variant" : 
                    "bg-error-container text-on-error-container"
                  )}>
                    {hdv.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {Array.from({ length: 7 }).map((_, i) => {
                      const date = new Date(2026, 2, 26 + i); // Starting from March 26, 2026
                      const isBusy = MOCK_TOURS.some(tour => {
                        if (tour.assignedHDV !== hdv.id) return false;
                        
                        // Parse tour dates
                        const parseDate = (dateStr: string) => {
                          if (dateStr === 'Hôm nay') return new Date(2026, 2, 26);
                          const [d, m] = dateStr.split('/').map(Number);
                          return new Date(2026, m - 1, d);
                        };

                        const start = parseDate(tour.startDate);
                        const end = tour.endDate ? parseDate(tour.endDate) : start;
                        
                        // Normalize to start of day for comparison
                        const checkDate = new Date(date.setHours(0,0,0,0));
                        const tourStart = new Date(start.setHours(0,0,0,0));
                        const tourEnd = new Date(end.setHours(0,0,0,0));

                        return checkDate >= tourStart && checkDate <= tourEnd;
                      });

                      return (
                        <div 
                          key={i} 
                          className={cn(
                            "w-3 h-6 rounded-sm transition-all",
                            isBusy ? "bg-error/40 border border-error/20" : "bg-secondary-container/30 border border-secondary/10"
                          )}
                          title={`${date.toLocaleDateString('vi-VN')}: ${isBusy ? 'Bận' : 'Trống'}`}
                        />
                      );
                    })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < Math.floor(hdv.rating) ? "currentColor" : "none"} className={i < Math.floor(hdv.rating) ? "" : "text-outline-variant"} />
                      ))}
                    </div>
                    <span className="text-xs font-black">{hdv.rating}</span>
                  </div>
                  <div className="w-32 h-1.5 bg-surface-variant rounded-full overflow-hidden relative">
                    <div className="h-full aero-gradient" style={{ width: `${hdv.operationalScore}%` }}></div>
                  </div>
                  <div className="flex justify-between w-32 mt-1">
                    <span className="text-[9px] font-black text-outline uppercase">Score</span>
                    <span className="text-[9px] font-black text-primary">{hdv.operationalScore}/100</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      className="p-2 text-outline hover:text-primary hover:bg-white rounded-lg transition-all shadow-none hover:shadow-sm"
                      title="Xem lịch trình"
                      onClick={(e) => {
                        e.stopPropagation();
                        setScheduleGuide(hdv);
                        setIsScheduleOpen(true);
                      }}
                    >
                      <Calendar size={18} />
                    </button>
                    <button 
                      className="p-2 text-outline hover:text-primary hover:bg-white rounded-lg transition-all shadow-none hover:shadow-sm"
                      title="Xem chi tiết"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGuide(hdv);
                      }}
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      className="p-2 text-outline hover:text-primary hover:bg-white rounded-lg transition-all shadow-none hover:shadow-sm"
                      title="Thêm thao tác"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(hdv);
                      }}
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Guide Detail Modal */}
      <GuideDetailModal 
        guide={selectedGuide} 
        onClose={() => setSelectedGuide(null)} 
        onEdit={handleEdit}
      />

      {/* Guide Schedule Modal */}
      <GuideScheduleModal 
        guide={scheduleGuide} 
        isOpen={isScheduleOpen} 
        onClose={() => {
          setIsScheduleOpen(false);
          setScheduleGuide(null);
        }} 
      />

      {/* HDV Form Modal */}
      <HDVFormModal 
        isOpen={isFormOpen} 
        onClose={() => {
          setIsFormOpen(false);
          setEditingHDV(null);
        }} 
        onSave={handleSaveHDV} 
        initialData={editingHDV}
      />
    </div>
  );
}
