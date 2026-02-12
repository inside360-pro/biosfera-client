import {
  Hero,
  Services,
  About,
  Gallery,
  Doctors,
  News,
  Owner,
  Map,
} from "./sections";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Owner />
      <Doctors />
      <News />
      <Map />

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
