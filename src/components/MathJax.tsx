// components/MathJax.tsx
'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    // @ts-ignore
    MathJax: any;
  }
}

export function MathJax({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.MathJax) {
      window.MathJax = {
        loader: { load: ['input/tex', 'output/chtml', 'ui/menu'] },
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']],
          processEscapes: true,
        },
        options: {
          ignoreHtmlClass: 'tex2jax_ignore',
          processHtmlClass: 'tex2jax_process',
        },
        startup: {
          typeset: false, // не рендерить автоматически при загрузке
          ready: () => {
            window.MathJax.startup.defaultReady();
          }
        }
      };

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';
      script.async = true;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
        delete window.MathJax;
      };
    }
  }, []);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetClear();
      window.MathJax.typeset();
    }
  });

  return <>{children}</>;
}