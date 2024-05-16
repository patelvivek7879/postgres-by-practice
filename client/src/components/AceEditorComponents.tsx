import { useState, useEffect } from "react";
import {
  Row,
  Tooltip,
  Button,
  Typography,
  Space,
  Layout,
  Drawer,
  Alert,
  App,
} from "antd";
import {
  MenuUnfoldOutlined,
  CaretRightOutlined,
  CloseOutlined,
  MacCommandOutlined,
  WindowsOutlined,
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
import React from "react";
import { debounce } from "lodash";
ace.config.setModuleUrl("ace/theme/chrome", themeChromeUrl);

const { Title } = Typography;
const { Header } = Layout;

const AceEditorComponent = ({ setResult }: any) => {
  const [sqlValue, setSQLValue] = useState("");
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const { notification } = App.useApp();

  const theme =
    localStorage.getItem("preferredTheme") === "light"
      ? "crimson_editor"
      : "nord_dark";

  const navigate = useNavigate();

  const onKeyDownFn = (e: { keyCode: number; metaKey: any }) => {
    if (e.keyCode === 13 && e.metaKey && sqlValue) {
      runQuery();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDownFn);
    return () => {
      document.removeEventListener("keydown", onKeyDownFn);
    };
  });

  const formatSQLValue = (value: string) => {
    const formattedValue = format(value, {
      language: "postgresql",
      tabWidth: 2,
      keywordCase: "upper",
      linesBetweenQueries: 2,
    });
    setSQLValue(formattedValue);
  };

  const runQuery = debounce(async () => {
    setRunning(true);
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
    } finally {
      setRunning(false);
    }
  }, 500);

  return (
    <div className="w-full h-full">
      <Title level={4} className="pl-4">
        Editor
      </Title>
      <div className="p-4 mb-2" style={{ lineHeight: 3, borderRadius: 5 }}>
        {/* TODO: have to give user a feature from where user can change connection */}
        <Header className="py-0 px-2 h-10">
          <Row
            justify={"space-between"}
            align={"middle"}
            style={{ lineHeight: 3 }}
          >
            <span></span>
            <Space size={4}>
              <Tooltip
                title={
                  <small>
                    {navigator?.userAgentData?.platform === "macOS" ? (
                      <MacCommandOutlined />
                    ) : (
                      <WindowsOutlined />
                    )}{" "}
                    + Enter
                  </small>
                }
              >
                <Button
                  size="small"
                  onClick={runQuery}
                  disabled={sqlValue === "" || running}
                  loading={running}
                >
                  <Space size={1} align="center">
                    <CaretRightOutlined style={{ fontSize: 13 }} />
                    {"Execute "}
                  </Space>
                </Button>
              </Tooltip>
              <Tooltip title="Format query">
                <Button
                  type="text"
                  onClick={() => formatSQLValue(sqlValue)}
                  icon={<MenuUnfoldOutlined />}
                  size="small"
                />
              </Tooltip>
            </Space>
          </Row>
        </Header>
        <div className="h-full mt-2">
          <AceEditor
            theme={theme}
            mode="sql"
            onChange={(val) => setSQLValue(val)}
            name="UNIQUE_ID_OF_DIV"
            showPrintMargin={false}
            wrapEnabled={true}
            editorProps={{ $blockScrolling: true }}
            value={sqlValue}
            width="100%"
            height="100%"
            style={{ overflow: "auto", height: "300px", borderRadius: "5px" }}
          />
        </div>
        <Drawer
          title={<>Database Details</>}
          open={open}
          closeIcon={null}
          closable={false}
          maskClosable={true}
          onClose={() => setOpen(false)}
          width={"35%"}
          destroyOnClose
          extra={<CloseOutlined onClick={() => setOpen(false)} />}
          forceRender
        >
          <Alert
            message="Note:"
            description={
              <Space size={1} direction="vertical">
                <Typography.Paragraph className="mb-0">
                  {"Max 3 databases can be created"}{" "}
                </Typography.Paragraph>
                <Typography.Paragraph className="mb-0">
                  {"Max 5 tables can be created for each database"}
                </Typography.Paragraph>
              </Space>
            }
            type="info"
            showIcon
          />
          <Title level={5}>Database</Title>
          <Title level={5}>Tables</Title>
        </Drawer>
      </div>
    </div>
  );
};

export default AceEditorComponent;
