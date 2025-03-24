import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import { useEffect, useState } from "react";
import CustomDot from "./CustomDot/CustomDot";
import { ILineParam } from "./Utils/Types";
import { DEFAULT_COLOR, FULL_PERCENT } from "./Utils/Constants";
import CustomLegend from "./CustomLegend/CustomLegend";

interface IZScoreChartProps<T> extends CategoricalChartProps {
  data: T[],
  lineParams: ILineParam[],
  zScoreModule: number,
  XAxisDataKey: keyof T
}

interface IGradientParams extends ILineParam {
  yUpperDataLimit: number,
  yLowerDataLimit: number,
  yUpperGradientLimit: number,
  yLowerGradientLimit: number
}

const ZScoreChart = <T extends Record<string, string | number>,>(
  { 
    data, 
    lineParams, 
    zScoreModule, 
    XAxisDataKey, 
    ...props 
  }: IZScoreChartProps<T>
) => {
  const [gradientParams, setGradientParams] = useState<IGradientParams[]>([]);

  useEffect(() => {
    const processedDataKeys = lineParams.map(({ dataKey, color }) => {
      let sum = 0;
      let minValue = +data[0][dataKey];
      let maxValue = +data[0][dataKey];
      
      data.forEach(item => {
        const itemValue = +item[dataKey];

        sum += itemValue;
        minValue = minValue > itemValue ? itemValue : minValue;
        maxValue = maxValue < itemValue ? itemValue : maxValue;
      });

      const average = sum / data.length;
      const standartOffset = Math.sqrt(
        data.reduce(
          (sum, item) => sum + (+item[dataKey] - average) ** 2 / data.length,
          0
        )
      );

      const yUpperDataLimit = zScoreModule * average + standartOffset;
      const yLowerDataLimit = zScoreModule * average - standartOffset;
      const yUpperGradientLimit = FULL_PERCENT - ((yUpperDataLimit - minValue) / (maxValue - minValue)) * FULL_PERCENT;
      const yLowerGradientLimit = FULL_PERCENT - ((yLowerDataLimit - minValue) / (maxValue - minValue)) * FULL_PERCENT;

      return {
        dataKey,
        color,
        yUpperDataLimit,
        yLowerDataLimit,
        yUpperGradientLimit,
        yLowerGradientLimit
      }   
    })

    setGradientParams(processedDataKeys);
  }, [data, lineParams, zScoreModule])

  return ( 
    <div style={{ width: '100%', maxWidth: '700px' }}>
      <ResponsiveContainer width="100%" height={300} minWidth={300}>
        <LineChart
          width={800}
          height={500}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          {...props}
          data={data}
        >
          <XAxis dataKey={XAxisDataKey as string} />
          <YAxis />
          <Tooltip />
          <Legend content={<CustomLegend />} /> 
          <defs>
            {gradientParams.map(gradient => (
              <linearGradient 
                key={`gradient-${gradient.dataKey as string}`} 
                id={`gradient-${gradient.dataKey as string}`} 
                x1="0" 
                y1="0" 
                x2="0" 
                y2="100%"
              >
                <stop offset="0%" stopColor="red" />
                <stop offset={`${gradient.yUpperGradientLimit}%`} stopColor="red" />
                <stop offset={`${gradient.yUpperGradientLimit}%`} stopColor={gradient.color || DEFAULT_COLOR} />
                <stop offset={`${gradient.yLowerGradientLimit}%`} stopColor={gradient.color || DEFAULT_COLOR} />
                <stop offset={`${gradient.yLowerGradientLimit}%`} stopColor="red" />
                <stop offset="100%" stopColor="red" />
              </linearGradient>
            ))}
          </defs>
          
          {lineParams.map(({dataKey}, idx) => 
            <Line
              key={dataKey}
              type='monotone'
              dataKey={dataKey as string}
              stroke={`url(#gradient-${dataKey as string})`}
              dot={!!gradientParams.length && 
                <CustomDot
                  yUpperLimit={gradientParams[idx].yUpperDataLimit} 
                  yLowerLimit={gradientParams[idx].yLowerDataLimit} 
                  customColor={gradientParams[idx].color}
                />
              }
              activeDot={{ fill: gradientParams[idx]?.color || DEFAULT_COLOR }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
 
export default ZScoreChart;