import { useState } from "react";
import {
  Row,
  Tooltip,
  Button,
  notification,
  Typography,
  Space,
  Layout,
  Select,
  Drawer,
} from "antd";
import {
  MenuUnfoldOutlined,
  CaretRightOutlined,
  SaveOutlined,
  InfoCircleOutlined 
} from "@ant-design/icons";
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
import { useNavigate } from "react-router-dom";
ace.config.setModuleUrl("ace/theme/chrome", themeChromeUrl);

const { Title } = Typography;
const { Header } = Layout;

const AceEditorComponent = ({ setResult }: any) => {
  const [sqlValue, setSQLValue] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

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
      const response = await fetch("/api/v1/execute/query", {
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

      console.log(result);

      if (result.success) {
        setResult(result.data);
        notification.success({
          message: "Success",
          description: result.message,
          placement: "bottomRight",
          duration: 3,
        });
      } else if (result.status === 500) {
        notification.error({
          message: "Error",
          description: result.message,
          placement: "bottomRight",
          duration: 3,
        });
      } else if (result.status === 401) {
        notification.error({
          message: "Error",
          description: result.message,
          placement: "bottomRight",
          duration: 3,
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openConnectionDrawer = () =>{
    setOpen(true);
  }

  return (
    <div className="h-screen p-4 mb-2">
      {/* <Title level={5}>Editor</Title> */}
      <Header className="py-0 px-2 h-10" style={{ borderRadius: 5}}>
        <Row
          justify={"space-between"}
          align={"middle"}
          style={{ lineHeight: 3 }}
        >
          <Space>
            <>
              <small>Database:</small>
              <Select
                // style={{ width: 100 }}
                className="w-28"
                options={[
                  {
                    label: "JSON",
                    value: "json",
                  },
                ]}
              ></Select>
            </>
            <>
              <small>Table:</small>
              <Select
                className="w-28"
                options={[
                  {
                    label: "JSON",
                    value: "json",
                  },
                ]}
              ></Select>
            </>
            <Button type="text" icon={<InfoCircleOutlined />} onClick={openConnectionDrawer}>
            </Button>
          </Space>
          <Space size={4}>
            <Button
              icon={<SaveOutlined />}
              onClick={() => console.log("Saving...")}
              disabled={sqlValue === ""}
            ></Button>
            <Tooltip title="Run">
              <Button
                icon={<CaretRightOutlined />}
                onClick={runQuery}
                disabled={sqlValue === ""}
              >
                Run
              </Button>
            </Tooltip>
            <Tooltip title="Format">
              <Button
                type="text"
                onClick={() => formatSQLValue(sqlValue)}
                icon={<MenuUnfoldOutlined />}
              />
            </Tooltip>
          </Space>
        </Row>
      </Header>
      <div className="mt-2 h-full">
        <AceEditor
          theme={
            localStorage.getItem("preferredTheme") === "light"
              ? "crimson_editor"
              : "nord_dark"
          }
          mode="sql"
          onChange={(val) => setSQLValue(val)}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          value={sqlValue}
          width="100%"
          height="100%"
          style={{ overflow: "hidden" }}
        />
      </div>
      <Drawer open={open} closable onClose={()=> setOpen(false)}>
        <Title level={5}>Database</Title>
        <Title level={5}>Tables</Title>
      </Drawer>
    </div>
  );
};

export default AceEditorComponent;
