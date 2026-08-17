import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the initial value immediately, before the delay elapses', () => {
    const { result } = renderHook(() => useDebounce('a', 400));

    expect(result.current).toBe('a');
  });

  it('does not update until the full delay has elapsed', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'ab' });

    act(() => {
      vi.advanceTimersByTime(399);
    });
    expect(result.current).toBe('a');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('ab');
  });

  it('resets the timer on every change, so only the final value in a rapid burst is applied', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'ab' });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({ value: 'abc' });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('a');

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('abc');
  });
});
