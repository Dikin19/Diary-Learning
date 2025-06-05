export function parseToBlocks(markdown) {
  const lines = markdown.split('\n');
  const blocks = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (line.startsWith('### ')) {
      blocks.push({ type: 'heading', level: 3, text: line.slice(4) });
    } else if (line.startsWith('## ')) {
      blocks.push({ type: 'heading', level: 2, text: line.slice(3) });
    } else if (line.startsWith('# ')) {
      blocks.push({ type: 'heading', level: 1, text: line.slice(2) });
    } else if (line.startsWith('- ')) {
      const items = [];
      while (line.startsWith('- ')) {
        items.push(line.slice(2));
        line = lines.shift() || '';
      }
      blocks.push({ type: 'list', items });
    } else if (line.match(/^!\[.*\]\(.*\)$/)) {
      const match = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (match) {
        blocks.push({ type: 'image', alt: match[1], url: match[2] });
      }
    } else {
      blocks.push({ type: 'paragraph', text: line });
    }
  }

  return blocks;
}
