import { useRoute } from './RouteContext';

export const Link = ({ to, children }) => {
  const { setCurrentRoute } = useRoute();

  return (
    <button onClick={() => setCurrentRoute(to)}>
      {children}
    </button>
  );
};
