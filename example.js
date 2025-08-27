import fs from "fs";
import PizZip from "pizzip";
import { OdtTemplater } from "odt-templater";

const data = {
  title: "Hello World",
  description: "A wonderful text",
  user: {
    first_name: "John",
    last_name: "Doe",
    city: "New York",
    age: 30,
    email: "john.doe@example.com",
    website: "https://example.com",
  },
};

// 1. Load the ODT template file
const templateBuffer = fs.readFileSync("./template.odt");
const zip = new PizZip(templateBuffer);
const content = zip.file("content.xml").asText();

// 3. Initialize OdtTemplater and render the document
const templater = new OdtTemplater(content);
const renderedContent = templater.render(data);

// 4. Replace the content in the ZIP
zip.file("content.xml", renderedContent);

// 5. Generate the output ODT file
const outputBuffer = zip.generate({ type: "nodebuffer" });
fs.writeFileSync("./output.odt", outputBuffer);
