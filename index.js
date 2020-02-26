import { prompt } from "inquirer";
import { readFile } from "fs";
import { appendFile } from "fs";
import { promisify } from "util";
import { axios } from "axios";

const asyncWriteFile = promisify(appendFile);
