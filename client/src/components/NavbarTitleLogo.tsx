import { Typography }  from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const NavbarTitleLogo = () => {
    const navigate = useNavigate();
  return (
    <Title level={4} onClick={()=> navigate('/')} className="mb-0 p-2 border rounded  text-white cursor-pointer" style={{ margin: 0 }}>
          Practice Postgres
    </Title>
  )
}

export default NavbarTitleLogo
