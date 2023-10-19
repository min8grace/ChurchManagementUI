export default function getYearsArray(): string[] {
    const currentYear: number = new Date().getFullYear();
    const startYear: number = 2015;
    const yearsArray: string[] = [];

    for (let year = startYear; year <= currentYear; year++) {
        yearsArray.push(year.toString());
    }
    return yearsArray;
}
