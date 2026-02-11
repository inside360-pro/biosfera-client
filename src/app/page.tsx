import {
  Hero,
  Services,
  About,
  Gallery,
  Doctors,
  News,
  Owner,
  Map,
  Footer,
} from "./sections";
import { AnimateElement, Header } from "./components";
import Image from "next/image";

import styles from "./page.module.css";
export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Owner />
      <Doctors />
      <News />
      <Map />
      <Footer />

      {/* <Image
        src="/Item.png"
        alt="VDS"
        width={460}
        height={425}
        className="dsv-image"
        priority
      /> */}

      {/* <p className="text">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id adipisci,
        temporibus nesciunt cumque deleniti, quas eligendi est esse,
        reprehenderit aperiam quasi quo nisi accusantium aspernatur soluta
        doloribus eos nemo molestiae!
      </p>

      <AnimateElement element="p">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id adipisci,
        temporibus nesciunt cumque deleniti, quas eligendi est esse,
        reprehenderit aperiam quasi quo nisi accusantium aspernatur soluta
        doloribus eos nemo molestiae!
      </AnimateElement> */}
    </main>
  );
}
