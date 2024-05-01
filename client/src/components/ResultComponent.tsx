import { Typography, Layout, Table } from "antd";
import "react-json-pretty/themes/monikai.css";

import { capitalize } from "lodash";

const { Title } = Typography;

const ResultComponent = ({ result }: { result: any }) => {

  const dynamicCol = result && Object.keys(result[0]).map((item)=>({
      key: item,
      title: capitalize(item),
      dataIndex: item,
  }))

  return (
    <div className="p-4 h-full">
      <Title level={5} className="m-0">
        Results
      </Title>
      {!result ? (
        <Typography.Text type='secondary'>Nothing to show</Typography.Text>
      ) : (
        <Table columns={dynamicCol} dataSource={result} size="small"/>
      )}
    </div>
  );
};

export default ResultComponent;
