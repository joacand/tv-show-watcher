import TvSearch from "@/app/interfaces/tvSearch";
import TvShow from "../../interfaces/tvShow";
import { EpisodeResponse, Show, ShowResponse } from "./models";

async function MapToTvShow(json: Show): Promise<TvShow> {

    const previousEpisodeLink = json._links.previousepisode?.href;
    const previousEpisode = previousEpisodeLink ? await getEpisode(previousEpisodeLink!) : null;

    const nextEpisodeLink = json._links.nextepisode?.href;
    const nextEpisode = nextEpisodeLink ? await getEpisode(nextEpisodeLink!) : null;

    const previousEpisodeDate = previousEpisode ? previousEpisode.airdate : null;
    let diffDays = -99999;
    if (previousEpisodeDate) {
        const prevDate = new Date(previousEpisodeDate);
        const today = new Date();
        const diffTime = Math.abs(prevDate.getTime() - today.getTime());
        diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    const nextEpisodeDate = nextEpisode ? nextEpisode.airdate : null;
    let nextDiffDays = -99999;
    if (nextEpisodeDate) {
        const nextDate = new Date(nextEpisodeDate);
        const today = new Date();
        const diffTime = Math.abs(nextDate.getTime() - today.getTime());
        nextDiffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    return {
        id: json.id,
        show: json.name,
        episode: previousEpisode ? `S${String(previousEpisode.season).padStart(2, '0')}E${String(previousEpisode.number ? previousEpisode.number : "").padStart(2, '0')}` : "N/A",
        latestEpisode: diffDays,
        nextEpisode: nextDiffDays,
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

    return rawResponse.slice(0,3).map(MapToTvSearch);
}
