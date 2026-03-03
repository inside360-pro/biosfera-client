"use client";
import { useForm } from "react-hook-form";
import styles from "./style.module.scss";
import { useState } from "react";
import { initPhoneMask } from "@/app/utils/phone-mask";

interface FormData {
  phone: string;
  name: string;
  question: string;
  policy: boolean;
}

export default function PriceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      phone: "", // Инициализируем phone пустой строкой
      name: "", // Инициализируем name пустой строкой
      question: "", // Инициализируем question пустой строкой
      policy: false, // Инициализируем policy false
    },
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [sending, setSending] = useState(false);

  const phoneValue = watch("phone"); // Отслеживаем значение поля phone

  const onSubmit = async (formData: FormData) => {
    setSending(true);
    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);

        setIsSuccess(true);
        setSending(false);
        setError(undefined);
        // setActive(false)
        reset();
      } else {
        setSending(false);
        setError("Что-то пошло не так");
        console.error("Статус ошибки:", response.status);
      }
    } catch (err) {
      setError("Ошибка запроса, попробуйте позже");
      setSending(false);
      console.error("Fetch error:", err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <header className={styles.form__header}>
        <h2>
          Есть <span className="text-gradient">вопросы?</span>
        </h2>
        <p className={styles.subtitle}>
          Если у вас есть вопрос, предложение или вы хотите обратиться напрямую
          к главному врачу — заполните форму ниже
        </p>
      </header>

      <div className={styles.form__row}>
        <div className={styles.input_wrapper}>
          <input
            placeholder="Введите имя"
            {...register("name", {
              required: { value: true, message: "Введите имя" },
            })}
            className={styles.form__input}
            type="text"
          />
          <div className={styles.input_text_error}>
            {errors["name"] && errors["name"].message}
          </div>
        </div>

        <div className={`${styles.input_wrapper}`}>
          {(() => {
            const { ref: phoneRef, ...phoneRegister } = register("phone", {
              required: { value: true, message: "Введите телефон" },
            });

            return (
              <input
                placeholder="Введите телефон"
                {...phoneRegister}
                value={phoneValue || ""} // Убедимся, что значение никогда не undefined
                onChange={(e) => setValue("phone", e.target.value)} // Обновляем значение в react-hook-form
                ref={(el) => {
                  phoneRef(el);
                  if (el) initPhoneMask(el); // Инициализация маски
                }}
                className={styles.form__input}
                type="tel"
              />
            );
          })()}
          <div className={styles.input_text_error}>
            {errors["phone"] && errors["phone"].message}
          </div>
        </div>
      </div>

      <div className={`${styles.input_wrapper} ${styles.textarea_wrapper}`}>
        <textarea
          placeholder="Ваше сообщение"
          {...register("question", {
            required: { value: true, message: "Опишите ваш вопрос" },
          })}
          className={styles.form__input}
          rows={4}
        />
        <div className={styles.input_text_error}>
          {errors["question"] && errors["question"].message}
        </div>
      </div>

      <div className={styles.form__row}>
        <div className={styles.form__policy}>
          <div className={styles.policy_checkbox_wrapper}>
            <input
              {...register("policy", {
                required: {
                  value: true,
                  message:
                    "Вы должны согласиться с политикой конфиденциальности",
                },
              })}
              type="checkbox"
              className={styles.policy_checkbox}
            />
            <p className={styles.policy_text}>
              Нажимая кнопку, вы даёте согласие на обработку персональных данных
              в соответствии с &nbsp;
              <a
                href="/policy"
                className={`${styles.policy_text_link} text-gradient`}
              >
                Политикой конфиденциальности
              </a>
              .
            </p>
          </div>
          <div className={styles.input_text_error}>
            {errors["policy"] && errors["policy"].message}
          </div>
        </div>

        <button className={styles.form__btn__submit} type="submit">
          {sending ? <p>Отправка...</p> : <p>Оставить заявку</p>}

          {sending && (
            <svg
              width="25"
              height="25"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
            >
              <title>Loading...</title>
              <radialGradient
                id="a9"
                cx=".66"
                fx=".66"
                cy=".3125"
                fy=".3125"
                gradientTransform="scale(1.5)"
              >
                <stop offset="0" stopColor="#ffffff"></stop>
                <stop offset=".3" stopColor="#ffffff" stopOpacity=".9"></stop>
                <stop offset=".6" stopColor="#ffffff" stopOpacity=".6"></stop>
                <stop offset=".8" stopColor="#ffffff" stopOpacity=".3"></stop>
                <stop offset="1" stopColor="#ffffff" stopOpacity="0"></stop>
              </radialGradient>
              <circle
                style={{ transformOrigin: "center" }}
                fill="none"
                stroke="url(#a9)"
                strokeWidth="15"
                strokeLinecap="round"
                strokeDasharray="200 1000"
                strokeDashoffset="0"
                cx="100"
                cy="100"
                r="70"
              >
                <animateTransform
                  type="rotate"
                  attributeName="transform"
                  calcMode="spline"
                  dur="2"
                  values="360;0"
                  keyTimes="0;1"
                  keySplines="0 0 1 1"
                  repeatCount="indefinite"
                ></animateTransform>
              </circle>
              <circle
                style={{ transformOrigin: "center" }}
                fill="none"
                opacity=".2"
                stroke="#ffffff"
                strokeWidth="15"
                strokeLinecap="round"
                cx="100"
                cy="100"
                r="70"
              ></circle>
            </svg>
          )}
        </button>
      </div>

      {isSuccess && (
        <div className={styles.success}>Ваша заявка успешно отправлена</div>
      )}
      {error && <div className={styles.send_error}>{error}</div>}
    </form>
  );
}
