import { describe, expect, it } from 'vitest';
import { MANIFEST_COLUMNS, csvField, manifestToCsv, type ManifestRow } from '../src/manifest.js';

const base: ManifestRow = {
  runtime_system: 'LTI',
  runtime_id: 'https://lms.example.edu/courses/12/quizzes/7/items/3',
  record: 'AssessmentItem/bias-types-2',
  record_type: 'AssessmentItem',
  objective: 'LearningObjective/identify-bias-types',
  module: 'Module/module-3',
  module_role: 'Primary',
  commit: 'k3j9x2a0000000000000000000000000',
  instance: 'Example University · Information Literacy https://armature.example.edu',
};

describe('the manifest', () => {
  it('writes the columns of the plan §5, in order', () => {
    expect(MANIFEST_COLUMNS).toEqual([
      'runtime_system', 'runtime_id', 'record', 'record_type', 'objective', 'module', 'module_role', 'commit', 'instance',
    ]);
    expect(manifestToCsv([]).split('\r\n')[0]).toBe(MANIFEST_COLUMNS.join(','));
  });

  it('gives an item assessing two objectives one row each', () => {
    const rows = [base, { ...base, objective: 'LearningObjective/explain-bias-sources' }];
    const lines = manifestToCsv(rows).trimEnd().split('\r\n');
    expect(lines).toHaveLength(3);
    expect(lines[1]).toContain('LearningObjective/identify-bias-types');
    expect(lines[2]).toContain('LearningObjective/explain-bias-sources');
  });

  it('keeps a record aligned to no objective, with the objective empty', () => {
    const line = manifestToCsv([{ ...base, objective: '', module_role: '' }]).split('\r\n')[1];
    expect(line.split(',')[4]).toBe('');
  });

  it('quotes a field holding a comma, a quote or a line break', () => {
    expect(csvField('plain')).toBe('plain');
    expect(csvField('a,b')).toBe('"a,b"');
    expect(csvField('say "hi"')).toBe('"say ""hi"""');
    expect(csvField('two\nlines')).toBe('"two\nlines"');
  });
});
