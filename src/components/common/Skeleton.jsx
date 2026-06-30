import SkeletonLib, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTheme } from '../../hooks/useTheme';

export function Skeleton(props) {
  const { isDark } = useTheme();

  return (
    <SkeletonTheme
      baseColor={isDark ? '#374151' : '#e5e7eb'}
      highlightColor={isDark ? '#4b5563' : '#f3f4f6'}
    >
      <SkeletonLib {...props} />
    </SkeletonTheme>
  );
}