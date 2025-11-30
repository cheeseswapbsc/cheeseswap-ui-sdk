import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 96 96" {...props}>
      <circle cx="48" cy="48" r="48" fill="black"/>
      <path d="M42.2 32.3c-1.5.7-1.7 1.3-2 6.4l-.3 5.4-4.8.3c-4.4.3-4.9.5-5.9 2.8-1.4 3.1-1.4 8.3 0 11.4 1 2.3 1.5 2.5 5.9 2.8l4.8.3.3 5.4c.3 5.1.5 5.7 2 6.4 2.1 1 8.3 1 10.4 0 1.5-.7 1.7-1.3 2-6.4l.3-5.4 4.8-.3c4.4-.3 4.9-.5 5.9-2.8 1.4-3.1 1.4-8.3 0-11.4-1-2.3-1.5-2.5-5.9-2.8l-4.8-.3-.3-5.4c-.3-5.1-.5-5.7-2-6.4-2.1-1-8.3-1-10.4 0z" fill="white"/>
    </Svg>
  );
};

export default Icon;
