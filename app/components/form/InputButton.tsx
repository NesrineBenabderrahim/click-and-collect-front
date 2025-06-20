import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

const { Search } = Input;

const suffix = (
<AudioOutlined
/>
);

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
interface InputButtonProps{
    label?:string
    placeholder?:string
}

const InputButton: React.FC<InputButtonProps> = ({label,placeholder}) => (
<Space direction="vertical">

<Search
    placeholder={placeholder}
    allowClear
    enterButton={label}
    size="large"
    onSearch={onSearch}
    className='bg-gray-700 rounded-lg w-[100%] '


/>

</Space>
);

export default InputButton;