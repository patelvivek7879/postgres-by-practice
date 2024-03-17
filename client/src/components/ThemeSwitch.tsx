import { Space, Switch, Typography } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Text } = Typography;

const ThemeSwitch = ({setThemeVal}: any) => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("preferredTheme") === "dark" ? "dark" : "light",
  );

  const changeTheme = (e: any) => {
    setThemeVal(e);
    setTheme(e ? "dark" : "light");
    if(theme === "dark") {
      localStorage.setItem("preferredTheme", 'dark' );
    }else{
      localStorage.setItem("preferredTheme", 'light' );
    }
  };

  useEffect(() => {
    if(theme === "dark") {
      localStorage.setItem("preferredTheme", 'dark' );
    }else{
      localStorage.setItem("preferredTheme", 'light' );
    }
  }, [theme]);

  return (
    <Space>
      <Text>Light</Text>
      <Switch
        checkedChildren={<MoonOutlined size={32} />}
        unCheckedChildren={<SunOutlined size={32} />}
        onChange={(e) => changeTheme(e)}
        checked={theme === "dark" ? true : false}
      ></Switch>
      <Text>Dark</Text>
    </Space>
  );
};

export default ThemeSwitch;
