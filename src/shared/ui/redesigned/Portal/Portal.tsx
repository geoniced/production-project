import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  element?: HTMLElement;
}

export const Portal = (props: PortalProps) => {
  const { children, element = document.body } = props;

  // const [isMounted, setIsMounted] = useState(false);
  //
  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);
  //
  // return isMounted && element ? createPortal(children, element) : null;

  return createPortal(children, element);
};
