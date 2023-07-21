import React, { useState } from 'react';
import { Range } from 'react-range';

export function PriceRangeSlider({ min, max, onChangeMin, onChangeMax }) => {
  const [values, setValues] = useState([min, max]);

  const handleChange = (values) => {
    setValues(values);
    onChangeMin(values[0]);
    onChangeMax(values[1]);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex flex-wrap gap-[5px] items-center">
        <span className="block min-w-[50px]">from</span>
        <input
          name="maxPrice"
          className="text-black flex-1"
          type="text"
          value={values[0]} // Use value instead of defaultValue
          placeholder={'$'}
          onChange={(e) => handleChange([parseFloat(e.target.value), values[1]])}
        />
      </div>
      <div className="flex flex-wrap gap-[5px] items-center">
        <span className="block min-w-[50px]">to</span>
        <input
          name="minPrice"
          className="text-black flex-1"
          type="number"
          value={values[1]} // Use value instead of defaultValue
          placeholder={'$'}
          onChange={(e) => handleChange([values[0], parseFloat(e.target.value)])}
        />
      </div>
      {/* Range Slider */}
      <div className="mt-4">
        <Range
          values={values}
          step={1}
          min={min}
          max={max}
          onChange={(values) => handleChange(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '6px',
                background: '#ccc',
                borderRadius: '4px',
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '18px',
                width: '18px',
                borderRadius: '50%',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              }}
            />
          )}
        />
      </div>
      {/* Display Min and Max values */}
      <div className="flex justify-between mt-2">
        <span>{`Min: $${values[0]}`}</span>
        <span>{`Max: $${values[1]}`}</span>
      </div>
    </div>
  );
};

