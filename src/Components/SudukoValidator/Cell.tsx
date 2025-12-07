import { useState } from "react";
import { Tooltip } from "../SudukoValidator/Tooltip";

interface CellProps{
    className: string;
}

export const Cell: React.FC<CellProps> = ({className}) => {

    const [value, setValue] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

        const inputValue = e.target.value

        const isValid: boolean = validateInput(inputValue);

        if (isValid) {
            setValue(inputValue)
            setIsValid(true)
        } else {
            setIsValid(isValid)
            setError("Invalid Input")
        }
    }

    function validateInput(input: string): boolean {
        const regex = /^[1-9]$/;

        if (regex.test(input) || input === '') {
            return true;
        }

        return false;
    }

    return (
        <>
            <div className={`${isValid ? 'border-amber-500' : 'border-red-600'} ${className} relative border-2 h-12`}>
                <input type="text" maxLength={1} pattern="[1-9]"
                    onChange={handleChange} value={value}
                    onBlur={() => setIsValid(true)}
                    className="w-full h-full outline-none text-center" />
                {
                    !isValid && error && (
                        <Tooltip message={error} />
                    )
                }
            </div>
        </>
    )
}