import { FC } from "react";
import { useNavbarConfigPublic } from "@/hooks/useNavbarConfigPublic";

const ContactInfo: FC = () => {
  const { config } = useNavbarConfigPublic();
  const phone = config?.navbarPhone || "";
  const email = config?.navbarEmail || "";

  return (
    <div className="flex items-center h-full divide-x divide-white/30">
      {phone && (
        <a
          href={`tel:${phone.replace(/\D/g, "")}`}
          className="text-white text-sm px-8 flex items-center h-full select-none relative overflow-hidden group"
        >
          <span className="relative z-10 group-hover:text-gray-900 transition-colors">
            {phone}
          </span>
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </a>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          className="text-white text-sm px-8 flex items-center h-full select-none relative overflow-hidden group"
        >
          <span className="relative z-10 group-hover:text-gray-900 transition-colors">
            {email}
          </span>
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </a>
      )}
    </div>
  );
};

export default ContactInfo;
