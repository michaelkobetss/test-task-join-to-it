import React, { useState } from "react";
import Drawer from "./Drawer";
import Header from "./Header";
import styles from "./Layout.module.sass";

export default function Layout({ children }) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    return (
        <div className={styles.layout}>

            <div className={styles.body}>

                <Drawer isOpen={drawerOpen} />
                <main className={styles.main}> <Header toggleDrawer={toggleDrawer} />{children}</main>
            </div>
        </div>
    );
}