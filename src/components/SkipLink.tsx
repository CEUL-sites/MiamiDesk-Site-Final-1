/**
 * Skip-to-content link — the first focusable element in the DOM.
 * Visually hidden until focused via keyboard (Tab), then it reveals itself
 * and jumps assistive-tech and keyboard users past the navigation straight
 * to each page's <main id="main-content">. (§13, §17 accessibility.)
 */
export function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  );
}
