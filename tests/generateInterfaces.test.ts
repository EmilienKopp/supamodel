import {
  assertEquals,
  assertExists,
  assertNotEquals,
  assertThrows,
} from "@std/assert";

import { Project } from "ts-morph";
import { generateInterfaces } from "../src/generateInterfaces.ts";

const sourceTypes = "./tests/db.d.ts"; // Has companies, books and users tables
const outputDir = "./tests/output/";

Deno.test("can generate interfaces", () => {
  generateInterfaces(sourceTypes, outputDir);

  // The interfaces file exist
  assertEquals(Deno.statSync(`${outputDir}/interfaces.d.ts`).isFile, true);

  const project = new Project({
    compilerOptions: {
      strictNullChecks: true,
    },
  });
  const sourceFile = project.addSourceFileAtPath(
    `${outputDir}/interfaces.d.ts`
  );

  const companyInterface = sourceFile.getInterface("Company");
  const bookInterface = sourceFile.getInterface("Book");
  const userInterface = sourceFile.getInterface("User");

  assertExists(companyInterface);
  assertEquals(
    companyInterface.getProperties().map((prop) => prop.getName()),
    [
      "address",
      "code",
      "contact_email",
      "contact_phone",
      "corporate_number",
      "created_at",
      "employees_count",
      "id",
      "is_active",
      "is_public",
      "name",
      "representative_id",
      "updated_at",
    ]
  );
  // Check if the properties types are correct
  assertEquals(companyInterface.getProperty("address")?.getType().getText(), "string | null");
  assertEquals(companyInterface.getProperty("code")?.getType().getText(), "string | null");
  assertEquals(companyInterface.getProperty("contact_email")?.getType().getText(), "string");
  assertEquals(companyInterface.getProperty("contact_phone")?.getType().getText(), "string | null");
  assertEquals(companyInterface.getProperty("corporate_number")?.getType().getText(), "string | null");
  assertEquals(companyInterface.getProperty("created_at")?.getType().getText(), "string | null");
  assertEquals(companyInterface.getProperty("employees_count")?.getType().getText(), "number | null");
  assertEquals(companyInterface.getProperty("id")?.getType().getText(), "number");
  assertEquals(companyInterface.getProperty("is_active")?.getType().getText(), "boolean");
  assertEquals(companyInterface.getProperty("is_public")?.getType().getText(), "boolean");
  assertEquals(companyInterface.getProperty("name")?.getType().getText(), "string");
  assertEquals(companyInterface.getProperty("representative_id")?.getType().getText(), "number");
  assertEquals(companyInterface.getProperty("updated_at")?.getType().getText(), "string | null");

  assertExists(bookInterface);
  assertEquals(
    bookInterface.getProperties().map((prop) => prop.getName()),
    ["author", "description", "id", "title"]
  );
  // Check if the properties types are correct
  assertEquals(bookInterface.getProperty("author")?.getType().getText(), "string | null");
  assertEquals(bookInterface.getProperty("description")?.getType().getText(), "string | null");
  assertEquals(bookInterface.getProperty("id")?.getType().getText(), "number");
  assertEquals(bookInterface.getProperty("title")?.getType().getText(), "string | null");

  assertExists(userInterface);
  assertEquals(
    userInterface.getProperties().map((prop) => prop.getName()),
    [
      "avatar",
      "created_at",
      "email",
      "email_verified_at",
      "id",
      "last_login",
      "name",
      "password",
      "remember_token",
      "timezone",
      "updated_at",
    ]
  );

  // Check if the properties types are correct
  assertEquals(userInterface.getProperty("avatar")?.getType().getText(), "string | null");
  assertEquals(userInterface.getProperty("created_at")?.getType().getText(), "string | null");
  assertEquals(userInterface.getProperty("email")?.getType().getText(), "string");
  assertEquals(userInterface.getProperty("email_verified_at")?.getType().getText(), "string | null");
  assertEquals(userInterface.getProperty("id")?.getType().getText(), "number");
  assertEquals(userInterface.getProperty("last_login")?.getType().getText(), "string | null");
  assertEquals(userInterface.getProperty("name")?.getType().getText(), "string");
  assertEquals(userInterface.getProperty("password")?.getType().getText(), "string | null");
  assertEquals(userInterface.getProperty("remember_token")?.getType().getText(), "string | null");
  assertEquals(userInterface.getProperty("timezone")?.getType().getText(), "string | null");
  assertEquals(userInterface.getProperty("updated_at")?.getType().getText(), "string | null");

  // Cleanup
  Deno.removeSync(`${outputDir}/interfaces.d.ts`);
});

Deno.test("throws error if database type not found", () => {
  const noDbTypes = "./tests/no-public.d.ts";

  assertThrows(() => generateInterfaces(noDbTypes, outputDir), Error);
});

Deno.test("throws error if public schema not found", () => {
  const noPublicSchema = "./tests/no-tables.d.ts";

  assertThrows(() => generateInterfaces(noPublicSchema, outputDir), Error);
});

Deno.test("throws error if tables not found", () => {
  const noTables = "./tests/no-tables.d.ts";

  assertThrows(() => generateInterfaces(noTables, outputDir), Error);
});