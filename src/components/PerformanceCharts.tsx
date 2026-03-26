import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  Cell 
} from 'recharts';
import { HDV } from '../types';

interface PerformanceChartsProps {
  hdvs: HDV[];
}

export default function PerformanceCharts({ hdvs }: PerformanceChartsProps) {
  // Prepare data for Rating Distribution
  const ratingData = [
    { name: '1-2★', count: hdvs.filter(h => h.rating >= 1 && h.rating < 2).length },
    { name: '2-3★', count: hdvs.filter(h => h.rating >= 2 && h.rating < 3).length },
    { name: '3-4★', count: hdvs.filter(h => h.rating >= 3 && h.rating < 4).length },
    { name: '4-5★', count: hdvs.filter(h => h.rating >= 4 && h.rating <= 5).length },
  ];

  // Prepare data for Top Performers (Operational Score)
  const topPerformers = [...hdvs]
    .sort((a, b) => b.operationalScore - a.operationalScore)
    .slice(0, 5)
    .map(h => ({
      name: h.name.split(' ').pop(), // Just the last name
      score: h.operationalScore,
      fullName: h.name
    }));

  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 ghost-shadow">
        <h3 className="text-[10px] font-black text-outline uppercase tracking-widest mb-6">Phân bổ Rating HDV</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
              />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {ratingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 ghost-shadow">
        <h3 className="text-[10px] font-black text-outline uppercase tracking-widest mb-6">Top 5 Điểm Vận Hành</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={topPerformers}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
              />
              <YAxis 
                domain={[0, 100]}
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#3b82f6" 
                strokeWidth={4} 
                dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 8, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
