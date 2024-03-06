import { useState } from "react";
import { Row, Tooltip, Button, notification, Typography, Space } from "antd";
import { MenuUnfoldOutlined, CaretRightOutlined } from "@ant-design/icons";
import { format } from "sql-formatter";
import AceEditor from "react-ace";
import ace from "ace-builds";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/theme-crimson_editor";
import "ace-builds/src-noconflict/theme-nord_dark";

ace.config.set("basePath", "https://url.to.a/folder/that/contains-ace-modes");

import modeJsonUrl from "ace-builds/src-noconflict/mode-json?url";
ace.config.setModuleUrl("ace/mode/json", modeJsonUrl);

import themeChromeUrl from "ace-builds/src-noconflict/theme-chrome?url";
ace.config.setModuleUrl("ace/theme/chrome", themeChromeUrl);

const { Title } = Typography;

const AceEditorComponent = ({setResult}: any) => {
  const [sqlValue, setSQLValue] = useState("");

  const formatSQLValue = (value: string) => {
    const formattedValue = format(value, {
      language: "postgresql",
      tabWidth: 2,
      keywordCase: "upper",
      linesBetweenQueries: 2,
    });
    setSQLValue(formattedValue);
  };

  const runQuery = async () => {
    try {
      const response = await fetch("api/execute/query", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "text/plain",
        },
        body: sqlValue,
      });

      const result = await response.json();
      
      console.log(result)

      if(result.success) {
        setResult(result.data)
        notification.success({
          message: 'Success',
          description: result.message,
          placement: "bottomRight",
          duration: 3,
        })
      }else if(result.status === 500){
        notification.error({
          message: "Error",
          description: result.message,
          placement: "bottomRight",
          duration: 3,
        })
      }else{
        notification.error({
          message: "Error",
          description: result.message,
          placement: "bottomRight",
          duration: 3,
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen p-4 mb-2">
      <Title level={5}>Editor</Title>
      <Row justify={"end"} align={"middle"} style={{ backgroundColor: '#f9f9f9' }}>
        <Space size={4}>
        <Tooltip title="Run">
          <Button
            type="default"
            size="small"
            icon={<CaretRightOutlined />}
            onClick={runQuery}
            disabled={sqlValue === ""}
          />
        </Tooltip>
        <Tooltip title="Format">
          <Button
            type="text"
            ghost
            onClick={() => formatSQLValue(sqlValue)}
            icon={<MenuUnfoldOutlined />}
          />
        </Tooltip>
        </Space>
      </Row>
      <div className="mt-2 h-full">
      <AceEditor
        mode="sql"
        theme="crimson_editor"
        onChange={(val) => setSQLValue(val)}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        value={sqlValue}
        width="100%"
        height="100%"
        style={{ overflow: "hidden" }}
      />
      </div>
    </div>
  );
};

export default AceEditorComponent;
