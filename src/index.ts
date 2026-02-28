import { fetchOpen5eWithTypes } from "./modules/dndapi";

async function main() {
  console.log(await fetchOpen5eWithTypes());
}

main();
