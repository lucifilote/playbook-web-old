export interface IClub {
    administrators: Array<string>;
    amenities: Array<IAmenities>;
    courts: Array<ICourt>;
    description: string;
    geolocation: IGeolocation;
    location: ILocation;
    minReservationSlot: number;
    name: string;
    nightTax: string;
    numberOfCourts: number;
    photos: Array<string>;
    price: number;
    schedule: ISchedule;
    sport: string;
}

export interface IAmenities {
    changingRoom: boolean;
    essentials: boolean
    parking: boolean
    showers: false
    toilet: boolean
    wifi: false
}

export interface ICourt {
    name: string;
    price: number;
    type: string;
}

export interface IGeolocation {
    _lat: Number;
    _long: Number;
}

export interface ILocation {
    city: string;
    county: string;
    info: string;
    street: string;
    zipCode: string;
}

export interface ISchedule {
    monday: IDaySchedule;
    tuesday: IDaySchedule;
    wednesday: IDaySchedule;
    thursday: IDaySchedule;
    friday: IDaySchedule;
    saturday: IDaySchedule;
    sunday: IDaySchedule;
}

export interface IDaySchedule {
    start: string;
    end: string;
}