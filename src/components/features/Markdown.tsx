'use client';


import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkBreaks from 'remark-breaks';


export function Markdown({ content }: { content: string }) {
  return (
    <div className='mr-auto p-4 prose prose-sm dark:prose-invert'>
    <ReactMarkdown
      remarkPlugins={[remarkMath, remarkBreaks]}
      rehypePlugins={[rehypeKatex]}
  
    >
      {content}
    </ReactMarkdown>
    </div>
  )
}