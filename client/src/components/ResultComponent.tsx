import { Typography, Layout } from "antd";
import JSONPretty from 'react-json-pretty';

import 'react-json-pretty/themes/monikai.css';
import JSONPrettyMon from 'react-json-pretty/dist/monikai';

const { Title } = Typography

const ResultComponent = ({result}:{result: any}) => {
  return (
    <div className="p-4 h-full">
      <Title level={5} className="m-0">Results</Title>
      <JSONPretty 
        theme={JSONPrettyMon}
        style={{ height: '150px', overflowY: 'scroll'}} 
        id="json-pretty" 
        data={result}></JSONPretty>
    </div>
  )
}

export default ResultComponent
