/**
 * @fileoverview CLI script for the project.
 */

import { Wizard, log } from "npm:frad";

import { generateModels } from "../src/generateModel.ts";
import { zodify } from "../src/zodify.ts";

const wizard = new Wizard();

const sourcePath = "./src/types/database.d.ts";
const outputDir = "./generated";

wizard.addBuildStep({
  name: "Generate models",
  key: "models",
  callback: () => {
    log("Generating models...", 'success');
    generateModels({
      sourcePath,
      outputDir,
    });
  },
});

wizard.addBuildStep({
  name: "Generate Zod schemas",
  key: "zod",
  callback: () => {
    log("Generating Zod schemas...", "success");
    zodify({
      sourcePath,
      outputDir,
    });
  },
});

await wizard.run();