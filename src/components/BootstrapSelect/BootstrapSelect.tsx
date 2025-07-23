import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BootstrapSelectProps, Option, OptionGroup } from './types';
import { useClickOutside } from './hooks/useClickOutside';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { filterOptions } from './utils/filterUtils';
import { sanitizeHtml } from './utils/sanitizeUtils';
import './BootstrapSelect.css';

export const BootstrapSelect: React.FC<BootstrapSelectProps> = ({
  options = [],
  value,
  onChange,
  onShow,
  onHide,
  multiple = false,
  disabled = false,
  placeholder = 'Nothing selected',
  searchable = false,
  searchPlaceholder = 'Search...',
  maxOptions,
  showTick = false,
  size = 'auto',
  dropup = false,
  actionsBox = false,
  selectAllText = 'Select All',
  deselectAllText = 'Deselect All',
  noneResultsText = 'No results match {0}',
  countSelectedText = '{0} of {1} selected',
  maxOptionsText = 'Limit reached ({0} items max)',
  className = '',
  style = 'btn-light',
  width = 'auto',
  container,
  virtualScroll = 600,
  sanitize = true,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>(
    multiple 
      ? (Array.isArray(value) ? value : [])
      : (value ? [value as string] : [])
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Filter options based on search term
  const filteredOptions = filterOptions(options, searchTerm);

  // Flatten options for keyboard navigation
  const flatOptions = React.useMemo(() => {
    const flat: Option[] = [];
    filteredOptions.forEach(item => {
      if ('options' in item) {
        flat.push(...item.options.filter(opt => !opt.disabled));
      } else if (!item.disabled) {
        flat.push(item);
      }
    });
    return flat;
  }, [filteredOptions]);

  const { focusedIndex, setFocusedIndex } = useKeyboardNavigation({
    isOpen,
    options: flatOptions,
    onSelect: handleOptionSelect,
    onClose: () => setIsOpen(false),
  });

  useClickOutside(dropdownRef, () => {
    if (isOpen) {
      setIsOpen(false);
      onHide?.();
    }
  });

  // Update selected values when value prop changes
  useEffect(() => {
    if (multiple) {
      setSelectedValues(Array.isArray(value) ? value : []);
    } else {
      setSelectedValues(value ? [value as string] : []);
    }
  }, [value, multiple]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  function handleOptionSelect(optionValue: string) {
    let newSelectedValues: string[];

    if (multiple) {
      if (selectedValues.includes(optionValue)) {
        newSelectedValues = selectedValues.filter(v => v !== optionValue);
      } else {
        // Check max options limit
        if (maxOptions && selectedValues.length >= maxOptions) {
          return;
        }
        newSelectedValues = [...selectedValues, optionValue];
      }
    } else {
      newSelectedValues = [optionValue];
      setIsOpen(false);
      onHide?.();
    }

    setSelectedValues(newSelectedValues);
    onChange?.(multiple ? newSelectedValues : newSelectedValues[0] || '');
  }

  const handleToggle = useCallback(() => {
    if (disabled) return;
    
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    if (newIsOpen) {
      onShow?.();
    } else {
      onHide?.();
      setSearchTerm('');
    }
  }, [isOpen, disabled, onShow, onHide]);

  const handleSelectAll = useCallback(() => {
    if (!multiple) return;
    
    const allValues = flatOptions.map(opt => opt.value);
    const limitedValues = maxOptions ? allValues.slice(0, maxOptions) : allValues;
    
    setSelectedValues(limitedValues);
    onChange?.(limitedValues);
  }, [multiple, flatOptions, maxOptions, onChange]);

  const handleDeselectAll = useCallback(() => {
    if (!multiple) return;
    
    setSelectedValues([]);
    onChange?.([]);
  }, [multiple, onChange]);

  const getButtonText = () => {
    if (selectedValues.length === 0) {
      return placeholder;
    }

    if (multiple) {
      if (selectedValues.length === 1) {
        const option = flatOptions.find(opt => opt.value === selectedValues[0]);
        return option?.label || selectedValues[0];
      }
      return countSelectedText
        .replace('{0}', selectedValues.length.toString())
        .replace('{1}', flatOptions.length.toString());
    } else {
      const option = flatOptions.find(opt => opt.value === selectedValues[0]);
      return option?.label || selectedValues[0];
    }
  };

  const renderOption = (option: Option, index: number) => {
    const isSelected = selectedValues.includes(option.value);
    const isFocused = index === focusedIndex;
    
    return (
      <li
        key={option.value}
        className={`
          dropdown-item
          ${isSelected ? 'selected' : ''}
          ${isFocused ? 'focused' : ''}
          ${option.disabled ? 'disabled' : ''}
        `}
        onClick={() => !option.disabled && handleOptionSelect(option.value)}
      >
        <a href="#" onClick={(e) => e.preventDefault()}>
          {showTick && isSelected && (
            <span className="check-mark">
              <span className="bs-ok-default"></span>
            </span>
          )}
          <span className="text">
            {sanitize ? sanitizeHtml(option.label) : option.label}
          </span>
          {option.subtext && (
            <small className="text-muted">{option.subtext}</small>
          )}
        </a>
      </li>
    );
  };

  const renderOptionGroup = (group: OptionGroup) => (
    <React.Fragment key={group.label}>
      <li className="dropdown-header">{group.label}</li>
      {group.options.map((option, index) => {
        const globalIndex = flatOptions.findIndex(opt => opt.value === option.value);
        return renderOption(option, globalIndex);
      })}
      {group !== filteredOptions[filteredOptions.length - 1] && (
        <li className="dropdown-divider"></li>
      )}
    </React.Fragment>
  );

  const dropdownClasses = `
    bootstrap-select
    ${className}
    ${isOpen ? 'show' : ''}
    ${disabled ? 'disabled' : ''}
    ${dropup ? 'dropup' : ''}
  `.trim();

  const buttonClasses = `
    btn dropdown-toggle
    ${style}
    ${selectedValues.length === 0 ? 'bs-placeholder' : ''}
  `.trim();

  return (
    <div 
      className={dropdownClasses}
      style={{ width: width === 'auto' ? 'auto' : width }}
      ref={dropdownRef}
      {...props}
    >
      <button
        ref={buttonRef}
        type="button"
        className={buttonClasses}
        disabled={disabled}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="filter-option">
          <span className="filter-option-inner">
            <span className="filter-option-inner-inner">
              {getButtonText()}
            </span>
          </span>
        </span>
        <span className="bs-caret">
          <span className="caret"></span>
        </span>
      </button>

      {isOpen && (
        <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
          <div className="inner" role="listbox">
            {searchable && (
              <div className="bs-searchbox">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="form-control"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}

            {actionsBox && multiple && (
              <div className="bs-actionsbox">
                <div className="btn-group btn-group-sm btn-block">
                  <button
                    type="button"
                    className="actions-btn bs-select-all btn btn-light"
                    onClick={handleSelectAll}
                  >
                    {selectAllText}
                  </button>
                  <button
                    type="button"
                    className="actions-btn bs-deselect-all btn btn-light"
                    onClick={handleDeselectAll}
                  >
                    {deselectAllText}
                  </button>
                </div>
              </div>
            )}

            <ul className="dropdown-menu inner">
              {filteredOptions.length === 0 ? (
                <li className="no-results">
                  {noneResultsText.replace('{0}', searchTerm)}
                </li>
              ) : (
                filteredOptions.map(item => 
                  'options' in item 
                    ? renderOptionGroup(item)
                    : renderOption(item, flatOptions.findIndex(opt => opt.value === item.value))
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BootstrapSelect;