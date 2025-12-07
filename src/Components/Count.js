
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import Flex from '../Components/common/Flex'
import '../style/index.css'

const Count = forwardRef((props, ref) => {
    const [count, setCount] = useState(0);

    useImperativeHandle(ref, () => ({
        increaseCount: () => {
            setCount((prev) => prev + 1)
        },

        resetCount: () => {
            setCount(0)
        }
    }))

    return (
        <div>
            <Flex>
            {count}
            </Flex>
        </div>
    );
});

export default Count;