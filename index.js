import { prompt } from "inquirer";
import { readFile } from "fs";
import { appendFile } from "fs";
import { promisify } from "util";

const asyncWriteFile = promisify(appendFile);