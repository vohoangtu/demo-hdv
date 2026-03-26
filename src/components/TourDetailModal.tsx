import React, { useState } from 'react';
import { X, MapPin, Users, Clock, Calendar, Phone, Mail, User, FileText, Send, CheckCircle2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Tour } from '../types';

interface TourDetailModalProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveFeedback?: (tourId: string, feedback: string) => void;
}

export default function TourDetailModal({ tour, isOpen, onClose, onSaveFeedback }: TourDetailModalProps) {
  const [feedback, setFeedback] = useState(tour?.internalFeedback || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(!!tour?.internalFeedback);

  if (!tour) return null;

  const handleSubmitFeedback = () => {
    if (!feedback.trim()) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onSaveFeedback?.(tour.id, feedback);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const isCompleted = tour.status === 'Completed' || tour.status === 'Settled' || tour.status === 'Pending Audit' || tour.status === 'Pending Review';

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
            className="relative w-full max-w-3xl bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden border border-outline-variant/20 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="relative h-48 shrink-0">
              <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors text-white backdrop-blur-md"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-6 left-8 right-8">
                <div className="flex justify-between items-end">
                  <div>
                    <span className={cn(
                      "text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block",
                      tour.status === 'Live' ? "bg-secondary text-white" : 
                      isCompleted ? "bg-green-500 text-white" : "bg-primary text-white"
                    )}>
                      {tour.status === 'Live' ? 'Đang diễn ra' : isCompleted ? 'Đã hoàn thành' : 'Sắp tới'}
                    </span>
                    <h2 className="text-2xl font-black text-white tracking-tight leading-tight">{tour.name}</h2>
                  </div>
                  <span className="text-xs font-mono text-white/60">{tour.id}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest">Thời gian</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-on-surface">
                    <Calendar size={14} className="text-primary" />
                    {tour.startDate} - {tour.endDate}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest">Thời lượng</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-on-surface">
                    <Clock size={14} className="text-primary" />
                    {tour.duration}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest">Khách hàng</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-on-surface">
                    <Users size={14} className="text-primary" />
                    {tour.guests} Pax ({tour.guestType})
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest">Địa điểm</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-on-surface">
                    <MapPin size={14} className="text-primary" />
                    {tour.location}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Itinerary */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-on-surface uppercase tracking-widest flex items-center gap-2">
                    <FileText size={16} className="text-primary" />
                    Lịch trình chi tiết
                  </h3>
                  <div className="space-y-3">
                    {tour.itinerary ? tour.itinerary.map((item, idx) => (
                      <div key={idx} className="flex gap-3 text-sm">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-on-surface-variant leading-relaxed">{item}</p>
                      </div>
                    )) : (
                      <p className="text-xs text-outline italic">Chưa có thông tin lịch trình chi tiết.</p>
                    )}
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Operator Contact */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-on-surface uppercase tracking-widest flex items-center gap-2">
                      <User size={16} className="text-primary" />
                      Điều hành Tour
                    </h3>
                    {tour.operatorContact ? (
                      <div className="bg-surface-container-low p-4 rounded-2xl space-y-3">
                        <p className="text-sm font-bold text-on-surface">{tour.operatorContact.name}</p>
                        <div className="space-y-2">
                          <a href={`tel:${tour.operatorContact.phone}`} className="flex items-center gap-2 text-xs text-on-surface-variant hover:text-primary transition-colors">
                            <Phone size={14} />
                            {tour.operatorContact.phone}
                          </a>
                          <a href={`mailto:${tour.operatorContact.email}`} className="flex items-center gap-2 text-xs text-on-surface-variant hover:text-primary transition-colors">
                            <Mail size={14} />
                            {tour.operatorContact.email}
                          </a>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-outline italic">Chưa có thông tin điều hành.</p>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-on-surface uppercase tracking-widest flex items-center gap-2">
                      <Info size={16} className="text-amber-500" />
                      Lưu ý & Yêu cầu
                    </h3>
                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl">
                      <p className="text-xs text-amber-900 leading-relaxed">
                        {tour.notes || 'Không có lưu ý đặc biệt cho tour này.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Internal Feedback Section */}
              {isCompleted && (
                <div className="pt-8 border-t border-outline-variant/10 space-y-4">
                  <h3 className="text-sm font-black text-on-surface uppercase tracking-widest flex items-center gap-2">
                    <Send size={16} className="text-primary" />
                    Phản hồi nội bộ (Internal Feedback)
                  </h3>
                  
                  {isSubmitted ? (
                    <div className="bg-green-50 border border-green-100 p-6 rounded-2xl flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">
                        <CheckCircle2 size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-green-900">Cảm ơn bạn đã gửi phản hồi!</p>
                        <p className="text-xs text-green-700 mt-1">Ý kiến của bạn giúp chúng tôi cải thiện chất lượng dịch vụ.</p>
                        <div className="mt-3 p-3 bg-white/50 rounded-lg text-xs text-green-800 italic">
                          "{feedback}"
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-xs text-on-surface-variant">
                        Vui lòng chia sẻ trải nghiệm của bạn về tour này (khách hàng, dịch vụ, sự cố nếu có...).
                      </p>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Nhập phản hồi của bạn tại đây..."
                        className="w-full h-32 bg-surface-container-low border border-outline-variant/20 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={handleSubmitFeedback}
                          disabled={!feedback.trim() || isSubmitting}
                          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/10 hover:bg-primary-container transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? 'Đang gửi...' : 'Gửi phản hồi'}
                          <Send size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-outline-variant/10 flex justify-end bg-surface-container-low shrink-0">
              <button
                onClick={onClose}
                className="px-8 py-2.5 bg-surface-container-highest text-on-surface rounded-xl text-sm font-black hover:bg-surface-container-high transition-all"
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
