"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"
import { cn } from "../Additional/utils"

export interface TimelineEvent {
  id: string
  title: string
  date: Date
  type: "milestone" | "deadline" | "meeting" | "task"
  completed?: boolean
}

interface ProjectTimelineProps {
  events: TimelineEvent[]
  onEventClick?: (event: TimelineEvent) => void
}

const ProjectTimeline = ({ events, onEventClick }: ProjectTimelineProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(event.date, day))
  }

  const getEventTypeClass = (type: string) => {
    switch (type) {
      case "milestone":
        return "event-milestone"
      case "deadline":
        return "event-deadline"
      case "meeting":
        return "event-meeting"
      case "task":
        return "event-task"
      default:
        return ""
    }
  }

  const handleEventClick = (event: TimelineEvent) => {
    if (onEventClick) {
      onEventClick(event)
    }
  }

  return (
    <div className="project-timeline">
      <div className="timeline-header">
        <h3>Project Timeline</h3>
        <div className="timeline-navigation">
          <button className="nav-button" onClick={prevMonth}>
            <ChevronLeft size={16} />
          </button>
          <span className="current-month">{format(currentMonth, "MMMM yyyy")}</span>
          <button className="nav-button" onClick={nextMonth}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="timeline-calendar">
        <div className="weekday-header">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
        </div>

        <div className="days-grid">
          {daysInMonth.map((day) => {
            const dayEvents = getEventsForDay(day)
            const hasEvents = dayEvents.length > 0

            return (
              <div key={day.toString()} className={cn("day-cell", hasEvents && "has-events")}>
                <div className="day-number">{format(day, "d")}</div>

                {hasEvents && (
                  <div className="day-events">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={cn("event-item", getEventTypeClass(event.type), event.completed && "completed")}
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="event-title">{event.title}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="timeline-legend">
        <div className="legend-item">
          <div className="legend-color event-milestone"></div>
          <span>Milestone</span>
        </div>
        <div className="legend-item">
          <div className="legend-color event-deadline"></div>
          <span>Deadline</span>
        </div>
        <div className="legend-item">
          <div className="legend-color event-meeting"></div>
          <span>Meeting</span>
        </div>
        <div className="legend-item">
          <div className="legend-color event-task"></div>
          <span>Task</span>
        </div>
      </div>
    </div>
  )
}

export default ProjectTimeline
