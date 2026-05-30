import { Artist } from "./artist";
import { ExternalUrls, Image, Restriction } from "./commonType";

export interface GetNewReleasesResponse {
    albums:{
        href:string;
        limit:number;
        next:string;
        offset:number;
        previous:string | null;
        total:number;
        items:SimplifiedAlbum[]
    }
}

export interface GetTracksResponse {
    tracks:{
        href:string;
        limit:number;
        next:string | null;
        offset:number;
        previous:string | null;
        total:number;
        items:Track[];
    }
}

export interface HomeContentResponse {
    newReleases:SimplifiedAlbum[];
    tracks:Track[];
    albums:SimplifiedAlbum[];
}

export interface SimplifiedAlbum {
    album_type:string;
    total_tracks:string;
    available_markets:string[];
    externel_urls:ExternalUrls
    href:string;
    id:string;
    images:Image[];
    name:string;
    release_date:string;
    release_date_precision:string;
    restrictions?:Restriction
    type:string;
    uri:string;
    artists:Artist[]
}

export interface Track {
    album:SimplifiedAlbum;
    artists:Artist[];
    id:string;
    name:string;
}
