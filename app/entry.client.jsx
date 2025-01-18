import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

function clearBrowserExtensionInjectionsBeforeHydration() {
  document
    .querySelectorAll(
      [
        "html > *:not(body, head)",
        'script[src*="extension://"]',
        'link[href*="extension://"]',
      ].join(", ")
    )
    .forEach((element) => {
      element.parentNode?.removeChild(element);
    });

  const targets = {
    html: {
      elm: document.querySelector("html"),
      allowedAttributes: ["lang", "dir", "class"],
    },
    head: {
      elm: document.querySelector("head"),
      allowedAttributes: [],
    },
    body: {
      elm: document.querySelector("body"),
      allowedAttributes: ["class"],
    },
  };

  Object.entries(targets).forEach(([targetName, target]) => {
    if (target.elm) {
      target.elm.getAttributeNames().forEach((attr) => {
        if (!target.allowedAttributes.includes(attr)) {
          target.elm.removeAttribute(attr);
        }
      });
    }
  });
}

function hydrate() {
  clearBrowserExtensionInjectionsBeforeHydration();

  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari fallback
  window.setTimeout(hydrate, 1);
}
