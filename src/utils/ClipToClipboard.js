export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alert(`${text} copied to clipboard`);
  } catch (error) {
    alert("Failed to copy text: ", error);
  }
};
