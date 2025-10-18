import React from "react";
import styles from "./Header.module.sass";
import {FaBars, FaBell, FaChevronDown, FaComments, FaGlobe, FaSearch} from "react-icons/fa";

export default function Header({toggleDrawer, isMobile}) {
    return (<header className={styles.header}>
            {!isMobile && (<div className={styles.search}>
                    <FaSearch/>
                    <input type="text" placeholder="Search transactions, invoices or help"/>
                </div>)}

            <div className={styles.actions}>
                <FaGlobe className={styles.icon}/>

                <FaComments className={styles.icon}/>
                <div className={styles.notification}>
                    <FaBell className={styles.icon}/>
                    <span className={styles.notificationBadge}></span>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.profile}>
                    <span>
                        John Doe <FaChevronDown/>
                    </span>
                    <img src="https://i.pravatar.cc/40" alt="Profile"/>
                </div>
                {isMobile && (<button
                        className={styles.menuButton}
                        onClick={toggleDrawer}
                    >
                        <FaBars/>
                    </button>)}
            </div>
        </header>);
}