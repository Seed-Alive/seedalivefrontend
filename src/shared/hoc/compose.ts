import type { ComponentType } from 'react';

// A wrapper that keeps a component's props the same.
export type Enhancer<P> = (Component: ComponentType<P>) => ComponentType<P>;

// Wraps a component in several wrappers at once, first one outermost.
export function compose<P>(...enhancers: Array<Enhancer<P>>): Enhancer<P> {
  return (Component) =>
    enhancers.reduceRight<ComponentType<P>>((acc, enhance) => enhance(acc), Component);
}

type Labelled = { displayName?: string | undefined; name?: string | undefined };

// Gives a wrapped component a readable name in React DevTools.
export function named<T>(Wrapper: T, hoc: string, Inner: unknown): T {
  const meta = Inner as Labelled;
  (Wrapper as Labelled).displayName = `${hoc}(${meta.displayName ?? meta.name ?? 'Component'})`;
  return Wrapper;
}
