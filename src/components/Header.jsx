import React from "react";
import styles from "./Header.module.sass";
import { FaSearch, FaBell, FaCog, FaGlobe, FaBars, FaChevronDown } from "react-icons/fa";

export default function Header({ toggleDrawer, isMobile }) {
    return (
        <header className={styles.header}>
            {!isMobile && (
                <div className={styles.search}>
                    <FaSearch />
                    <input type="text" placeholder="Search transactions, invoices or help" />
                </div>
            )}

            <div className={styles.actions}>
                <FaGlobe />
                <FaBell />
                <FaCog />
                <div className={styles.profile}>
                    <span>
                        John Doe <FaChevronDown />
                    </span>
                    <img src="https://i.pravatar.cc/40" alt="Profile" />
                </div>
                {/* 3 Bars button, visible on all devices */}
                <button className={styles.menuButton} onClick={toggleDrawer}>
                    <FaBars />
                </button>
            </div>
        </header>
    );
}