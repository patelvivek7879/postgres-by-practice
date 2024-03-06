import { Typography } from "antd";
const { Title } = Typography

const ResultComponent = ({result}: any) => {
  return (
    <div className="p-4">
      <Title level={5}>Results</Title>
      {JSON.stringify(result)}
    </div>
  )
}

export default ResultComponent
