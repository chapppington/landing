"use client";

import { FC, useState } from "react";
import { useNavbarConfigPublic } from "@/hooks/useNavbarConfigPublic";
import { Modal } from "@/components/ui/Modal";
import ContactForm from "@/components/ContactForm";

const CTAButton: FC = () => {
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { config } = useNavbarConfigPublic();
  const text = config?.navbarCtaButtonText || "Оставить заявку";

  const handleClose = () => {
    setOpen(false);
    // Небольшая задержка, чтобы модалка успела закрыться перед сбросом состояния
    setTimeout(() => {
      setIsSuccess(false);
    }, 300);
  };

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="h-full px-8 bg-white text-gray-900 text-sm hover:bg-gray-50 transition-all duration-300 select-none relative overflow-hidden group"
      >
        <span className="relative z-10">{text}</span>
        <span className="absolute inset-0 bg-gray-200 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
      </button>
      <Modal
        isOpen={open}
        onClose={handleClose}
        overlayClassName="bg-black/70"
        contentClassName="bg-blue-950 border border-white/20 "
      >
        <div className="text-white">
          {isSuccess ? (
            // Сообщение об успехе
            <div className="text-center py-8">
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
                <h3 className="text-2xl font-semibold mb-2">
                  Заявка отправлена!
                </h3>
                <p className="text-white/70">
                  Наши менеджеры скоро с вами свяжутся
                </p>
              </div>
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-white text-blue-950 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Закрыть
              </button>
            </div>
          ) : (
            // Форма
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold">Оставить заявку</h3>
                <p className="text-white/70 mt-1">
                  Заполните форму, и мы свяжемся с вами в ближайшее время.
                </p>
              </div>
              <ContactForm variant="request" onSuccess={handleSuccess} />
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default CTAButton;
