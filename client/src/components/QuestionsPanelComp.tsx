import { Button, Row, Typography } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";
import { useState } from "react";

const QuestionsPanelComp = ({ text }: { text: string }) => {
  const [isCopying, setIsCopying] = useState(false);

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
          borderBottom: "1px solid #595959",
        }}
      >
        <code style={{ fontSize: 12 }} className="ml-2">
          SQL
        </code>
        <CopyToClipboard text={text}>
          <Button
            className="mr-1"
            size={"small"}
            type={"text"}
            onClick={() => {
              setIsCopying(true);
              setTimeout(() => {
                setIsCopying(false);
              }, 1000);
            }}
            icon={
              !isCopying ? (
                <CopyOutlined style={{ fontSize: 12, color: "#bfbfbf" }} />
              ) : (
                <CheckOutlined style={{ fontSize: 12, color: "#bfbfbf" }} />
              )
            }
          >
            <Typography.Text style={{ fontSize: 12, color: "#bfbfbf" }}>
              {!isCopying ? "Copy code" : "copied "}
            </Typography.Text>
          </Button>
        </CopyToClipboard>
      </Row>
      <SyntaxHighlighter
        language="sql"
        customStyle={{
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          marginTop: 0,
        }}
        wrapLines={true}
        wrapLongLines={true}
        style={darcula}
      >
        {text}
      </SyntaxHighlighter>
    </div>
  );
};

export default QuestionsPanelComp;
