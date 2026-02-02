'use client'

import Image from "next/image";
import { useState } from "react";
import styles from "./vdspanel.module.css";

export default function VdsPanel({ setPanel, setPanelBtn }) {
    const [filter, setFilter] = useState(false);

    const images = document.querySelectorAll('.dsv-image');
    const sections = document.querySelectorAll('.section-dsv');

    // Повторное произношение текста
    function speachtxt(txt) {
        speechSynthesis.cancel();
        speechSynthesis.speak(new SpeechSynthesisUtterance(txt));
    }

    const getRootFontSizePx = () =>
        parseFloat(window.getComputedStyle(document.documentElement).fontSize);

    const setRootFontSizePx = (px) => {
        document.documentElement.style.fontSize = `${px}px`;
    };

    // Уменьшение шрифта
    const fontDecrease = () => {
        const currentFontSize = getRootFontSizePx();
        const newFontSize = currentFontSize - 2;
        setRootFontSizePx(newFontSize);
        speachtxt("размер шрифта уменьшен");
    }
    // Увеличение шрифта
    const fontIncrease = () => {
        const currentFontSize = getRootFontSizePx();
        const newFontSize = currentFontSize + 2;
        setRootFontSizePx(newFontSize);
        speachtxt("размер шрифта увеличен");
    }

    // Функция для смены темы
    function changeTheme(allStyles, newTheme) {
        document.body.classList.remove(
            allStyles.theme_white,
            allStyles.theme_black,
            allStyles.theme_blue,
            allStyles.theme_yellow,
            allStyles.theme_green
        );
        document.body.classList.add(newTheme);
    }

    const changeThemeWhite = () => {
        changeTheme(styles, styles.theme_white);
        speachtxt("цвет сайта черным по белому");
    }
    const changeThemeBlack = () => {
        changeTheme(styles, styles.theme_black);
        speachtxt("цвет сайта белым по черному");
    }
    const changeThemeBlue = () => {
        changeTheme(styles, styles.theme_blue);
        speachtxt("цвет сайта темно синим по голубому");
    }
    const changeThemeYellow = () => {
        changeTheme(styles, styles.theme_yellow);
        speachtxt("цвет сайта темно коричневым по бежевому");
    }
    const changeThemeGreen = () => {
        changeTheme(styles, styles.theme_green);
        speachtxt("цвет сайта зеленым по темно коричневому");
    }

    // Работа с изображениями
    const removeImages = () => {
        speachtxt("изображения выключены");

        images.forEach(image => {
            image.style.display = 'none';
            const alt = image.getAttribute('alt');

            if (alt !== '') {
                const div = document.createElement('div');
                div.className = 'dsv-image-div';
                div.textContent = alt;
                image.parentNode.insertBefore(div, image.nextSibling);
            }
        });

        if (sections) {
            sections.forEach(section => {
                section.classList.add('toggle_background_image');
            });
        }
    }

    const addImages = () => {
        speachtxt("изображения включены");

        const images = document.querySelectorAll('.dsv-image');
        images.forEach(image => {
            image.style.display = 'block';
        });

        const imageDivs = document.querySelectorAll('.dsv-image-div');
        imageDivs.forEach(div => {
            div.remove();
        });

        if (sections) {
            sections.forEach(section => {
                section.classList.remove('toggle_background_image');
            });
        }
    }


    const addFilter = () => {

        if (!filter) {
            setFilter(true);
            speachtxt("изображения чёрно белые");
        } else {
            setFilter(false);
            speachtxt("изображения цветные");
        }
        const images = document.querySelectorAll('.dsv-image');
        images.forEach(image => {
            image.classList.toggle(styles.filter);
        });

        if (sections) {
            sections.forEach(section => {
                section.classList.toggle('gray_filter');
            });
        }
    }

    // Кнопки закрыть панель и обычная версия сайта
    const resetAll = () => {
        speachtxt("обычная версия сайта");

        images.forEach(image => {
            image.style.display = 'block';
            image.classList.remove(styles.filter);
        });

        if (sections) {
            sections.forEach(section => {
                section.classList.remove('toggle_background_image');
                section.classList.remove('gray_filter');
            });
        }

        const imageDivs = document.querySelectorAll('.dsv-image-div');
        imageDivs.forEach(div => {
            div.remove();
        });

        document.body.classList.remove(
            styles.theme_white,
            styles.theme_black,
            styles.theme_blue,
            styles.theme_yellow,
            styles.theme_green
        );
        setPanel(false);
        setPanelBtn(true)
    }

    return (
        <div className={`${styles.dsv_panel} dsv_panel`}>
            <div>
                <p className={styles.p}>Размер шрифта</p>
                <div className="flex gap-10">
                    <button
                        type="button"
                        className={styles.button}
                        onClick={fontDecrease}
                        title="Уменьшить шрифт"
                    >A-
                    </button>
                    <button
                        type="button"
                        className={styles.button}
                        onClick={fontIncrease}
                        title="Увеличить шрифт"
                    >A+
                    </button>
                </div>
            </div>

            <div>
                <p className={styles.p}>Цвета сайта</p>
                <div className="flex gap-10">
                    <button
                        type="button"
                        className={`${styles.button} ${styles.color_1}`}
                        onClick={changeThemeWhite}
                        title="цвет сайта черным по белому"
                    >Ц</button>
                    <button
                        type="button"
                        className={`${styles.button} ${styles.color_2}`}
                        onClick={changeThemeBlack}
                        title="цвет сайта белым по черному"
                    >Ц</button>
                    <button
                        type="button"
                        className={`${styles.button} ${styles.color_3}`}
                        onClick={changeThemeBlue}
                        title="цвет сайта темно синим по голубому"
                    >Ц</button>
                    <button
                        type="button"
                        className={`${styles.button} ${styles.color_4}`}
                        onClick={changeThemeYellow}
                        title="цвет сайта темно коричневым по бежевому"
                    >Ц</button>
                    <button
                        type="button"
                        className={`${styles.button} ${styles.color_5}`}
                        onClick={changeThemeGreen}
                        title="цвет сайта зеленым по темно коричневому"
                    >Ц</button>
                </div>
            </div>

            <div>
                <p className={styles.p}>Изображения</p>
                <div className="flex gap-10">
                    <button
                        type="button"
                        className={styles.button}
                        onClick={addImages}
                        title="Показать изображения"
                    >
                        <Image src="/icons/image.svg" alt="image" width={20} height={20} />
                    </button>
                    <button
                        type="button"
                        className={styles.button}
                        onClick={removeImages}
                        title="Отключить изображения"
                    >
                        <Image src="/icons/minus-circle.svg" alt="image" width={20} height={20} />
                    </button>
                    <button
                        type="button"
                        className={styles.button}
                        onClick={addFilter}
                        title="Изображения черно-белые"
                    >
                        <Image src="/icons/adjust.svg" alt="image" width={20} height={20} />
                    </button>

                </div>
            </div>

            <div>
                <p className={styles.p}>Настройки</p>
                <button
                    type="button"
                    className={styles.btn_close}
                    onClick={resetAll}
                >
                    Обычная версия сайта
                </button>
            </div>
        </div>
    )
}
