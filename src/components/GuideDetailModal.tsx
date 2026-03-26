import React, { useState } from 'react';
import { X, Phone, Mail, CreditCard, MapPin, Globe, Star, Calendar, Clock, CheckCircle2, Search } from 'lucide-react';
import { HDV } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface GuideDetailModalProps {
  guide: HDV | null;
  onClose: () => void;
  onEdit?: (guide: HDV) => void;
}

export default function GuideDetailModal({ guide, onClose, onEdit }: GuideDetailModalProps) {
  const [historySearch, setHistorySearch] = useState('');
  
  if (!guide) return null;

  const filteredHistory = guide.tourHistory?.filter(tour => 
    tour.name.toLowerCase().includes(historySearch.toLowerCase()) ||
    tour.id.toLowerCase().includes(historySearch.toLowerCase())
  ) || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="relative h-48 sm:h-64 overflow-hidden">
            <img 
              src="https://picsum.photos/seed/travel/1200/400" 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
            >
              <X size={20} />
            </button>

            <div className="absolute bottom-6 left-8 flex items-end gap-6">
              <img 
                src={guide.avatar} 
                alt={guide.name} 
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-surface-container-lowest object-cover shadow-xl"
              />
              <div className="mb-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">{guide.name}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] font-black px-2 py-0.5 bg-primary text-white rounded uppercase tracking-wider">
                    {guide.type}
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 bg-white/20 text-white rounded uppercase tracking-wider backdrop-blur-md">
                    {guide.id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Basic Info */}
              <div className="lg:col-span-4 space-y-8">
                <section>
                  <h3 className="text-[10px] font-black text-outline uppercase tracking-widest mb-4">Thông tin liên hệ</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-on-surface">
                      <div className="p-2.5 bg-surface-container-low rounded-xl text-primary">
                        <Phone size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-outline uppercase">Số điện thoại</p>
                        <p className="text-sm font-bold">{guide.phone || 'Chưa cập nhật'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-on-surface">
                      <div className="p-2.5 bg-surface-container-low rounded-xl text-primary">
                        <Mail size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] font-black text-outline uppercase">Email</p>
                        <p className="text-sm font-bold truncate">{guide.email || 'Chưa cập nhật'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-on-surface">
                      <div className="p-2.5 bg-surface-container-low rounded-xl text-primary">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-outline uppercase">Số CCCD/Passport</p>
                        <p className="text-sm font-bold">{guide.idNumber || 'Chưa cập nhật'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-on-surface">
                      <div className="p-2.5 bg-surface-container-low rounded-xl text-primary">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-outline uppercase">Chi nhánh</p>
                        <p className="text-sm font-bold">{guide.branch}</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-[10px] font-black text-outline uppercase tracking-widest mb-4">Kỹ năng & Ngôn ngữ</h3>
                  <div className="flex flex-wrap gap-2">
                    {guide.languages.map(lang => (
                      <span key={lang} className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-black rounded-full uppercase">
                        {lang}
                      </span>
                    ))}
                    {guide.routes.map(route => (
                      <span key={route} className="px-3 py-1 bg-surface-container-high text-on-surface text-[10px] font-bold rounded-full">
                        {route}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-[10px] font-black text-outline uppercase tracking-widest mb-4">Kỹ năng chuyên môn</h3>
                  <div className="flex flex-wrap gap-2">
                    {guide.skills && guide.skills.length > 0 ? guide.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase">
                        {skill}
                      </span>
                    )) : <span className="text-xs text-outline italic">Chưa cập nhật</span>}
                  </div>
                </section>

                <section>
                  <h3 className="text-[10px] font-black text-outline uppercase tracking-widest mb-4">Chứng chỉ & Bằng cấp</h3>
                  <div className="space-y-2">
                    {guide.certifications && guide.certifications.length > 0 ? guide.certifications.map(cert => (
                      <div key={cert} className="flex items-center gap-2 text-on-surface">
                        <CheckCircle2 size={14} className="text-secondary" />
                        <span className="text-xs font-bold">{cert}</span>
                      </div>
                    )) : <span className="text-xs text-outline italic">Chưa cập nhật</span>}
                  </div>
                </section>

                <section className="p-5 bg-surface-container-low rounded-2xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[10px] font-black text-outline uppercase tracking-widest">Chỉ số hiệu suất</h3>
                    <span className="text-lg font-black text-primary">{guide.operationalScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full aero-gradient" style={{ width: `${guide.operationalScore}%` }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <p className="text-[9px] font-black text-outline uppercase">Rating</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        <span className="text-sm font-bold">{guide.rating}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-outline uppercase">Tours</p>
                      <p className="text-sm font-bold mt-1">{guide.completedTours}</p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column: Tour History */}
              <div className="lg:col-span-8 space-y-8">
                <section className="flex flex-col h-full">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h3 className="text-[10px] font-black text-outline uppercase tracking-widest">Lịch sử Tour Toàn diện</h3>
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={14} />
                      <input 
                        type="text"
                        placeholder="Tìm kiếm tour..."
                        value={historySearch}
                        onChange={(e) => setHistorySearch(e.target.value)}
                        className="w-full bg-surface-container-low border-none rounded-lg py-1.5 pl-9 pr-4 text-xs focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>

                  <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar space-y-4">
                    {filteredHistory.length > 0 ? (
                      filteredHistory.map((tour) => (
                        <div key={tour.id} className="p-5 bg-surface-container-lowest border border-outline-variant/10 rounded-2xl flex flex-wrap items-center justify-between gap-4 hover:border-primary/30 transition-all group">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/5 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                              <Calendar size={20} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-on-surface">{tour.name}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] font-mono text-outline uppercase">{tour.id}</span>
                                <span className="w-1 h-1 bg-outline-variant rounded-full" />
                                <span className="text-[10px] font-bold text-on-surface-variant">{tour.date}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="flex items-center gap-1 justify-end">
                                <Star size={12} className="text-amber-500 fill-amber-500" />
                                <span className="text-xs font-black">{tour.rating}</span>
                              </div>
                              <p className="text-[9px] font-black text-outline uppercase mt-0.5">Rating</p>
                            </div>
                            <div className={cn(
                              "px-3 py-1 rounded-lg",
                              tour.status === 'Completed' ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container-high text-outline"
                            )}>
                              <span className="text-[10px] font-black uppercase tracking-wider">{tour.status}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-12 bg-surface-container-low/30 border-2 border-dashed border-outline-variant/20 rounded-2xl text-center">
                        <p className="text-sm font-bold text-on-surface-variant">
                          {historySearch ? 'Không tìm thấy tour phù hợp' : 'Chưa có lịch sử tour'}
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock size={20} className="text-primary" />
                      <h4 className="text-xs font-black uppercase tracking-widest">Thời gian phản hồi</h4>
                    </div>
                    <p className="text-2xl font-black text-on-surface">~15 phút</p>
                    <p className="text-[10px] text-on-surface-variant mt-1">Nhanh hơn 85% HDV khác</p>
                  </div>
                  <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle2 size={20} className="text-secondary" />
                      <h4 className="text-xs font-black uppercase tracking-widest">Tỷ lệ hoàn thành</h4>
                    </div>
                    <p className="text-2xl font-black text-on-surface">98.5%</p>
                    <p className="text-[10px] text-on-surface-variant mt-1">Chỉ 2 tour bị hủy trong năm</p>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-surface-container-low border-t border-outline-variant/10 flex justify-end gap-3">
            <button 
              onClick={() => onEdit?.(guide)}
              className="px-6 py-2.5 bg-surface-container-lowest text-on-surface border border-outline-variant/30 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-surface-container-high transition-all"
            >
              Chỉnh sửa hồ sơ
            </button>
            <button className="px-8 py-2.5 aero-gradient text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
              Phân công Tour
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
