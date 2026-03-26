import React, { useState, useEffect } from 'react';
import { X, Save, FileText, DollarSign, Plus, Trash2, Info, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface SettlementFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function SettlementFormModal({ isOpen, onClose, onSave }: SettlementFormModalProps) {
  const [formData, setFormData] = useState({
    tourId: '',
    hdvName: '',
    date: new Date().toISOString().split('T')[0],
    items: [{ category: 'Di chuyển', amount: 0, description: '', receiptUrl: '' }],
    bonus: 0,
    advance: 0,
    notes: '',
  });

  const categories = ['Di chuyển', 'Ăn uống', 'Khách sạn', 'Vé tham quan', 'Khác'];

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { category: 'Khác', amount: 0, description: '', receiptUrl: '' }]
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const handleMockUpload = (index: number) => {
    // Mocking an upload by setting a random picsum image
    const randomId = Math.floor(Math.random() * 1000);
    updateItem(index, 'receiptUrl', `https://picsum.photos/seed/${randomId}/800/1200`);
  };

  const calculateTotal = () => {
    const expenses = formData.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    return expenses + (Number(formData.bonus) || 0) - (Number(formData.advance) || 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ 
      ...formData, 
      expenses: formData.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0),
      total: calculateTotal() 
    });
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
            className="relative w-full max-w-3xl bg-surface-container-lowest rounded-3xl shadow-2xl overflow-hidden border border-outline-variant/20"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low">
              <div>
                <h2 className="text-2xl font-black text-on-surface tracking-tight">Tạo Quyết Toán Thủ Công</h2>
                <p className="text-xs text-outline font-bold uppercase tracking-widest mt-1">Ghi nhận chi phí & thù lao HDV</p>
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
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Mã Tour (Tour ID)</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                    <input
                      required
                      type="text"
                      value={formData.tourId}
                      onChange={e => setFormData({ ...formData, tourId: e.target.value })}
                      placeholder="VN-SGN-2026-xxxx"
                      className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Tên Hướng dẫn viên</label>
                  <input
                    required
                    type="text"
                    value={formData.hdvName}
                    onChange={e => setFormData({ ...formData, hdvName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-surface-container-low border-none rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Expense Items */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-outline uppercase tracking-widest ml-1">Danh mục chi phí</label>
                  <button 
                    type="button"
                    onClick={addItem}
                    className="flex items-center gap-1.5 text-[10px] font-black text-primary hover:underline uppercase tracking-widest"
                  >
                    <Plus size={14} /> Thêm khoản chi
                  </button>
                </div>
                
                <div className="space-y-3">
                  {formData.items.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start bg-surface-container-low p-4 rounded-xl border border-outline-variant/10">
                      <div className="w-32 shrink-0">
                        <select 
                          value={item.category}
                          onChange={e => updateItem(index, 'category', e.target.value)}
                          className="w-full bg-surface-container-lowest border-none rounded-lg py-2 px-3 text-xs font-bold focus:ring-2 focus:ring-primary/10"
                        >
                          {categories.map(cat => <option key={cat}>{cat}</option>)}
                        </select>
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={item.description}
                          onChange={e => updateItem(index, 'description', e.target.value)}
                          placeholder="Mô tả chi tiết (ví dụ: Thuê xe đón khách)"
                          className="w-full bg-surface-container-lowest border-none rounded-lg py-2 px-3 text-xs focus:ring-2 focus:ring-primary/10"
                        />
                      </div>
                      <div className="w-32 shrink-0 relative">
                        <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 text-outline" size={14} />
                        <input
                          type="number"
                          value={item.amount}
                          onChange={e => updateItem(index, 'amount', e.target.value)}
                          className="w-full bg-surface-container-lowest border-none rounded-lg py-2 pl-7 pr-3 text-xs font-bold text-right focus:ring-2 focus:ring-primary/10"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <button 
                          type="button"
                          onClick={() => handleMockUpload(index)}
                          className={cn(
                            "p-2 rounded-lg transition-all flex items-center gap-1.5",
                            item.receiptUrl 
                              ? "bg-secondary/10 text-secondary border border-secondary/20" 
                              : "bg-surface-container-lowest text-outline hover:text-primary border border-outline-variant/10"
                          )}
                          title={item.receiptUrl ? "Đã đính kèm ảnh" : "Tải lên ảnh chứng từ"}
                        >
                          {item.receiptUrl ? <CheckCircle2 size={16} /> : <ImageIcon size={16} />}
                          {item.receiptUrl && <span className="text-[9px] font-black uppercase">OK</span>}
                        </button>
                        <button 
                          type="button"
                          onClick={() => removeItem(index)}
                          className="p-2 text-outline hover:text-error transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Thưởng / Phạt (VNĐ)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                    <input
                      type="number"
                      value={formData.bonus}
                      onChange={e => setFormData({ ...formData, bonus: parseInt(e.target.value) || 0 })}
                      className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                  <p className="text-[9px] text-outline mt-1.5 flex items-center gap-1"><Info size={10} /> Nhập số âm để trừ phạt</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Tạm ứng / Advance (VNĐ)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                    <input
                      type="number"
                      value={formData.advance}
                      onChange={e => setFormData({ ...formData, advance: parseInt(e.target.value) || 0 })}
                      className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                  <p className="text-[9px] text-outline mt-1.5 flex items-center gap-1"><Info size={10} /> Số tiền đã tạm ứng trước tour</p>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-2xl flex flex-col justify-center items-end border border-primary/10">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Tổng thanh toán dự kiến</p>
                <p className="text-3xl font-black text-primary mt-1">{calculateTotal().toLocaleString()} VNĐ</p>
              </div>

              <div>
                <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Ghi chú nội bộ</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Nhập ghi chú về quyết toán này..."
                  className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/10 resize-none"
                />
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
                Lưu Quyết Toán
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
