import { registerSW } from "virtual:pwa-register";
import "./App.css";
import { proxy, useSnapshot } from "valtio";

const state = proxy({ needUpdate: false });

const currentVersion = "0.0.18";

const updateSW = registerSW({
  onNeedRefresh() {
    state.needUpdate = true;
  },
  onRegisteredSW(swUrl, r) {
    const updateSw = async () => {
      if (r) {
        if (!(!r.installing && navigator)) {
          return;
        }

        if ("connection" in navigator && !navigator.onLine) {
          return;
        }

        const resp = await fetch(swUrl, {
          cache: "no-store",
          headers: {
            cache: "no-store",
            "cache-control": "no-cache",
          },
        });

        if (resp?.status === 200) {
          await r.update();
        }
      }
    };
    setInterval(updateSw, 5000);
  },
});

updateSW();

function App() {
  const snap = useSnapshot(state);
  return (
    <div className="App">
      <p>currentVersion: {currentVersion}</p>
      <p>needUpdate: {snap.needUpdate.toString()}</p>
      <p>
        <button
          onClick={() => {
            updateSW();
          }}
        >
          Update SW 2
        </button>
      </p>
    </div>
  );
}

export default App;
