const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export function toCsvText(rows: (string | number)[][]) {
  return rows.map((r) => r.map(esc).join(",")).join("\n");
}

export function downloadCsvText(filename: string, csv: string) {
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const clean = (el: Element) => (el.textContent ?? "").replace(/\s+/g, " ").trim();

/**
 * Scrapes every visible table rendered inside <main> and exports it as one CSV.
 * Returns the number of data rows exported.
 */
export function exportVisibleTables(title: string, scope?: string) {
  if (typeof document === "undefined") return 0;
  const root = document.querySelector("main") ?? document.body;
  const tables = Array.from(root.querySelectorAll("table")).filter(
    (t) => t.offsetParent !== null || t.getClientRects().length > 0,
  );

  const rows: (string | number)[][] = [[title]];
  if (scope) rows.push([`Scope: ${scope}`]);
  rows.push([`Exported: ${new Date().toLocaleString()}`], []);

  let count = 0;
  tables.forEach((table, i) => {
    if (i > 0) rows.push([]);
    const headers = Array.from(table.querySelectorAll("thead tr")).map((tr) =>
      Array.from(tr.children).map(clean),
    );
    const body = Array.from(table.querySelectorAll("tbody tr"))
      .map((tr) => Array.from(tr.children).map(clean))
      .filter((r) => r.some((c) => c.length > 0));
    rows.push(...headers, ...body);
    count += body.length;
  });

  if (count === 0) {
    // Fall back to any card-based content so the export is never an empty file.
    const cards = Array.from(root.querySelectorAll("[data-export-row]")).map((el) => [clean(el)]);
    rows.push(...cards);
    count = cards.length;
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "export";
  downloadCsvText(`${slug}-${new Date().toISOString().slice(0, 10)}.csv`, toCsvText(rows));
  return count;
}
