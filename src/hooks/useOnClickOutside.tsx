import React, { useEffect, MutableRefObject } from 'react';

/**
 * function App() {
  const ref = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  useOnClickOutside(ref, () => setModalOpen(false));

  return (
    <div>
      {isModalOpen ? (
        <div ref={ref}>
         11
        </div>
      ) : (
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
      )}
    </div>
  );
}
 *
 * @param {*} ref
 * @param {*} handler
 */
const useOnClickOutside = <T extends Element>(
    ref: MutableRefObject<T>,
    handler
) => {
    useEffect(() => {
        const listener = event => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }

            handler(event);

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);
        };
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};

export default useOnClickOutside;
