import { useEffect, MutableRefObject } from 'react';

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
 * 点击元素外
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
        };

        window.addEventListener('mousedown', listener);
        window.addEventListener('touchstart', listener);
        return () => {
            window.removeEventListener('mousedown', listener);
            window.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};

export default useOnClickOutside;
