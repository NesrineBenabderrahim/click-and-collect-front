import React, { useState } from 'react';
import {Checkbox, FormControlLabel } from '@mui/material';

interface CheckBoxProps {
    children: React.ReactNode;
}

const CheckBox: React.FC<CheckBoxProps> = ({ children }) => {
    const [checked, setChecked] = useState([false, false]);

    const handleChange1 = () => {
        // Assuming you have some logic to handle the checkbox change
        setChecked([!checked[0], checked[1]]);
    };

    return (
        <div>
            <FormControlLabel
                label="Parent"
                control={
                    <Checkbox
                        checked={checked[0] && checked[1]}
                        indeterminate={checked[0] !== checked[1]}
                        onChange={handleChange1}
                    />
                }
            />
            {children}
        </div>
    );
};

export default CheckBox;
