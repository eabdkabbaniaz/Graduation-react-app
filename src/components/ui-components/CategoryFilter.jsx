import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CategoryFilter({ categories, handleFilter, selectedCategoryId, intialValue}) {
  return (
    <FormControl
      variant="standard"
      sx={{
        m: 1,
        width: '10%',
        marginLeft: '90%',
      }}
    >
      <InputLabel
        id="category-select-label"
        sx={{
          color: '#6a1b9a',
          fontSize: '1.2rem'
        }}
      >
        اختر الفئة
      </InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedCategoryId ?? intialValue}
        onChange={(e) => handleFilter(e.target.value)}
        label="اختر الفئة"
        sx={{
          borderRadius: '5px',
          borderColor: '#007bff',
          backgroundColor: '#f1f1f1',
          color: '#333',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
          '& .MuiSelect-icon': {
            color: '#6a1b9a',
          },
        }}
      >
        <MenuItem value="عرض الكل">
          <em>عرض الكل</em>
        </MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>
            {cat.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
