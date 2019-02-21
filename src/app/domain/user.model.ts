export declare interface Address{
    province:string;
    city:string;
    district:string;
    street?:string;
}

export enum IdentityType {
    IdCard = 0,
    Insurance,
    Passport,
    Military,
    Other
}

export declare interface Identity {
    identityNo:string;
    identityType:IdentityType;
}

export declare interface User {
    id?:string;
    email:string;
    password:string;
    name:string;
    avatar:string;
    projectIds:Array<string>;
    address?:Address;
    identity:Identity;
    dateOfbirth?:string;
}