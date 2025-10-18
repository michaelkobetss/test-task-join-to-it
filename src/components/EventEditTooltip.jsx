// EventEditTooltip.jsx
"use client"
import React, { useEffect, useState } from "react";
import styles from "./EventTooltip.module.sass";

const pad = (v) => String(v).padStart(2, "0");

const EventEditTooltip = ({ event, onUpdate, onDelete, onCancel, position }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventNotes, setEventNotes] = useState("");
    const [eventColor, setEventColor] = useState("#1976d2");

    useEffect(() => {
        const updateScreenSize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", updateScreenSize);
        updateScreenSize();
        return () => window.removeEventListener("resize", updateScreenSize);
    }, []);

    useEffect(() => {
        if (!event) return;
        setEventName(event.title || "");
        const start = event.start ? new Date(event.start) : null;
        if (start) {
            setEventDate(`${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`);
            setEventTime(`${pad(start.getHours())}:${pad(start.getMinutes())}`);
        } else {
            setEventDate("");
            setEventTime("");
        }
        setEventNotes((event.extendedProps && event.extendedProps.notes) || "");
        setEventColor(event.backgroundColor || (event.extendedProps && event.extendedProps.color) || "#1976d2");
    }, [event]);

    const tooltipStyle = isMobile
        ? { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
        : {
            top: Math.min((position?.top || 0) + 10, window.innerHeight - 250),
            left: Math.min(position?.left || 0, window.innerWidth - 350),
        };

    if (!isMobile && typeof tooltipStyle.top === "number" && tooltipStyle.top + 250 > window.innerHeight) {
        tooltipStyle.top = (position?.top || 0) - 260;
    }

    if (typeof tooltipStyle.top === "number") {
        tooltipStyle.top = Math.max(20, tooltipStyle.top);
    }

    const handleEdit = () => {
        if (!event) return;
        const datePart = eventDate || "";
        const timePart = eventTime || "";
        const start = timePart ? `${datePart}T${timePart}` : datePart;
        const updated = {
            ...event,
            title: (eventName || "").slice(0, 30),
            start,
            end: start,
            backgroundColor: eventColor,
            extendedProps: { ...(event.extendedProps || {}), notes: eventNotes, color: eventColor },
        };
        onUpdate && onUpdate(updated);
    };

    const handleDiscard = () => {
        if (!event) return;
        onDelete && onDelete(event);
    };

    return (
        <div className={`${styles.tooltip} ${isMobile ? styles.mobile : ""}`} style={{ ...tooltipStyle, position: "absolute" }}>
            <button
                aria-label="Close"
                onClick={onCancel}
                style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    background: "transparent",
                    border: "none",
                    fontSize: 18,
                    lineHeight: 1,
                    cursor: "pointer",
                }}
            >
                ×
            </button>

            <div className={styles.tooltipContent} style={{ paddingTop: 12 }}>
                <div className={styles.inputGroup}>
                    <label htmlFor="editEventName">Event Name</label>
                    <input id="editEventName" type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Enter event name" className={styles.input} />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="editEventDate">Event Date</label>
                    <input id="editEventDate" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className={styles.input} />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="editEventTime">Event Time</label>
                    <input id="editEventTime" type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className={styles.input} />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="editEventNotes">Notes</label>
                    <textarea id="editEventNotes" value={eventNotes} onChange={(e) => setEventNotes(e.target.value)} placeholder="Add notes for this event" className={styles.textArea} />
                </div>

                <div className={styles.colorPickerGroup}>
                    <label htmlFor="editEventColor">Event Color</label>
                    <input id="editEventColor" type="color" value={eventColor} onChange={(e) => setEventColor(e.target.value)} className={styles.colorPicker} />
                </div>

                <div className={styles.actions} style={{ marginTop: 8 }}>
                    <button
                        onClick={handleDiscard}
                        className={styles.buttonDiscard}
                        style={{
                            backgroundColor: "#e53935",
                            color: "#ffffff",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: 6,
                            cursor: "pointer",
                        }}
                    >
                        Discard
                    </button>

                    <button
                        onClick={handleEdit}
                        className={styles.buttonEdit}
                        style={{
                            background: "transparent",
                            color: "#444",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: 6,
                            cursor: "pointer",
                        }}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventEditTooltip;
