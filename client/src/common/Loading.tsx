import { Loading3QuartersOutlined, LoadingOutlined } from "@ant-design/icons";
import { FC } from "react";

type LoadingProps = {
    iconType: '3Quarters' | 'normal',
    iconSize?: 14 | 24 | 48,
}
const Loading: FC<LoadingProps> = ({ iconType, iconSize }) => {
  
    if(iconType === '3Quarters'){
        return <Loading3QuartersOutlined spin style={{ fontSize: iconSize ? iconSize :  48 }} />
    }

    return (
      <LoadingOutlined spin style={{ fontSize: iconSize ? iconSize  : 48  }} />
  );
};

export default Loading;
