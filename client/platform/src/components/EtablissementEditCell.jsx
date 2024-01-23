'use client';

import PropTypes from 'prop-types';
import EtablissementDeleteModal from './EtablissementDeleteModal';

const EtablissementEditCell = ({ row, table }) => {
  const meta = table.options.meta;

  const removeRow = () => {
    meta?.removeRow(row.original.id);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <EtablissementDeleteModal name="delete" etablissementName={row.original.nom} onCloseModal={() => removeRow() } />
    </div>
  );
};

EtablissementEditCell.propTypes = {
  row: PropTypes.object,
  table: PropTypes.object,
};

export default EtablissementEditCell;