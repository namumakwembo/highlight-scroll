import HighlightScroll from '../src/index.js';

// Attach HighlightScroll globally
window.HighlightScroll = HighlightScroll;

document.addEventListener('alpine:init', () => {
  console.log("Alpine initialized, adding plugin...");
  window.Alpine.plugin(HighlightScroll({highlightClasses:'ease-in-out text-blue-500 scale-110 dark:text-blue-500 transition-all'}));
});
