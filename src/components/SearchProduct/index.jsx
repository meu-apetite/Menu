import { Avatar, Box, Paper, createFilterOptions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import * as S from './style';
import { useState } from 'react';

const filter = createFilterOptions();

const CustomPaper = (props) => {
  return <Paper sx={{ width: '100%' }} elevation={4} {...props} />;
};

const SearchProduct = (props) => {
  const [value, setValue] = useState(null);

  return (
    <S.AutocompleteCustom
      value={value}
      onChange={(e, v) => {
        setValue(v);
        props.onChange(v?._id);
        setValue(null);
      }}
      filterOptions={(options, params) => {
        if (params.inputValue.length < 2) return [];
        return filter(options, params);
      }}
      id="dialog"
      options={props.list}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option;
        if (option.inputValue) return option.inputValue;
        return option.name;
      }}
      selectOnFocus
      renderOption={(props, option) => (
        <Box sx={{ display: 'flex', pl: 1, pb: 1, alignItems: 'center' }}>
          <Avatar sx={{ width: 32, height: 32 }} alt="Remy Sharp" src={option.image.url}  />
          <span {...props}>{option.name}</span>
        </Box>
      )}
      clearOnBlur
      handleHomeEndKeys
      PaperComponent={CustomPaper}
      freeSolo
      renderInput={(params) => (
        <S.Search>
          <S.SearchIconWrapper>
            <SearchIcon />
          </S.SearchIconWrapper>
          <S.TextFieldCustom {...params} id="search-input" placeholder="Busque por item" />
        </S.Search>
      )}

    />
  );
}

export default SearchProduct;