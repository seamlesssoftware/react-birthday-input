import { getCurrentYear } from "./util";

interface InputRefs {
    MM: HTMLInputElement | null;
    DD: HTMLInputElement | null;
    YYYY: HTMLInputElement | null;
}

interface DateRestriction {
    min: number;
    max: number;
    minLength: number;
    maxLength: number;
}

export type DatePart = "MM" | "DD" | "YYYY";

export const dateRestrictions: Record<DatePart, DateRestriction> = {
    DD: {
        min: 1,
        max: 31,
        minLength: 2,
        maxLength: 2,
    },
    MM: {
        min: 1,
        max: 12,
        minLength: 2,
        maxLength: 2,
    },
    YYYY: {
        min: 1900,
        max: getCurrentYear(),
        minLength: 4,
        maxLength: 4,
    },
};