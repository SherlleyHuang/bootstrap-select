import { useState, useEffect } from 'react';
import { UseKeyboardNavigationProps } from '../types';

export function useKeyboardNavigation({
  isOpen,
  options,
  onSelect,
  onClose,
}: UseKeyboardNavigationProps) {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;
          
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;
          
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < options.length) {
            onSelect(options[focusedIndex].value);
          }
          break;
          
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
          
        case 'Tab':
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, options, focusedIndex, onSelect, onClose]);

  return { focusedIndex, setFocusedIndex };
}