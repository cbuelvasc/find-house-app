import { BaseModel } from '../../_base/crud';
import { Location } from './location.model';
import { Price } from './price.model';
import { Area } from './area.model';
import { AdditionalFeature } from './additional-feature.model';
import { Gallery } from './gallery.model';
import { Plan } from './plan.model';
import { Video } from './video.model';

export class PropertyModel extends BaseModel {

    id: string;
    title: string;
    desc: string;
    propertyType: string;
    propertyStatus: string[];
    city: string;
    zipCode: string[];
    neighborhood: string[];
    street: string[];
    location: Location;
    formattedAddress: string;
    features: string[];
    featured: boolean;
    priceDollar: Price;
    priceEuro: Price;
    bedrooms: number;
    bathrooms: number;
    garages: number;
    area: Area;
    yearBuilt: number;
    ratingsCount: number;
    ratingsValue: number;
    additionalFeatures: AdditionalFeature[];
    gallery: Gallery[];
    plans: Plan[];
    videos: Video[];
    published: string;
    lastUpdate: string;
    views: number;

    constructor() {
        super();
    }
}
