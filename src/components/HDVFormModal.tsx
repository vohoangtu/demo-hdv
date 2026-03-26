import React, { useState } from 'react';
import { X, Save, User, Mail, Phone, MapPin, Globe, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface HDVFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export default function HDVFormModal({ isOpen, onClose, onSave, initialData }: HDVFormModalProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    type: initialData?.type || 'Fulltime',
    branch: initialData?.branch || 'Hà Nội HQ',
    languages: initialData?.languages || [] as string[],
    idNumber: initialData?.idNumber || '',
    routes: initialData?.routes?.join(', ') || '',
    skills: initialData?.skills?.join(', ') || '',
    certifications: initialData?.certifications?.join(', ') || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when initialData changes
  React.useEffect(() => {
    setErrors({});
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        type: initialData.type || 'Fulltime',
        branch: initialData.branch || 'Hà Nội HQ',
        languages: initialData.languages || [],
        idNumber: initialData.idNumber || '',
        routes: initialData.routes?.join(', ') || '',
        skills: initialData.skills?.join(', ') || '',
        certifications: initialData.certifications?.join(', ') || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: 'Fulltime',
        branch: 'Hà Nội HQ',
        languages: [],
        idNumber: '',
        routes: '',
        skills: '',
        certifications: '',
      });
    }
  }, [initialData]);

  const languages = ['EN', 'JP', 'FR', 'CN', 'KR', 'DE', 'ES'];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Họ và tên không được để trống';
    if (!formData.email.trim()) newErrors.email = 'Email không được để trống';
    if (!formData.phone.trim()) newErrors.phone = 'Số điện thoại không được để trống';
    
    if (!formData.skills.trim()) {
      newErrors.skills = 'Kỹ năng không được để trống';
    }
    
    if (!formData.certifications.trim()) {
      newErrors.certifications = 'Chứng chỉ không được để trống';
    }

    if (formData.languages.length === 0) {
      newErrors.languages = 'Vui lòng chọn ít nhất một ngôn ngữ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    onSave({
      ...formData,
      id: initialData?.id,
      routes: formData.routes.split(',').map(s => s.trim()).filter(s => s !== ''),
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
      certifications: formData.certifications.split(',').map(s => s.trim()).filter(s => s !== ''),
    });
    onClose();
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleLanguage = (lang: string) => {
    const newLanguages = formData.languages.includes(lang)
      ? formData.languages.filter(l => l !== lang)
      : [...formData.languages, lang];
    
    handleChange('languages', newLanguages);
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
                <h2 className="text-2xl font-black text-on-surface tracking-tight">Tạo HDV Mới</h2>
                <p className="text-xs text-outline font-bold uppercase tracking-widest mt-1">Thông tin nhân sự hệ thống</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">
                      Họ và tên <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <User className={cn("absolute left-3 top-1/2 -translate-y-1/2 transition-colors", errors.name ? "text-error" : "text-outline")} size={16} />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => handleChange('name', e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className={cn(
                          "w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 transition-all",
                          errors.name ? "ring-2 ring-error/20 bg-error/5" : "focus:ring-primary/10"
                        )}
                      />
                    </div>
                    {errors.name && <p className="text-[10px] text-error font-bold mt-1 ml-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">
                      Email liên hệ <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <Mail className={cn("absolute left-3 top-1/2 -translate-y-1/2 transition-colors", errors.email ? "text-error" : "text-outline")} size={16} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => handleChange('email', e.target.value)}
                        placeholder="example@guideops.vn"
                        className={cn(
                          "w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 transition-all",
                          errors.email ? "ring-2 ring-error/20 bg-error/5" : "focus:ring-primary/10"
                        )}
                      />
                    </div>
                    {errors.email && <p className="text-[10px] text-error font-bold mt-1 ml-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">
                      Số điện thoại <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <Phone className={cn("absolute left-3 top-1/2 -translate-y-1/2 transition-colors", errors.phone ? "text-error" : "text-outline")} size={16} />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => handleChange('phone', e.target.value)}
                        placeholder="09x xxx xxxx"
                        className={cn(
                          "w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 transition-all",
                          errors.phone ? "ring-2 ring-error/20 bg-error/5" : "focus:ring-primary/10"
                        )}
                      />
                    </div>
                    {errors.phone && <p className="text-[10px] text-error font-bold mt-1 ml-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Classification */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Loại hợp đồng</label>
                    <select 
                      value={formData.type}
                      onChange={e => handleChange('type', e.target.value)}
                      className="w-full bg-surface-container-low border-none rounded-xl py-2.5 px-4 text-sm font-bold focus:ring-2 focus:ring-primary/10"
                    >
                      <option>Fulltime</option>
                      <option>Collaborator</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Chi nhánh quản lý</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                      <select 
                        value={formData.branch}
                        onChange={e => handleChange('branch', e.target.value)}
                        className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/10"
                      >
                        <option>Hà Nội HQ</option>
                        <option>Đà Nẵng Br.</option>
                        <option>TP. HCM Br.</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Số CCCD / Passport</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                      <input
                        type="text"
                        value={formData.idNumber}
                        onChange={e => handleChange('idNumber', e.target.value)}
                        placeholder="001xxxxxxxx"
                        className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div>
                <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-3 ml-1 flex items-center gap-2">
                  <Globe size={14} className={errors.languages ? "text-error" : "text-outline"} /> 
                  Ngôn ngữ sử dụng <span className="text-error">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {languages.map(lang => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleLanguage(lang)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-xs font-black transition-all border",
                        formData.languages.includes(lang)
                          ? "bg-primary text-white border-primary shadow-md"
                          : cn(
                              "bg-surface-container-low text-outline border-transparent hover:border-outline-variant/30",
                              errors.languages && "border-error/30"
                            )
                      )}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                {errors.languages && <p className="text-[10px] text-error font-bold mt-2 ml-1">{errors.languages}</p>}
              </div>

              {/* Routes */}
              <div>
                <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">Tuyến điểm sở trường</label>
                <textarea
                  rows={2}
                  value={formData.routes}
                  onChange={e => handleChange('routes', e.target.value)}
                  placeholder="Ví dụ: Vòng cung Tây Bắc, Hà Nội City, Hạ Long Bay..."
                  className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/10 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">
                    Kỹ năng (Phân tách bằng dấu phẩy) <span className="text-error">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.skills}
                    onChange={e => handleChange('skills', e.target.value)}
                    placeholder="Ví dụ: Lái xe, Sơ cứu, Team building..."
                    className={cn(
                      "w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm focus:ring-2 transition-all resize-none",
                      errors.skills ? "ring-2 ring-error/20 bg-error/5" : "focus:ring-primary/10"
                    )}
                  />
                  {errors.skills && <p className="text-[10px] text-error font-bold mt-1 ml-1">{errors.skills}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1.5 ml-1">
                    Chứng chỉ (Phân tách bằng dấu phẩy) <span className="text-error">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.certifications}
                    onChange={e => handleChange('certifications', e.target.value)}
                    placeholder="Ví dụ: Thẻ HDV Quốc tế, Chứng chỉ Sơ cấp cứu..."
                    className={cn(
                      "w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm focus:ring-2 transition-all resize-none",
                      errors.certifications ? "ring-2 ring-error/20 bg-error/5" : "focus:ring-primary/10"
                    )}
                  />
                  {errors.certifications && <p className="text-[10px] text-error font-bold mt-1 ml-1">{errors.certifications}</p>}
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
                type="submit"
                className="flex items-center gap-2 px-8 py-2.5 bg-primary text-white rounded-xl text-sm font-black shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95"
              >
                <Save size={18} />
                Lưu HDV
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
