'use client';

import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from '@tanstack/react-table';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import CategoryModal from "./CategoryModal";
import CategoryEditCell from './CategoryEditCell';

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('id', {
        id: 'id',
        header: 'ID'
    }),
    columnHelper.accessor('name', {
        id: 'name',
        header: 'Nom'
    }),
    columnHelper.accessor('createdAt', {
        id: 'createdAt',
        header: 'Créé le'
    }),
    columnHelper.accessor('updatedAt', {
        id: 'updatedAt',
        header: 'Modifié le'
    }),
    columnHelper.display({
        id: 'action',
        header: 'Actions',
        cell: CategoryEditCell,
    }),
]

const Categories = () => {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/categories');
                const data = response['data']['hydra:member'];
                setCategories(data);
            } catch (error) {
                console.log("error", error);
            }
        }

        fetchCategories();
    }, [])

    
    const table = useReactTable({
        data: categories,
        columns,
        initialState: {
            pagination: {
              pageSize: 5,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        meta: {
            editRow: async (id, newName) => {
                try {
                    const response = await axios.put(`http://localhost:8000/api/categories/${id}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        name: newName
                    });
                    if (response.status === 200) {
                        console.log("response", response);
                    }
                    
                    // const data = response['data']['hydra:member'];
                    // setCategories(data);
                } catch (error) {
                    console.log("error", error);
                }
            },
            removeRow: async (id) => {
                console.log('delete id', id);
                try {
                    const response = await axios.delete(`http://localhost:8000/api/categories/${id}`);
                    if (response.status === 204) {
                        console.log("response", response);
                    }
                    // const data = response['data']['hydra:member'];
                    // setCategories(data);
                } catch (error) {
                    console.log("error", error);
                }
            },
        },
        getPaginationRowModel: getPaginationRowModel(),
    })

    const createCategory = async (name) => {
        try {
            const response = await axios.post('http://localhost:8000/api/categories', {
                headers: {
                    'Content-Type': 'application/json'
                },
                name: name
            });
            const newCategory = response['data']['hydra:member'];
            setCategories([...categories, newCategory]);
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <>
            <Outlet />
            <div className="flex flex-end">
                <CategoryModal onCloseModal={(name) => createCategory(name)} />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                            <th scope="col" className="px-6 py-3" key={header.id}>
                                {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                            </th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                            <td className="px-6 py-4" key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                            ))}
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex sm:flex-row flex-col w-full mt-8 items-center gap-2 text-xs">
                <div className="sm:mr-auto sm:mb-0 mb-2">
                    <span className="mr-2 text-gray-900 dark:text-white">Résultats par page</span>
                    <select
                    className="text-sm text-gray-900 border p-1 rounded w-14 border-gray-200"
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                    >
                    {[5, 10, 15, 20].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                        {pageSize}
                        </option>
                    ))}
                    </select>            
                </div>
                <div className="flex gap-2">
                    <div className="inline-flex mt-2 xs:mt-0">
                    <button
                        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >Précédent</button>
                    <button
                        className="fflex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >Suivant</button>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default Categories;