import { Button, Row } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";

const QuestionsPanelComp = ({ text }: { text: string }) => {
  return (
    <div className="relative">
      <Row
        justify={"space-between"}
        align={"middle"}
        className="bg-slate-900"
        style={{
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          color: "#bfbfbf",
          borderBottom: '1px solid #595959',
        }}
      >
        <code style={{ fontSize: 12 }} className="ml-1">
          SQL
        </code>
        <CopyToClipboard text={text}>
          <Button
            className="mr-1"
            size={"small"}
            type={"text"}
            icon={<CopyOutlined style={{ fontSize: 12, color: "#bfbfbf" }} />}
          />
        </CopyToClipboard>
      </Row>
      <SyntaxHighlighter
        language="sql"
        customStyle={{
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          marginTop: 0,
        }}
        style={darcula}
      >
        {text}
      </SyntaxHighlighter>
    </div>
  );
};

export default QuestionsPanelComp;
