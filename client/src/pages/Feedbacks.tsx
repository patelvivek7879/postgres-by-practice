import Loading from "@/common/Loading";
import Navbar from "@/common/Navbar";
import FooterComponent from "@/components/FooterComponent";
import {
  Table,
  Layout,
  Slider,
  Button,
  Tabs,
  Input,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Feedbacks = ({ setThemeVal, loggedInUser }: any) => {
  const [feedbackData, setFeedbackData] = useState({
    loading: true,
    data: null,
    error: null,
  });

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("/api/v1/feedback?offset=0&size=10");
      const jsonRes = await response.json();
      if (jsonRes.status === 200) {
        setFeedbackData({
          loading: false,
          data: jsonRes.data,
          error: null,
        });
      } else {
        setFeedbackData({
          loading: false,
          data: null,
          error: null,
        });
      }
    } catch (error: any) {
      setFeedbackData({ loading: false, data: null, error: error });
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  if (feedbackData.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading iconType={"3Quarters"} iconSize={48} />
      </div>
    );
  }

  if (feedbackData.error !== null) {
    return (
      <div className="flex justify-center items-center h-screen">
        {JSON.stringify(feedbackData.error)}
      </div>
    );
  }

  const cols = [
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
    },
    {
      key: "message",
      dataIndex: "message",
      title: "Message",
    },
    {
      key: "from",
      dataIndex: "from",
      title: "From",
    },
    {
      key: "time",
      dataIndex: "createdAt",
      title: "Created At",
      render: (text) => {
        const time = new Date(Number(text));
        return `${time.getHours()} : ${time.getMinutes()}  ${time.getDate()}/${
          time.getMonth() + 1
        }/${time.getFullYear()} ${time.getUTCDay()} `;
      },
      sort: true,
      sorter: (a, b) => {
        return b - a;
      },
    },
  ];

  const tabsItems = [
    {
      key: "feedbacks",
      label: "Feedbacks",
      children: (
        <Table
          dataSource={feedbackData.data}
          columns={cols}
          pagination={false}
          size={"small"}
        />
      ),
    },
    {
      key: "operations",
      label: "Operations",
      children: "Operations",
    },
  ];

  return (
    <div className="flex w-full h-screen">
      <Layout>
        <Navbar
          setThemeVal={setThemeVal}
          loggedInUser={loggedInUser}
          isAdminRoute={true}
        />
        <Layout>
          <Sider
            width={280}
            className="flex"
            collapsible
            theme={
              localStorage.getItem("prefferedTheme") === "dark"
                ? "dark"
                : "light"
            }
          ></Sider>
          <Layout className="m-8 p-4">
            <Space>
              <Typography.Text className="text-xl" strong>Search:</Typography.Text>
              <Input className="w-96" size="large" allowClear prefix={<SearchOutlined />}/>
            </Space>
            <Tabs className="mt-8" items={tabsItems} />
          </Layout>
        </Layout>
            <FooterComponent />
      </Layout>
    </div>
  );
};

export default Feedbacks;
