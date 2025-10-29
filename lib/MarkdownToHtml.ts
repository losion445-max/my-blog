import { remark } from 'remark';
import remarkHtml from 'remark-html';


export async function markdownToHtml(markdown: string): Promise<string> {
	markdown = "Сумма: $\\sum_{i=1}^n i$ и в блоке: $$\\int_0^1 x^2 dx$$";
  	const result = await remark()
    	.use(remarkHtml)
    	.process(markdown);
  return String(result.value);
}