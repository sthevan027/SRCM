import { JSX } from 'solid-js';
import { useNavigate } from '@solidjs/router';

export default function AdminRedirect(): JSX.Element {
  const navigate = useNavigate();
  navigate('/admin/dashboard', { replace: true });
  return <></>;
}
