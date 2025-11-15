import TvSearch from "@/app/interfaces/tvSearch";
import TvShow from "../../interfaces/tvShow";
import { EpisodeResponse, Show, ShowResponse } from "./models";

async function MapToTvShow(json: Show): Promise<TvShow> {

    const previousEpisodeLink = json._links.previousepisode?.href;
    const previousEpisode = previousEpisodeLink ? await getEpisode(previousEpisodeLink!) : null;

    const nextEpisodeLink = json._links.nextepisode?.href;
    const nextEpisode = nextEpisodeLink ? await getEpisode(nextEpisodeLink!) : null;


    return {
        show: json.name,
        episode: previousEpisode ? `S${previousEpisode.season}E${previousEpisode.number}` : "N/A",
        latestEpisode: previousEpisode ? previousEpisode.airdate : "N/A",
        nextEpisode: nextEpisode ? nextEpisode.airdate : "N/A",
    };
}

function MapToTvSearch(json: ShowResponse): TvSearch {
    return {
        id: json.show.id,
        name: json.show.name,
        imageUrl: json.show.image?.medium || "",
    };
}

async function getEpisode(episodeHref: string): Promise<EpisodeResponse> {
    const response = await fetch(episodeHref);
    if (!response.ok) { throw new Error('Failed to fetch episode'); }
    return await response.json() as EpisodeResponse;
}

export async function getTvShow(showId: string): Promise<TvShow> {
    console.log('fetching show ' + showId);
    const response = await fetch(`http://api.tvmaze.com/shows/${showId}`);
    if (!response.ok) { throw new Error('Failed to fetch TV shows'); }
    const rawResponse = await response.json();

    return MapToTvShow(rawResponse);
}

export async function searchTvShow(search: string): Promise<TvSearch[]> {
    const response = await fetch(`http://api.tvmaze.com/search/shows?q=${search}`);
    if (!response.ok) { throw new Error('Failed to fetch TV shows'); }
    const rawResponse = await response.json();

    return rawResponse.map(MapToTvSearch);
}
