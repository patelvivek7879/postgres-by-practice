import { Typography, Layout, Table, Space } from "antd";
import "react-json-pretty/themes/monikai.css";

import { capitalize } from "lodash";
import React from "react";

const { Title } = Typography;

const ResultComponent = ({ result }: { result: any }) => {
  const dynamicCol =
    result &&
    Object.keys(result[0]).map((item) => ({
      key: item,
      title: capitalize(item),
      dataIndex: item,
    }));

  return (
    <Space
      direction="vertical"
      className="p-4 w-full h-full"
      style={{ width: "100%", height: "100%" }}
    >
      <Space size={2} align="center">
        <Title level={5} className="m-0" style={{marginBottom: 0}}>
          {"Results"}
        </Title>
        {result && result?.length ? (
          <small>{`(Rows: ${result?.length})`}</small>
        ) : null}
      </Space>
      {!result ? (
        <Typography.Text type="secondary">
          {"No data available"}
        </Typography.Text>
      ) : (
        <Table
          columns={dynamicCol}
          dataSource={result}
          size="small"
          scroll={{ y: 156 }}
          pagination={false}
        />
      )}
    </Space>
  );
};

export default ResultComponent;
