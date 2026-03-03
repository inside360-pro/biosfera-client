"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { initPhoneMask } from "@/app/utils/phone-mask";
import styles from "./style.module.scss";

interface FormData {
  phone: string;
  last_name: string;
  name: string;
  policy: boolean;
  passport_series?: string | null;
  middle_name?: string | null;
  email?: string | null;
  contract_type?: string | null;
  passport_issued_by?: string | null;
  passport_issued_code?: string | null;
  passport_issued_date?: string | null;
  address_of_residence?: string | null;
  policy1?: boolean;
  policy2?: boolean;
}

export default function DogovorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      phone: "", // Инициализируем phone пустой строкой
      last_name: "", // Инициализируем last_name пустой строкой
      name: "", // Инициализируем name пустой строкой
      policy: false, // Инициализируем policy false
      middle_name: "", // Инициализируем middle_name пустой строкой
      email: "", // Инициализируем email пустой строкой
      contract_type: "", // Инициализируем contract_type пустой строкой
      passport_issued_by: "", // Инициализируем passport_issued_by пустой строкой
      passport_issued_code: "", // Инициализируем passport_issued_code пустой строкой
      passport_issued_date: "", // Инициализируем passport_issued_date пустой строкой
      address_of_residence: "", // Инициализируем address_of_residence пустой строкой
      policy1: false, // Инициализируем policy1 false
      policy2: false, // Инициализируем policy1 false
    },
  });

  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [sending, setSending] = useState(false);

  const phoneValue = watch("phone"); // Отслеживаем значение поля phone

  const step1Ref = useRef<HTMLDivElement | null>(null);

  const goToStep2 = async () => {
    const stepRoot = step1Ref.current;
    if (!stepRoot) {
      setStep(2);
      return;
    }

    const fieldNames = Array.from(
      stepRoot.querySelectorAll("input[name], textarea[name], select[name]"),
    )
      .map((el) => (el as HTMLInputElement).name)
      .filter(Boolean);

    if (fieldNames.length === 0) {
      setStep(2);
      return;
    }

    const isValid = await trigger(fieldNames as Parameters<typeof trigger>[0], {
      shouldFocus: true,
    });
    if (isValid) setStep(2);
  };

  const onSubmit = async (formData: FormData) => {
    setSending(true);
    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          emailType: "passport",
        }),
      });

      if (response.ok) {
        await response.json();

        setIsSuccess(true);
        setSending(false);
        setError(undefined);
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
      {step === 1 && (
        <div className={styles.form_step_1} ref={step1Ref}>
          <p className={styles.subtitle}>
            Заполните Ваши данные, чтобы подписать договор
          </p>

          <div className={styles.wrapper_group}>
            <div className={styles.input_wrapper}>
              <input
                placeholder="Введите фамилию*"
                {...register("last_name", {
                  required: { value: true, message: "Введите фамилию" },
                })}
                className={styles.form__input}
                type="text"
              />
              <div className={styles.input_text_error}>
                {errors.last_name?.message}
              </div>
            </div>

            <div className={styles.input_wrapper}>
              <input
                placeholder="Введите имя*"
                {...register("name", {
                  required: { value: true, message: "Введите имя" },
                })}
                className={styles.form__input}
                type="text"
              />
              <div className={styles.input_text_error}>
                {errors.name?.message}
              </div>
            </div>

            <div className={styles.input_wrapper}>
              <input
                placeholder="Введите отчество*"
                {...register("middle_name", {
                  required: { value: true, message: "Введите отчество" },
                })}
                className={styles.form__input}
                type="text"
              />
              <div className={styles.input_text_error}>
                {errors.middle_name?.message}
              </div>
            </div>

            <div className={`${styles.input_wrapper}`}>
              {(() => {
                const { ref: phoneRef, ...phoneRegister } = register("phone", {
                  required: { value: true, message: "Введите телефон" },
                });

                return (
                  <input
                    placeholder="Введите телефон*"
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
                {errors.phone?.message}
              </div>
            </div>

            <div className={styles.input_wrapper}>
              <input
                placeholder="Введите email*"
                {...register("email", {
                  required: { value: true, message: "Введите email" },
                })}
                className={styles.form__input}
                type="email"
              />
              <div className={styles.input_text_error}>
                {errors.email?.message}
              </div>
            </div>

            <div className={styles.input_wrapper}>
              <select
                {...register("contract_type", {
                  required: { value: true, message: "Выберите тип договора" },
                })}
                className={styles.form__input}
              >
                <option value="" disabled>
                  Выберите тип договора*
                </option>
                <option value="Договор на оказание услуг">
                  Договор на оказание услуг 1*
                </option>
                <option value="Договор на починку примусора">
                  Договор на починку примусора
                </option>
              </select>
              <div className={styles.input_text_error}>
                {errors.contract_type?.message}
              </div>
            </div>
          </div>

          <button
            className={styles.form__btn__submit}
            type="button"
            onClick={goToStep2}
          >
            <span>Далее</span>
          </button>
        </div>
      )}

      {step === 2 && (
        <div className={styles.form_step_2}>
          <p className={styles.subtitle}>Паспортные данные</p>

          <div className={styles.wrapper_group}>
            <div className={styles.input_wrapper}>
              <input
                placeholder="Серия и номер*"
                {...register("passport_series", {
                  required: {
                    value: true,
                    message: "Введите серию и номер паспорта",
                  },
                })}
                className={styles.form__input}
                type="text"
              />
              <div className={styles.input_text_error}>
                {errors.passport_series?.message}
              </div>
            </div>

            <div className={styles.input_wrapper}>
              <input
                placeholder="Кем выдан*"
                {...register("passport_issued_by", {
                  required: {
                    value: true,
                    message: "Введите кем выдан",
                  },
                })}
                className={styles.form__input}
                type="text"
              />
              <div className={styles.input_text_error}>
                {errors.passport_issued_by?.message}
              </div>
            </div>

            <div className={styles.input_wrapper}>
              <input
                placeholder="Код подразделения*"
                {...register("passport_issued_code", {
                  required: {
                    value: true,
                    message: "Введите код подразделения",
                  },
                })}
                className={styles.form__input}
                type="text"
              />
              <div className={styles.input_text_error}>
                {errors.passport_issued_code?.message}
              </div>
            </div>

            <div className={styles.input_wrapper}>
              <input
                placeholder="Дата выдачи*"
                {...register("passport_issued_date", {
                  required: {
                    value: true,
                    message: "Введите дату выдачи",
                  },
                })}
                className={styles.form__input}
                type="text"
              />
              <div className={styles.input_text_error}>
                {errors.passport_issued_date?.message}
              </div>
            </div>

            <div
              className={`${styles.input_wrapper} ${styles.input_wrapper_full_width}`}
            >
              <input
                placeholder="Адрес проживания*"
                {...register("address_of_residence", {
                  required: {
                    value: true,
                    message: "Введите адрес проживания",
                  },
                })}
                className={styles.form__input}
                type="text"
              />
              <div className={styles.input_text_error}>
                {errors.address_of_residence?.message}
              </div>
            </div>
          </div>

          {/* сабмит формы */}
          <div className={styles.buttons_wrapper}>
            <button
              className={styles.form__btn__submit}
              type="button"
              onClick={() => setStep(1)}
            >
              <span>Назад</span>
            </button>
            <button className={styles.form__btn__submit} type="submit">
              <p>Оставить заявку</p>

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
                    <stop
                      offset=".3"
                      stopColor="#ffffff"
                      stopOpacity=".9"
                    ></stop>
                    <stop
                      offset=".6"
                      stopColor="#ffffff"
                      stopOpacity=".6"
                    ></stop>
                    <stop
                      offset=".8"
                      stopColor="#ffffff"
                      stopOpacity=".3"
                    ></stop>
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
                Нажимая кнопку, вы даёте согласие на обработку персональных
                данных в соответствии с &nbsp;
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
              {errors.policy?.message}
            </div>
          </div>

          <div className={styles.form__policy}>
            <div className={styles.policy_checkbox_wrapper}>
              <input
                {...register("policy1", {
                  required: {
                    value: true,
                    message:
                      "Вы должны согласиться с условиями договора, приложениями и правилами внутреннего распорядка",
                  },
                })}
                type="checkbox"
                className={styles.policy_checkbox}
              />
              <p className={styles.policy_text}>
                Ознакомлен с условиями договора, приложениями и правилами
                внутреннего распорядка
              </p>
            </div>
            <div className={styles.input_text_error}>
              {errors.policy1?.message}
            </div>
          </div>

          <div className={styles.form__policy}>
            <div className={styles.policy_checkbox_wrapper}>
              <input
                {...register("policy2", {
                  required: {
                    value: true,
                    message:
                      "Вы должны согласиться с ИДС на медицинское вмешательство",
                  },
                })}
                type="checkbox"
                className={styles.policy_checkbox}
              />
              <p className={styles.policy_text}>
                ИДС на медицинское вмешательство
              </p>
            </div>
            <div className={styles.input_text_error}>
              {errors.policy1?.message}
            </div>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className={styles.success}>Ваша заявка успешно отправлена</div>
      )}
      {error && <div className={styles.send_error}>{error}</div>}
    </form>
  );
}
