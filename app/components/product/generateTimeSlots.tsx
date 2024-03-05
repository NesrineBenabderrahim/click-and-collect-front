export const generateTimeSlots = () => {
    const currentDate = new Date();

    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const myDate = (`${currentHours}:${currentMinutes}:`)


    console.log(`Current Time: ${myDate}`);
    const timeSlots = [];

    const startTimes = ['12:00', '14:30'];
    const startTimes1 = ['18:15', '23:00']; // Set your desired start times

    const [hours, minutes] = startTimes[1].split(':');
    console.log("hours",hours)

    const addTimeSlots = (startTime:any, iterations:any) => {
        for (let i = 0; i < iterations; i++) {
            const time = new Date(startTime.getTime() + i * 15 * 60 * 1000);
            const formattedTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

            timeSlots.push(
                <option key={time.getTime()} value={formattedTime}>
                    {formattedTime}
                </option>
            );
        }
    };
if (currentHours <= parseInt(hours) && currentMinutes <= parseInt(minutes)){
    for (let j = 0; j < startTimes.length; j++) {
        const [hours, minutes] = startTimes[j].split(':');
        const startTime = new Date();
        startTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
        const endTime = new Date(startTime.getTime() + (2 * 60 + 30) * 60 * 1000); // 2 hours and 30 minutes
        const timeDifference = (endTime.getTime() - startTime.getTime()) / (15 * 60 * 1000);

        addTimeSlots(startTime,5);
    } 
    timeSlots.push(
        <option key="separator" disabled>
            ----
        </option>
        
    );

    for (let j = 0; j < startTimes1.length; j++) {
        const [hours, minutes] = startTimes1[j].split(':');
        const startTime = new Date();
        startTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
        const endTime = new Date(startTime.getTime() + (2 * 60 + 30) * 60 * 1000); // 2 hours and 30 minutes
        const timeDifference = (endTime.getTime() - startTime.getTime()) / (15 * 60 * 1000);

        addTimeSlots(startTime, timeDifference);
    }
    }else {
        for (let j = 0; j < startTimes1.length; j++) {
            const [hours, minutes] = startTimes1[j].split(':');
            const startTime = new Date();
            startTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
            const endTime = new Date(startTime.getTime() + (2 * 60 + 30) * 60 * 1000); // 2 hours and 30 minutes
            const timeDifference = (endTime.getTime() - startTime.getTime()) / (15 * 60 * 1000);
    
            addTimeSlots(startTime, timeDifference);
        }
    }

    return timeSlots;
};

