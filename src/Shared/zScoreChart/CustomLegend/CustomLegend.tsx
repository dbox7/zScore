import { LegendProps } from "recharts";
import { DEFAULT_COLOR } from "../Utils/Constants";

const CustomLegend = (props: LegendProps) => {
  const { payload, width } = props;
  
  return ( 
    <div 
      className="recharts-legend-wrapper" 
      style={{
        position: 'absolute',
        width: width, 
        height: 'auto', 
        left: '50px', 
      }}
    >
      <ul 
        className="recharts-default-legend" 
        style={{
          padding: '0px',
          margin: '0px',
          textAlign: 'center',
        }}
      >
        {
          payload!.map((entry, index) => (
            <li 
              key={`item-${index}`} 
              className="recharts-legend-item legend-item-0" 
              style={{
                display: 'inline-block',
                marginRight: '10px',
              }}
            >
              <svg 
                className="recharts-surface" 
                width="14" 
                height="14" 
                viewBox="0 0 32 32" 
                style={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  marginRight: '4px'
                }}
              >
                <path 
                  strokeWidth="4" 
                  fill="none" 
                  stroke={entry?.payload?.activeDot?.fill || DEFAULT_COLOR} 
                  d="M0,16h10.666666666666666 A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
                    H32M21.333333333333332,16 A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16" 
                  className="recharts-legend-icon"
                />
              </svg>
              <span className="recharts-legend-item-text">{entry.value}</span>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
 
export default CustomLegend;