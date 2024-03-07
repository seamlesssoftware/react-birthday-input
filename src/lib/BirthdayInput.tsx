import { useEffect, useRef, useState } from "react";

import { getDateFormat, leftPadWithZeros } from "./util";

import "./birthday-input.css";
import { DatePart, InputRefs, dateRestrictions } from "./types.d";

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
    className?: string ;
}

export const BirthdayInput = ({ className }: BirthdayInputProps) => {
    const format = getDateFormat();
    const inputRefs = useRef<InputRefs>({
        MM: null, 
        DD: null,
        YYYY: null,
    });
    const [inputValues, setInputValues] = useState({
        MM: "",
        DD: "",
        YYYY: "",
    });
    const [inputsValid, setInputsValid] = useState({
        MM: false,
        DD: false,
        YYYY: false,
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, part: DatePart, idx: number) => {
        const value = e.target.value;
        const maxLength = dateRestrictions[part].maxLength;

        if (value?.length > maxLength) {
            setInputValues((c) => ({
                ...c,
                [part]: value.substring(0, maxLength),
            }));
        } else {
            setInputValues((c) => ({
                ...c,
                [part]: value,
            }));
        }

        setInputsValid((c) => ({ ...c, [part]: isValueValid(part, value) }));

        if (idx < 2 && value.length >= maxLength) {
            const nextInput = inputRefs.current[format[idx + 1]];
            nextInput?.focus();
        }
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

            setInputValues((c) => ({
                ...c,
                [part]: paddedValue,
            }));

            setInputsValid((c) => ({
                ...c,
                [part]: isValueValid(part, paddedValue),
            }));
        }
    };

    useEffect(() => {
        const date =
            new Date(
                parseInt(inputValues.YYYY),
                parseInt(inputValues.MM) - 1,
                parseInt(inputValues.DD)
            )
        ;
        console.log(date);

        /* TODO: set value, add controller */
    }, [inputValues.MM, inputValues.DD, inputValues.YYYY]);

    return (
            <div className={className ?? "bday_input"}>
                {format?.map((part, idx) => (
                    <input
                        key={idx}
                        className={(!inputsValid[part] && inputValues[part]) ? "invalid" : undefined}
                        type="number"
                        placeholder={part}
                        value={inputValues[part]}
                        ref={(ref) => (inputRefs.current[part] = ref)}
                        onChange={(e) => onChange(e, part, idx)}
                        onBlur={(e) => onBlur(e, part)}
                        onKeyDown={(e) => onKeyDown(e, idx)}
                        {...dateRestrictions[part]}
                    />
                ))}
            </div>
    );
};
