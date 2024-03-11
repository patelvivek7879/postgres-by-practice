import { Space, Switch, Typography } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Text } = Typography;

const ThemeSwitch = () => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("preferredTheme") === "dark" ? "dark" : "light",
  );

  const changeTheme = (e: any) => {
    setTheme(e ? "dark": "light");
  };

  useEffect(() => {
      const storedTheme = localStorage.getItem("preferredTheme");
      if(storedTheme){
          localStorage.setItem("preferredTheme", theme );
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
