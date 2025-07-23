import React, { useState } from 'react';
import BootstrapSelect from '../components/BootstrapSelect';
import { OptionOrGroup } from '../components/BootstrapSelect/types';

const BasicExample: React.FC = () => {
  const [singleValue, setSingleValue] = useState<string>('');
  const [multipleValues, setMultipleValues] = useState<string[]>([]);

  const options: OptionOrGroup[] = [
    { value: 'mustard', label: 'Mustard' },
    { value: 'ketchup', label: 'Ketchup', subtext: 'Heinz' },
    { value: 'relish', label: 'Relish', disabled: true },
    {
      label: 'Camping',
      options: [
        { value: 'tent', label: 'Tent' },
        { value: 'flashlight', label: 'Flashlight' },
        { value: 'toilet-paper', label: 'Toilet Paper' },
      ]
    }
  ];

  const searchableOptions: OptionOrGroup[] = [
    { 
      value: 'hot-dog', 
      label: 'Hot Dog, Fries and a Soda',
      tokens: ['ketchup', 'mustard']
    },
    { 
      value: 'burger', 
      label: 'Burger, Shake and a Smile',
      tokens: ['mustard']
    },
    { 
      value: 'sugar', 
      label: 'Sugar, Spice and all things nice',
      tokens: ['frosting']
    },
  ];

  return (
    <div className="container mt-4">
      <h1>Bootstrap Select React Examples</h1>
      
      <div className="row">
        <div className="col-md-6">
          <h3>Basic Select</h3>
          <BootstrapSelect
            options={options}
            value={singleValue}
            onChange={(value) => setSingleValue(value as string)}
            placeholder="Choose a condiment..."
            showTick
          />
          <p className="mt-2">Selected: {singleValue}</p>
        </div>

        <div className="col-md-6">
          <h3>Multiple Select</h3>
          <BootstrapSelect
            options={options}
            value={multipleValues}
            onChange={(value) => setMultipleValues(value as string[])}
            multiple
            actionsBox
            placeholder="Choose condiments..."
            maxOptions={3}
          />
          <p className="mt-2">Selected: {multipleValues.join(', ')}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <h3>Searchable Select</h3>
          <BootstrapSelect
            options={searchableOptions}
            value={singleValue}
            onChange={(value) => setSingleValue(value as string)}
            searchable
            searchPlaceholder="Search for food..."
            placeholder="Choose a meal..."
          />
        </div>

        <div className="col-md-6">
          <h3>Disabled Select</h3>
          <BootstrapSelect
            options={options}
            value=""
            onChange={() => {}}
            disabled
            placeholder="This is disabled"
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <h3>Large Select with Different Styles</h3>
          <div className="mb-3">
            <label>Primary Style:</label>
            <BootstrapSelect
              options={options}
              value={singleValue}
              onChange={(value) => setSingleValue(value as string)}
              style="btn-primary"
              placeholder="Primary button style"
            />
          </div>
          
          <div className="mb-3">
            <label>Success Style:</label>
            <BootstrapSelect
              options={options}
              value={singleValue}
              onChange={(value) => setSingleValue(value as string)}
              style="btn-success"
              placeholder="Success button style"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicExample;