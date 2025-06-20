
import dayjs from 'dayjs';
import { TimePicker } from 'antd';
import useCard from '@/app/hooks/useCard';


const format = 'HH:mm';
interface handleTimeChangeProps{
    handleTimeChange?:(time:any)=>void

}
const TimePickerApp: React.FC<handleTimeChangeProps> = ({handleTimeChange}) => {

    const {ModeRetrait}=useCard()
return(
<TimePicker defaultValue={ModeRetrait == null?  dayjs("12:00", format):dayjs( ModeRetrait.Time, format) } onChange={handleTimeChange} format={format} minuteStep={15}  className='w-[100px] h-full'/>
)}


export default TimePickerApp;