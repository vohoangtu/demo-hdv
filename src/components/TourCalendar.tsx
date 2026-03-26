import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval 
} from 'date-fns';
import { vi } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Users, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';
import { Tour } from '../types';

interface TourCalendarProps {
  tours: Tour[];
  onSelectTour: (tour: Tour) => void;
  selectedTourId?: string;
}

export default function TourCalendar({ tours, onSelectTour, selectedTourId }: TourCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const getToursForDay = (day: Date) => {
    return tours.filter(tour => {
      // Simple date parsing for mock data "24/10" format
      // In a real app, this would be ISO dates
      const [d, m] = tour.startDate.split('/').map(Number);
      if (!d || !m) return false;
      
      const tourDate = new Date(currentMonth.getFullYear(), m - 1, d);
      return isSameDay(day, tourDate);
    });
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/10 overflow-hidden ghost-shadow">
      {/* Calendar Header */}
      <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low">
        <h3 className="text-lg font-black text-on-surface uppercase tracking-tight">
          {format(currentMonth, 'MMMM yyyy', { locale: vi })}
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={prevMonth}
            className="p-2 hover:bg-surface-container-high rounded-lg transition-colors text-outline"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 hover:bg-surface-container-high rounded-lg transition-colors text-outline"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
          <div key={day} className="py-3 text-center text-[10px] font-black text-outline uppercase tracking-widest bg-surface-container-low/50 border-b border-outline-variant/10">
            {day}
          </div>
        ))}
        
        {days.map((day, i) => {
          const dayTours = getToursForDay(day);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isToday = isSameDay(day, new Date());

          return (
            <div 
              key={i} 
              className={cn(
                "min-h-[120px] p-2 border-r border-b border-outline-variant/10 transition-colors",
                !isCurrentMonth && "bg-surface-container-low/30",
                isToday && "bg-primary/5"
              )}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={cn(
                  "text-xs font-black w-6 h-6 flex items-center justify-center rounded-full",
                  isToday ? "bg-primary text-white" : isCurrentMonth ? "text-on-surface" : "text-outline"
                )}>
                  {format(day, 'd')}
                </span>
                {dayTours.length > 0 && (
                  <span className="text-[9px] font-black bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded uppercase">
                    {dayTours.length} Tours
                  </span>
                )}
              </div>

              <div className="space-y-1">
                {dayTours.map(tour => (
                  <div 
                    key={tour.id}
                    onClick={() => onSelectTour(tour)}
                    className={cn(
                      "p-1.5 rounded-md text-[10px] font-bold cursor-pointer transition-all truncate",
                      selectedTourId === tour.id 
                        ? "bg-primary text-white shadow-md scale-[1.02]" 
                        : "bg-surface-container-high text-on-surface hover:bg-primary/10 hover:text-primary"
                    )}
                  >
                    <div className="flex items-center gap-1">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        tour.priority === 'Urgent' ? "bg-error" : 
                        tour.priority === 'High' ? "bg-amber-500" : "bg-blue-500"
                      )} />
                      {tour.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
