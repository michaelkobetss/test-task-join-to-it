import React from "react";
import styles from "./Header.module.sass";
import { FaSearch, FaBell, FaCog, FaGlobe, FaBars, FaChevronDown } from "react-icons/fa";

export default function Header({ toggleDrawer, isMobileDrawerOpen }) {
    return (
        <header className={`${styles.header} ${isMobileDrawerOpen ? styles.hideSearch : ""}`}>
            <div className={styles.mobileHeader}>
                <button onClick={toggleDrawer}>
                    <FaBars />
                </button>
                <div className={styles.logo}>IMPEKABLE</div>
            </div>

            <div className={styles.search}>
                <FaSearch />
                <input type="text" placeholder="Search transactions, invoices or help" />
            </div>

            <div className={styles.actions}>
                <FaGlobe />
                <FaBell />
                <FaCog />
                <div className={styles.profile}>
                    <span>
            John Doe <FaChevronDown />
          </span>                    <img src="https://i.pravatar.cc/40" alt="Profile" />

                </div>
            </div>
        </header>
    );
}