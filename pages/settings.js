import { db } from "../helpers/db";

export default function Settings() {
  const exportDB = async () => {
    require('dexie-export-import');
    const blob = await db.export();

    const a = document.createElement("a");
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "db.json";
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  };

  return (
    <main className="p-4">
      <h1 className="text-4xl p-4">Settings</h1>

      <div>
        <button
          onClick={exportDB}
          className="w-full border px-2 py-4 bg-blue-400 text-white mt-12"
        >
          Export Database
        </button>
      </div>
    </main>
  );
}
