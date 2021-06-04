import Link from "next/link";
import styles from "../styles/components/header.module.scss";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

const Header: React.SFC<{}> = () => {
  const router = useRouter();

  return (
    <>
      <header>
        <nav className={styles.nav}>
          <div className={styles.nav_elm}>
            <div className={styles.nav_elm_left}>
              <h1>
                <Link href={{ pathname: "/" }}>
                  <a>Coding </a>
                </Link>
              </h1>
            </div>
            <div className={styles.nav_elm_right}>
              <button className={styles.website}>
                <Link href="http://rajchhatbar.com/">
                  <a title="website"> @Raj </a>
                </Link>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
