"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import MainButton from "@/components/ui/MainButton";
import { formatPhoneNumber } from "@/shared/utils/formatPhoneNumber";
import CustomContainer from "@/components/ui/CustomContainer";
import BracketsText from "@/components/ui/BracketsText";
import GradientHeading from "@/components/ui/GradientHeading";

interface IContactFormData {
  name: string;
  email: string;
  phone: string;
  comments?: string;
  consent: boolean;
}

const RegisterFormScreen: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IContactFormData>({
    defaultValues: {
      consent: false,
    },
  });

  const onSubmit = async (data: IContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          // Конфликт - пользователь уже зарегистрирован
          setErrorMessage(result.message || "Пользователь с такими данными уже зарегистрирован");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          return;
        }
        throw new Error(result.message || "Ошибка при сохранении данных");
      }

      // Показываем сообщение об успехе
      setIsSuccess(true);
      reset();

      // Скрываем сообщение через 5 секунд
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
      setErrorMessage("Произошла ошибка при сохранении данных. Пожалуйста, попробуйте еще раз.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Попап уведомление успеха слева снизу */}
      {isSuccess && (
        <div className="fixed bottom-6 left-6 z-50 animate-[slideUp_0.3s_ease-out]">
          <div className="bg-green-500/20 backdrop-blur-md border border-green-500/50 rounded-xl p-4 md:p-6 shadow-lg max-w-sm">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-green-500 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div className="flex-1">
                <h3 className="text-green-500 font-semibold text-base md:text-lg mb-1">
                  Регистрация успешна!
                </h3>
                <p className="text-white/70 text-sm">
                  Регистрация успешно сохранена на сервере.
                </p>
              </div>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-white/60 hover:text-white transition-colors shrink-0"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Попап уведомление ошибки слева снизу */}
      {errorMessage && (
        <div className="fixed bottom-6 left-6 z-50 animate-[slideUp_0.3s_ease-out]">
          <div className="bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-xl p-4 md:p-6 shadow-lg max-w-sm">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-red-500 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <div className="flex-1">
                <h3 className="text-red-500 font-semibold text-base md:text-lg mb-1">
                  Ошибка регистрации
                </h3>
                <p className="text-white/70 text-sm">
                  {errorMessage}
                </p>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-white/60 hover:text-white transition-colors shrink-0"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="contact_us_screen" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent">
        <CustomContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Левая колонка - Текст */}
          <div className="flex flex-col">
            <BracketsText className="text-white/60 mb-4">
              РЕГИСТРАЦИЯ
            </BracketsText>
            <GradientHeading className="text-3xl md:text-4xl lg:text-5xl mb-6">
              Зарегистрируйтесь на встречу
            </GradientHeading>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed">
              Заполните форму справа, чтобы зарегистрироваться на VII Встречу главных энергетиков Сибири.
            </p>
          </div>

          {/* Правая колонка - Форма */}
          <div className="lg:sticky lg:top-24">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              label="Ваше имя"
              required
              error={errors.name?.message}
              {...register("name", {
                required: "Это поле обязательно",
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа",
                },
              })}
            />
            <Input
              type="email"
              label="E-mail"
              required
              error={errors.email?.message}
              {...register("email", {
                required: "Это поле обязательно",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Некорректный email",
                },
              })}
            />
            <Input
              type="tel"
              label="Телефон"
              required
              error={errors.phone?.message}
              {...register("phone", {
                required: "Это поле обязательно",
                pattern: {
                  value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                  message: "Некорректный номер телефона",
                },
                onChange: (e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  e.target.value = formatted;
                },
              })}
            />

            <TextArea
              label="Комментарий"
              rows={4}
              placeholder="Оставьте комментарий (необязательно)"
              {...register("comments")}
            />

            <label className="flex items-center text-white/80 cursor-pointer">
              <div className="relative flex items-center mr-3">
                <input
                  type="checkbox"
                  className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none cursor-pointer"
                  {...register("consent", {
                    required: "Необходимо согласие на обработку данных",
                  })}
                />
                <div className="absolute w-2.5 h-2.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              Я согласен с условиями обработки персональных данных
              {errors.consent && (
                <span className="text-red-500 text-sm ml-2">
                  {errors.consent.message}
                </span>
              )}
            </label>

              <MainButton
                text={isSubmitting ? "Отправка..." : "Зарегистрироваться"}
                onClick={handleSubmit(onSubmit)}
                disableRedirect
                disabled={isSubmitting}
              />
            </form>
          </div>
        </div>
      </CustomContainer>
    </section>
    </>
  );
};

export default RegisterFormScreen;
