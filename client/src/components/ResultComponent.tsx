import { Typography } from "antd";
import JSONPretty from 'react-json-pretty';


const { Title } = Typography

const ResultComponent = ({result}: any) => {
  return (
    <div className="p-4">
      <Title level={5}>Results</Title>
      <JSONPretty style={{ height: '300px', overflowY: 'scroll'}} id="json-pretty" data={result}></JSONPretty>
    </div>
  )
}

export default ResultComponent
