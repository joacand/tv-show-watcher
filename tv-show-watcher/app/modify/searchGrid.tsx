"use client";

import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import { SetStateAction, useEffect, useMemo, useState } from 'react';
import { searchTvShow } from '../services/TvMaze/api';
import TvSearch from '../interfaces/tvSearch';
import PrimaryButton from '../components/PrimaryButton';
import TextArea from '../components/TextArea';
import ShowStorage from '../interfaces/showStorage';

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
        const existingJson = localStorage.getItem("shows");
        const showStorage: ShowStorage = existingJson ? JSON.parse(existingJson) : { showIds: [] }

        table.getSelectedRowModel().flatRows.map((row) => {
            const id = row.getValue<string>("id");

            if (showStorage.showIds.includes(id)) {
                console.log(`show ${id} already exists in storage`);
            } else {
                showStorage.showIds.push(id);
                console.log(`adding ${id}`);
            }

            localStorage.setItem("shows", JSON.stringify(showStorage));
            table.resetRowSelection();
        });
    };

    return (
        <div className='flex flex-col gap-4 '>
            <div className='flex gap-4'>
                <TextArea value={search} onChange={handleChange} />
                <PrimaryButton onClick={handleSearch}>Search</PrimaryButton>
            </div>
            <MaterialReactTable table={table} />
            <PrimaryButton className="self-start" onClick={handleAdd}>Add</PrimaryButton>
        </div>
    );
}
