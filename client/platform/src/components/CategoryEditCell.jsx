'use client';

import PropTypes from 'prop-types';
import CategoryEditModal from './CategoryEditModal';
import CategoryDeleteModal from './CategoryDeleteModal';

const CategoryEditCell = ({ row, table }) => {
  console.log("values", row.values)
  const meta = table.options.meta;

  const editRow = (newName) => {
    meta?.editRow(row.original.id, newName);
  };

  const removeRow = () => {
    meta?.removeRow(row.original.id);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <CategoryEditModal name="edit" categoryName={row.original.name} onCloseModal={(newName) => editRow(newName) } />
      <CategoryDeleteModal name="delete" categoryName={row.original.name} onCloseModal={() => removeRow() } />
    </div>
  );
};

CategoryEditCell.propTypes = {
  row: PropTypes.object,
  table: PropTypes.object,
};

export default CategoryEditCell;