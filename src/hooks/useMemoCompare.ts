import { useRef, useEffect } from 'react';

/**
 *
 *
 * function MyComponent({ obj }) {
  const [state, setState] = useState();

  const objFinal = useMemoCompare(obj, (prev, next) => {
    return prev && prev.id === next.id;
  });

  useEffect(() => {
    return objFinal.someMethod().then((value) => setState(value));
  }, [objFinal]);

  useEffect(() => {
     return obj.someMethod().then((value) => setState(value));
  }, [obj.id]);

  return <div> ... </div>;
}
 *
 * @param {*} next
 * @param {*} compare
 * @return {*}
 */
const useMemoCompare = (next, compare) => {
    const prevRef = useRef();
    const prev = prevRef.current;

    const isEqual = compare(prev, next);

    useEffect(() => {
        if (!isEqual) {
            prevRef.current = next;
        }
    });

    return isEqual ? prev : next;
};

export default useMemoCompare;
