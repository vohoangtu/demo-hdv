import React, { useState, useMemo } from 'react';
import { Search, MapPin, Users, Calendar, ShieldCheck, Zap, ChevronRight, Star, Plus, LayoutList, CalendarDays, GripVertical, Edit, Languages, Map, Award, FileText, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_TOURS, MOCK_HDVS } from '../mockData';
import { Tour as TourType, HDV as HDVType, Tour } from '../types';
import TourFormModal from './TourFormModal';
import TourCalendar from './TourCalendar';
import { motion, AnimatePresence } from 'motion/react';

export default function TourAssignment() {
  const [tours, setTours] = useState(MOCK_TOURS);
  const unassignedTours = tours.filter(t => !t.assignedHDV);
  const assignedTours = tours.filter(t => t.assignedHDV);
  const [selectedTour, setSelectedTour] = React.useState(tours[0]);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingTour, setEditingTour] = useState<TourType | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const handleSaveTour = (data: any) => {
    if (editingTour) {
      setTours(prev => prev.map(t => t.id === editingTour.id ? { ...t, ...data } : t));
      if (selectedTour.id === editingTour.id) {
        setSelectedTour(prev => ({ ...prev, ...data }));
      }
      setEditingTour(null);
    } else {
      const newTour = {
        ...data,
        id: `TOUR-${Date.now()}`,
        status: 'Pending',
        image: 'https://picsum.photos/seed/tour/800/600'
      };
      setTours(prev => [newTour, ...prev]);
    }
    setIsFormOpen(false);
  };

  const handleEditTour = (e: React.MouseEvent, tour: TourType) => {
    e.stopPropagation();
    setEditingTour(tour);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTour(null);
  };

  const calculateMatchScore = (tour: TourType, hdv: HDVType) => {
    let score = 40; // Base score
    
    // 1. Language match (Max +30)
    const tourLang = tour.language.toLowerCase();
    const hasDirectMatch = hdv.languages.some(l => {
      const langMap: Record<string, string> = { 'EN': 'anh', 'JP': 'nhật', 'CN': 'trung', 'KR': 'hàn', 'FR': 'pháp' };
      return tourLang.includes(langMap[l] || l.toLowerCase());
    });

    if (hasDirectMatch) score += 30;
    else if (tourLang.includes('việt')) score += 15;
    
    // 2. Route & Location Match (Max +20)
    const hasRouteMatch = hdv.routes.some(route => 
      tour.name.toLowerCase().includes(route.toLowerCase()) || 
      tour.location.toLowerCase().includes(route.toLowerCase())
    );
    if (hasRouteMatch) score += 12;
    if (hdv.baseLocation === tour.location) score += 8;
    
    // 3. Tour History & Specific Rating (Max +15)
    if (hdv.tourHistory && hdv.tourHistory.length > 0) {
      const similarTours = hdv.tourHistory.filter(h => 
        h.name.toLowerCase().includes(tour.location.toLowerCase()) ||
        tour.name.toLowerCase().includes(h.name.toLowerCase())
      );
      
      if (similarTours.length > 0) {
        const avgRating = similarTours.reduce((acc, curr) => acc + curr.rating, 0) / similarTours.length;
        score += (avgRating / 5) * 10;
        score += Math.min(similarTours.length * 2, 5); // Experience bonus
      }
    }

    // 4. General Rating & Operational Score (Max +10)
    score += (hdv.rating / 5) * 5;
    score += (hdv.operationalScore / 100) * 5;
    
    // 5. Guest Type & Priority Match (Max +5)
    if (tour.guestType === 'Inbound' && hdv.type === 'Fulltime') score += 3;
    if (tour.priority === 'Urgent' && hdv.operationalScore > 90) score += 2;

    return Math.min(Math.max(Math.round(score), 0), 100);
  };

  const checkConflict = (hdvId: string, tour: Tour) => {
    const parseDate = (dateStr: string) => {
      if (dateStr === 'Hôm nay') return new Date(2026, 2, 26);
      const [d, m] = dateStr.split('/').map(Number);
      return new Date(2026, m - 1, d);
    };

    const tourStart = parseDate(tour.startDate);
    const tourEnd = tour.endDate ? parseDate(tour.endDate) : tourStart;

    return tours.some(t => {
      if (t.assignedHDV !== hdvId || t.status === 'Completed' || t.id === tour.id) return false;
      
      const tStart = parseDate(t.startDate);
      const tEnd = t.endDate ? parseDate(t.endDate) : tStart;

      return (tourStart <= tEnd && tourEnd >= tStart);
    });
  };

  const recommendedHDVs = useMemo(() => {
    return [...MOCK_HDVS]
      .map(hdv => {
        const score = calculateMatchScore(selectedTour, hdv);
        const reasons: { label: string; icon: React.ReactNode }[] = [];
        
        // Conflict Check
        const hasConflict = checkConflict(hdv.id, selectedTour);
        if (hasConflict) {
          reasons.push({ label: "Conflict", icon: <AlertTriangle size={10} className="text-error" /> });
        }

        const tourLang = selectedTour.language.toLowerCase();
        const hasDirectMatch = hdv.languages.some(l => {
          const langMap: Record<string, string> = { 'EN': 'anh', 'JP': 'nhật', 'CN': 'trung', 'KR': 'hàn', 'FR': 'pháp' };
          return tourLang.includes(langMap[l] || l.toLowerCase());
        });
        if (hasDirectMatch) reasons.push({ label: "Language Expert", icon: <Languages size={10} /> });
        
        const hasRouteMatch = hdv.routes.some(route => 
          selectedTour.name.toLowerCase().includes(route.toLowerCase()) || 
          selectedTour.location.toLowerCase().includes(route.toLowerCase())
        );
        if (hasRouteMatch) reasons.push({ label: "Route Expert", icon: <Map size={10} /> });
        if (hdv.baseLocation === selectedTour.location) reasons.push({ label: "Local Guide", icon: <MapPin size={10} /> });
        if (hdv.rating >= 4.8) reasons.push({ label: "Top Rated", icon: <Award size={10} /> });

        return { ...hdv, matchScore: score, matchReasons: reasons };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 4);
  }, [selectedTour]);

  const handleAssign = (hdv: HDVType) => {
    setTours(prev => prev.map(t => 
      t.id === selectedTour.id 
        ? { ...t, assignedHDV: hdv.id, status: 'Live' as const } 
        : t
    ));
    
    // Update selected tour to reflect changes in the UI
    setSelectedTour(prev => ({
      ...prev,
      assignedHDV: hdv.id,
      status: 'Live'
    }));

    alert(`Đã phê duyệt phân công HDV ${hdv.name} cho tour ${selectedTour.name} thành công!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-primary leading-tight">Điều phối Tour</h2>
          <p className="text-on-surface-variant text-sm mt-2">Phân bổ HDV phù hợp cho các hành trình sắp tới.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-surface-container-low p-1 rounded-xl flex gap-1 border border-outline-variant/10">
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-lg transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest",
                viewMode === 'list' ? "bg-primary text-white shadow-md" : "text-outline hover:bg-surface-container-high"
              )}
            >
              <LayoutList size={16} />
              List
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={cn(
                "p-2 rounded-lg transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest",
                viewMode === 'calendar' ? "bg-primary text-white shadow-md" : "text-outline hover:bg-surface-container-high"
              )}
            >
              <CalendarDays size={16} />
              Calendar
            </button>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 aero-gradient text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
          >
            <Plus size={18} />
            Tạo Tour Mới
          </button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <TourCalendar 
              tours={MOCK_TOURS} 
              onSelectTour={setSelectedTour} 
              selectedTourId={selectedTour.id} 
            />
          </div>
          <div className="lg:col-span-4">
            {/* Selected Tour Detail */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl ghost-shadow border border-outline-variant/10 sticky top-24">
              <img src={selectedTour.image} alt={selectedTour.name} className="w-full h-40 rounded-xl object-cover shadow-lg mb-6" />
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className={cn(
                    "text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider",
                    selectedTour.priority === 'Urgent' ? "bg-error-container text-on-error-container" :
                    selectedTour.priority === 'High' ? "bg-tertiary-fixed text-on-tertiary-fixed-variant" :
                    "bg-secondary-container text-on-secondary-container"
                  )}>
                    {selectedTour.priority}
                  </span>
                  <span className="text-[10px] font-mono text-outline">{selectedTour.id}</span>
                </div>
                <h3 className="text-lg font-black text-on-surface leading-tight">{selectedTour.name}</h3>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant/5">
                  <div>
                    <p className="text-[9px] font-black text-outline uppercase tracking-widest">Khởi hành</p>
                    <p className="text-xs font-bold text-on-surface mt-1">{selectedTour.startDate}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-outline uppercase tracking-widest">Khách</p>
                    <p className="text-xs font-bold text-on-surface mt-1">{selectedTour.guests} Pax ({selectedTour.guestType})</p>
                  </div>
                </div>

                <div className="pt-6">
                  <h4 className="text-[10px] font-black text-outline uppercase tracking-widest mb-4">Phân công HDV</h4>
                  <div className="space-y-3">
                    {MOCK_HDVS.slice(0, 3).map((hdv, i) => (
                      <div key={hdv.id} className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between border border-transparent hover:border-primary/20 transition-all">
                        <div className="flex items-center gap-3">
                          <img src={hdv.avatar} alt={hdv.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <p className="text-xs font-bold text-on-surface">{hdv.name}</p>
                            <p className="text-[9px] text-outline font-black uppercase tracking-wider">{98 - i * 4}% Match</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleAssign(hdv)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-all text-[10px] font-black uppercase tracking-wider"
                        >
                          <Zap size={14} fill="currentColor" />
                          Assign
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Tour List */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-primary uppercase tracking-tight">Tour List</h2>
              <span className="text-[10px] font-black bg-primary/5 text-primary px-2 py-0.5 rounded-full">{unassignedTours.length} PENDING</span>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
              <input
                type="text"
                placeholder="Search tours..."
                className="w-full bg-surface-container-low border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <div className="space-y-8 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 custom-scrollbar">
              {/* Section: Needs Assignment */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div>
                  <h3 className="text-[11px] font-black text-error uppercase tracking-widest">Needs Assignment</h3>
                </div>
                {unassignedTours.map((tour) => {
                  const topMatch = MOCK_HDVS
                    .map(hdv => calculateMatchScore(tour, hdv))
                    .sort((a, b) => b - a)[0];

                  return (
                    <div
                      key={tour.id}
                      onClick={() => setSelectedTour(tour)}
                      className={cn(
                        "p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden",
                        selectedTour.id === tour.id
                          ? "bg-surface-container-lowest border-primary shadow-lg shadow-primary/5"
                          : "bg-surface-container-low border-transparent hover:border-outline-variant/30"
                      )}
                    >
                      {selectedTour.id === tour.id && (
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                      )}
                      <div className="flex gap-4">
                        <img src={tour.image} alt={tour.name} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <span className={cn(
                              "text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider",
                              tour.priority === 'Urgent' ? "bg-error-container text-on-error-container" :
                              tour.priority === 'High' ? "bg-tertiary-fixed text-on-tertiary-fixed-variant" :
                              "bg-secondary-container text-on-secondary-container"
                            )}>
                              {tour.priority}
                            </span>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={(e) => handleEditTour(e, tour)}
                                className="p-1.5 text-outline hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                              >
                                <Edit size={14} />
                              </button>
                              <span className="text-[10px] font-mono text-outline">{tour.id}</span>
                            </div>
                          </div>
                          <h3 className="text-sm font-bold text-on-surface mt-2 line-clamp-1 group-hover:text-primary transition-colors">{tour.name}</h3>
                          <div className="flex items-center gap-3 mt-2 text-[10px] text-on-surface-variant font-medium">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {tour.startDate}</span>
                            <span className="flex items-center gap-1"><Users size={12} /> {tour.guests} Pax</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[9px] font-black text-primary/60">
                        <Zap size={10} fill="currentColor" />
                        {topMatch}% TOP MATCH
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Section: Assigned Tours */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <div className="w-2 h-2 rounded-full bg-outline-variant"></div>
                  <h3 className="text-[11px] font-black text-outline uppercase tracking-widest">Assigned Tours</h3>
                </div>
                {assignedTours.map((tour) => (
                  <div
                    key={tour.id}
                    onClick={() => setSelectedTour(tour)}
                    className={cn(
                      "p-4 rounded-xl border transition-all cursor-pointer group opacity-70 hover:opacity-100",
                      selectedTour.id === tour.id
                        ? "bg-surface-container-lowest border-primary shadow-lg shadow-primary/5"
                        : "bg-surface-container-low border-transparent hover:border-outline-variant/30"
                    )}
                  >
                    <div className="flex gap-4">
                      <img src={tour.image} alt={tour.name} className="w-20 h-20 rounded-lg object-cover shrink-0 grayscale" />
                      <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider bg-surface-container-high text-outline">
                              Assigned
                            </span>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={(e) => handleEditTour(e, tour)}
                                className="p-1.5 text-outline hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                              >
                                <Edit size={14} />
                              </button>
                              <span className="text-[10px] font-mono text-outline">{tour.id}</span>
                            </div>
                          </div>
                        <h3 className="text-sm font-bold text-on-surface mt-2 line-clamp-1">{tour.name}</h3>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-on-surface-variant font-medium">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {tour.startDate}</span>
                          <span className="flex items-center gap-1"><Users size={12} /> {tour.guests} Pax</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Assignment Engine */}
          <div className="lg:col-span-8 space-y-8">
            {/* Selected Tour Detail */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl ghost-shadow border border-outline-variant/10">
              <div className="flex flex-col md:flex-row gap-8">
                <img src={selectedTour.image} alt={selectedTour.name} className="w-full md:w-48 h-48 rounded-2xl object-cover shadow-xl" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-black text-on-surface tracking-tight">{selectedTour.name}</h2>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1.5 text-sm text-on-surface-variant font-medium">
                          <MapPin size={16} className="text-primary" />
                          {selectedTour.duration}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/50"></span>
                        <span className="flex items-center gap-1.5 text-sm text-on-surface-variant font-medium">
                          <ShieldCheck size={16} className="text-secondary" />
                          {selectedTour.guestType} Group
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-outline uppercase tracking-widest">Budget Dự Kiến</p>
                      <p className="text-xl font-black text-primary mt-1">{selectedTour.budget?.toLocaleString() || 'N/A'} VNĐ</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className="bg-surface-container-low p-3 rounded-lg">
                      <p className="text-[9px] font-black text-outline uppercase tracking-widest">Ngôn ngữ</p>
                      <p className="text-xs font-bold text-on-surface mt-1">{selectedTour.language}</p>
                    </div>
                    <div className="bg-surface-container-low p-3 rounded-lg">
                      <p className="text-[9px] font-black text-outline uppercase tracking-widest">Ngày khởi hành</p>
                      <p className="text-xs font-bold text-on-surface mt-1">{selectedTour.startDate} - {selectedTour.endDate}</p>
                    </div>
                    <div className="bg-surface-container-low p-3 rounded-lg">
                      <p className="text-[9px] font-black text-outline uppercase tracking-widest">Yêu cầu đặc biệt</p>
                      <p className="text-xs font-bold text-on-surface mt-1">Kinh nghiệm {'>'} 5 năm</p>
                    </div>
                  </div>

                  {/* Itinerary Section */}
                  <div className="mt-8 pt-6 border-t border-outline-variant/10">
                    <h4 className="text-[10px] font-black text-outline uppercase tracking-widest mb-4 flex items-center gap-2">
                      <FileText size={14} className="text-primary" />
                      Lịch trình chi tiết
                    </h4>
                    <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                      {selectedTour.itinerary && selectedTour.itinerary.length > 0 ? (
                        selectedTour.itinerary.map((step, idx) => (
                          <div key={idx} className="flex gap-3 text-xs">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <p className="text-on-surface-variant leading-relaxed">{step}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-outline italic">Chưa có thông tin lịch trình chi tiết cho tour này.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Matching Engine */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-on-surface uppercase tracking-widest flex items-center gap-2">
                  <Zap size={18} className="text-amber-500 fill-amber-500" />
                  Matching Engine: Top Recommendations
                </h3>
                <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">View All Guides</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedHDVs.map((hdv) => (
                  <motion.div 
                    key={hdv.id} 
                    layout
                    className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-all group relative overflow-hidden"
                  >
                    {/* Match Score Badge */}
                    <div className={cn(
                      "absolute top-0 right-0 text-white text-[10px] font-black px-3 py-1 rounded-bl-lg",
                      hdv.matchScore > 90 ? "bg-secondary" : hdv.matchScore > 80 ? "bg-primary" : "bg-outline"
                    )}>
                      {hdv.matchScore}% MATCH
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <img src={hdv.avatar} alt={hdv.name} className="w-16 h-16 rounded-full object-cover border-2 border-surface-container-low" />
                        <div className="p-1 text-outline cursor-grab active:cursor-grabbing">
                          <GripVertical size={16} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{hdv.name}</h4>
                        {checkConflict(hdv.id, selectedTour) && (
                          <div className="mt-1 flex items-center gap-1.5 text-error">
                            <AlertTriangle size={12} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Trùng lịch trình</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex text-amber-500">
                            <Star size={12} fill="currentColor" />
                          </div>
                          <span className="text-[10px] font-bold">{hdv.rating}</span>
                          <span className="text-[10px] text-outline">• {hdv.completedTours} tours</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {hdv.languages.map(lang => (
                            <span key={lang} className="text-[9px] font-black bg-surface-container-high px-1.5 py-0.5 rounded uppercase">{lang}</span>
                          ))}
                          {hdv.matchReasons.map(reason => (
                            <span key={reason.label} className="text-[9px] font-black bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase flex items-center gap-1">
                              {reason.icon}
                              {reason.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-outline-variant/5 flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-outline uppercase">Operational Score</span>
                        <span className="text-xs font-black text-primary">{hdv.operationalScore}/100</span>
                      </div>
                      <button 
                        onClick={() => handleAssign(hdv)}
                        className="bg-primary text-white text-[10px] font-black px-4 py-2 rounded-lg hover:bg-primary-container transition-colors active:scale-95 flex items-center gap-2"
                      >
                        <Zap size={12} fill="currentColor" />
                        ASSIGN TO TOUR
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tour Form Modal */}
      <TourFormModal 
        isOpen={isFormOpen} 
        onClose={handleCloseForm} 
        onSave={handleSaveTour} 
        initialData={editingTour}
      />
    </div>
  );
}
