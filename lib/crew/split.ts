/**
 * Splits an element's text into per-character spans so a cursor can "type" it.
 *
 * Original text nodes are kept and put back by `restore()`, so React's
 * references to them stay valid once typing is finished.
 */
export type Split = {
  /** Characters and visual leaves (icons, dots) in reading order. */
  tokens: Element[];
  restore: () => void;
};

const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"]);

export function splitForTyping(root: HTMLElement): Split {
  const tokens: Element[] = [];
  const groups: { wrapper: HTMLSpanElement; nodes: Text[] }[] = [];
  const leaves: Element[] = [];

  const wrapRun = (run: Text[]) => {
    const text = run.map((n) => n.data).join("");
    // Whitespace is invisible anyway; leaving it alone keeps flex gaps intact.
    if (!text.trim()) return;

    // One wrapper per run of adjacent text nodes, so a flex parent still sees
    // a single item where it used to see one anonymous text item.
    const wrapper = document.createElement("span");
    wrapper.className = "mc-split";
    let space = "";
    for (const ch of Array.from(text)) {
      if (/\s/.test(ch)) {
        space += ch;
        continue;
      }
      if (space) {
        wrapper.appendChild(document.createTextNode(space));
        space = "";
      }
      const s = document.createElement("span");
      s.className = "mc-ch";
      s.textContent = ch;
      wrapper.appendChild(s);
      tokens.push(s);
    }
    if (space) wrapper.appendChild(document.createTextNode(space));

    run[0].parentNode!.insertBefore(wrapper, run[0]);
    run.forEach((n) => n.remove());
    groups.push({ wrapper, nodes: run });
  };

  const walk = (el: Element) => {
    let run: Text[] = [];
    const flush = () => {
      if (run.length) wrapRun(run);
      run = [];
    };

    for (const node of Array.from(el.childNodes)) {
      if (node.nodeType === Node.TEXT_NODE) {
        run.push(node as Text);
        continue;
      }
      flush();
      if (node.nodeType !== Node.ELEMENT_NODE) continue;
      const child = node as Element;
      if (SKIP.has(child.tagName)) continue;

      // Icons and decorative dots appear as a single "keystroke".
      if (child instanceof SVGElement || !child.textContent?.trim()) {
        if (child.getClientRects().length) {
          child.classList.add("mc-tok");
          tokens.push(child);
          leaves.push(child);
        }
        continue;
      }
      walk(child);
    }
    flush();
  };

  walk(root);

  let restored = false;
  const restore = () => {
    if (restored) return;
    restored = true;
    for (const { wrapper, nodes } of groups) {
      const parent = wrapper.parentNode;
      if (!parent) continue;
      const frag = document.createDocumentFragment();
      nodes.forEach((n) => frag.appendChild(n));
      parent.replaceChild(frag, wrapper);
    }
    leaves.forEach((l) => l.classList.remove("mc-tok", "on"));
  };

  return { tokens, restore };
}
