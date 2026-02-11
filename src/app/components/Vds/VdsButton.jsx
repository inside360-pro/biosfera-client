import styles from "./vdsButton.module.css";
import Image from "next/image";

export default function VdsButton({ setPanel, setPanelBtn }) {
  const handleClick = () => {
    setPanel(true);
    setPanelBtn(false);
    speechSynthesis.speak(
      new SpeechSynthesisUtterance("версия сайта для слабовидящих "),
    );
  };

  return (
    <button
      type="button"
      className={styles.item__button}
      onClick={handleClick}
      title="Версия сайта для слабовидящих"
      aria-label="Версия сайта для слабовидящих"
    >
      <Image
        src="/icons/eye-icon.svg"
        className="dsv-image"
        alt="logo"
        width={22}
        height={22}
      />
    </button>
  );
}
