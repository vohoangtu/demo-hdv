import React from 'react';
import { Users, Plane, Clock, CheckCircle, TrendingUp, AlertCircle, ChevronRight, Star, Plus, UserPlus, FilePlus, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '../lib/utils';
import { MOCK_HDVS } from '../mockData';

const data = [
  { name: 'JAN', completion: 65, cost: 40 },
  { name: 'FEB', completion: 75, cost: 35 },
  { name: 'MAR', completion: 80, cost: 50 },
  { name: 'APR', completion: 85, cost: 45 },
  { name: 'MAY', completion: 75, cost: 55 },
  { name: 'JUN', completion: 90, cost: 48 },
];

export default function AdminDashboard({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  return (
    <div className="space-y-12">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-primary leading-tight">Tổng quan Hệ thống</h2>
          <p className="text-on-surface-variant text-sm mt-2">Theo dõi hiệu suất vận hành và tài chính thời gian thực.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setActiveTab?.('hdv-management')}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest text-on-surface border border-outline-variant/30 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-surface-container-high transition-all active:scale-95"
          >
            <UserPlus size={16} className="text-primary" />
            Thêm HDV
          </button>
          <button 
            onClick={() => setActiveTab?.('tour-assignment')}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest text-on-surface border border-outline-variant/30 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-surface-container-high transition-all active:scale-95"
          >
            <Plus size={16} className="text-secondary" />
            Tạo Tour
          </button>
          <button 
            onClick={() => setActiveTab?.('settlement')}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest text-on-surface border border-outline-variant/30 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-surface-container-high transition-all active:scale-95"
          >
            <FilePlus size={16} className="text-tertiary" />
            Quyết Toán
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 aero-gradient text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            <Download size={16} />
            Xuất Báo Cáo
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-surface-container-lowest p-6 rounded-xl ghost-shadow border border-outline-variant/10 flex flex-col justify-between min-h-[160px]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold tracking-widest text-outline uppercase">Tổng HDV Hệ Thống</span>
            <div className="p-2 bg-primary/5 text-primary rounded-lg">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-4xl font-black tracking-tight text-on-surface">1,284</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-bold text-on-secondary-container bg-secondary-container px-2 py-0.5 rounded-sm">842 CƠ HỮU</span>
              <span className="text-[10px] font-bold text-outline">442 CTV</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl ghost-shadow border border-outline-variant/10 flex flex-col justify-between min-h-[160px]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold tracking-widest text-outline uppercase">Tour Đang Chạy</span>
            <div className="p-2 bg-tertiary-fixed/20 text-on-tertiary-fixed-variant rounded-lg">
              <Plane size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-4xl font-black tracking-tight text-on-surface">156</h3>
            <div className="flex items-center gap-2 mt-2 text-secondary font-bold text-xs">
              <TrendingUp size={14} />
              <span>+12 so với hôm qua</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl ghost-shadow border border-outline-variant/10 flex flex-col justify-between min-h-[160px]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold tracking-widest text-outline uppercase">Chờ Quyết Toán</span>
            <div className="p-2 bg-primary-fixed text-on-primary-fixed-variant rounded-lg">
              <Clock size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-4xl font-black tracking-tight text-on-surface">42</h3>
            <p className="text-xs font-bold text-primary mt-2">Tổng giá trị: 1.2B VNĐ</p>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl ghost-shadow border border-outline-variant/10 flex flex-col justify-between min-h-[160px]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold tracking-widest text-outline uppercase">Tỷ Lệ Hoàn Thành</span>
            <div className="p-2 bg-secondary-container text-on-secondary-container rounded-lg">
              <CheckCircle size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-4xl font-black tracking-tight text-on-surface">98.4%</h3>
            <div className="w-full bg-surface-variant h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="h-full aero-gradient w-[98.4%]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics & Notifications */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chart */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-8 rounded-xl ghost-shadow border border-outline-variant/10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="text-lg font-bold text-on-surface">Phân Tích Hiệu Suất & Chi Phí</h4>
              <p className="text-sm text-on-surface-variant">So sánh hoàn thành tour và chi phí vận hành theo tháng</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full aero-gradient"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-outline">Hoàn Thành (%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-surface-container-highest"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-outline">Chi Phí (Tỷ)</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#757682' }} 
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
                />
                <Bar dataKey="cost" fill="#e0e3e5" radius={[2, 2, 0, 0]} barSize={32} />
                <Bar dataKey="completion" radius={[2, 2, 0, 0]} barSize={32}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="url(#aeroGradient)" />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="aeroGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00236f" />
                    <stop offset="100%" stopColor="#1e3a8a" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Notifications */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-8 rounded-xl ghost-shadow border border-outline-variant/10">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface flex items-center gap-2">
              <AlertCircle size={16} className="text-primary" />
              Yêu cầu chờ duyệt
            </h4>
            <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-full">08 MỚI</span>
          </div>
          <div className="space-y-6">
            {[
              { title: 'Hồ sơ HDV Mới: Nguyễn Văn A', meta: 'Yêu cầu từ HR • 15 phút trước', color: 'bg-secondary-container text-on-secondary-container' },
              { title: 'Quyết toán Tour #29381', meta: 'Số tiền: 45,000,000 VNĐ • 1 giờ trước', color: 'bg-primary-fixed text-on-primary-fixed-variant' },
              { title: 'Báo cáo vi phạm Tour #29402', meta: 'Khách hàng phản hồi tiêu cực • 3 giờ trước', color: 'bg-error-container text-on-error-container' },
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{item.title}</p>
                <p className="text-[10px] text-on-surface-variant mt-1">{item.meta}</p>
                <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => alert(`Đã duyệt yêu cầu: ${item.title}`)}
                    className="text-[10px] font-bold bg-primary text-white px-3 py-1 rounded hover:bg-primary-container transition-colors"
                  >
                    Duyệt
                  </button>
                  <button 
                    onClick={() => alert(`Chi tiết yêu cầu: ${item.title}`)}
                    className="text-[10px] font-bold bg-surface-container-high text-on-surface-variant px-3 py-1 rounded hover:bg-surface-container-highest transition-colors"
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 pt-4 border-t border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary-container transition-colors">
            Xem tất cả yêu cầu
          </button>
        </div>
      </section>

      {/* Top Performers */}
      <section className="bg-surface-container-lowest p-8 rounded-xl ghost-shadow border border-outline-variant/10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h4 className="text-xl font-bold text-on-surface">Top 5 Hướng Dẫn Viên Xuất Sắc</h4>
            <p className="text-sm text-on-surface-variant">Dựa trên Rating khách hàng và Điểm vận hành (Operational Score)</p>
          </div>
          <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
            Bảng xếp hạng đầy đủ
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-outline-variant/10">
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-outline">HDV</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-outline text-center">Xếp Hạng</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-outline">Trạng Thái</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-outline text-center">Tour Hoàn Thành</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-outline text-right">Operational Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {MOCK_HDVS.slice(0, 3).map((hdv) => (
                <tr key={hdv.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-5">
                    <div className="flex items-center gap-4">
                      <img src={hdv.avatar} alt={hdv.name} className="w-10 h-10 rounded-full object-cover border border-outline-variant/20" />
                      <div>
                        <p className="text-sm font-bold text-on-surface">{hdv.name}</p>
                        <p className="text-[10px] text-on-surface-variant uppercase font-medium">Chuyên tuyến: {hdv.routes[0]}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 text-center">
                    <div className="flex items-center justify-center gap-1 text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm font-bold text-on-surface">{hdv.rating}</span>
                    </div>
                  </td>
                  <td className="py-5">
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm",
                      hdv.status === 'Active' ? "bg-secondary-container text-on-secondary-container" : "bg-primary-fixed text-on-primary-fixed-variant"
                    )}>
                      {hdv.status === 'Active' ? 'SẴN SÀNG' : 'ĐANG ĐI TOUR'}
                    </span>
                  </td>
                  <td className="py-5 text-center font-bold text-sm">{hdv.completedTours}</td>
                  <td className="py-5 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-sm font-black text-primary">{hdv.operationalScore}/100</span>
                      <div className="w-24 bg-surface-variant h-1 rounded-full overflow-hidden">
                        <div className="h-full aero-gradient" style={{ width: `${hdv.operationalScore}%` }}></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
