import TextFieldRx from 'atoms/FormFields/TextField';
import TextDisplayFieldRx from 'atoms/FormFields/TextDisplayField';
import NumberFieldRx from 'atoms/FormFields/NumberField';
import DateFieldRx from 'atoms/FormFields/DateField';
import ApiSelectDropdownField from 'atoms/FormFields/ApiSelectDropdownField';
import ApiAutocomplete from 'atoms/FormFields/ApiAutocomplete';
import Autocomplete from 'atoms/FormFields/Autocomplete';
import SelectDropdownField from 'atoms/FormFields/SelectDropdownField';

const rendererMapper = {
  text: TextFieldRx,
  textDisplay: TextDisplayFieldRx,
  number: NumberFieldRx,
  date: DateFieldRx,
  apiSelect: ApiSelectDropdownField,
  apiAutocomplete: ApiAutocomplete,
  autocomplete: Autocomplete,
  select: SelectDropdownField,
};

export default rendererMapper;