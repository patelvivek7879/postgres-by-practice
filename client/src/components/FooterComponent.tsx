import { getCurrentYear } from '@/utils/Time';
import{ Button, Layout, Row, Space, Typography }  from 'antd';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';

const  { Footer } = Layout;
const { Text} = Typography;

const FooterComponent = () => {
  return (
    <Footer className='shadow-lg' style={{ borderTop: '1px solid #fff'}}>
    <Row justify={"center"} align={"middle"}>
      <Text type="secondary">
      {getCurrentYear()} Practice Postgres ™️, All Rights Reserved
      </Text>
    </Row>
    <Row justify={"center"} align={"middle"}>
      <Space size={2}>
        <Text type='secondary'>Developed By</Text>
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
