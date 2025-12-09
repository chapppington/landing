import { FC } from "react";

const ForumContactInfo: FC = () => {
  const email = "info@sibkomplekt.ru";

  return (
    <div className="flex items-center h-full">
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

export default ForumContactInfo;
