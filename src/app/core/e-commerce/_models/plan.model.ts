import { BaseModel } from '../../_base/crud';
import { Area } from './area.model';

export class Plan extends BaseModel {

    id: number;
    name: string;
    desc: string;
    area: Area;
    rooms: number;
    baths: number;
    image: string;

    constructor() {
        super();
    }
}
