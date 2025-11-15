export interface ShowResponse {
    show: Show;
}

export interface Show {
    id: string;
    name: string;
    image: Image;
    _links: ShowLinks;
}

export interface Image {
    medium: string;
}

export interface ShowLinks {
    nextepisode?: EpisodeHref;
    previousepisode?: EpisodeHref;
}

export interface EpisodeHref {
    href: string;
}

export interface EpisodeResponse {
    airdate: string;
    season: string;
    number: string;
}