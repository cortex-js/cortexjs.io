// Custom remark plugin to convert LaTeX \(...\) and \[...\] delimiters
// to $...$ and $$...$$ which are recognized by remark-math v6

import { visit } from 'unist-util-visit';

export default function remarkLatexDelimiters() {
  return (tree) => {
    visit(tree, 'text', (node) => {
      if (!node.value) return;

      // Convert \(...\) to $...$
      // Match: \( followed by any content (non-greedy) followed by \)
      // The 's' flag allows . to match newlines for multi-line math
      node.value = node.value.replace(/\\\((.+?)\\\)/gs, '$$$1$$');

      // Convert \[...\] to $$...$$
      // Match: \[ followed by any content (non-greedy) followed by \]
      node.value = node.value.replace(/\\\[(.+?)\\\]/gs, '$$$$$$1$$$$');
    });
  };
}
