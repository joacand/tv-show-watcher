"use client";

import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import { getTvShow } from './services/TvMaze/api';
import TvShow from './interfaces/tvShow';
import ShowStorage from './interfaces/showStorage';

export default function TvGrid({ className = "", children }: { className?: string, children?: React.ReactNode }) {

    const [tvShows, setTvShows] = useState<TvShow[]>([]);

    const [showStorage, _] = useState(() => {
        const existingJson = localStorage.getItem("shows");
        const showStorage: ShowStorage = existingJson ? JSON.parse(existingJson) : { showIds: [] }
        return showStorage;
    });

    useEffect(() => {
        Promise.all(showStorage.showIds.map(showId => getTvShow(showId)))
            .then(fetchedShows => setTvShows(fetchedShows))
            .catch(error => console.error(error));
    }, [showStorage]);

    const columns = useMemo<MRT_ColumnDef<TvShow>[]>(
        () => [
            {
                accessorKey: 'show',
                header: 'Show',
                muiTableHeadCellProps: { style: { color: 'green' } },
                enableHiding: false,
            },
            {
                accessorKey: 'episode',
                header: 'Episode',
                muiTableHeadCellProps: { style: { color: 'green' } },
            },
            {
                accessorKey: 'latestEpisode',
                header: 'Latest Episode',
                muiTableHeadCellProps: { style: { color: 'green' } },
            },
            {
                accessorKey: 'nextEpisode',
                header: 'Next Episode',
                muiTableHeadCellProps: { style: { color: 'green' } },
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: tvShows,
        enableRowSelection: false,
        enableColumnOrdering: true,
        enableGlobalFilter: true,
        initialState: {
            sorting: [
                { id: 'latestEpisode', desc: true },
            ]
        }
    });

    return <MaterialReactTable table={table} />;
}