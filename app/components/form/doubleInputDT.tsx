import React, { useState } from 'react';
import { Input, Select, Space } from 'antd';
import TimePickerApp from '../product/TimePicker';
import dayjs from 'dayjs';

const { Option } = Select;

interface DoubleInputAppProps {
    ModeRetrait:any
} 
const DoubleInputAppDT: React.FC<DoubleInputAppProps> = ({ModeRetrait}) =>{
 
    return(
    <Space direction="vertical" className='flex flex-row'>
        <Input
            addonBefore={<TimePickerApp  ModeRetrait={ModeRetrait} />}
            defaultValue="Aujourd'hui" className='justify-center'/>
    </Space>)}

;

export default DoubleInputAppDT;