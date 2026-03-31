import type { JSX } from "solid-js";
import PageShell from "~/components/PageShell";

type ModulePlaceholderProps = {
  title: string;
  badge: string;
  lead: string;
  children?: JSX.Element;
};

export default function ModulePlaceholder(props: ModulePlaceholderProps) {
  return (
    <PageShell badge={props.badge} title={props.title} lead={props.lead}>
      <section class="stack">{props.children}</section>
    </PageShell>
  );
}
