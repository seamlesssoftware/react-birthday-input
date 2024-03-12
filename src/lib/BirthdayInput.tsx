import { useRef, useState } from "react";

import { getDateFormat, leftPadWithZeros } from "./util";

import "./birthday-input.css";
import { DatePart, InputRefs, InputValues, InputsValid, dateRestrictions } from "./types.d";

const isValueValid = (part: DatePart, value: string) => {
    const intValue = parseInt(value);
    const max = dateRestrictions[part].max;
    const min = dateRestrictions[part].min;

    if (intValue >= min && intValue <= max) {
        return true;
    }
    return false;
};

interface BirthdayInputProps {
    initialValues?: InputValues;
    onChange: (birthday: Date | null) => void;
    className?: string;
    style?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
}

export const BirthdayInput = ({ initialValues, onChange, className, style, inputStyle }: BirthdayInputProps) => {
    const format = getDateFormat();
    const inputRefs = useRef<InputRefs>({
        MM: null, 
        DD: null,
        YYYY: null,
    });
    const [inputValues, setInputValues] = useState<InputValues>(initialValues ?? {
        MM: "",
        DD: "",
        YYYY: "",
    });
    const [inputsValid, setInputsValid] = useState<InputsValid>({
        MM: false,
        DD: false,
        YYYY: false,
    });

    const handleDataChange = (currentInputValues: InputValues) => {
        const { YYYY, MM, DD } = currentInputValues;

        const date = new Date(parseInt(YYYY), parseInt(MM) - 1, parseInt(DD));

        if (date.getFullYear() === parseInt(YYYY) &&
            date.getMonth() === parseInt(MM) - 1 &&
            date.getDate() === parseInt(DD)) {
            onChange?.(date);
        } else {
            onChange?.(null);
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, part: DatePart, idx: number) => {
        const value = e.target.value;
        const maxLength = dateRestrictions[part].maxLength;
        let newInputValues;
        if (value?.length > maxLength) {
            newInputValues = {...inputValues, [part]: value.substring(0, maxLength)};
            setInputValues(newInputValues);
        } else {
            newInputValues = {...inputValues, [part]: value};
            setInputValues(newInputValues);
        }

        setInputsValid((c) => ({ ...c, [part]: isValueValid(part, value) }));

        if (idx < 2 && value.length >= maxLength) {
            const nextInput = inputRefs.current[format[idx + 1]];
            nextInput?.focus();
        }

        handleDataChange(newInputValues);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        const isBackspace = e.key === 'Backspace';
        if (isBackspace && idx > 0 && value.length === 0) {
            e.preventDefault();
            const prevInput = inputRefs.current[format[idx - 1]];
            prevInput?.focus();
        }
    };

    const onBlur = (e: React.FocusEvent<HTMLInputElement>, part: DatePart) => {
        const minLength = dateRestrictions[part].minLength;
        const maxLength = dateRestrictions[part].maxLength;
        const valueLength = e.target.value?.length;
        if (!valueLength) return;

        const shouldPad = valueLength < minLength;
        if (shouldPad) {
            const paddedValue = leftPadWithZeros(e.target.value, maxLength);
            const newInputValues = {...inputValues, [part]: paddedValue};
            setInputValues(newInputValues);

            setInputsValid((c) => ({
                ...c,
                [part]: isValueValid(part, paddedValue),
            }));

            handleDataChange(newInputValues);
        }
    };

    return (
            <div className={className ?? "bday_input"} style={style}>
                {format?.map((part, idx) => (
                    <input
                        style={inputStyle}
                        key={idx}
                        className={(!inputsValid[part] && inputValues[part]) ? "invalid" : undefined}
                        type="number"
                        placeholder={part}
                        value={inputValues[part]}
                        ref={(ref) => (inputRefs.current[part] = ref)}
                        onChange={(e) => onInputChange(e, part, idx)}
                        onBlur={(e) => onBlur(e, part)}
                        onKeyDown={(e) => onKeyDown(e, idx)}
                        {...dateRestrictions[part]}
                    />
                ))}
            </div>
    );
};
