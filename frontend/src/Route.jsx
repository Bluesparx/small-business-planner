import { useRoute } from './RouteContext';

export const Route = ({ path, children }) => {
  const { currentRoute } = useRoute();

  return currentRoute === path ? children : null; // Render children only if path matches
};
