import HighlightScroll from '../src/index.js';

// Attach HighlightScroll globally
window.HighlightScroll = HighlightScroll;

document.addEventListener('alpine:init', () => {
  window.Alpine.plugin(HighlightScroll());
});
