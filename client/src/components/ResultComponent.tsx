import { Typography, Layout } from "antd";
import JSONPretty from "react-json-pretty";

import "react-json-pretty/themes/monikai.css";
import JSONPrettyMon from "react-json-pretty/dist/monikai";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const { Title } = Typography;

const ResultComponent = ({ result }: { result: any }) => {
  return (
    <div className="p-4 h-full">
      <Title level={5} className="m-0">
        Results
      </Title>
      {!result ? (
        <Typography.Text type='secondary'>Nothing to show</Typography.Text>
      ) : (
        <JSONPretty
          theme={JSONPrettyMon}
          style={{ height: "240px", overflowY: "scroll" }}
          id="json-pretty"
          data={result}
        ></JSONPretty>
      )}
    </div>
  );
};

export default ResultComponent;
