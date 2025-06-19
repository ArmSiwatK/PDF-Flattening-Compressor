# PDF Flattening Tool

This TypeScript-based Node.js application converts each page of input PDF files into images, then recompiles them into flattened PDFs.
Input PDFs are read from the `input/` folder; flattened PDFs are output to the `output/` folder, preserving original filenames.

---

## Prerequisites

- **Node.js** (v12 or higher) installed
- **Poppler-utils** binaries downloaded locally at:poppler-VERSION/Library/bin (contains pdftoppm and related executables). Windows users can download Poppler from: https://github.com/oschwartz10612/poppler-windows/release

---

## Installing Node.js

If Node.js is not installed on your machine, follow these steps:

1. Visit the official Node.js website: https://nodejs.org/

1. Download the **LTS** (Long-Term Support) version for your operating system.

2. Run the installer and follow the setup prompts.

3. Verify installation by opening a terminal/command prompt and running:  

```
node -v
npm -v
```

---

## Setup Instructions

1. Open a terminal and navigate to the project directory.

2. Install Node.js dependencies:  
   ```
   npm install
   ```

3. Verify that Poppler binaries are present at the correct path (`poppler-24.08.0/Library/bin`).

---

## Running the Application

Run the project with:

```
npm start
```

The script will:

- Compile the TypeScript source from src/ to JavaScript in dist/.

- Process all PDF files in the input/ folder.

- Generate flattened PDFs in the output/ folder.

- Clean up temporary image files automatically.

---

## Configuration

- Poppler binary path and image conversion options are configurable in config.ts.
- 
- Ensure Poppler binaries are accessible and permissions allow read/write operations.

---

## Notes

- The script preserves input PDF filenames for output.

- Make sure Poppler binaries are accessible to the script (local path configured in index.js).

---

## Troubleshooting

- If you encounter errors related to Poppler, verify the `poppler-24.08.0/Library/bin` path and binaries.

- Ensure you have read/write permissions on the project folders.

- Check Node.js version compatibility.