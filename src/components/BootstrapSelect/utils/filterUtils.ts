import { OptionOrGroup, Option } from '../types';

export function filterOptions(
  options: OptionOrGroup[],
  searchTerm: string,
  searchStyle: 'contains' | 'startsWith' | ((option: string, searchTerm: string) => boolean) = 'contains'
): OptionOrGroup[] {
  if (!searchTerm.trim()) {
    return options;
  }

  const normalizedSearchTerm = searchTerm.toLowerCase();

  const matchesSearch = (text: string, tokens?: string[]): boolean => {
    const normalizedText = text.toLowerCase();
    const searchIn = [normalizedText];
    
    if (tokens) {
      searchIn.push(...tokens.map(token => token.toLowerCase()));
    }

    if (typeof searchStyle === 'function') {
      return searchIn.some(str => searchStyle(str, normalizedSearchTerm));
    }

    switch (searchStyle) {
      case 'startsWith':
        return searchIn.some(str => str.startsWith(normalizedSearchTerm));
      case 'contains':
      default:
        return searchIn.some(str => str.includes(normalizedSearchTerm));
    }
  };

  return options.reduce<OptionOrGroup[]>((filtered, item) => {
    if ('options' in item) {
      // It's an option group
      const filteredGroupOptions = item.options.filter(option =>
        matchesSearch(option.label, option.tokens)
      );
      
      if (filteredGroupOptions.length > 0) {
        filtered.push({
          ...item,
          options: filteredGroupOptions,
        });
      }
    } else {
      // It's a single option
      if (matchesSearch(item.label, item.tokens)) {
        filtered.push(item);
      }
    }
    
    return filtered;
  }, []);
}

export function normalizeToBase(text: string): string {
  // Simple normalization - remove accents and diacritics
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}