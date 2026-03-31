import type { JSX } from "solid-js";

type PageShellProps = {
  title: string;
  lead?: string;
  badge?: string;
  children?: JSX.Element;
};

export default function PageShell(props: PageShellProps) {
  return (
    <main class="page-shell">
      <div class="intro-line" aria-hidden="true" />
      {props.badge ? <p class="eyebrow">{props.badge}</p> : null}
      <h1>{props.title}</h1>
      {props.lead ? <p class="lead">{props.lead}</p> : null}
      {props.children}
    </main>
  );
}
