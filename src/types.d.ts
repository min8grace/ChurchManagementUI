export interface IMember {
    data: IDetailMember;
    success: boolean;
    message: string;
}

export interface IMembers {
    data: IDetailMember[];
    success: boolean;
    message: string;
}
export interface IDetailMember {
    id: number;
    firstMidName: string;
    lastName: string;
    name: string;
    email: string;
    phoneNumber: string;
    offeringNumber: number;
    userId: string;
    registrationDate: Date;
    createdDate: Date;
}

export interface IOffering {
    data: IDetailOffering;
    success: boolean;
    message: string;
}
export interface IOfferings {
    data: IDetailOffering[];
    success: boolean;
    message: string;
}
export interface IDetailOffering {
    id: number;
    offeringNumber: number;
    offMethod: number;
    offType: number;
    description: string;
    amount: number;
    postingDate: Date;
    postingDateString: string;
    memberId: number
    userId: number;
}

export interface IUser {
    data: IUserDetail;
}

export interface IDetailUser {
    id: number;
    username: string;
    firstMidName: string;
    lastName: string;
    name: string;
    email: string;
    phoneNumber: string;
    offeringNumber: number;
    userId: string;
    registrationDate: Date;
    createdDate: Date;
}

export interface ILogin {
    data: string;
    success: boolean;
    message: string;
}

