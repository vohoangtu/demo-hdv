import React, { useState } from 'react';
import { Calendar, MapPin, Star, Award, TrendingUp, Clock, CheckCircle, ChevronRight, Phone, Mail, CreditCard, FilePlus } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_HDVS, MOCK_TOURS } from '../mockData';
import SettlementFormModal from './SettlementFormModal';
import ProfileEditModal from './ProfileEditModal';

export default function GuideDashboard({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const guide = MOCK_HDVS.find(h => h.id === 'HDV-ALEX')!;
  const [isSettlementFormOpen, setIsSettlementFormOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);

  const handleSaveSettlement = (data: any) => {
    console.log('Guide submitting settlement:', data);
    // In a real app, this would call an API
  };

  const handleSaveProfile = (data: any) => {
    console.log('Guide updating profile:', data);
    // In a real app, this would call an API
  };
  
  return (
    <div className="space-y-10">
      {/* Profile Header */}
      <section className="bg-surface-container-lowest p-8 rounded-3xl ghost-shadow border border-outline-variant/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 aero-gradient opacity-5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
          <div className="relative">
            <img src={guide.avatar} alt={guide.name} className="w-32 h-32 rounded-3xl object-cover shadow-2xl border-4 border-white" />
            <div className="absolute -bottom-3 -right-3 bg-secondary text-white p-2 rounded-xl shadow-lg">
              <Award size={20} />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <h2 className="text-3xl font-black text-primary tracking-tight">{guide.name}</h2>
                <p className="text-sm font-bold text-on-surface-variant mt-1 uppercase tracking-widest">{guide.type} • {guide.branch}</p>
                <div className="flex items-center gap-4 mt-4">
                  <span className="flex items-center gap-1.5 text-sm font-bold text-amber-500">
                    <Star size={18} fill="currentColor" />
                    {guide.rating}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="text-sm font-bold text-on-surface">{guide.completedTours} Tours hoàn thành</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsSettlementFormOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-xl text-sm font-bold shadow-lg shadow-secondary/20 active:scale-95 transition-all"
                >
                  <FilePlus size={20} />
                  Gửi Quyết Toán
                </button>
                <button 
                  onClick={() => setIsProfileEditOpen(true)}
                  className="px-6 py-3 aero-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
                >
                  Chỉnh sửa hồ sơ
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-outline-variant/10">
              <div>
                <p className="text-[10px] font-black text-outline uppercase tracking-widest">Mã HDV</p>
                <p className="text-sm font-bold text-on-surface mt-1">{guide.id}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-outline uppercase tracking-widest">Số CCCD</p>
                <p className="text-sm font-bold text-on-surface mt-1">{guide.idNumber}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-outline uppercase tracking-widest">Ngôn ngữ</p>
                <div className="flex gap-1 mt-1">
                  {guide.languages.map(l => (
                    <span key={l} className="text-[9px] font-black bg-primary/5 text-primary px-1.5 py-0.5 rounded uppercase">{l}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-outline uppercase tracking-widest">Operational Score</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-black text-primary">{guide.operationalScore}%</span>
                  <div className="flex-1 h-1.5 bg-surface-variant rounded-full overflow-hidden max-w-[80px]">
                    <div className="h-full aero-gradient" style={{ width: `${guide.operationalScore}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Schedule & Stats */}
        <div className="lg:col-span-8 space-y-10">
          {/* Current Tour */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-black text-on-surface uppercase tracking-widest flex items-center gap-2">
                <Clock size={18} className="text-primary" />
                Tour đang diễn ra
              </h3>
              <span className="text-[10px] font-black text-secondary bg-secondary-container px-2 py-0.5 rounded-full">LIVE NOW</span>
            </div>
            
            <div className="bg-surface-container-lowest p-6 rounded-2xl ghost-shadow border border-outline-variant/10 flex flex-col md:flex-row gap-6">
              <img src={MOCK_TOURS[2].image} alt="Tour" className="w-full md:w-40 h-40 rounded-xl object-cover" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-xl font-bold text-on-surface">{MOCK_TOURS[2].name}</h4>
                    <span className="text-[10px] font-mono text-outline">{MOCK_TOURS[2].id}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3">
                    <span className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                      <Calendar size={14} className="text-primary" />
                      {MOCK_TOURS[2].startDate} - {MOCK_TOURS[2].endDate}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                      <MapPin size={14} className="text-primary" />
                      {MOCK_TOURS[2].duration}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-high flex items-center justify-center text-[10px] font-bold">
                        {i === 4 ? '+8' : ''}
                      </div>
                    ))}
                    <span className="ml-4 text-xs font-bold text-on-surface-variant flex items-center">12 Khách Inbound</span>
                  </div>
                  <button 
                    onClick={() => setActiveTab?.('my-schedule')}
                    className="bg-primary text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-primary-container transition-colors shadow-lg shadow-primary/10"
                  >
                    Xem lịch trình chi tiết
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Performance Stats */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-lowest p-8 rounded-2xl ghost-shadow border border-outline-variant/10">
              <div className="flex justify-between items-start mb-6">
                <h4 className="text-sm font-bold text-on-surface">Thu nhập tháng này</h4>
                <TrendingUp size={20} className="text-secondary" />
              </div>
              <h3 className="text-3xl font-black text-on-surface">32.450.000 <span className="text-sm font-bold text-outline">VNĐ</span></h3>
              <p className="text-xs text-on-surface-variant mt-2">Dự kiến: +12.000.000 VNĐ từ 2 tour sắp tới</p>
              <button className="w-full mt-6 py-3 bg-surface-container-low text-primary text-xs font-bold rounded-xl hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
                <CreditCard size={16} />
                Chi tiết thu nhập
              </button>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-2xl ghost-shadow border border-outline-variant/10">
              <div className="flex justify-between items-start mb-6">
                <h4 className="text-sm font-bold text-on-surface">Chỉ số hài lòng (CSAT)</h4>
                <Star size={20} className="text-amber-500 fill-amber-500" />
              </div>
              <div className="flex items-end gap-3">
                <h3 className="text-4xl font-black text-on-surface">4.92</h3>
                <span className="text-xs font-bold text-secondary mb-1.5">+0.05 so với tháng trước</span>
              </div>
              <div className="flex gap-1 mt-6">
                {[1,2,3,4,5,6,7,8,9,10].map(i => (
                  <div key={i} className={cn("flex-1 h-2 rounded-full", i <= 9 ? "aero-gradient" : "bg-surface-variant")}></div>
                ))}
              </div>
              <p className="text-[10px] font-bold text-outline mt-3 uppercase tracking-widest text-center">92% Khách hàng đánh giá 5 sao</p>
            </div>
          </section>
        </div>

        {/* Right: Upcoming & Recent */}
        <div className="lg:col-span-4 space-y-10">
          <section className="bg-surface-container-lowest p-8 rounded-2xl ghost-shadow border border-outline-variant/10">
            <h3 className="text-sm font-black text-on-surface uppercase tracking-widest mb-8">Lịch trình sắp tới</h3>
            <div className="space-y-8">
              {MOCK_TOURS.slice(0, 2).map((tour, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-surface-container-low rounded-xl flex flex-col items-center justify-center group-hover:bg-primary/5 transition-colors">
                      <span className="text-[10px] font-black text-outline leading-none uppercase">{tour.startDate.split('/')[1]}</span>
                      <span className="text-sm font-black text-primary leading-none mt-1">{tour.startDate.split('/')[0]}</span>
                    </div>
                    {i === 0 && <div className="w-px flex-1 bg-outline-variant/30 my-2"></div>}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{tour.name}</h4>
                    <p className="text-[10px] text-on-surface-variant mt-1 uppercase font-medium">{tour.duration} • {tour.guests} Khách</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setActiveTab?.('my-schedule')}
              className="w-full mt-10 pt-4 border-t border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary-container transition-colors flex items-center justify-center gap-2"
            >
              Xem toàn bộ lịch trình
              <ChevronRight size={14} />
            </button>
          </section>

          <section className="bg-surface-container-lowest p-8 rounded-2xl ghost-shadow border border-outline-variant/10">
            <h3 className="text-sm font-black text-on-surface uppercase tracking-widest mb-8">Thông báo mới</h3>
            <div className="space-y-6">
              {[
                { icon: CheckCircle, color: 'text-secondary', title: 'Quyết toán thành công', desc: 'Tour #29381 đã được phê duyệt thanh toán.', time: '2 giờ trước' },
                { icon: Award, color: 'text-amber-500', title: 'Huy hiệu mới!', desc: 'Bạn vừa nhận được huy hiệu "Expert Guide" tháng 10.', time: 'Hôm qua' },
              ].map((notif, i) => (
                <div key={i} className="flex gap-4">
                  <div className={cn("p-2 rounded-lg bg-surface-container-low shrink-0", notif.color)}>
                    <notif.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">{notif.title}</p>
                    <p className="text-[10px] text-on-surface-variant mt-0.5 leading-relaxed">{notif.desc}</p>
                    <p className="text-[9px] text-outline mt-1 font-medium">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      
      <SettlementFormModal 
        isOpen={isSettlementFormOpen}
        onClose={() => setIsSettlementFormOpen(false)}
        onSave={handleSaveSettlement}
      />

      <ProfileEditModal
        isOpen={isProfileEditOpen}
        onClose={() => setIsProfileEditOpen(false)}
        guide={guide}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
