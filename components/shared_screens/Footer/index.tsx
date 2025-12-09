"use client";

import { FC } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import FooterTop from "@/components/shared_screens/Footer/components/FooterTop";
import FooterMain from "@/components/shared_screens/Footer/components/FooterMain";
import FooterBottom from "@/components/shared_screens/Footer/components/FooterBottom";

const Footer: FC = () => {
  return (
    <footer id="footer" className="bg-transparent py-12">
      <CustomContainer>
        <FooterTop />
        <FooterMain />
        <FooterBottom />
      </CustomContainer>
    </footer>
  );
};

export default Footer;
