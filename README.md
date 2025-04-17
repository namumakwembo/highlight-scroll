
# Highlight Scroll Alpine JS Package

This is an Alpine JS plugin that enables smooth scrolling and dynamic highlighting of navigation items based on the visibility of corresponding sections within a scrollable container or the window. It supports grouped scrolling contexts, customizable highlight styles, and smooth scroll-to behavior when clicking navigation items.

## Install

### With a CDN

```html
<script defer src="https://unpkg.com/highlight-scroll@latest/dist/highlight-scroll.min.js"></script>
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### With a Package Manager

```shell
yarn add -D highlight-scroll
# or
npm install -D highlight-scroll
```

```js
import Alpine from 'alpinejs'
import HighlightScroll from 'highlight-scroll'

Alpine.plugin(HighlightScroll)
Alpine.start()
```

## Usage

The `HighlightScroll` plugin provides directives to create a scroll-based navigation system. It highlights navigation items (`x-scroll-item`) when their corresponding sections (`x-scroll-section`) are in view and supports smooth scrolling when clicking navigation links. Use `x-scroll-container` to define the scrollable element and `x-scroll-group` to organize multiple scroll contexts.

### Basic Setup

1. **Define sections**: Use `x-scroll-section` on elements (e.g., headings or divs) to mark them as sections. Each section needs a unique `id`.
2. **Create navigation items**: Use `x-scroll-item` on navigation links, specifying the `target` as the `id` of the corresponding section. Clicking these items triggers smooth scrolling.
3. **Set a scrollable container**: Use `x-scroll-container` on the element that handles scrolling (e.g., a `div` with `overflow-y: auto`). If omitted, the `window` is used.
4. **Group content (optional)**: Use `x-scroll-group` to create a named group for scrollable content and navigation items. If not specified, the default group is used.

### Example

```html
<main x-scroll-group>
  <!-- Scrollable Container -->
  <div x-scroll-container>
    <!-- Sections -->
    <section x-scroll-section="'section-1'">Section 1</section>
    <section x-scroll-section="{id: 'section-2'}">Section 2</section>
  </div>

  <!-- Navigation -->
  <nav>
    <ul>
      <li><a x-scroll-item="'section-1'" href="#section-1">Section 1</a></li>
      <li><a x-scroll-item="{target: 'section-2', group: 'default'}" href="#section-2">Section 2</a></li>
    </ul>
  </nav>
</main>
```

### Directives

- `x-scroll-group`: Defines a group for scrollable content and navigation items. Supports options like `offset` and `highlightClasses`.
  - Example: `x-scroll-group="{group: 'myGroup', offset: 50}"`
  - Default group: `"default"`

- `x-scroll-container`: Specifies the scrollable element (e.g., a `div` with `overflow-y: auto`). Used to determine the scrollable context. If not set, the `window` is used.
  - Example: `x-scroll-container="'myGroup'"` or `x-scroll-container`

- `x-scroll-section`: Marks a section that corresponds to a navigation item. Requires a unique `id`.
  - Examples:
    - `x-scroll-section="'section-1'"`
    - `x-scroll-section="{id: 'section-1', group: 'myGroup'}"`

- `x-scroll-item`: Marks a navigation item that highlights when its target section is in view and triggers smooth scrolling when clicked. Specify the `target` as the section’s `id`.
  - Examples:
    - `x-scroll-item="'section-1'"`
    - `x-scroll-item="{target: 'section-1', group: 'myGroup'}"`

### Customization

Customize the plugin by passing options when registering it:

```js
Alpine.plugin(HighlightScroll({
  offset: 100, // Distance from top when highlighting
  highlightClasses: 'text-blue-500 font-bold transition-all' // Classes applied to active items
}))
```

### Notes

- Use `x-scroll-container` to define the scrollable element if your document or container is not scrollable by default (e.g., a `div` with `overflow-y: auto`).
- Ensure each `x-scroll-section` has a unique `id` that matches the `target` in `x-scroll-item`.
- The plugin uses the `window` for scrolling in the `"default"` group unless `x-scroll-container` is specified.
- If `group` is not specified in `x-scroll-item` or `x-scroll-section`, it inherits from the nearest `x-scroll-group` or defaults to `"default"`.

### Auther 
 - pinkary: [https://pinkary.com/@namu](https://pinkary.com/@namu)
 - Linked: [Namu makwembo](https://www.linkedin.com/in/namu-makwembo/)