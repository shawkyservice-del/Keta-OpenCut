// KETA shell glue.
// Reuses OpenCut's existing refresh/health path. It does not create a second
// backend client, so connection behavior stays inside the tested core.
const byId = (id) => document.getElementById(id);

function readCoreConnectionState() {
  const dot = byId("connDot");
  if (dot?.classList.contains("connected")) return "online";
  if (dot?.classList.contains("connecting")) return "testing";
  return "offline";
}

function paintServerButton(state = readCoreConnectionState()) {
  const button = byId("ketaTestServerBtn");
  const label = byId("ketaTestServerLabel");
  const dot = byId("ketaServerDot");
  if (!button || !label || !dot) return;

  button.dataset.state = state;
  button.disabled = false;
  button.removeAttribute("disabled");
  button.setAttribute("aria-busy", state === "testing" ? "true" : "false");

  label.textContent =
    state === "online" ? "SERVER ONLINE" :
    state === "testing" ? "TESTING..." :
    "TEST SERVER";
}

function triggerCoreHealthCheck() {
  const refresh = byId("refreshBtn");
  paintServerButton("testing");

  if (!refresh) {
    paintServerButton("offline");
    const button = byId("ketaTestServerBtn");
    if (button) button.title = "Core refresh control is unavailable.";
    return;
  }

  // The core owns backend autodiscovery, CSRF, retries and status state.
  refresh.click();

  // Mirror the core state after its immediate and delayed health passes.
  setTimeout(() => paintServerButton(), 250);
  setTimeout(() => paintServerButton(), 1200);
  setTimeout(() => paintServerButton(), 3200);
}

function initKetaShell() {
  const button = byId("ketaTestServerBtn");
  if (button && button.dataset.ketaBound !== "1") {
    button.dataset.ketaBound = "1";
    button.addEventListener("click", triggerCoreHealthCheck);
  }

  const coreDot = byId("connDot");
  if (coreDot && typeof MutationObserver !== "undefined") {
    const observer = new MutationObserver(() => paintServerButton());
    observer.observe(coreDot, { attributes: true, attributeFilter: ["class"] });
  }

  paintServerButton();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initKetaShell, { once: true });
} else {
  initKetaShell();
}
