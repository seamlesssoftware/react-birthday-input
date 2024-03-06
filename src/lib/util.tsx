import { DatePart } from "./types";

/** 
 * Gets the date format from Intl.DateTimeFormat,
 * returns an array containing the elements "DD", "MM" and "YYYY"
 * in the order they appear in the date format prefered by the browser
 * 
*/
export const getDateFormat = (lang: string = "default"): DatePart[] => {
    const formatObj = new Intl.DateTimeFormat(lang).formatToParts(new Date());

    return formatObj.reduce<DatePart[]>((acc, obj) => {
        switch (obj.type) {
            case "day":
                acc.push("DD");
                break;
            case "month":
                acc.push("MM");
                break;
            case "year":
                acc.push("YYYY");
                break;
        }
        return acc;
    }, []);
}

/**
 * Returns the current year.
 */
export const getCurrentYear = (): number => new Date().getFullYear();

/*
*  Left pads a string with zeros until it reaches the target length.
*/
export const leftPadWithZeros = (str: string, targetLength: number) => {
    str = str.toString();

    while (str.length < targetLength) {
        str = "0" + str;
    }

    return str;
};