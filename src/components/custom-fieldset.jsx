import React from 'react';

const CustomFieldset = ({ children, legend }) => {
  return (
    <fieldset className="bg-secondary p-3 rounded-lg border border-border my-3">
      <legend className="text-lg">{legend}</legend>
      {children}
    </fieldset>
  );
};

export default CustomFieldset;
