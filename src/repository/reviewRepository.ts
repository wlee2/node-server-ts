import { Schema } from "mongoose";

export class ReviewDAO {
    ReviewContentText: string = '';
    PlaceRate: number = 0;
    LocationReferenceID: string = '';
    LocationName: string = '';
    Address: string = '';
    GeoLocation: {
        Lat: number,
        Lng: number
    } = { Lat: 0, Lng: 0 };
    Photos: [string] = [''];
}

export class ReviewDTO {
    ID: string = '';
    ReviewContentText: string = '';
    PlaceRate: number = 0;
    AuthorEmail: string = '';
    LocationReferenceID: string = '';
    LocationName: string = '';
    Address: string = '';
    GeoLocation: {
        Lat: number,
        Lng: number
    } = { Lat: 0, Lng: 0 };
    Photos: [String] = [''];
    Comments: [Schema.Types.ObjectId] = [null];
    WrittenDate: Date = new Date() ;
}
