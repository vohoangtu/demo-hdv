import React, { useState, useEffect } from 'react';
import { Bell, X, Check, Info, AlertTriangle, AlertCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { MOCK_NOTIFICATIONS } from '../mockData';
import { Notification } from '../types';

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newNotif: Notification = {
          id: `NOTIF-${Math.random().toString(36).substr(2, 9)}`,
          title: 'Cập nhật hệ thống',
          message: 'Có một thay đổi mới trong lịch trình tour của bạn.',
          type: 'info',
          timestamp: new Date().toISOString(),
          isRead: false
        };
        setNotifications(prev => [newNotif, ...prev]);
      }
    }, 30000); // Every 30 seconds check for new mock notification

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <Check className="text-green-500" size={16} />;
      case 'warning': return <AlertTriangle className="text-amber-500" size={16} />;
      case 'error': return <AlertCircle className="text-red-500" size={16} />;
      default: return <Info className="text-blue-500" size={16} />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-outline hover:text-primary hover:bg-surface-container-high rounded-full transition-all"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-error text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-surface-container-lowest">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/10 z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low">
                <h3 className="text-sm font-black uppercase tracking-widest text-on-surface">Thông báo</h3>
                <div className="flex items-center gap-3">
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                    >
                      Đánh dấu đã đọc
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button 
                      onClick={clearAll}
                      className="text-[10px] font-black text-error uppercase tracking-widest hover:underline"
                    >
                      Xóa hết
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-outline-variant/5">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={cn(
                          "p-4 flex gap-4 hover:bg-surface-container-low transition-colors cursor-pointer group relative",
                          !notification.isRead && "bg-primary/5"
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className={cn(
                          "mt-1 p-2 rounded-lg shrink-0",
                          notification.type === 'success' ? "bg-green-50" :
                          notification.type === 'warning' ? "bg-amber-50" :
                          notification.type === 'error' ? "bg-red-50" : "bg-blue-50"
                        )}>
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <p className={cn(
                              "text-sm leading-tight",
                              notification.isRead ? "text-on-surface font-medium" : "text-on-surface font-bold"
                            )}>
                              {notification.title}
                            </p>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 text-outline hover:text-error transition-all"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-1.5 mt-2 text-[10px] text-outline font-bold uppercase tracking-wider">
                            <Clock size={10} />
                            {formatTimestamp(notification.timestamp)}
                          </div>
                        </div>
                        {!notification.isRead && (
                          <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-3 text-outline">
                      <Bell size={24} />
                    </div>
                    <p className="text-sm font-bold text-on-surface-variant">Không có thông báo nào</p>
                  </div>
                )}
              </div>

              <div className="p-3 bg-surface-container-low border-t border-outline-variant/10 text-center">
                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">
                  Xem tất cả thông báo
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
