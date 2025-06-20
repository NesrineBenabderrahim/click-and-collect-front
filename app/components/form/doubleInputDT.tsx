import React, { useState } from 'react';
import { Input, Select, Space } from 'antd';
import TimePickerApp from './TimePicker';
import dayjs from 'dayjs';

const { Option } = Select;

interface DoubleInputAppProps {
    ModeRetrait:any
} 
const DoubleInputAppDT: React.FC<DoubleInputAppProps> = ({ModeRetrait}) =>{
 
    return(
    <Space direction="vertical" className=''>
        <Input
            addonBefore={<TimePickerApp  ModeRetrait={ModeRetrait} />}
            defaultValue="Aujourd'hui" className=''/>
    </Space>)}

;

export default DoubleInputAppDT;