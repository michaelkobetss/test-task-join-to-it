"use client"
import React, { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import styles from "./Calendar.module.sass"

function CalendarView() {
    const [events, setEvents] = useState([])

    const handleDateSelect = (info) => {
        const title = prompt("Enter event name (max 30 chars):")
        if (title && title.trim().length > 0) {
            const color = prompt("Enter color (e.g. #1976d2 or 'red')", "#1976d2")
            const newEvent = {
                id: String(Date.now()),
                title: title.slice(0, 30),
                start: info.startStr,
                end: info.endStr,
                color: color || "#1976d2",
            }
            setEvents([...events, newEvent])
        }
        info.view.calendar.unselect()
    }

    const handleEventClick = (info) => {
        const choice = window.prompt(
            "Edit title, or leave blank to delete this event:",
            info.event.title
        )

        if (choice === "") {
            info.event.remove()
        } else if (choice && choice.trim()) {
            const color = prompt("Change color (leave empty to keep current):")
            info.event.setProp("title", choice.slice(0, 30))
            if (color) info.event.setProp("backgroundColor", color)
        }
    }

    const handleEventDrop = (info) => {
        console.log("Event moved:", info.event.title)
    }

    return (


            <div className={styles.container}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: "today prev,next",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
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
                    eventDrop={handleEventDrop}
                    height="80vh"
                />

        </div>
    )
}

export default CalendarView
