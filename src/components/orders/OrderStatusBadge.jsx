import { Badge } from '../common/Badge';
import { translateOrderStatus } from '../../utils/formatters';

const statusVariantMap = {
  pending: 'warning',
  processing: 'info',
  shipped: 'info',
  delivered: 'success',
  cancelled: 'danger',
};

export function OrderStatusBadge({ status }) {
  const variant = statusVariantMap[status] || 'default';
  const label = translateOrderStatus(status);
  return <Badge variant={variant}>{label}</Badge>;
}