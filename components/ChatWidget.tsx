type ChatWidgetProps = {
  enabled: boolean;
  html: string | null;
};

export function ChatWidget({ enabled, html }: ChatWidgetProps) {
  if (!enabled) return null;
  const trimmed = html?.trim();
  if (!trimmed) return null;
  return <div dangerouslySetInnerHTML={{ __html: trimmed }} />;
}
