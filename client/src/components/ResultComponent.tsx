import { Typography, Layout, Table, Space } from "antd";
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
    <Space direction="vertical" className="p-4 w-full h-full" style={{ width: '100%', height: '100%'}}>
      <Title level={5} className="m-0">
        Results
      </Title>
      {!result ? (
        <Typography.Text type='secondary'>{'No data available'}</Typography.Text>
      ) : (
        <Table columns={dynamicCol} dataSource={result} size="small" scroll={{ y: 200 }} pagination={false}/>
      )}
     </Space>
  );
};

export default ResultComponent;
