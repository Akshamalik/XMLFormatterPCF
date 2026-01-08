# XML Formatter PCF Control

A Power Apps Component Framework (PCF) control that validates, parses, and renders XML into a clean, human-readable, table-based layout using React.
Ideal for displaying XML stored in Dataverse fields without forcing users to read raw markup.

# ✨ Features

✅ XML validation with clear, line/column-level error messages
📄 Automatic XML parsing using fast-xml-parser
📊 Dynamic table rendering for objects and arrays
🔁 Recursive rendering for deeply nested XML structures
🎨 Clean, readable UI with alternating row styles
⚡ React-based PCF control compatible with model-driven and canvas apps

# 🧩 Use Case

This control is useful when you need to:
Display XML stored in Dataverse fields
Improve readability of system-generated XML
Debug or inspect integration payloads
Present structured XML data to non-technical users

# 🛠️ Tech Stack

Power Apps Component Framework (PCF)
React
TypeScript
fast-xml-parser

# 📁 Project Structure
.
├── XMLFormatter.tsx        # Core React XML formatter component
├── index.ts               # PCF control implementation
├── generated/
│   └── ManifestTypes.ts   # Auto-generated PCF typings
├── ControlManifest.Input.xml
├── package.json
└── README.md

# 🚀 Installation & Build

Prerequisites
Node.js (LTS recommended)
Power Platform CLI (pac)
Power Apps environment

Install dependencies
npm install
Build the control
npm run build

Push to your environment
pac pcf push

# ⚙️ Configuration

Bound Property
The control expects a single bound text property that contains XML.
Example from ControlManifest.Input.xml:

<property
  name="sampleProperty"
  display-name-key="XML Content"
  description-key="XML to format"
  of-type="SingleLine.Text"
  usage="bound"
  required="false" />

# 🧠 How It Works

XML Validation
Uses XMLValidator.validate
Displays detailed parse errors (line, column, message)
Parsing
Uses XMLParser with ignoreAttributes: false
Rendering
Objects → key/value tables
Arrays → tabular rows with merged headers
Nested objects → recursively rendered tables
Graceful Fallbacks
Empty input → “No XML provided”
Invalid XML → descriptive error message

# 🖥️ Example Output

Simple XML → Key/value table
Repeating nodes → Structured grid
Deep nesting → Expandable nested tables
(Raw XML is never shown — users see clean, readable data)

# 🧪 Error Handling

If invalid XML is supplied, the control displays errors like:
Exception: Unable to parse XML input.
Error on line 12, column 5: Unclosed tag

# 📦 Dependencies
{
  "react": "^16.x || ^17.x",
  "fast-xml-parser": "^4.x"
}

# 🔒 Security & Performance

No external network calls
XML parsing is done client-side
=
Safe rendering (no dangerouslySetInnerHTML)

# 📌 Limitations

Very large XML documents may impact rendering performance
Attributes are shown as keys (as parsed by fast-xml-parser)
Styling is inline (can be refactored to CSS if needed)

# 🤝 Contributing

Contributions are welcome!
Fork the repo
Create a feature branch
Commit your changes
Open a pull request