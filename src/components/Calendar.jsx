import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import styles from "./Calendar.module.sass";
import EventTooltip from "./EventTooltip";
import EventEditTooltip from "./EventEditTooltip";

function isLightColor(hexColor) {
    if (!hexColor) return false;
    const hex = hexColor.replace("#", "");
    if (hex.length !== 6) return false;
    const rgb = hex.match(/.{1,2}/g).map((h) => parseInt(h, 16));
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return brightness > 128;
}

function pad(v) {
    return String(v).padStart(2, "0");
}

function toLocalDateString(date) {
    const d = date instanceof Date ? date : new Date(date);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function toLocalTimeString(date) {
    const d = date instanceof Date ? date : new Date(date);
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function CalendarView() {
    const [events, setEvents] = useState([]);
    const [calendarHeight, setCalendarHeight] = useState("80vh");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [createInfo, setCreateInfo] = useState({});
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventNotes, setEventNotes] = useState("");
    const [eventColor, setEventColor] = useState("#1976d2");

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editInfo, setEditInfo] = useState({});
    const [editingEvent, setEditingEvent] = useState(null);

    const handleDateSelect = (info) => {
        const now = new Date();

        const clickedDate = info.date || info.start || now;

        const datePart = toLocalDateString(clickedDate);
        const startTime = toLocalTimeString(clickedDate);
        const currentTime = toLocalTimeString(now);

        const isMonthView = info.view?.type?.startsWith("dayGrid");
        const useClickedTime = !isMonthView && !info.allDay;

        setCreateInfo({
            top: info.jsEvent?.clientY ?? 0,
            left: info.jsEvent?.clientX ?? 0,
            start: clickedDate,
        });

        setEventDate(datePart);
        setEventName("");
        setEventTime(useClickedTime ? startTime : currentTime);
        setEventNotes("");
        setEventColor("#1976d2");
        setIsCreateOpen(true);
    };


    const handleSaveEvent = () => {
        if (eventName.trim().length > 0) {
            const start = eventTime ? `${eventDate}T${eventTime}` : eventDate;
            const newEvent = {
                id: String(Date.now()),
                title: eventName.slice(0, 30),
                start,
                end: start,
                extendedProps: {notes: eventNotes, color: eventColor},
                backgroundColor: eventColor,
            };
            setEvents((prev) => [...prev, newEvent]);
        }
        setIsCreateOpen(false);
    };

    const handleEventClick = (info) => {
        const ev = {
            id: info.event.id,
            title: info.event.title,
            start: info.event.start || (info.event.startStr || null),
            end: info.event.end || (info.event.endStr || info.event.startStr || null),
            backgroundColor: info.event.backgroundColor || (info.event.extendedProps && info.event.extendedProps.color) || "#1976d2",
            extendedProps: info.event.extendedProps || {},
        };
        setEditingEvent(ev);
        setEditInfo({
            top: info.jsEvent?.clientY ?? 0,
            left: info.jsEvent?.clientX ?? 0,
        });
        setIsEditOpen(true);
    };

    const handleUpdateEvent = (updated) => {
        setEvents((prev) =>
            prev.map((e) => {
                if (e.id !== updated.id) return e;
                return {
                    ...e,
                    title: updated.title,
                    start: updated.start,
                    end: updated.end,
                    backgroundColor: updated.backgroundColor,
                    extendedProps: {...(e.extendedProps || {}), ...(updated.extendedProps || {})},
                };
            })
        );
        setIsEditOpen(false);
        setEditingEvent(null);
    };

    const handleDeleteEvent = (ev) => {
        setEvents((prev) => prev.filter((e) => e.id !== ev.id));
        setIsEditOpen(false);
        setEditingEvent(null);
    };

    const handleEventDrop = (info) => {
        setEvents((prev) =>
            prev.map((e) => {
                if (e.id !== info.event.id) return e;
                return {
                    ...e,
                    start: info.event.startStr,
                    end: info.event.endStr || info.event.startStr,
                    backgroundColor: info.event.backgroundColor || e.backgroundColor,
                    extendedProps: {...(e.extendedProps || {}), ...(info.event.extendedProps || {})},
                };
            })
        );
    };

    const handleEventResize = (info) => {
        setEvents((prev) =>
            prev.map((e) => {
                if (e.id !== info.event.id) return e;
                return {
                    ...e,
                    start: info.event.startStr,
                    end: info.event.endStr || info.event.startStr,
                    extendedProps: {...(e.extendedProps || {}), ...(info.event.extendedProps || {})},
                };
            })
        );
    };

    const updateCalendarHeight = () => {
        setCalendarHeight(window.innerWidth <= 768 ? "65vh" : "80vh");
    };

    useEffect(() => {
        updateCalendarHeight();
        window.addEventListener("resize", updateCalendarHeight);
        return () => {
            window.removeEventListener("resize", updateCalendarHeight);
        };
    }, []);

    const renderEventContent = (eventInfo) => {
        const bgColor = eventInfo.event.backgroundColor || eventInfo.event.extendedProps?.color || "#1976d2";
        const textColor = isLightColor(bgColor) ? "#000000" : "#FFFFFF";
        return (
            <div style={{
                backgroundColor: bgColor,
                color: textColor,
                padding: "4px 8px",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 24
            }}>
                <div style={{pointerEvents: "none"}}>
                    {eventInfo.event.title}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                headerToolbar={{
                    left: "today prev,next",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,agendaMonth",
                }}
                views={{
                    agendaMonth: {
                        type: "listMonth",
                        buttonText: "Agenda",
                    },
                }}
                initialView="dayGridMonth"
                editable
                selectable
                selectMirror
                dayMaxEvents
                weekends
                select={handleDateSelect}
                dateClick={handleDateSelect}
                selectLongPressDelay={0}
                eventClick={handleEventClick}
                eventDrop={handleEventDrop}
                eventResize={handleEventResize}
                events={events}
                height={calendarHeight}
                eventContent={renderEventContent}
            />


            {isCreateOpen && (
                <EventTooltip
                    eventName={eventName}
                    setEventName={setEventName}
                    eventDate={eventDate}
                    setEventDate={setEventDate}
                    eventTime={eventTime}
                    setEventTime={setEventTime}
                    eventNotes={eventNotes}
                    setEventNotes={setEventNotes}
                    eventColor={eventColor}
                    setEventColor={setEventColor}
                    onSave={handleSaveEvent}
                    onCancel={() => setIsCreateOpen(false)}
                    position={createInfo}
                />
            )}

            {isEditOpen && editingEvent && (
                <EventEditTooltip
                    event={editingEvent}
                    onUpdate={handleUpdateEvent}
                    onDelete={handleDeleteEvent}
                    onCancel={() => {
                        setIsEditOpen(false);
                        setEditingEvent(null);
                    }}
                    position={editInfo}
                />
            )}
        </div>
    );
}

export default CalendarView;
