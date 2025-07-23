# React Bootstrap Select

A modern React component implementation of the popular bootstrap-select jQuery plugin. This component provides all the functionality of the original bootstrap-select with modern React patterns, TypeScript support, and improved performance.

## Features

- ✅ **Full TypeScript support** with comprehensive type definitions
- ✅ **Modern React patterns** using hooks and functional components
- ✅ **All original features** including search, multiple selection, option groups, and more
- ✅ **Keyboard navigation** with full accessibility support
- ✅ **Customizable styling** with Bootstrap 4/5 compatibility
- ✅ **Virtual scrolling** for large datasets
- ✅ **HTML sanitization** for security
- ✅ **Mobile responsive** design

## Installation

```bash
npm install react-bootstrap-select
# or
yarn add react-bootstrap-select
```

Make sure you have Bootstrap CSS included in your project:

```bash
npm install bootstrap
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import BootstrapSelect from 'react-bootstrap-select';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyComponent = () => {
  const [value, setValue] = useState('');

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'strawberry', label: 'Strawberry' }
  ];

  return (
    <BootstrapSelect
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Choose a flavor..."
    />
  );
};
```

## Advanced Usage

### Multiple Selection with Search

```tsx
<BootstrapSelect
  options={options}
  value={selectedValues}
  onChange={setSelectedValues}
  multiple
  searchable
  actionsBox
  placeholder="Choose multiple options..."
  maxOptions={5}
/>
```

### Option Groups

```tsx
const groupedOptions = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' }
    ]
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'lettuce', label: 'Lettuce' }
    ]
  }
];

<BootstrapSelect
  options={groupedOptions}
  value={value}
  onChange={setValue}
/>
```

### Custom Styling

```tsx
<BootstrapSelect
  options={options}
  value={value}
  onChange={setValue}
  style="btn-primary"
  showTick
  width="300px"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `OptionOrGroup[]` | `[]` | Array of options or option groups |
| `value` | `string \| string[]` | - | Current selected value(s) |
| `onChange` | `(value: string \| string[]) => void` | - | Callback when selection changes |
| `multiple` | `boolean` | `false` | Enable multiple selection |
| `disabled` | `boolean` | `false` | Disable the select |
| `placeholder` | `string` | `'Nothing selected'` | Placeholder text |
| `searchable` | `boolean` | `false` | Enable search functionality |
| `searchPlaceholder` | `string` | `'Search...'` | Search input placeholder |
| `maxOptions` | `number` | - | Maximum number of selectable options |
| `showTick` | `boolean` | `false` | Show checkmark for selected options |
| `actionsBox` | `boolean` | `false` | Show Select All/Deselect All buttons |
| `style` | `string` | `'btn-light'` | Button style class |
| `width` | `string \| number` | `'auto'` | Component width |
| `dropup` | `boolean` | `false` | Open menu upward |
| `size` | `number \| 'auto' \| false` | `'auto'` | Maximum visible options |

## Option Object

```tsx
interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  subtext?: string;
  icon?: string;
  content?: string;
  tokens?: string[]; // For search
}
```

## Option Group Object

```tsx
interface OptionGroup {
  label: string;
  options: Option[];
  disabled?: boolean;
  maxOptions?: number;
}
```

## Events

```tsx
<BootstrapSelect
  options={options}
  value={value}
  onChange={setValue}
  onShow={() => console.log('Dropdown opened')}
  onHide={() => console.log('Dropdown closed')}
/>
```

## Styling

The component includes default Bootstrap-compatible styles. You can customize the appearance by:

1. **Using Bootstrap button classes:**
   ```tsx
   <BootstrapSelect style="btn-primary" />
   <BootstrapSelect style="btn-success" />
   ```

2. **Custom CSS classes:**
   ```tsx
   <BootstrapSelect className="my-custom-select" />
   ```

3. **Inline styles:**
   ```tsx
   <BootstrapSelect style={{ width: '300px' }} />
   ```

## Accessibility

The component includes full keyboard navigation and ARIA attributes:

- **Arrow keys** for navigation
- **Enter/Space** for selection
- **Escape** to close
- **Tab** to move focus
- Proper ARIA labels and roles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11+ (with polyfills)

## Migration from jQuery bootstrap-select

This React component maintains API compatibility with the original bootstrap-select where possible. Key differences:

1. **Props instead of data attributes:** `data-live-search` becomes `searchable`
2. **React event handlers:** `onChange` instead of jQuery events
3. **Controlled components:** Use `value` and `onChange` props
4. **TypeScript support:** Full type safety out of the box

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our GitHub repository.

## License

MIT License - see LICENSE file for details.