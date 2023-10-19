export enum OfferingType {

    "Tithe" = 1, //A
    "Thanks" = 2, //B
    "Weekly" = 3, //C
    "Mission" = 4, //D seon-gyo
    "Chapel" = 5, //E  seong-jeon
    "Feast" = 6, //F jul-gi
    "Special" = 7, //G mock-joek
    "Arash" = 8,
}

export const getOfferingType = (type: number): string => {

    return OfferingType[type];
}
