import { expect } from 'vitest';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/matchers';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);
