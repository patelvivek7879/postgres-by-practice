import { Typography }  from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const NavbarTitleLogo = () => {
    const navigate = useNavigate();
  return (
    <Title level={3} onClick={()=> navigate('/')} className="mb-0 text-white cursor-pointer" style={{ margin: 0 }}>
          PbyP
    </Title>
  )
}

export default NavbarTitleLogo
