import { Project, Type } from "npm:ts-morph";

import { CodegenPaths } from "../global.d.ts";
import { PARSER_DEFAULT_CONFIG } from "./config.ts";
import { log } from "frad";
import { pascalize } from "./lib/utils.ts";

export async function zodify(params: CodegenPaths) {
  const { sourcePath, outputDir } = params;

  const project = new Project(PARSER_DEFAULT_CONFIG);
  const sourceFile = project.addSourceFileAtPath(sourcePath);

  if (!sourceFile) {
    throw new Error("Source file not found");
  }

  const databaseType = sourceFile.getTypeAliasOrThrow("Database").getType();

  const publicSchema = databaseType
    .getProperty("public")
    ?.getTypeAtLocation(sourceFile);

  if (!publicSchema) {
    throw new Error("Public schema not found in the Database type");
  }

  // Extract the "Tables" property
  const tables = publicSchema
    .getProperty("Tables")
    ?.getTypeAtLocation(sourceFile);

  if (!tables) {
    throw new Error("Tables not found in the public schema");
  }

  const promises = tables.getProperties().map((tableSymbol) => {
    const tableName = pascalize(tableSymbol.getName());
    const tableType = tableSymbol.getValueDeclarationOrThrow().getType();

    const insertType = tableType
      .getProperty("Insert")
      ?.getTypeAtLocation(sourceFile);
    const updateType = tableType
      .getProperty("Update")
      ?.getTypeAtLocation(sourceFile);

    let text = `import { z } from "zod";\n`;

    if (insertType) {
      const insertSchemaText = generateZodSchemaFromType(
        insertType,
        `${tableName}Insert`
      );
      text += insertSchemaText;
    }

    if (updateType) {
      const updateSchemaText = generateZodSchemaFromType(
        updateType,
        `${tableName}Update`
      );
      text += updateSchemaText;
    }

    // writeToFile(outputDir, `${tableName}Schemas`, text);
    const newFile = project.createSourceFile(
      `${outputDir}/schemas/${tableName}.schema.ts`,
      text,
      {
        overwrite: true,
      }
    );
    log(`Generated Zod schema for ${tableName}`, "success");
    return newFile.save();
  });
  await Promise.all(promises);
}

function generateZodSchemaFromType(type: Type, schemaName: string): string {
  const properties = type.getProperties();

  const fields = properties.map((prop) => {
    const name = prop.getName();
    const tsType = prop.getValueDeclarationOrThrow().getType();
    const zodType = mapTSTypeToZod(tsType);
    return `  ${name}: ${zodType},`;
  });

  return `\nexport const ${schemaName} = z.object({\n${fields.join(
    "\n"
  )}\n});\n`;
}

function mapTSTypeToZod(type: Type): string {
  if (type.isString()) return "z.string()";
  if (type.isNumber()) return "z.number()";
  if (type.isBoolean()) return "z.boolean()";
  if (type.isNull()) return "z.null()";
  if (type.isUndefined()) return "z.undefined()";
  if (type.isArray()) {
    return `z.array(${mapTSTypeToZod(type.getArrayElementTypeOrThrow())})`;
  }

  if (type.isUnion()) {
    const unionTypes = type.getUnionTypes();
    const hasNull = unionTypes.some((t) => t.isNull());
    const hasUndefined = unionTypes.some((t) => t.isUndefined());
    const nonNullUndefinedTypes = unionTypes.filter(
      (t) => !t.isNull() && !t.isUndefined()
    );

    if (nonNullUndefinedTypes.length === 1) {
      const chained = `${mapTSTypeToZod(nonNullUndefinedTypes[0])}${
        hasUndefined ? ".optional()" : ""
      }${hasNull ? ".nullable()" : ""}`;
      return chained;
    }

    const onion = `z.union([${unionTypes.map(mapTSTypeToZod).join(", ")}])`;
    return onion;
  }

  return "z.any()";
}