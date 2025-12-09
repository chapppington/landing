"use client";

import { FC } from "react";
import YandexMapContainer from "@/components/ui/YandexMapContainer";
import PhoneIcon from "@/shared/icons/PhoneIcon";
import EmailIcon from "@/shared/icons/EmailIcon";
import LocationIcon from "@/shared/icons/LocationIcon";
import { useFooterData } from "@/components/shared_screens/Footer/hooks/useFooterData";

const FooterMain: FC = () => {
  const { departmentItems, footerAddress, isLoading } = useFooterData();

  if (isLoading) {
    return (
      <div className="md:border-t md:border-white/30 md:pt-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-8 md:flex md:flex-col md:justify-between">
            <div className="animate-pulse">
              <div className="h-4 bg-white/20 rounded mb-4"></div>
              <div className="h-4 bg-white/20 rounded mb-3"></div>
              <div className="h-4 bg-white/20 rounded"></div>
            </div>
          </div>
          <div className="space-y-8 md:flex md:flex-col md:justify-between">
            <div className="animate-pulse">
              <div className="h-4 bg-white/20 rounded mb-4"></div>
              <div className="h-4 bg-white/20 rounded mb-3"></div>
              <div className="h-4 bg-white/20 rounded"></div>
            </div>
          </div>
          <div className="animate-pulse">
            <div className="h-4 bg-white/20 rounded mb-4"></div>
            <div className="h-4 bg-white/20 rounded mb-3"></div>
            <div className="h-64 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Разделяем отделы на две колонки
  const firstColumnDepartments = departmentItems.slice(0, 2);
  const secondColumnDepartments = departmentItems.slice(2, 4);

  return (
    <div className="md:border-t md:border-white/30 md:pt-12 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 with first 2 departments */}
        <div className="space-y-8 md:flex md:flex-col md:justify-between">
          {firstColumnDepartments.map((department, index) => (
            <div key={index} className="h-24">
              <p className="text-white/80 mb-4">• {department.name}</p>
              <div className="grid grid-cols-1 gap-3">
                {department.phone && (
                  <div className="flex items-center">
                    <PhoneIcon className="w-4 h-4 text-white mr-2" />
                    <a
                      href={`tel:${department.phone.replace(/\D/g, "")}`}
                      className="text-white"
                    >
                      {department.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center">
                  <EmailIcon className="w-4 h-4 text-white mr-2" />
                  <a href={`mailto:${department.email}`} className="text-white">
                    {department.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Column 2 with next 2 departments */}
        <div className="space-y-8 md:flex md:flex-col md:justify-between">
          {secondColumnDepartments.map((department, index) => (
            <div key={index} className="h-24">
              <p className="text-white/80 mb-4">• {department.name}</p>
              <div className="grid grid-cols-1 gap-3">
                {department.phone && (
                  <div className="flex items-center">
                    <PhoneIcon className="w-4 h-4 text-white mr-2" />
                    <a
                      href={`tel:${department.phone.replace(/\D/g, "")}`}
                      className="text-white"
                    >
                      {department.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center">
                  <EmailIcon className="w-4 h-4 text-white mr-2" />
                  <a href={`mailto:${department.email}`} className="text-white">
                    {department.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Column 3 with address and map */}
        <div>
          <p className="text-white/80 mb-4">• Адрес</p>
          <div className="flex items-center mb-3">
            <LocationIcon className="w-4 h-4 text-white mr-2" />
            <span className="text-white">
              {footerAddress || "Адрес не указан"}
            </span>
          </div>
          <YandexMapContainer />
        </div>
      </div>
    </div>
  );
};

export default FooterMain;
