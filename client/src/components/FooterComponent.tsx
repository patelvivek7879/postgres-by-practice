import { getCurrentYear } from '@/utils/Time';
import{ Button, Layout, Row, Space, Typography }  from 'antd';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';

const  { Footer } = Layout;
const { Text} = Typography;

const FooterComponent = () => {
  return (
    <Footer>
    <Row justify={"center"} align={"middle"}>
      {getCurrentYear()} Practice Postgres ™️, All Rights Reserved
    </Row>
    <Row justify={"center"} align={"middle"}>
      <Space size={2}>
        <Text>Developed By</Text>
        <Text strong> Vivek Patel</Text>
        <Button
          type="text"
          size="small"
          icon={<GithubOutlined />}
          onClick={() =>
            window.open(
              "https://github.com/patelvivek7879/postgres-by-practice",
              "_blank"
            )
          }
        />
        <Button
          type="text"
          size="small"
          icon={<LinkedinOutlined />}
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/patelvivek7879",
              "_blank"
            )
          }
        />
      </Space>
    </Row>
  </Footer>
  )
}

export default FooterComponent
