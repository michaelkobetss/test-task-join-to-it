// EventTooltip.jsx
"use client"
import React, { useEffect, useState } from "react";
import styles from "./EventTooltip.module.sass";

const EventTooltip = ({
                          eventName,
                          setEventName,
                          eventDate,
                          setEventDate,
                          eventTime,
                          setEventTime,
                          eventNotes,
                          setEventNotes,
                          eventColor,
                          setEventColor,
                          onSave,
                          onCancel,
                          position,
                      }) => {
    const [isMobile, setIsMobile] = useState(false);

    const updateScreenSize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        window.addEventListener("resize", updateScreenSize);
        updateScreenSize();
        return () => {
            window.removeEventListener("resize", updateScreenSize);
        };
    }, []);

    const tooltipStyle = isMobile
        ? {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
        }
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

    return (
        <div className={`${styles.tooltip} ${isMobile ? styles.mobile : ""}`} style={tooltipStyle}>
            <div className={styles.tooltipContent}>
                <div className={styles.inputGroup}>
                    <label htmlFor="eventName">Event Name</label>
                    <input
                        type="text"
                        id="eventName"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        placeholder="Enter event name"
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="eventDate">Event Date</label>
                    <input
                        type="date"
                        id="eventDate"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="eventTime">Event Time</label>
                    <input
                        type="time"
                        id="eventTime"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="eventNotes">Notes</label>
                    <textarea
                        id="eventNotes"
                        value={eventNotes}
                        onChange={(e) => setEventNotes(e.target.value)}
                        placeholder="Add notes for this event"
                        className={styles.textArea}
                    />
                </div>

                <div className={styles.colorPickerGroup}>
                    <label htmlFor="eventColor">Event Color</label>
                    <input
                        type="color"
                        id="eventColor"
                        value={eventColor}
                        onChange={(e) => setEventColor(e.target.value)}
                        className={styles.colorPicker}
                    />
                </div>

                <div className={styles.actions}>
                    <button className={styles.buttonSave} onClick={onSave}>
                        Save
                    </button>
                    <button className={styles.buttonCancel} onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventTooltip;
