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
import PrimaryButton from './components/PrimaryButton';
import InfoText from './components/InfoText';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TvGrid({ className = "", children }: { className?: string, children?: React.ReactNode }) {

    const [tvShows, setTvShows] = useState<TvShow[]>([]);
    const [showIntroText, setShowIntroText] = useState(false);
    const [showStorage, setStorage] = useState<ShowStorage>({ showIds: [] });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const existingJson = localStorage.getItem("shows");
        if (!existingJson) { setShowIntroText(true); }
        const showStorage: ShowStorage = existingJson
            ? JSON.parse(existingJson)
            : { showIds: [28276, 347, 305, 44933] }
        setStorage(showStorage);
    }, []);

    useEffect(() => {
        Promise.all(showStorage.showIds.map(showId => getTvShow(showId)))
            .then(fetchedShows => { setTvShows(fetchedShows); })
            .catch(error => { console.error(error); })
            .finally(() => { setIsLoading(false); });
    }, [showStorage]);

    const columns = useMemo<MRT_ColumnDef<TvShow>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                enableHiding: false,
                enableColumnDragging: false,
            },
            {
                accessorKey: 'show',
                header: 'Show',
                enableHiding: false,
                enableColumnDragging: false,
                grow: true,
            },
            {
                accessorKey: 'episode',
                header: 'Episode',
                enableColumnDragging: false,
                grow: false,
            },
            {
                accessorKey: 'latestEpisode',
                header: 'Latest Episode',
                enableColumnDragging: false,
                Cell: ({ cell }) => (
                    <span>
                        {cell.getValue<number>() === -99999 ? "N/A" : `${cell.getValue<number>()} day${cell.getValue<number>() === 1 ? "" : "s"} ago`}
                    </span>
                ),
                grow: false,
            },
            {
                accessorKey: 'nextEpisode',
                header: 'Next Episode',
                enableColumnDragging: false,
                Cell: ({ cell }) => (
                    <span>
                        {cell.getValue<number>() === -99999 ? "N/A" : `${cell.getValue<number>()} day${cell.getValue<number>() === 1 ? "" : "s"}`}
                    </span>
                ),
                grow: false,
            },
        ],
        [],
    );

    const handleRemove = async () => {
        const existingJson = localStorage.getItem("shows");
        const showStorage: ShowStorage = existingJson ? JSON.parse(existingJson) : { showIds: [] }

        table.getSelectedRowModel().flatRows.map((row) => {
            const id = row.getValue<string>("id");

            if (showStorage.showIds.includes(id)) {
                const index = showStorage.showIds.indexOf(id);
                if (index !== -1) {
                    showStorage.showIds.splice(index, 1);
                }
            }

            localStorage.setItem("shows", JSON.stringify(showStorage));
            table.resetRowSelection();
            setStorage(showStorage);
        });
    };

    const table = useMaterialReactTable({
        columns,
        data: tvShows,
        enableRowSelection: true,
        enableColumnOrdering: true,
        enableColumnActions: false,
        enableGlobalFilter: false,
        enableKeyboardShortcuts: false,
        enableColumnFilters: false,
        enableTopToolbar: false,
        paginationDisplayMode: 'pages',
        layoutMode: 'grid',
        initialState: {
            sorting: [
                { id: 'latestEpisode', desc: false },
            ],
            pagination: { pageSize: 15, pageIndex: 0 },
            density: 'comfortable',
            columnVisibility: { id: false }
        },
    });

    return (
        <div className='flex flex-col gap-4'>
            {isLoading ? <><CircularProgress /><p>Loading...</p> </> :
                <MaterialReactTable table={table} />
            }
            <PrimaryButton className="self-start gap-2" onClick={handleRemove} disabled={table.getSelectedRowModel().rows.length === 0}><DeleteIcon/> Remove</PrimaryButton>
            {showIntroText && <InfoText>
                Since this is your first visit, some sample shows have been added. These will be removed when you add your first show in &apos;<b>Search for TV Shows</b>&apos;.
            </InfoText>}
        </div>
    );
}