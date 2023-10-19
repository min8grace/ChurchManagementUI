export enum OfferingMethod {
    Cash = 1,
    Check = 2,
    Online = 3,
}
export const getOfferingMethod = (type: number): string => {

    return OfferingMethod[type];
}


