export interface MemoryItem {
  id: string;
  url: string;
  title: string;
  caption: string;
  date?: string;
  tag?: string;
  isCustom?: boolean;
}

export interface SisterReason {
  id: number;
  emoji: string;
  title: string;
  description: string;
}
