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
import { Paper } from '@mui/material';
import InfoText from './components/InfoText';

export default function TvGrid({ className = "", children }: { className?: string, children?: React.ReactNode }) {

    const [tvShows, setTvShows] = useState<TvShow[]>([]);
    const [showIntroText, setShowIntroText] = useState(false);

    const [showStorage, setStorage] = useState(() => {
        const existingJson = localStorage.getItem("shows");
        if (!existingJson) { setShowIntroText(true); }
        const showStorage: ShowStorage = existingJson
            ? JSON.parse(existingJson)
            : { showIds: [28276, 347, 305, 44933] }
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
                accessorKey: 'id',
                header: 'Id',
                muiTableHeadCellProps: { style: { color: '#3B4856' } },
                enableHiding: false,
            },
            {
                accessorKey: 'show',
                header: 'Show',
                muiTableHeadCellProps: { style: { color: '#3B4856' } },
                enableHiding: false,
            },
            {
                accessorKey: 'episode',
                header: 'Episode',
                muiTableHeadCellProps: { style: { color: '#3B4856' } },
            },
            {
                accessorKey: 'latestEpisode',
                header: 'Latest Episode',
                muiTableHeadCellProps: { style: { color: '#3B4856' } },
                Cell: ({ cell }) => (
                    <span>
                        {cell.getValue<number>() === -99999 ? "N/A" : `${cell.getValue<number>()} day${cell.getValue<number>() === 1 ? "" : "s"} ago`}
                    </span>
                ),
            },
            {
                accessorKey: 'nextEpisode',
                header: 'Next Episode',
                muiTableHeadCellProps: { style: { color: '#3B4856' } },
                Cell: ({ cell }) => (
                    <span>
                        {cell.getValue<number>() === -99999 ? "N/A" : `${cell.getValue<number>()} day${cell.getValue<number>() === 1 ? "" : "s"}`}
                    </span>
                ),
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
                    console.log(`removing ${id}`);
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
        enableGlobalFilter: true,
        initialState: {
            sorting: [
                { id: 'latestEpisode', desc: false },
            ],
            columnVisibility: { id: false }
        }
    });

    return (
        <div className='flex flex-col gap-4'>
            <MaterialReactTable table={table} />
            <PrimaryButton className="self-start" onClick={handleRemove}>Remove</PrimaryButton>
            {showIntroText && <InfoText>
                Since this is your first visit, some sample shows have been added. These will be removed when you add your first show in &apos;<b>Search for TV Shows</b>&apos;.
            </InfoText>}
        </div>
    );
}