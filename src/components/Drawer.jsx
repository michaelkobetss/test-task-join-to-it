import React from "react";
import styles from "./Drawer.module.sass";
import {
    FaHome,
    FaTachometerAlt,
    FaInbox,
    FaBox,
    FaFileInvoice,
    FaUsers,
    FaComments,
    FaCalendarAlt,
    FaQuestionCircle,
    FaCog,
} from "react-icons/fa";

export default function Drawer({ isOpen }) {
    const menuItems = [
        { icon: <FaHome />, label: "Home" },
        { icon: <FaTachometerAlt />, label: "Dashboard" },
        { icon: <FaInbox />, label: "Inbox" },
        { icon: <FaBox />, label: "Products" },
        { icon: <FaFileInvoice />, label: "Invoices" },
        { icon: <FaUsers />, label: "Customers" },
        { icon: <FaComments />, label: "Chat Room" },
        { icon: <FaCalendarAlt />, label: "Calendar", active: true },
        { icon: <FaQuestionCircle />, label: "Help Center" },
        { icon: <FaCog />, label: "Settings" },
    ];

    return (
        <aside
            className={`${styles.drawer} ${isOpen ? styles.open : styles.closed}`}
        >
            <ul className={styles.menu}>
                {menuItems.map((item, i) => (
                    <li
                        key={i}
                        className={`${styles.item} ${item.active ? styles.active : ""}`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
}