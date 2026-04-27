import type { JSX } from "solid-js";
import { Show, createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { isAuthenticated } from "~/lib/auth";

type RequireAdminProps = {
  children: JSX.Element;
};

export default function RequireAdmin(props: RequireAdminProps) {
  const navigate = useNavigate();
  const [allowed, setAllowed] = createSignal(isAuthenticated());

  onMount(() => {
    const ok = isAuthenticated();
    setAllowed(ok);
    if (!ok) {
      navigate("/login", { replace: true });
    }
  });

  return <Show when={allowed()}>{props.children}</Show>;
}

