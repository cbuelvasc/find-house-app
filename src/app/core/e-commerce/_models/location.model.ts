import { BaseModel } from '../../_base/crud';

export class Location extends BaseModel{

    id: number;
    lat: number;
    lng: number;

    constructor() {
        super();
    }
}
