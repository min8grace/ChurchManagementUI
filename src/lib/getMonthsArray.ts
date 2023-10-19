export default function getMonthsArray(): string[] {
    const monthsArray: string[] = [];

    for (let month: number = 1; month <= 12; month++) {
        monthsArray.push(month.toString());
    }

    return monthsArray;
}
