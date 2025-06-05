export const sanitizeTextContent = (text) => {
    if (!text) return "";

    const escapedText = text
        .replace(/\\\./g, ".")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/__(.*?)__/g, "<em>$1</em>")
        .replace(/\n/g, "<br/>")
        .replace(/(\bhttps?:\/\/[^\s<]+\.(?:jpg|jpeg|png|webp|gif))/gi, "")
        .replace(
            /(\bhttps?:\/\/[^\s<]+)/g,
            '<a href="$1" class="text-blue-600 underline hover:text-blue-800 transition-colors break-words" target="_blank" rel="noopener noreferrer">$1</a>'
        );

    return escapedText.trim();
}