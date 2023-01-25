async function loadAll() {
  const loadScript = (link, type = undefined) => {
    return new Promise((resolve) => {
      const s = document.createElement("script");
      if (type) {
        s.type = type;
      }
      s.src = link;
      s.addEventListener("load", function () {
        resolve(true);
      });
      s.addEventListener("error", function (e) {
        console.log("error", link, e);
        resolve(true);
      });
      document.head.appendChild(s);
    });
  };
  await loadScript(
    "https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/system.min.js"
  );
  loadScript(
    "http://localhost:9002/static/importmap.json",
    "systemjs-importmap"
  );
  await Promise.all([
    loadScript(
      "https://cdn.jsdelivr.net/npm/single-spa@5.9.0/lib/system/single-spa.min.js"
    ),
    loadScript(
      "https://cdn.jsdelivr.net/npm/import-map-overrides@2.2.0/dist/import-map-overrides.js"
    ),
    loadScript(
      "https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/extras/amd.min.js"
    ),
  ]);
  const interval = setInterval(() => {
    if (System && System.import) {
      try {
        System.import("@khairul/root-config");
        clearInterval(interval);
        console.log("done");
      } catch (e) {}
    }
    console.log("interval");
  }, 1000);
}

const loadScriptSync = (link, type?) => {
  const s = document.createElement("script");
  s.src = link;
  if (type) {
    s.type = type;
  }
  s.addEventListener("load", loadAll);
  s.addEventListener("error", function (e) {});
  document.head.appendChild(s);
};

const initSingleSpa = (id: string) => {
  //@ts-ignore
  window.single_container_id = id;
  loadScriptSync(
    "https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.7/runtime.min.js"
  );
};

export default initSingleSpa;
