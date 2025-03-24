export interface IData extends Record<string, string | number> {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

export interface ILineParam {
  dataKey: keyof IData,
  color: string
}