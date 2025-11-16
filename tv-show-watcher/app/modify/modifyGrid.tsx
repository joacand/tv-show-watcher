"use client";

import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { SetStateAction, useEffect, useMemo, useState } from 'react';
import { getTvShow, searchTvShow } from '../services/TvMaze/api';
import TvSearch from '../interfaces/tvSearch';
import PrimaryButton from '../components/PrimaryButton';
import TextArea from '../components/TextArea';
import ShowStorage from '../interfaces/showStorage';
import TvShow from '../interfaces/tvShow';

export default function ModifyGrid({ className = "", children }: { className?: string, children?: React.ReactNode }) {
    const [tvShows, setTvShows] = useState<TvShow[]>([]);

    const [showStorage, setStorage] = useState(() => {
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
                accessorKey: 'id',
                header: 'Id',
                muiTableHeadCellProps: { style: { color: 'green' } },
                enableHiding: false,
            },
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
        enableRowSelection: true,
        enableColumnOrdering: true,
        enableGlobalFilter: true,
    });

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

    return (
        <div className='flex flex-col gap-4 '>
            <MaterialReactTable table={table} />
            <PrimaryButton className="self-start" onClick={handleRemove}>Remove</PrimaryButton>
        </div>
    );
}
