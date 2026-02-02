"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimateElement, Header, VdsButton, VdsPanel } from "./components";
import styles from "./page.module.css";

export default function Home() {
  const [panel, setPanel] = useState(false);
  const [panelBtn, setPanelBtn] = useState(true);

  return (
    <main className={styles.main}>
      {panelBtn && <VdsButton setPanel={setPanel} setPanelBtn={setPanelBtn} />}
      {panel && <VdsPanel setPanel={setPanel} setPanelBtn={setPanelBtn} />}
      <Image
        className={styles.logo}
        src="/next.svg"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
      />
      <Header />

      <h1>Lorem ipsum dolor sit amet consectetur</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id adipisci,
        temporibus nesciunt cumque deleniti, quas eligendi est esse,
        reprehenderit aperiam quasi quo nisi accusantium aspernatur soluta
        doloribus eos nemo molestiae!
      </p>

      <Image
        src="/Item.png"
        alt="VDS"
        width={460}
        height={425}
        className="dsv-image"
        priority
      />

      <AnimateElement element="p">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id adipisci,
        temporibus nesciunt cumque deleniti, quas eligendi est esse,
        reprehenderit aperiam quasi quo nisi accusantium aspernatur soluta
        doloribus eos nemo molestiae!
      </AnimateElement>
    </main>
  );
}
