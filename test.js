import process from 'node:process';
import test from 'ava';
import isCliUnicode from './index.js';

test.serial('main', (t) => {
  t.true(isCliUnicode());
});

test.serial('windows', (t) => {
  delete process.env.CI;
  delete process.env.TERM;
  delete process.env.TERM_PROGRAM;
  delete process.env.WT_SESSION;

  const originalPlatform = process.platform;

  Object.defineProperty(process, 'platform', { value: 'win32' });
  t.false(isCliUnicode());
  process.env.WT_SESSION = '1';
  t.true(isCliUnicode());

  Object.defineProperty(process, 'platform', { value: originalPlatform });
});
