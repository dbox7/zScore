import { data, lineParams } from "./Shared/zScoreChart/Utils/Constants";
import ZScoreChart from "./Shared/zScoreChart/zScoreChart";

import './App.css'

const App = () => (
  <div className="appWrapper">
    <ZScoreChart 
      data={data} 
      lineParams={lineParams} 
      zScoreModule={1} 
      XAxisDataKey={'name'} 
    />
  </div>
);

export default App
