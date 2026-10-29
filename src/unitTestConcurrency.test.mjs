import { test } from 'node:test';
import assert from 'node:assert/strict';
import { unitTestConcurrency } from '../scripts/run-unit-tests.mjs';
test('test process fan-out is bounded and configurable', () => {
  assert.equal(unitTestConcurrency(undefined, 64), 4);
  assert.equal(unitTestConcurrency(undefined, 1), 1);
  assert.equal(unitTestConcurrency('8', 1), 8);
  for (const v of ['0', '-1', '1.5', '1000', 'Infinity', ''])
    assert.throws(() => unitTestConcurrency(v), RangeError);
});
