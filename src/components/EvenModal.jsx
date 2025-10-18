import React from "react";
import styles from "./EventModal.module.sass";

const EventModal = ({ eventName, setEventName, eventColor, setEventColor, onSave, onCancel }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h3 className={styles.title}>Add New Event</h3>
                <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Enter event name"
                    className={styles.input}
                />
                <div>
                    <label htmlFor="colorPicker" className={styles.label}>Select Event Color</label>
                    <input
                        type="color"
                        id="colorPicker"
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

export default EventModal;