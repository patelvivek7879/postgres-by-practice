import { Typography, Table, Space } from "antd";
import "react-json-pretty/themes/monikai.css";
import React from "react";
import { isArray } from "lodash";

const { Title, Text, Paragraph } = Typography;

const ResultComponent = ({ result }: { result: any }) => {
  const dynamicCol =
    result && result?.length &&
    Object.keys(result[0]).map((item) => ({
      key: item,
      title: item,
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
        {isArray(result) && result?.length ? (
          <small>{`(Rows: ${result?.length})`}</small>
        ) : null}
      </Space>
      {!result ? (
        <Typography.Text type="secondary">
          {"No data available"}
        </Typography.Text>
      ) : (
        isArray(result) && result?.length > 0 ? 
        <Table
          columns={dynamicCol}
          dataSource={result}
          size="small"
          scroll={{ y: 156 }}
          pagination={false}
          rowKey={'name'}
        /> : typeof(result) === 'string' ?
        <Paragraph type="secondary">
        {result}
        </Paragraph>
        :<>
         <Text type='secondary'>
          {'No rows returned'}
        </Text>
        </>
      )}
    </Space>
  );
};

export default ResultComponent;
