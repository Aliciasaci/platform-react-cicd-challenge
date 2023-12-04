'use client';

import PropTypes from 'prop-types';
import UserEditModal from './UserEditModal';
import UserDeleteModal from './UserDeleteModal';

const UserEditCell = ({ row, table }) => {
  const meta = table.options.meta;
  console.log("test", row.original);
    const editRow = (values) => {
      meta?.editRow(row.original, values);
    };

  const removeRow = () => {
    meta?.removeRow(row.original.id);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <UserEditModal name="edit" userData={row.original} onCloseModal={(values) => editRow(values) } />
      <UserDeleteModal name="delete" userName={row.original.nom + " " + row.original.prenom} onCloseModal={() => removeRow() } />
    </div>
  );
};

UserEditCell.propTypes = {
  row: PropTypes.object,
  table: PropTypes.object,
};

export default UserEditCell;