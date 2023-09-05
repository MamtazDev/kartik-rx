import React from 'react';
import PropTypes from 'prop-types';
import rendererMapper from 'molecules/Form/rendererMapper';

const PageDataProcessedField = ({ control, setValue, field, ...rest }) => {
  const Component = rendererMapper[field.baseComponent];
  const componentData = field.componentOptions.pageFormDataProcessor(control._formValues);

  return (
    <Component
      key={field.name}
      name={field.name}
      control={control}
      setValue={setValue}
      componentData={componentData}
      field={field}
      {...field.componentOptions}
      {...rest}
    />
  );
};

PageDataProcessedField.propTypes = {
  field: PropTypes.shape({
    component: PropTypes.string,
    baseComponent: PropTypes.string,
    componentOptions: PropTypes.object,
  }),
  setValue: PropTypes.func,
  control: PropTypes.object,
};

export default PageDataProcessedField;