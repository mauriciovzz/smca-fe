import { React } from 'react';

const VariableLabel = ({ node }) => (
  <div className={`${(node.is_active) ? 'text-active' : 'text-inactive'} flex text-left text-xs font-medium`}>
    {(node.is_active) ? 'ACTIVO' : 'INACTIVO'}
  </div>
);

export default VariableLabel;
