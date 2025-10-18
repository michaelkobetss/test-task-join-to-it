import React, { useState, useEffect } from "react";
import Drawer from "./Drawer";
import Header from "./Header";
import styles from "./Layout.module.sass";

export default function Layout({ children }) {
    const [drawerOpen, setDrawerOpen] = useState(window.innerWidth > 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            const isMobileView = window.innerWidth <= 768;
            setIsMobile(isMobileView);
            if (isMobileView) {
                setDrawerOpen(false);
            } else {
                setDrawerOpen(true);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleDrawer = () => {
        if (isMobile) {
            setDrawerOpen((prev) => !prev);
        }
    };

    return (
        <div className={styles.layout}>
            <div className={styles.body}>
                <Drawer isOpen={drawerOpen} />
                <main className={styles.main}>
                    <Header toggleDrawer={toggleDrawer} isMobile={isMobile} />
                    <div className={styles.content}>
                    {children}</div>
                </main>
            </div>
        </div>
    );
}