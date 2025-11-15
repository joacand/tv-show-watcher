"use client";

import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { SetStateAction, useEffect, useMemo, useState } from 'react';
import { searchTvShow } from '../services/TvMaze/api';
import TvSearch from '../interfaces/tvSearch';

export default function SearchGrid({ className = "", children }: { className?: string, children?: React.ReactNode }) {
    const [search, setSearch] = useState<string>("");
    const [tvShows, setTvShows] = useState<TvSearch[]>([]);

    const columns = useMemo<MRT_ColumnDef<TvSearch>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                muiTableHeadCellProps: { style: { color: 'green' } },
            },
            {
                accessorKey: 'name',
                header: 'Name',
                muiTableHeadCellProps: { style: { color: 'green' } },
                enableHiding: false,
            },
            {
                accessorKey: 'image',
                header: 'Image',
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

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSearch(event.target.value);
    };

    const handleSearch = async () => {
        searchTvShow(search).then(shows => setTvShows(shows)).catch(error => console.error(error));
    };

    const handleAdd = async () => {
        table.getSelectedRowModel().flatRows.map((row) => {
            console.log('adding ' + row.getValue('id'));

            const existing = localStorage.getItem("shows");
            if (existing && existing.split(',').includes(row.getValue('id'))) {
                console.log('show already exists in storage');
            } else {
                localStorage.setItem("shows", existing ? existing + "," + row.getValue('id') : row.getValue('id'));
            }
        });
    };

    return (
        <>
            <textarea value={search} onChange={handleChange} />
            <button onClick={handleSearch}>Search</button>
            <MaterialReactTable table={table} />
            <button onClick={handleAdd}>Add</button>
        </>
    );
}
