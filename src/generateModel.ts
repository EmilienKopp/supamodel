import { CodegenPaths } from "../global.d.ts";
import { PARSER_DEFAULT_CONFIG } from "./config.ts";
import { Project } from "npm:ts-morph";
import { generateInterfaces } from "./generateInterfaces.ts";
import { log } from "npm:frad";
import pluralize from "npm:pluralize";

export async function generateModels(params: CodegenPaths) {
  const { sourcePath, outputDir } = params;

  generateInterfaces(sourcePath, outputDir);

  const project = new Project(PARSER_DEFAULT_CONFIG);
  const sourceFile = project.addSourceFileAtPath(
    `${outputDir}/interfaces.d.ts`
  );
  const SupamodelPath = "../../src/Supamodel.ts";

  const promises: Promise<void>[] = [];
  const baseInterfaces = sourceFile
    .getInterfaces()
    .filter(
      (iface) =>
        iface.getName() !== "Database" &&
        !iface.getName().endsWith("Insert") &&
        !iface.getName().endsWith("Update")
    );

  baseInterfaces.forEach((iface) => {
    const rowInterface = iface.getName();
    const className = rowInterface.replace("Row", "");
    const insertInterface = sourceFile.getInterface(`${className}Insert`)?.getName();
    const updateInterface = sourceFile.getInterface(`${className}Update`)?.getName();
    const properties = iface.getProperties().map((prop) => {
      const name = prop.getName();
      const type = prop.getType().getText();
      return `public ${name}: ${type};`;
    });

    const classSource = `
import { Supamodel } from "${SupamodelPath}";
import { ${rowInterface} } from "../interfaces.d.ts";

export class ${className} extends Supamodel<${rowInterface}> {
  static override table = "${pluralize(className).toLowerCase()}";
  // @ts-expect-error TS does not recognize Object.assign as assignment of members
  ${properties.join(
    "\n  // @ts-expect-error TS does not recognize Object.assign as assignment of members\n  "
  )}

    constructor(data: Partial<${rowInterface}>) {
      super(data);
      Object.assign(this, data);
    }
}
  `;

    const newFile = project.createSourceFile(
      `${outputDir}/models/${className}.ts`,
      classSource,
      {
        overwrite: true,
      }
    );

    promises.push(newFile.save());
    log(`Generated model: ${rowInterface}.ts`, "success");
  });
  await Promise.all(promises);
}
