import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 96 96" {...props}>
      <circle cx="48" cy="48" r="48" fill="#1969FF"/>
      <path d="M48 24L32 40v16l16-16 16 16V40L48 24z" fill="white"/>
      <path d="M48 72L64 56V40L48 56 32 40v16l16 16z" fill="white"/>
    </Svg>
  );
};

export default Icon;
