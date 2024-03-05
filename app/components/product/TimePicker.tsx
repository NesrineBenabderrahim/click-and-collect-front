
import dayjs from 'dayjs';
import { TimePicker } from 'antd';


const format = 'HH:mm';
interface handleTimeChangeProps{
    handleTimeChange?:(time:any)=>void
    ModeRetrait?:any
}
const TimePickerApp: React.FC<handleTimeChangeProps> = ({ ModeRetrait ,handleTimeChange}) => {

return(
<TimePicker defaultValue={Object.keys(ModeRetrait).length === 0 ? dayjs("12:00", format): dayjs( ModeRetrait.Time, format) } onChange={handleTimeChange} format={format} minuteStep={15}  className='w-[100px] h-full'/>
)}


export default TimePickerApp;