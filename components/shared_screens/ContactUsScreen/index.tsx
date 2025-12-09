"use client";
import { FC, useState } from "react";
import BracketsText from "@/components/ui/BracketsText";
import GradientHeading from "@/components/ui/GradientHeading";
import CustomContainer from "@/components/ui/CustomContainer";
import ContactForm from "@/components/ContactForm";
import { ContactFormVariant } from "@/components/ContactForm/types";

interface ContactUsScreenProps {
  variant?: ContactFormVariant;
}

const ContactUsScreen: FC<ContactUsScreenProps> = ({ variant = "default" }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const isVacancy = variant === "vacancy";
  const isForum = variant === "forum";

  const handleSuccess = () => {
    setIsSuccess(true);
    // Сбросить состояние через 5 секунд
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };
  return (
    <section id="contact_us_section" className="bg-transparent py-24">
      <CustomContainer>
        {/* Section Title */}
        <BracketsText className="mb-8">
          {isForum ? "ЗАРЕГИСТРИРОВАТЬСЯ" : "СВЯЗАТЬСЯ С НАМИ"}
        </BracketsText>
        {/* Main content with two columns on desktop */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {isSuccess ? (
            // Сообщение об успехе
            <div className="w-full flex justify-center">
              <div className="text-center py-8 max-w-md">
                <div className="mb-6">
                  <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-white"
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
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-white">
                    {isForum ? "Регистрация успешна!" : "Заявка отправлена!"}
                  </h3>
                  <p className="text-white/70">
                    {isForum
                      ? "Мы свяжемся с вами в ближайшее время"
                      : "Наши менеджеры скоро с вами свяжутся"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Left column - Headings and description */}
              <div className="lg:w-1/2">
                {/* Main Heading */}
                <GradientHeading className="mb-4">
                  {isVacancy ? (
                    <>
                      Хотите работать в нашей компании?
                    </>
                  ) : isForum ? (
                    <>Регистрация <br></br>на мероприятие</>
                  ) : (
                    <>Хотите обсудить проект или получить предложение?</>
                  )}
                </GradientHeading>

                {/* Description text */}
                <div className="mt-8 lg:mb-0">
                  <p className="text-white/70 max-w-[600px]">
                    {isVacancy
                      ? "Если Вас заинтересовали вакансии нашей компании, заполните форму и мы обязательно с Вами свяжемся"
                      : isForum
                      ? "Заполните форму регистрации, и мы свяжемся с вами для подтверждения участия в VII Встрече главных энергетиков Сибири"
                      : "Если вы заинтересованы в нашей продукции или ищете техническое решение — оставьте свои контакты, и наш специалист свяжется с вами в ближайшее время."}
                  </p>
                </div>
              </div>

              {/* Right column - Contact Form */}
              <div className="lg:w-1/2">
                <ContactForm variant={variant} onSuccess={handleSuccess} />
              </div>
            </>
          )}
        </div>
      </CustomContainer>
    </section>
  );
};

export default ContactUsScreen;
