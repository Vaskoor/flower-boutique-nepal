import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

export async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (_) { /* ignore */ }
}

export async function readJsonFile<T>(fileName: string): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(dataDir, fileName);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return [] as T;
    }
    throw error;
  }
}

export async function writeJsonFile<T>(fileName: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(dataDir, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
