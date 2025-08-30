const { OdtTemplater } = require("odt-templater");
const fs = require("fs");
const PizZip = require("pizzip");

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
const contentFile = zip.file("content.xml");
if (!contentFile) throw new Error("content.xml not found in the ODT file.");
const content = contentFile.asText();

// 2. Initialize OdtTemplater and render the document
const templater = new OdtTemplater(content);
const renderedContent = templater.render(data);

// 3. Replace the content in the ZIP
zip.file("content.xml", renderedContent);

// 4. Generate the output ODT file
const outputBuffer = zip.generate({ type: "nodebuffer" });
fs.writeFileSync("./output.odt", outputBuffer);
