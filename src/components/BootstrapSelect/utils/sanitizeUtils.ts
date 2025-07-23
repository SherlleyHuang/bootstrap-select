const DEFAULT_WHITELIST: Record<string, string[]> = {
  '*': ['class', 'dir', 'id', 'lang', 'role', 'tabindex', 'style'],
  a: ['target', 'href', 'title', 'rel'],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ['src', 'alt', 'title', 'width', 'height'],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};

export function sanitizeHtml(
  html: string,
  whiteList: Record<string, string[]> = DEFAULT_WHITELIST
): string {
  // Simple HTML sanitization - in production, consider using DOMPurify
  const div = document.createElement('div');
  div.innerHTML = html;
  
  const sanitizeElement = (element: Element): void => {
    const tagName = element.tagName.toLowerCase();
    const allowedAttrs = whiteList[tagName] || [];
    const globalAttrs = whiteList['*'] || [];
    const allAllowedAttrs = [...allowedAttrs, ...globalAttrs];
    
    // Remove disallowed attributes
    Array.from(element.attributes).forEach(attr => {
      if (!allAllowedAttrs.includes(attr.name)) {
        element.removeAttribute(attr.name);
      }
    });
    
    // Recursively sanitize child elements
    Array.from(element.children).forEach(child => {
      if (whiteList[child.tagName.toLowerCase()]) {
        sanitizeElement(child);
      } else {
        // Remove disallowed elements but keep their text content
        const textNode = document.createTextNode(child.textContent || '');
        child.parentNode?.replaceChild(textNode, child);
      }
    });
  };
  
  Array.from(div.children).forEach(child => {
    if (whiteList[child.tagName.toLowerCase()]) {
      sanitizeElement(child);
    } else {
      const textNode = document.createTextNode(child.textContent || '');
      div.replaceChild(textNode, child);
    }
  });
  
  return div.innerHTML;
}