// HighlightScroll.js

export default function HighlightScroll(options = {}) {
  return function (Alpine) {
    // Merge user-provided options with plugin defaults
    const defaultOffset = options.offset ?? 50;
    const highlightClasses =
      options.highlightClasses ??
      "ease-in-out text-blue-500 scale-110 dark:text-blue-500 transition-all";

    // =============================================
    // 1) Global Store for Multiple "Groups"
    // todo: Make is possible to add custom highlight classes directive  to x-scroll-item
    // =============================================
    Alpine.store("HighlightScroll", {
      groups: {},

  
      getGroup(name) {
        if (!name) name = "default";
        if (!this.groups[name]) {
          this.groups[name] = {
            scrollEl: window,
            offset: defaultOffset,
            highlightClasses: highlightClasses,
            items: [],
            sections: [],
          };
        }
        return this.groups[name];
      },

      setGroupOptions({ group = "default", offset, highlightClasses }) {
        const g = this.getGroup(group);
        if (typeof offset !== "undefined") g.offset = offset;
        if (typeof highlightClasses !== "undefined")
          g.highlightClasses = highlightClasses;
      },

      setScrollable({ group = "default", el }) {
        const g = this.getGroup(group);
        g.scrollEl = el;
      },

      registerItem({ group = "default", el, target }) {
        const g = this.getGroup(group);
        g.items.push({ el, target });
      },

      registerSection({ group = "default", el, id }) {
        const g = this.getGroup(group);
        g.sections.push({ el, id });
      },

      onScroll(groupName = "default") {
        const g = this.getGroup(groupName);
        const scrollable = g.scrollEl;
        if (!scrollable) return;

        const scrollPos =
          scrollable === window ? window.scrollY : scrollable.scrollTop;

        let currentSectionId = "";

        for (let i = 0; i < g.sections.length; i++) {
          const s = g.sections[i];
          const next = g.sections[i + 1];
          const startPos = s.el.offsetTop - g.offset;
          const nextPos = next ? next.el.offsetTop - g.offset : Infinity;

          if (scrollPos >= startPos && scrollPos < nextPos) {
            currentSectionId = s.id;
            break;
          }
        }

        for (let item of g.items) {
          item.el.classList.remove(...g.highlightClasses.split(" "));
        }
        if (currentSectionId) {
          const activeItem = g.items.find((i) => i.target === currentSectionId);
          if (activeItem) {
            activeItem.el.classList.add(...g.highlightClasses.split(" "));
          }
        }
      },

      smoothScrollTo({ group = "default", target }) {
        const g = this.getGroup(group);
        const scrollable = g.scrollEl;
        const sectionEl = document.getElementById(target);
        if (!sectionEl) return;

        const targetPos = sectionEl.offsetTop - g.offset;
        if (scrollable === window) {
          window.scrollTo({ top: targetPos, behavior: "smooth" });
        } else {
          scrollable.scrollTo({ top: targetPos, behavior: "smooth" });
        }
      },
    });

    // ===========================================================
    // 2) Helper: parseDirectiveExpression
    // ===========================================================
    function parseDirectiveExpression({ expression, evaluate, defaultProp }) {
      if (!expression || !expression.trim()) return {};
      try {
        const result = evaluate(expression);
        if (typeof result === "string") {
          return { [defaultProp]: result };
        }
        if (result && typeof result === "object") {
          return result;
        }
        return { [defaultProp]: expression };
      } catch (err) {
        return { [defaultProp]: expression };
      }
    }

    // ===================================
    // 3) Directives
    // ===================================

    // x-scroll-group
     // x-scroll-group
     Alpine.directive("scroll-group", (el, { expression }, { evaluate }) => {
      const data = parseDirectiveExpression({
        expression,
        evaluate,
        defaultProp: "group",
      });
      const groupName = data.group || "default";
      Alpine.store("HighlightScroll").setGroupOptions({
        group: groupName,
        offset: data.offset,
        highlightClasses: data.highlightClasses,
      });

      // Store group name on the element for inheritance
      el.dataset.scrollGroup = groupName;
    });
    // x-scroll-container
  Alpine.directive("scroll-container", (el, { expression }, { evaluate }) => {
  const data = parseDirectiveExpression({
    expression,
    evaluate,
    defaultProp: "group",
  });

  // If no group is specified in the directive expression, inherit from the nearest group
  const groupName = data.group || findNearestGroup(el) || "default";

  Alpine.store("HighlightScroll").setScrollable({ group: groupName, el });

  el.addEventListener("scroll", () => {
    Alpine.store("HighlightScroll").onScroll(groupName);
  });
  Alpine.store("HighlightScroll").onScroll(groupName);
});

    // x-scroll-item
    Alpine.directive("scroll-item", (el, { expression }, { evaluate }) => {
      let data;

      if (typeof expression === "string") {
        data = parseDirectiveExpression({
          expression,
          evaluate,
          defaultProp: "target",
        });
      } else {
        data = expression;
      }

      // Inherit group from nearest parent x-scroll-group if not defined
      let group = data.group || findNearestGroup(el);
      const target = data.target || data.id;
      if (!target) return;

      Alpine.store("HighlightScroll").registerItem({ group, el, target });

      el.addEventListener("click", () => {
        Alpine.store("HighlightScroll").smoothScrollTo({ group, target });
      });
    });

    // x-scroll-section
    Alpine.directive("scroll-section", (el, { expression }, { evaluate }) => {
      let data;

      if (typeof expression === "string") {
        data = parseDirectiveExpression({
          expression,
          evaluate,
          defaultProp: "id",
        });
      } else {
        data = expression;
      }

      // Inherit group from nearest parent x-scroll-group if not defined
      let group = data.group || findNearestGroup(el);
      const id = data.id;
      if (!id) return;

      if (!el.id) el.id = id;

      Alpine.store("HighlightScroll").registerSection({ group, el, id });
    });

    // 4) Window scroll fallback for "default"
    window.addEventListener("scroll", () => {
      const g = Alpine.store("HighlightScroll").getGroup("default");
      if (g.scrollEl === window) {
        Alpine.store("HighlightScroll").onScroll("default");
      }
    });

    const defaultGroup = Alpine.store("HighlightScroll").getGroup("default");
    if (defaultGroup.scrollEl === window) {
      Alpine.store("HighlightScroll").onScroll("default");
    }

        // Helper function to find the nearest x-scroll-group
    function  findNearestGroup(el) {
        let parent = el.closest("[data-scroll-group]");
        return parent ? parent.dataset.scrollGroup : "default";
      }
  
  };
}
