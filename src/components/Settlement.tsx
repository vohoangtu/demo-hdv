import React, { useState, useMemo } from 'react';
import { Wallet, Search, Filter, CheckCircle2, Clock, AlertCircle, FileText, Download, MoreVertical, X, Receipt, ArrowRight, Check, Ban, Plus, MessageSquare, History, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_SETTLEMENTS } from '../mockData';
import { Settlement as SettlementType, ApprovalStep } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import SettlementFormModal from './SettlementFormModal';

export default function Settlement({ userRole = 'admin' }: { userRole?: 'admin' | 'guide' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [settlements, setSettlements] = useState<SettlementType[]>(MOCK_SETTLEMENTS);
  const [selectedSettlementId, setSelectedSettlementId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const selectedSettlement = useMemo(() => 
    settlements.find(s => s.id === selectedSettlementId) || null
  , [settlements, selectedSettlementId]);

  const handleSaveSettlement = (data: any) => {
    const newSettlement: SettlementType = {
      id: `SET-${Math.floor(Math.random() * 10000)}`,
      tourId: data.tourId || 'T-000',
      hdvName: userRole === 'guide' ? 'Alex Nguyen' : 'Admin',
      date: new Date().toISOString().split('T')[0],
      expenses: data.items.reduce((acc: number, item: any) => acc + Number(item.amount), 0),
      bonus: data.bonus || 0,
      advance: data.advance || 0,
      total: data.total || data.items.reduce((acc: number, item: any) => acc + Number(item.amount), 0),
      status: 'Pending Audit',
      items: data.items,
      notes: data.notes,
      approvalHistory: [
        {
          id: `STEP-${Math.random().toString(36).substr(2, 9)}`,
          action: 'Submit',
          role: userRole === 'guide' ? 'Guide' : 'Admin',
          user: userRole === 'guide' ? 'Alex Nguyen' : 'Admin User',
          date: new Date().toISOString().split('T')[0],
          comment: 'Gửi yêu cầu quyết toán mới'
        }
      ]
    };
    setSettlements(prev => [newSettlement, ...prev]);
    setIsFormOpen(false);
  };

  const handleUpdateSettlement = (id: string, action: 'Approve' | 'Reject' | 'Request Info', comment: string) => {
    setSettlements(prev => prev.map(s => {
      if (s.id !== id) return s;

      let nextStatus = s.status;
      if (action === 'Approve') {
        if (s.status === 'Pending Audit') nextStatus = 'Pending Review';
        else if (s.status === 'Pending Review') nextStatus = 'Settled';
      } else if (action === 'Reject') {
        nextStatus = 'Rejected';
      }

      const newStep: ApprovalStep = {
        id: `STEP-${Math.random().toString(36).substr(2, 9)}`,
        action,
        role: userRole === 'admin' ? 'Admin' : 'Finance',
        user: 'Admin User',
        date: new Date().toISOString().split('T')[0],
        comment
      };

      return {
        ...s,
        status: nextStatus,
        approvalHistory: [...(s.approvalHistory || []), newStep]
      };
    }));
  };

  const filteredSettlements = useMemo(() => {
    let base = settlements;
    
    // If guide, only show their own settlements
    if (userRole === 'guide') {
      base = base.filter(item => item.hdvName === 'Alex Nguyen'); // Mocking current guide
    }

    return base.filter(item => {
      const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.hdvName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tourId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = activeTab === 'Tất cả' || 
                        (activeTab === 'Chờ duyệt' && (item.status === 'Pending Audit' || item.status === 'Pending Review')) ||
                        (activeTab === 'Đã duyệt' && item.status === 'Settled') ||
                        (activeTab === 'Từ chối' && item.status === 'Rejected');

      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab, userRole, settlements]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-primary leading-tight">
            {userRole === 'admin' ? 'Quyết toán & Tài chính' : 'Lịch sử Quyết toán'}
          </h2>
          <p className="text-on-surface-variant text-sm mt-2">
            {userRole === 'admin' 
              ? 'Quản lý dòng tiền, chi phí tour và thù lao cho đội ngũ HDV.' 
              : 'Theo dõi các yêu cầu quyết toán và thu nhập của bạn.'}
          </p>
        </div>
        <div className="flex gap-3">
          {userRole === 'admin' && (
            <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest text-on-surface border border-outline-variant/30 rounded-lg text-sm font-bold hover:bg-surface-container-high transition-colors">
              <Download size={18} />
              Báo cáo tổng hợp
            </button>
          )}
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 aero-gradient text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
          >
            <Plus size={18} />
            {userRole === 'admin' ? 'Tạo Quyết Toán Mới' : 'Gửi Yêu Cầu Mới'}
          </button>
        </div>
      </div>

      {/* Financial Overview - Only for Admin or different view for Guide */}
      {userRole === 'admin' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface-container-lowest p-8 rounded-2xl ghost-shadow border border-outline-variant/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Wallet size={80} className="text-primary" />
            </div>
            <p className="text-[10px] font-black text-outline uppercase tracking-widest">Tổng chi phí tháng này</p>
            <h3 className="text-3xl font-black text-on-surface mt-2">2.450.000.000 <span className="text-sm font-bold text-outline">VNĐ</span></h3>
            <div className="flex items-center gap-2 mt-4 text-secondary font-bold text-xs">
              <span className="bg-secondary-container px-2 py-0.5 rounded text-[10px]">+14.2%</span>
              <span className="text-outline font-medium">so với tháng trước</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-2xl ghost-shadow border border-outline-variant/10">
            <p className="text-[10px] font-black text-outline uppercase tracking-widest">Đang chờ phê duyệt</p>
            <h3 className="text-3xl font-black text-on-surface mt-2">
              {settlements.filter(s => s.status === 'Pending Audit' || s.status === 'Pending Review').length} <span className="text-sm font-bold text-outline">Yêu cầu</span>
            </h3>
            <p className="text-xs font-bold text-primary mt-4">
              Tổng giá trị: {settlements.filter(s => s.status === 'Pending Audit' || s.status === 'Pending Review').reduce((acc, s) => acc + s.total, 0).toLocaleString()} VNĐ
            </p>
          </div>

          <div className="bg-surface-container-lowest p-8 rounded-2xl ghost-shadow border border-outline-variant/10">
            <p className="text-[10px] font-black text-outline uppercase tracking-widest">Đã hoàn tất quyết toán</p>
            <h3 className="text-3xl font-black text-on-surface mt-2">
              {settlements.filter(s => s.status === 'Settled').length} <span className="text-sm font-bold text-outline">Tours</span>
            </h3>
            <div className="w-full bg-surface-variant h-1.5 rounded-full mt-6 overflow-hidden">
              <div className="h-full bg-secondary w-[75%]"></div>
            </div>
            <p className="text-[10px] font-bold text-outline mt-2 text-right">75% Mục tiêu tháng</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface-container-lowest p-8 rounded-2xl ghost-shadow border border-outline-variant/10">
            <p className="text-[10px] font-black text-outline uppercase tracking-widest">Tổng thu nhập tháng này</p>
            <h3 className="text-3xl font-black text-on-surface mt-2">32.450.000 <span className="text-sm font-bold text-outline">VNĐ</span></h3>
            <p className="text-xs text-secondary font-bold mt-4">+5.200.000 VNĐ (Thưởng hiệu suất)</p>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-2xl ghost-shadow border border-outline-variant/10">
            <p className="text-[10px] font-black text-outline uppercase tracking-widest">Trạng thái hồ sơ</p>
            <div className="flex items-center gap-6 mt-4">
              <div>
                <h4 className="text-2xl font-black text-amber-600">
                  {settlements.filter(s => s.hdvName === 'Alex Nguyen' && (s.status === 'Pending Audit' || s.status === 'Pending Review')).length}
                </h4>
                <p className="text-[10px] font-bold text-outline uppercase">Chờ duyệt</p>
              </div>
              <div className="w-px h-10 bg-outline-variant/20"></div>
              <div>
                <h4 className="text-2xl font-black text-secondary">
                  {settlements.filter(s => s.hdvName === 'Alex Nguyen' && s.status === 'Settled').length}
                </h4>
                <p className="text-[10px] font-bold text-outline uppercase">Đã thanh toán</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settlement Table */}
      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden ghost-shadow border border-outline-variant/10">
        <div className="p-6 border-b border-outline-variant/10 flex flex-wrap items-center justify-between gap-4 bg-surface-container-low/30">
          <div className="flex items-center gap-4 flex-1 min-w-[300px]">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
              <input
                type="text"
                placeholder="Tìm mã tour, tên HDV..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <button className="p-2 bg-surface-container-lowest border border-outline-variant/20 rounded-lg text-on-surface-variant hover:text-primary transition-colors">
              <Filter size={20} />
            </button>
          </div>
          <div className="flex gap-2">
            {['Tất cả', 'Chờ duyệt', 'Đã duyệt', 'Từ chối'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                  activeTab === tab ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline">Mã Quyết Toán</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline">Hướng Dẫn Viên</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline">Ngày Gửi</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline">Tổng Chi Phí</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline">Thưởng/Phạt</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline">Trạng Thái</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {filteredSettlements.map((item) => (
              <tr 
                key={item.id} 
                className="group hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                onClick={() => setSelectedSettlementId(item.id)}
              >
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-on-surface">{item.id}</span>
                    <span className="text-[10px] text-outline font-mono">{item.tourId}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-bold text-on-surface">{item.hdvName}</p>
                </td>
                <td className="px-6 py-5 text-sm text-on-surface-variant font-medium">{item.date}</td>
                <td className="px-6 py-5 text-sm font-bold text-on-surface">{item.expenses.toLocaleString()} VNĐ</td>
                <td className="px-6 py-5">
                  <span className={cn(
                    "text-xs font-bold",
                    item.bonus > 0 ? "text-secondary" : item.bonus < 0 ? "text-error" : "text-outline"
                  )}>
                    {item.bonus > 0 ? '+' : ''}{item.bonus.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    {item.status === 'Pending Audit' ? (
                      <div className="flex items-center gap-1.5 text-amber-600">
                        <Clock size={14} />
                        <span className="text-[10px] font-black uppercase tracking-wider">Chờ Kiểm Toán</span>
                      </div>
                    ) : item.status === 'Pending Review' ? (
                      <div className="flex items-center gap-1.5 text-primary">
                        <AlertCircle size={14} />
                        <span className="text-[10px] font-black uppercase tracking-wider">Chờ Phê Duyệt</span>
                      </div>
                    ) : item.status === 'Settled' ? (
                      <div className="flex items-center gap-1.5 text-secondary">
                        <CheckCircle2 size={14} />
                        <span className="text-[10px] font-black uppercase tracking-wider">Đã Quyết Toán</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-error">
                        <Ban size={14} />
                        <span className="text-[10px] font-black uppercase tracking-wider">Bị Từ Chối</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors" 
                      title="Xem chứng từ"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSettlementId(item.id);
                      }}
                    >
                      <FileText size={18} />
                    </button>
                    <button 
                      className="p-2 text-outline hover:text-on-surface rounded-lg transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredSettlements.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-4 text-outline">
              <Search size={32} />
            </div>
            <p className="text-sm font-bold text-on-surface-variant">Không tìm thấy kết quả phù hợp</p>
          </div>
        )}
      </div>

      <SettlementDetailModal 
        settlement={selectedSettlement} 
        onClose={() => setSelectedSettlementId(null)} 
        userRole={userRole}
        onAction={handleUpdateSettlement}
      />

      <SettlementFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSave={handleSaveSettlement} 
      />
    </div>
  );
}

function SettlementDetailModal({ 
  settlement, 
  onClose, 
  userRole,
  onAction
}: { 
  settlement: SettlementType | null, 
  onClose: () => void, 
  userRole: 'admin' | 'guide',
  onAction: (id: string, action: 'Approve' | 'Reject' | 'Request Info', comment: string) => void
}) {
  const [comment, setComment] = useState('');
  const [viewingReceipt, setViewingReceipt] = useState<string | null>(null);
  
  if (!settlement) return null;

  const handleAction = (action: 'Approve' | 'Reject' | 'Request Info') => {
    onAction(settlement.id, action, comment);
    setComment('');
    onClose();
  };

  return (
    <React.Fragment>
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
            <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/30">
              <div>
                <h3 className="text-xl font-black text-on-surface">Chi tiết quyết toán</h3>
                <p className="text-[10px] font-mono text-outline uppercase mt-1">{settlement.id} • {settlement.tourId}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column: Info & Items */}
                <div className="lg:col-span-7 space-y-8">
                  {/* HDV Info */}
                  <div className="flex items-center justify-between p-6 bg-surface-container-low rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                        <Wallet size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-outline uppercase">Hướng dẫn viên</p>
                        <p className="text-lg font-bold text-on-surface">{settlement.hdvName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-outline uppercase">Ngày gửi</p>
                      <p className="text-sm font-bold text-on-surface">{settlement.date}</p>
                    </div>
                  </div>

                  {/* Expense Items */}
                  <section>
                    <h4 className="text-[10px] font-black text-outline uppercase tracking-widest mb-4">Danh sách chi phí</h4>
                    <div className="space-y-3">
                      {settlement.items?.map((item, idx) => (
                        <div key={idx} className="p-4 border border-outline-variant/10 rounded-xl flex items-center justify-between group hover:border-primary/30 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-surface-container-low rounded-lg text-primary">
                              <Receipt size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-on-surface">{item.description}</p>
                              <p className="text-[10px] text-outline font-medium uppercase">{item.category}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="text-sm font-black text-on-surface">{item.amount.toLocaleString()} VNĐ</p>
                            {item.receiptUrl && (
                              <button 
                                onClick={() => setViewingReceipt(item.receiptUrl || null)}
                                className="p-1.5 text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                title="Xem ảnh chứng từ"
                              >
                                <FileText size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Summary */}
                  <section className="p-6 bg-surface-container-low rounded-2xl space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-on-surface-variant font-medium">Tổng chi phí thực tế</span>
                      <span className="font-bold text-on-surface">{settlement.expenses.toLocaleString()} VNĐ</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-on-surface-variant font-medium">Thưởng / Phụ phí</span>
                      <span className={cn("font-bold", (settlement.bonus || 0) >= 0 ? "text-secondary" : "text-error")}>
                        {(settlement.bonus || 0) >= 0 ? '+' : ''}{(settlement.bonus || 0).toLocaleString()} VNĐ
                      </span>
                    </div>
                    {settlement.advance > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-on-surface-variant font-medium">Đã tạm ứng</span>
                        <span className="font-bold text-error">
                          -{(settlement.advance || 0).toLocaleString()} VNĐ
                        </span>
                      </div>
                    )}
                    <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                      <span className="text-sm font-black text-on-surface uppercase tracking-widest">Tổng thanh toán</span>
                      <span className="text-xl font-black text-primary">{settlement.total.toLocaleString()} VNĐ</span>
                    </div>
                  </section>

                  {settlement.notes && (
                    <section>
                      <h4 className="text-[10px] font-black text-outline uppercase tracking-widest mb-2">Ghi chú</h4>
                      <div className="p-4 bg-surface-container-low/50 rounded-xl border border-outline-variant/10 italic text-sm text-on-surface-variant">
                        "{settlement.notes}"
                      </div>
                    </section>
                  )}
                </div>

                {/* Right Column: Approval History & Actions */}
                <div className="lg:col-span-5 space-y-8">
                  {/* Approval History */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <History size={16} className="text-primary" />
                      <h4 className="text-[10px] font-black text-outline uppercase tracking-widest">Lịch sử phê duyệt</h4>
                    </div>
                    <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-outline-variant/20">
                      {settlement.approvalHistory?.map((step, idx) => (
                        <div key={step.id} className="relative pl-10">
                          <div className={cn(
                            "absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center border-4 border-surface-container-lowest",
                            step.action === 'Submit' ? "bg-primary text-white" :
                            step.action === 'Approve' ? "bg-secondary text-white" :
                            step.action === 'Reject' ? "bg-error text-white" : "bg-outline text-white"
                          )}>
                            {step.action === 'Submit' ? <Plus size={14} /> :
                             step.action === 'Approve' ? <Check size={14} /> :
                             step.action === 'Reject' ? <Ban size={14} /> : <MessageSquare size={14} />}
                          </div>
                          <div>
                            <div className="flex justify-between items-start">
                              <p className="text-xs font-black text-on-surface">{step.action === 'Submit' ? 'Đã gửi yêu cầu' : step.action === 'Approve' ? 'Đã phê duyệt' : 'Từ chối'}</p>
                              <span className="text-[9px] font-bold text-outline">{step.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <User size={10} className="text-outline" />
                              <span className="text-[10px] font-bold text-on-surface-variant">{step.user}</span>
                              <span className="text-[10px] text-outline">•</span>
                              <span className="text-[10px] font-black text-primary uppercase">{step.role}</span>
                            </div>
                            {step.comment && (
                              <div className="mt-2 p-3 bg-surface-container-low rounded-lg text-[11px] text-on-surface-variant border border-outline-variant/10">
                                {step.comment}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Admin Actions */}
                  {userRole === 'admin' && settlement.status !== 'Settled' && settlement.status !== 'Rejected' && (
                    <section className="p-6 bg-surface-container-low rounded-2xl space-y-4">
                      <h4 className="text-[10px] font-black text-outline uppercase tracking-widest">Thao tác phê duyệt</h4>
                      <div>
                        <label className="block text-[10px] font-black text-outline uppercase tracking-widest mb-2 ml-1">Nhận xét / Lý do</label>
                        <textarea
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Nhập nội dung phản hồi cho HDV..."
                          className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/10 resize-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => handleAction('Reject')}
                          className="py-3 bg-error/10 text-error text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-error/20 transition-colors flex items-center justify-center gap-2"
                        >
                          <Ban size={16} />
                          Từ chối
                        </button>
                        <button 
                          onClick={() => handleAction('Approve')}
                          className="py-3 aero-gradient text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                          <Check size={16} />
                          Phê duyệt
                        </button>
                      </div>
                      <button 
                        onClick={() => handleAction('Request Info')}
                        className="w-full py-2.5 bg-surface-container-lowest text-outline text-[10px] font-black uppercase tracking-widest rounded-xl border border-outline-variant/30 hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-2"
                      >
                        <MessageSquare size={16} />
                        Yêu cầu bổ sung thông tin
                      </button>
                    </section>
                  )}

                  {/* Status Badge for non-admins or completed settlements */}
                  {(userRole !== 'admin' || settlement.status === 'Settled' || settlement.status === 'Rejected') && (
                    <div className={cn(
                      "p-6 rounded-2xl flex flex-col items-center text-center",
                      settlement.status === 'Settled' ? "bg-secondary/10 text-secondary" :
                      settlement.status === 'Rejected' ? "bg-error/10 text-error" : "bg-primary/10 text-primary"
                    )}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-white shadow-sm">
                        {settlement.status === 'Settled' ? <CheckCircle2 size={24} /> :
                         settlement.status === 'Rejected' ? <Ban size={24} /> : <Clock size={24} />}
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Trạng thái hiện tại</p>
                      <h4 className="text-xl font-black uppercase mt-1">
                        {settlement.status === 'Settled' ? 'Đã quyết toán' :
                         settlement.status === 'Rejected' ? 'Bị từ chối' :
                         settlement.status === 'Pending Audit' ? 'Đang kiểm toán' : 'Đang chờ phê duyệt'}
                      </h4>
                      <button className="mt-6 w-full py-3 bg-white text-on-surface text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
                        <Download size={16} />
                        Tải xuống chứng từ
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
      <AnimatePresence>
        {viewingReceipt && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingReceipt(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-full max-h-full"
            >
              <button 
                onClick={() => setViewingReceipt(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={32} />
              </button>
              <img 
                src={viewingReceipt} 
                alt="Chứng từ" 
                className="max-w-full max-h-[80vh] rounded-lg shadow-2xl object-contain border-4 border-white/10"
                referrerPolicy="no-referrer"
              />
              <div className="mt-4 flex justify-center">
                <a 
                  href={viewingReceipt} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full text-sm font-black uppercase tracking-widest hover:bg-white/90 transition-all"
                >
                  <Download size={18} />
                  Tải xuống bản gốc
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
