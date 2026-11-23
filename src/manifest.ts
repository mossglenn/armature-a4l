// The manifest: the design at one commit, in the terms A4L already holds (Armature's docs/a4l-bridge-plan.md §5).
//
// One row per runtime identifier and objective, so an A4L analysis payload can merge on `runtime_id` and group by
// `objective` without parsing a list. A record aligned to no objective has one row with `objective` empty (ADR-0060).
// The manifest is design data regenerated from a commit whenever it is wanted, never stored in the graph (ADR-0056),
// and it carries no person's name, no rationale and no finding (the plan's §8).

/** The columns, in the order the file writes them. */
export const MANIFEST_COLUMNS = [
  'runtime_system',
  'runtime_id',
  'record',
  'record_type',
  'objective',
  'module',
  'module_role',
  'commit',
  'instance',
] as const;

export type ManifestColumn = (typeof MANIFEST_COLUMNS)[number];

export interface ManifestRow {
  /** The system the runtime identifier belongs to, as the record's ExternalRef names it: `LTI`, or `Other` with its prefix's system. */
  runtime_system: string;
  /** The identifier A4L sees: an LTI resource link, an LMS assignment, a Caliper object IRI. */
  runtime_id: string;
  /** The Armature record that identifier delivers, `Type/local-part`. */
  record: string;
  record_type: string;
  /** An objective the record targets or assesses at the commit; empty for a record aligned to none. */
  objective: string;
  /** The module that places the record; empty when none does. */
  module: string;
  /** The objective's role in that module (`ModuleObjective.role`); empty when the module does not declare it. */
  module_role: string;
  /** The bare commit id the manifest was read at. */
  commit: string;
  /** The hub's instance name and address, from `GET /discover`'s `instance`. */
  instance: string;
}

/** One field as RFC 4180 writes it: quoted when it holds a comma, a quote or a line break, with quotes doubled. */
export function csvField(value: string): string {
  return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

/** The manifest as CSV: a header row, then one line per row, CRLF line endings as RFC 4180 has them. */
export function manifestToCsv(rows: readonly ManifestRow[]): string {
  const lines = [MANIFEST_COLUMNS.join(',')];
  for (const row of rows) lines.push(MANIFEST_COLUMNS.map((c) => csvField(row[c])).join(','));
  return lines.join('\r\n') + '\r\n';
}
