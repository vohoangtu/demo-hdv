import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Users, Clock, ChevronLeft, ChevronRight, MoreVertical, Info, Download, Send, MessageSquareText, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_TOURS } from '../mockData';
import LeaveRequestModal from './LeaveRequestModal';
import TourDetailModal from './TourDetailModal';
import { Tour } from '../types';

export default function MySchedule() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2026, 2)); // March 2026 based on runtime context
  const [selectedDate, setSelectedDate] = React.useState<number | null>(26);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [tours, setTours] = useState<Tour[]>(MOCK_TOURS);

  const handleSaveLeaveRequest = (data: any) => {
    console.log('Saving Leave Request:', data);
    // In a real app, this would call an API
  };

  const handleSaveFeedback = (tourId: string, feedback: string) => {
    setTours(prev => prev.map(t => t.id === tourId ? { ...t, internalFeedback: feedback } : t));
    // In a real app, this would call an API
  };

  const handleExportCalendar = () => {
    console.log('Exporting Calendar...');
    alert('Lịch trình đã được xuất thành công!');
  };

  const handleCheckIn = (tourId: string) => {
    console.log('Checking in for tour:', tourId);
    alert(`Đã check-in thành công cho tour ${tourId}`);
  };

  // Simple calendar logic for March 2026
  const daysInMonth = 31;
  const firstDayOfMonth = 0; // March 1, 2026 is Sunday (0)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getToursForDate = (day: number) => {
    // Mapping mock data to March 2026 for demo purposes
    return tours.filter(tour => {
      if (tour.startDate === 'Hôm nay' && day === 26) return true;
      
      const startDay = parseInt(tour.startDate.split('/')[0]);
      const endDay = parseInt(tour.endDate?.split('/')[0] || tour.startDate.split('/')[0]);
      
      return day >= startDay && day <= endDay;
    });
  };

  const selectedTours = selectedDate ? getToursForDate(selectedDate) : [];

  const handleOpenDetail = (tour: Tour) => {
    setSelectedTour(tour);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-primary leading-tight">Lịch trình của tôi</h2>
          <p className="text-on-surface-variant text-sm mt-2">Quản lý các tour sắp tới và lịch làm việc cá nhân.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExportCalendar}
            className="flex items-center gap-2 px-6 py-2.5 bg-surface-container-lowest border border-outline-variant/20 text-on-surface rounded-lg text-sm font-bold hover:bg-surface-container-low transition-all"
          >
            <Download size={18} />
            Xuất lịch (iCal)
          </button>
          <button 
            onClick={() => setIsLeaveModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 aero-gradient text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
          >
            <Send size={18} />
            Đăng ký nghỉ phép
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar Grid */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-8 rounded-3xl ghost-shadow border border-outline-variant/10">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-on-surface">Tháng 3, 2026</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
              <div key={day} className="text-center text-[10px] font-black text-outline uppercase py-2">
                {day}
              </div>
            ))}
            
            {blanks.map(i => <div key={`blank-${i}`} />)}
            
            {days.map(day => {
              const isToday = day === 26;
              const isSelected = day === selectedDate;
              const dayTours = getToursForDate(day);
              const hasTour = dayTours.length > 0;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all group",
                    isToday && !isSelected && "bg-primary/5 text-primary",
                    isSelected ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-surface-container-low",
                    !isToday && !isSelected && "text-on-surface"
                  )}
                >
                  <span className="text-sm font-bold">{day}</span>
                  {hasTour && (
                    <div className={cn(
                      "absolute bottom-2 flex gap-0.5",
                    )}>
                      {dayTours.map((_, idx) => (
                        <div key={idx} className={cn(
                          "w-1 h-1 rounded-full",
                          isSelected ? "bg-white" : "bg-primary"
                        )} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-outline-variant/10 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-xs font-bold text-on-surface-variant">Ngày đi tour</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <span className="text-xs font-bold text-on-surface-variant">Sự kiện công ty</span>
            </div>
          </div>
        </div>

        {/* Tour Details for Selected Date */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-on-surface uppercase tracking-widest">
              Chi tiết ngày {selectedDate} tháng 3
            </h3>
            <button className="text-[10px] font-black text-primary uppercase tracking-widest">Xem tất cả</button>
          </div>

          {selectedTours.length > 0 ? (
            <div className="space-y-4">
              {selectedTours.map((tour) => {
                const isCompleted = tour.status === 'Completed' || tour.status === 'Settled' || tour.status === 'Pending Audit' || tour.status === 'Pending Review';
                const needsFeedback = isCompleted && !tour.internalFeedback;

                return (
                  <div 
                    key={tour.id} 
                    onClick={() => handleOpenDetail(tour)}
                    className="bg-surface-container-lowest rounded-2xl ghost-shadow border border-outline-variant/10 group hover:border-primary/30 transition-all overflow-hidden cursor-pointer"
                  >
                    <div className="relative h-32">
                      <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <span className={cn(
                          "text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider",
                          tour.status === 'Live' ? "bg-secondary text-white" : 
                          isCompleted ? "bg-green-500 text-white" : "bg-primary text-white"
                        )}>
                          {tour.status === 'Live' ? 'Đang diễn ra' : isCompleted ? 'Đã hoàn thành' : 'Sắp tới'}
                        </span>
                        <span className="text-[10px] font-mono text-white/80">{tour.id}</span>
                      </div>
                      {needsFeedback && (
                        <div className="absolute top-4 left-4 bg-amber-500 text-white text-[9px] font-black px-2 py-1 rounded-full flex items-center gap-1 shadow-lg animate-bounce">
                          <MessageSquareText size={10} />
                          CẦN PHẢN HỒI
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h4 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">{tour.name}</h4>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                          <div className="p-2 bg-surface-container-low rounded-lg text-primary">
                            <Clock size={14} />
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-outline uppercase">Thời gian</p>
                            <p className="text-on-surface">08:00 AM</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                          <div className="p-2 bg-surface-container-low rounded-lg text-primary">
                            <MapPin size={14} />
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-outline uppercase">Thời lượng</p>
                            <p className="text-on-surface">{tour.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                          <div className="p-2 bg-surface-container-low rounded-lg text-primary">
                            <Users size={14} />
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-outline uppercase">Khách hàng</p>
                            <p className="text-on-surface">{tour.guests} Pax ({tour.guestType})</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                          <div className="p-2 bg-surface-container-low rounded-lg text-primary">
                            <CalendarIcon size={14} />
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-outline uppercase">Ngôn ngữ</p>
                            <p className="text-on-surface">{tour.language}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 flex gap-3">
                        <button className="flex-1 py-3 bg-surface-container-low text-on-surface text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-surface-container-high transition-colors">
                          Chi tiết & Lịch trình
                        </button>
                        {tour.status === 'Live' ? (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCheckIn(tour.id);
                            }}
                            className="flex-1 py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary-container transition-colors shadow-lg shadow-primary/10"
                          >
                            Check-in
                          </button>
                        ) : isCompleted ? (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDetail(tour);
                            }}
                            className={cn(
                              "flex-1 py-3 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-colors shadow-lg",
                              needsFeedback ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/10" : "bg-green-500 hover:bg-green-600 shadow-green-500/10"
                            )}
                          >
                            {needsFeedback ? 'Gửi phản hồi' : 'Xem phản hồi'}
                          </button>
                        ) : (
                          <button className="flex-1 py-3 bg-surface-container-high text-outline text-[10px] font-black uppercase tracking-widest rounded-xl cursor-not-allowed">
                            Sắp tới
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-surface-container-low/30 border-2 border-dashed border-outline-variant/20 rounded-2xl p-12 text-center">
              <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-4 text-outline">
                <Info size={24} />
              </div>
              <p className="text-sm font-bold text-on-surface-variant">Không có lịch trình trong ngày này</p>
              <p className="text-[10px] text-outline mt-1 uppercase tracking-widest">Hãy tận hưởng ngày nghỉ của bạn!</p>
            </div>
          )}

          {/* Quick Notes */}
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
            <h4 className="text-xs font-black text-amber-900 uppercase tracking-widest mb-3">Lưu ý quan trọng</h4>
            <ul className="space-y-2">
              <li className="text-[11px] text-amber-800 flex gap-2">
                <span className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 shrink-0"></span>
                Vui lòng cập nhật trạng thái tour mỗi 4 tiếng.
              </li>
              <li className="text-[11px] text-amber-800 flex gap-2">
                <span className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 shrink-0"></span>
                Kiểm tra lại danh sách khách Inbound cho tour ngày 27/10.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <LeaveRequestModal 
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onSave={handleSaveLeaveRequest}
      />

      <TourDetailModal 
        tour={selectedTour}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onSaveFeedback={handleSaveFeedback}
      />
    </div>
  );
}
