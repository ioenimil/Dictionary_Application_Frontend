import { describe, it, expect } from 'vitest';

import { add, subtract, multiply, divide } from "@lib/arithmetic-helper"// Replace with your actual module name

describe('Arithmetic Operations', () => {
  it('should add two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should subtract two numbers', () => {
    expect(subtract(5, 2)).toBe(3);
  });

  it('should multiply two numbers', () => {
    expect(multiply(4, 3)).toBe(12);
  });

  it('should divide two numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });
});