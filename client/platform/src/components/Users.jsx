'use client';

import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from '@tanstack/react-table';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import UserModal from './UserModal';
import UserEditCell from './UserEditCell';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('id', {
      id: 'id',
      header: 'ID'
  }),
  columnHelper.accessor('nom', {
      id: 'nom',
      header: 'Nom'
  }),
  columnHelper.accessor('prenom', {
      id: 'prenom',
      header: 'Prénom'
  }),
  columnHelper.accessor('roles', {
      id: 'roles',
      header: 'Rôles'
  }),
  columnHelper.accessor('email', {
      id: 'email',
      header: 'Email'
  }),
  columnHelper.accessor('password', {
      id: 'password',
      header: 'Mot de passe'
  }),
  // columnHelper.accessor('emailVerified', {
  //     id: 'emailVerified',
  //     header: 'Compte vérifié',
  //     cell: props => {
  //       return (
  //         <input type="radio" checked={props.getValue()} readOnly></input> 
  //       )
  //     },
  // }),
  columnHelper.display({
      id: 'action',
      header: 'Actions',
      cell: UserEditCell,
  }),
]

const Users = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
      const fetchUsers = async () => {
          try {
              const response = await axios.get('http://localhost:8000/api/users');
              const data = response['data']['hydra:member'];
              setUsers(data);
          } catch (error) {
              console.log("error", error);
          }
      }

      fetchUsers();
  }, [])
  
  const table = useReactTable({
    data: users,
    columns,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editRow: async (id, values) => {
        console.log('values', values);
        try {
            const response = await axios.put(`http://localhost:8000/api/users/${id}`, {
              values  
            });
            const data = response['data'];
            setUsers(users.map(user => {
                if (user.id === id) {
                    return data;
                }
                return user;
            }));
        } catch (error) {
            console.log("error", error);
        }
      },
      removeRow: async (id) => {
        try {
          const response = await axios.delete(`http://localhost:8000/api/users/${id}`);
          if (response.status === 204) {
              console.log("response", response);
          }
          setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.log("error", error);
        }
      },
    },
    getPaginationRowModel: getPaginationRowModel(),
  });

  const createUser = async (values) => {
    values.roles = [values.roles];
    try {
        const response = await axios.post('http://localhost:8000/api/users', {
            nom: values.nom,
            prenom: values.prenom,
            email: values.email,
            plainPassword: values.password,
            roles: values.roles,
        });
        if (response.status === 201) {
            console.log("response", response);
        }
        setUsers([...users, response.data]);
    } catch (error) {
        console.log("error", error);
    }
  }

  return (
    <>
      <Outlet />
        <div className="flex flex-end">
          <UserModal onCloseModal={(values) => createUser(values)} />
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
                className="fflex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Précédent
              </button>
              <button
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
    </>
  );
}

export default Users;
