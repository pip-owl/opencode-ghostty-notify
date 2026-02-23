import type { Plugin } from "@opencode-ai/plugin";

/**
 * OpenCode plugin that plays a system sound when the session goes idle.
 * Perfect for Ghostty terminal users who want an audio notification
 * when OpenCode finishes a long-running task.
 */
export const NotificationPlugin: Plugin = async ({ $ }) => {
  return {
    event: async ({ event }) => {
      if (event.type === "session.idle") {
        // Terminal bell (works in Ghostty and most terminals)
        await $`printf '\a'`;
        
        // macOS system sound (Glass.aiff)
        // Falls back silently on non-macOS systems
        try {
          await $`afplay /System/Library/Sounds/Glass.aiff`;
        } catch {
          // Ignore errors on non-macOS systems
        }
      }
    },
  };
};

export default NotificationPlugin;
