import { Project, Symbol, Type } from "npm:ts-morph";

import { PARSER_DEFAULT_CONFIG } from './config.ts';
import fs from "node:fs";
import { log } from "npm:frad";
import { pascalize } from "./lib/utils.ts";
import pluralize from "npm:pluralize";

export function generateInterfaces(
  sourcePath: string = "./database.d.ts",
  outputDir: string = "./generated"
) {
  console.log("Generating interfaces...");
  const project = new Project(PARSER_DEFAULT_CONFIG);
  const sourceFile = project.addSourceFileAtPath(sourcePath);

  if (!outputDir.endsWith("/")) {
    outputDir += "/";
  }

  const databaseType = sourceFile.getTypeAliasOrThrow("Database").getType();

  if (!databaseType) {
    throw new Error(
      "Database type not found. Make sure the Supabase types' file has a type alias named 'Database'"
    );
  }

  const publicSchema = databaseType
    .getProperty("public")
    ?.getTypeAtLocation(sourceFile);

  if (!publicSchema) {
    throw new Error("Public schema not found in the Database type");
  }

  const tables = publicSchema
    .getProperty("Tables")
    ?.getTypeAtLocation(sourceFile);

  if (!tables) {
    throw new Error("Tables not found in the public schema");
  }

  let interfaceText = "";

  log("Generating interfaces...", "info");

  tables.getProperties().forEach((tableSymbol) => {
    const tableName = tableSymbol.getName(); // e.g., "books"
    const interfaceName = pluralize.singular(pascalize(tableName)); // e.g., "Book"
    const rowType = tableSymbol
      .getValueDeclarationOrThrow()
      .getType()
      .getProperty("Row")
      ?.getTypeAtLocation(sourceFile);
    const insertType = tableSymbol
      .getValueDeclarationOrThrow()
      .getType()
      .getProperty("Insert")
      ?.getTypeAtLocation(sourceFile);
    const updateType = tableSymbol
      .getValueDeclarationOrThrow()
      .getType()
      .getProperty("Update")
      ?.getTypeAtLocation(sourceFile);

    if (rowType) {
      interfaceText +=
        generateInterfaceFromType(rowType, `${interfaceName}Row`) + "\n";
    }
    if(insertType) {
      interfaceText += generateInterfaceFromType(insertType, `${interfaceName}Insert`) + "\n";
    }
    if(updateType) {
      interfaceText += generateInterfaceFromType(updateType, `${interfaceName}Update`) + "\n";
    }
    log(`Generated interface for ${interfaceName}`, "info");

  });
  writeToFile(outputDir, "interfaces.d.ts", interfaceText);
}

// Utility to generate TypeScript interface text from a type
function generateInterfaceFromType(type: Type, interfaceName: string): string {
  const properties = type.getProperties();

  const fields = properties.map((prop) => {
    const name = prop.getName();
    const declaration = prop.getValueDeclarationOrThrow()
    const typeText = declaration.getType().getText(declaration);
    return `  ${name}: ${typeText};`;
  });

  return `export interface ${interfaceName} {\n${fields.join("\n")}\n}`;
}

function writeToFile(outputDir: string, fileName: string, content: string) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const filePath = `${outputDir}${fileName}`;
  fs.writeFileSync(filePath, content);
  log(`Interface File written to: ${filePath}`, "success");
}
