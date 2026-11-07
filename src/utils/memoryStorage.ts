import { MemoryItem } from '../types';

const DATABASE_NAME = 'shruthi-birthday-memories';
const STORE_NAME = 'photos';
const AUDIO_STORE_NAME = 'audio';
const DATABASE_VERSION = 2;

export interface StoredAudio {
  id: 'uploaded-song';
  blob: Blob;
  fileName: string;
}

export interface StoredMemory {
  id: string;
  blob: Blob;
  title: string;
  caption: string;
  date?: string;
  tag?: string;
  isCustom: true;
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('This browser does not support persistent photo storage.'));
      return;
    }
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
      if (!database.objectStoreNames.contains(AUDIO_STORE_NAME)) {
        database.createObjectStore(AUDIO_STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Could not open photo storage.'));
    request.onblocked = () => reject(new Error('Photo storage is busy in another tab.'));
  });
}

async function withStore<T>(mode: IDBTransactionMode, operation: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, mode);
    const request = operation(transaction.objectStore(STORE_NAME));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Photo storage request failed.'));
    transaction.onabort = () => reject(transaction.error || new Error('Photo storage transaction failed.'));
    transaction.oncomplete = () => database.close();
    transaction.onerror = () => reject(transaction.error || new Error('Photo storage transaction failed.'));
  });
}

export function getStoredMemories(): Promise<StoredMemory[]> {
  return withStore('readonly', (store) => store.getAll());
}

export function saveStoredMemory(memory: StoredMemory): Promise<IDBValidKey> {
  return withStore('readwrite', (store) => store.put(memory));
}

export function deleteStoredMemory(id: string): Promise<undefined> {
  return withStore('readwrite', (store) => store.delete(id));
}

function withAudioStore<T>(mode: IDBTransactionMode, operation: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDatabase().then((database) => new Promise((resolve, reject) => {
    const transaction = database.transaction(AUDIO_STORE_NAME, mode);
    const request = operation(transaction.objectStore(AUDIO_STORE_NAME));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Song storage request failed.'));
    transaction.onabort = () => reject(transaction.error || new Error('Song storage transaction failed.'));
    transaction.oncomplete = () => database.close();
    transaction.onerror = () => reject(transaction.error || new Error('Song storage transaction failed.'));
  }));
}

export function getStoredAudio(): Promise<StoredAudio | undefined> {
  return withAudioStore('readonly', (store) => store.get('uploaded-song'));
}

export function saveStoredAudio(audio: StoredAudio): Promise<IDBValidKey> {
  return withAudioStore('readwrite', (store) => store.put(audio));
}

export function storedMemoryToItem(memory: StoredMemory): MemoryItem {
  return { ...memory, url: URL.createObjectURL(memory.blob) };
}

export function legacyMemoryToStored(memory: MemoryItem): StoredMemory | null {
  if (!memory.isCustom || !memory.url.startsWith('data:image/')) return null;
  try {
    const [header, encoded] = memory.url.split(',');
    const mime = header.match(/^data:(image\/[^;]+);base64$/)?.[1];
    if (!mime || !encoded) return null;
    const binary = atob(encoded);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return { id: memory.id, blob: new Blob([bytes], { type: mime }), title: memory.title, caption: memory.caption, date: memory.date, tag: memory.tag, isCustom: true };
  } catch {
    return null;
  }
}
