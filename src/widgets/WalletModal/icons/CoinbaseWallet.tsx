import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 96 96" {...props}>
      <circle cx="48" cy="48" r="48" fill="#0052FF"/>
      <path d="M48 24c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm0 44c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z" fill="white"/>
      <circle cx="48" cy="48" r="12" fill="white"/>
    </Svg>
  );
};

export default Icon;
