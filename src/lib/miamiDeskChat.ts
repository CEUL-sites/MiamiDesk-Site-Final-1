// Single open/close handle for the Miami Desk chat dialog.
//
// The House Bot (hero and docked) calls openMiamiDeskChat(); the dialog
// mounted once in main.tsx subscribes. The dialog hosts the existing AiPanel
// from IntelligenceDesk.tsx (same /.netlify/functions/ai-desk backend) —
// there is one chat system, not a second one.

type Listener = (open: boolean) => void;

let isOpen = false;
const listeners = new Set<Listener>();

function emit() {
  for (const l of listeners) l(isOpen);
}

export function openMiamiDeskChat(): void {
  if (isOpen) return;
  isOpen = true;
  emit();
}

export function closeMiamiDeskChat(): void {
  if (!isOpen) return;
  isOpen = false;
  emit();
}

export function isMiamiDeskChatOpen(): boolean {
  return isOpen;
}

export function subscribeMiamiDeskChat(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
