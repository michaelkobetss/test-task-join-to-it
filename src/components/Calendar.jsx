import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calendar.module.sass";
import EventModal from "./EvenModal.jsx";

function CalendarView() {
    const [events, setEvents] = useState([]);
    const [calendarHeight, setCalendarHeight] = useState("80vh");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState({});
    const [eventName, setEventName] = useState("");
    const [eventColor, setEventColor] = useState("#1976d2");

    const handleDateSelect = (info) => {
        setModalInfo(info);
        setEventName("");
        setEventColor("#1976d2");
        setIsModalOpen(true);
    };

    const handleSaveEvent = () => {
        if (eventName.trim().length > 0) {
            const newEvent = {
                id: String(Date.now()),
                title: eventName.slice(0, 30),
                start: modalInfo.startStr,
                end: modalInfo.endStr,
                color: eventColor || "#1976d2",
            };
            setEvents([...events, newEvent]);
        }
        setIsModalOpen(false);
    };

    const handleEventClick = (info) => {
        const title = window.prompt(
            "Edit event title or leave blank to delete:",
            info.event.title
        );

        if (title === "") {
            info.event.remove();
        } else if (title) {
            const color = window.prompt("Change color (leave empty to keep current):");
            info.event.setProp("title", title.slice(0, 30));
            if (color) info.event.setProp("backgroundColor", color);
        }
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

    return (
        <div className={styles.container}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: "today prev,next",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                initialView="dayGridMonth"
                editable
                selectable
                selectMirror
                dayMaxEvents
                weekends
                select={handleDateSelect}
                eventClick={handleEventClick}
                events={events}
                height={calendarHeight}
            />

            {isModalOpen && (
                <EventModal
                    eventName={eventName}
                    setEventName={setEventName}
                    eventColor={eventColor}
                    setEventColor={setEventColor}
                    onSave={handleSaveEvent}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}

export default CalendarView;