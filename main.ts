import { Activity } from "./generated/models/Activity.ts";
import { Book } from "./generated/models/Book.ts";
import { Supamodel } from "./src/Supamodel.ts";
import { User } from "./generated/models/User.ts";
import { createClient } from "jsr:@supabase/supabase-js";

const supabase = createClient(
  "https://gmeqvdtoqxiuhccadhfk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZXF2ZHRvcXhpdWhjY2FkaGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczODM5NTUsImV4cCI6MjAxMjk1OTk1NX0.5CX4cCTSFkKpxWT1m6flDvUl8dToSoyRD5l9Lt1PqM8"
);

async function main() {
  Supamodel.setClient(() => supabase);
  const book = await Book.$find(1);
  const copy = await book?.duplicate();
  const copyOfCopy = await copy?.duplicate();
  console.log(book,copy, copyOfCopy);

}

main().then(() => console.log("Done!"));
