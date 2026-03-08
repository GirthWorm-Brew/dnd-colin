// Module to build md files from Open5e json returns

import { CreatureEntity } from "./components/creatures/creatures";
import fs from "fs";
import path from "path";
import { Creature } from "./components/creatures/CreatureTypes";

export function testReadFile(file: string) {
  const inputPath = path.join(process.cwd(), "data", "monsters", file);
  let res = fs.readFileSync(inputPath, "utf8");
  let json: Creature = JSON.parse(res);
  let creature = new CreatureEntity(json);

  console.log(creature);
}
