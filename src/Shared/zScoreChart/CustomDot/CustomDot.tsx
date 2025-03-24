import { FC } from "react";
import { DotProps } from "recharts";
import { DEFAULT_COLOR } from "../Utils/Constants";

interface ICustomDotProps extends DotProps {
  value?: number;
  yUpperLimit: number;
  yLowerLimit: number;
  customColor: string
}

const CustomDot: FC<ICustomDotProps> = ({ yUpperLimit, yLowerLimit, customColor, value, cx, cy }) => {
  const COLOR = value && yLowerLimit < value && value < yUpperLimit ? customColor : 'red';
  
  return ( 
    <svg>
      <circle cx={cx} cy={cy} r="3" stroke={COLOR || DEFAULT_COLOR} strokeWidth="1" fill="#fff" className="recharts-dot recharts-line-dot" />
    </svg>
  );
}
 
export default CustomDot;