import { Typography, Layout } from "antd";
import JSONPretty from 'react-json-pretty';

import 'react-json-pretty/themes/monikai.css';
import JSONPrettyMon from 'react-json-pretty/dist/monikai';

const { Title } = Typography

const ResultComponent = ({result}:{result: any}) => {
  return (
    <Layout className="p-4">
      <Title level={5}>Results</Title>
      <JSONPretty 
        theme={JSONPrettyMon}
        style={{ height: '300px', overflowY: 'scroll'}} 
        id="json-pretty" 
        data={result}></JSONPretty>
    </Layout>
  )
}

export default ResultComponent
