import React from 'react';
import { X, Calendar as CalendarIcon, MapPin, Users, Clock, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { MOCK_TOURS } from '../mockData';
import { HDV } from '../types';

interface GuideScheduleModalProps {
  guide: HDV | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GuideScheduleModal({ guide, isOpen, onClose }: GuideScheduleModalProps) {
  if (!guide) return null;

  const guideTours = MOCK_TOURS.filter(tour => tour.assignedHDV === guide.id);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden border border-outline-variant/20"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low">
              <div className="flex items-center gap-4">
                <img src={guide.avatar} alt={guide.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/20" />
                <div>
                  <h2 className="text-xl font-black text-on-surface tracking-tight">Lịch trình: {guide.name}</h2>
                  <p className="text-[10px] text-outline font-bold uppercase tracking-widest mt-0.5">{guide.id} • {guide.type}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-outline"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {guideTours.length > 0 ? (
                <div className="space-y-6">
                  <h3 className="text-[11px] font-black text-outline uppercase tracking-widest mb-4">Các tour sắp tới</h3>
                  {guideTours.map((tour) => (
                    <div key={tour.id} className="bg-surface-container-low rounded-2xl border border-outline-variant/10 group hover:border-primary/30 transition-all overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-32 h-32 shrink-0">
                          <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <span className={cn(
                              "text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider",
                              tour.status === 'Live' ? "bg-secondary text-white" : "bg-primary text-white"
                            )}>
                              {tour.status === 'Live' ? 'Đang diễn ra' : 'Sắp tới'}
                            </span>
                            <span className="text-[10px] font-mono text-outline">{tour.id}</span>
                          </div>
                          <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-tight mb-4">{tour.name}</h4>
                          
                          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                            <div className="flex items-center gap-2 text-[10px] text-on-surface-variant font-medium">
                              <CalendarIcon size={12} className="text-primary" />
                              <span>{tour.startDate} - {tour.endDate || tour.startDate}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-on-surface-variant font-medium">
                              <Users size={12} className="text-primary" />
                              <span>{tour.guests} Pax ({tour.guestType})</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-on-surface-variant font-medium">
                              <Clock size={12} className="text-primary" />
                              <span>{tour.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-on-surface-variant font-medium">
                              <MapPin size={12} className="text-primary" />
                              <span>{tour.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-4 text-outline">
                    <Info size={32} />
                  </div>
                  <p className="text-sm font-bold text-on-surface-variant">Chưa có tour nào được phân công</p>
                  <p className="text-[10px] text-outline mt-1 uppercase tracking-widest">HDV này hiện đang trống lịch</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-outline-variant/10 flex justify-end bg-surface-container-low">
              <button
                onClick={onClose}
                className="px-8 py-2.5 bg-primary text-white rounded-xl text-sm font-black shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
