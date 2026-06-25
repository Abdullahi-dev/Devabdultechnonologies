import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

const configPath = new URL('../firebase-applet-config.json', import.meta.url).pathname;
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const app = initializeApp(config);
const db = getFirestore(app);

async function run() {
  try {
    const d = await getDoc(doc(db, "blogs", "E8wkwWvjwu99204Y6oHv"));
    console.log(JSON.stringify(d.data(), null, 2));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
run();
