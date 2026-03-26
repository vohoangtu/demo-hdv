import React, { useState } from 'react';
import { X, Save, Map, Calendar, Users, Globe, DollarSign, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface TourFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export default function TourFormModal({ isOpen, onClose, onSave, initialData }: TourFormModalProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    startDate: '',
    endDate: '',
    guests: 1,
    guestType: 'Inbound',
    language: 'Tiếng Anh',
    priority: 'Standard',
    budget: '',
    duration: '',
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        startDate: initialData.startDate || '',
        endDate: initialData.endDate || '',
        guests: initialData.guests || 1,
        guestType: initialData.guestType || 'Inbound',
        language: initialData.language || 'Tiếng Anh',
        priority: initialData.priority || 'Standard',
        budget: initialData.budget || '',
        duration: initialData.duration || '',
      });
    } else {
      setFormData({
        name: '',
        startDate: '',
        endDate: '',
        guests: 1,
        guestType: 'Inbound',
        language: 'Tiếng Anh',
        priority: 'Standard',
        budget: '',
        duration: '',
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

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
              <div>
                <h2 className="text-2xl font-black text-on-surface tracking-tight">
                  {initialData ? 'Cập Nhật Tour' : 'Tạo Tour Mới'}
                </h2>
                <p className="text-xs text-outline font-bold uppercase tracking-widest mt-1">
                  {initialData ? 'Chỉnh sửa thông tin hành trình' : 'Khởi tạo hành trình & điều phối'}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-outline"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Tên chương trình Tour</label>
                  <div className="relative">
                    <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ví dụ: Hà Nội - Hạ Long 2 Ngày 1 Đêm"
                      className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Ngày bắt đầu</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                      <input
                        required
                        type="date"
                        value={formData.startDate}
                        onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Ngày kết thúc</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                      <input
                        required
                        type="date"
                        value={formData.endDate}
                        onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                        className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Số lượng khách</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                      <input
                        required
                        type="number"
                        min="1"
                        value={formData.guests}
                        onChange={e => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                        className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Loại khách</label>
                    <select 
                      value={formData.guestType}
                      onChange={e => setFormData({ ...formData, guestType: e.target.value })}
                      className="w-full bg-surface-container-low border-none rounded-xl py-2.5 px-4 text-sm font-bold focus:ring-2 focus:ring-primary/10"
                    >
                      <option>Inbound</option>
                      <option>Domestic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Ngôn ngữ</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                      <select 
                        value={formData.language}
                        onChange={e => setFormData({ ...formData, language: e.target.value })}
                        className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/10"
                      >
                        <option>Tiếng Anh</option>
                        <option>Tiếng Trung</option>
                        <option>Tiếng Nhật</option>
                        <option>Tiếng Hàn</option>
                        <option>Tiếng Việt</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Mức độ ưu tiên</label>
                    <div className="relative">
                      <Flag className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                      <select 
                        value={formData.priority}
                        onChange={e => setFormData({ ...formData, priority: e.target.value })}
                        className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/10"
                      >
                        <option>Standard</option>
                        <option>High</option>
                        <option>Urgent</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Ngân sách dự kiến (VNĐ)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                      <input
                        type="text"
                        value={formData.budget}
                        onChange={e => setFormData({ ...formData, budget: e.target.value })}
                        placeholder="10,000,000"
                        className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Thời lượng & Lịch trình tóm tắt</label>
                  <textarea
                    rows={3}
                    value={formData.duration}
                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="Ví dụ: 3 Ngày 2 Đêm. Lịch trình: HN - Hạ Long - HN..."
                    className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/10 resize-none"
                  />
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-outline-variant/10 flex justify-end gap-3 bg-surface-container-low">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-bold text-outline hover:text-on-surface transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-2.5 bg-primary text-white rounded-xl text-sm font-black shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95"
              >
                <Save size={18} />
                {initialData ? 'Lưu Thay Đổi' : 'Tạo Tour'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
