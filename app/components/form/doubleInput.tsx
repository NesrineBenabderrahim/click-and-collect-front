import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Cascader, Input, Select, Space } from 'antd';

const { Option } = Select;

interface DoubleInputAppProps {
    data:any
} 
const DoubleInputApp: React.FC<DoubleInputAppProps>= ({data}) => (
    <Space direction="vertical">
        <Input addonBefore={data.PostalCode} defaultValue={data.Address}  className='justify-content'/>
    </Space>
);

export default DoubleInputApp;