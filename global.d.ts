import type { Database } from "./src/types/database.d.ts";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

  export type CodegenPaths = {
    sourcePath: string;
    outputDir: string;
  }