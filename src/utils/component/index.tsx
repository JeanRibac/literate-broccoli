import { Children, isValidElement } from "react";

type ChildrenArrFn<T, U> = (item: T, index: number) => U;
type FallbackElement = JSX.Element;

type ForPropsType<T, U> = {
  each: T[] | undefined;
  fallback?: FallbackElement;
  children: ChildrenArrFn<T, U>;
};

export const For = <T, U extends JSX.Element>({
  each,
  children,
  fallback = undefined,
}: ForPropsType<T, U>) => {
  if (!Array.isArray(each) && !isValidElement(fallback)) {
    return null;
  }
  if (!Array.isArray(each) && isValidElement(fallback)) {
    return fallback;
  }
  const returnList = Children.toArray(each?.map(children));
  return <>{returnList}</>;
};
