import { React } from 'react';

const VariableLabel = ({ variable }) => (
  <div className={`${(variable.variable_type === 'enviromental') ? 'text-enviromental' : 'text-meteorological'} flex text-left text-xs font-medium`}>
    {(variable.variable_type === 'enviromental') ? 'AMBIENTAL' : 'METEOROLOGICA'}
  </div>
);

export default VariableLabel;
