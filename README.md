# PDF Flattening Tool

This Node.js script converts each page of input PDF files into images and recompiles them into flattened PDFs.  
The input PDFs are read from the `input/` folder, and the flattened PDFs are saved to the `output/` folder with the same filenames.

---

## Prerequisites

- **Node.js** (v12 or higher) installed  
- **Poppler-utils** binaries downloaded and placed locally inside the project at: `poppler-VERSION/Library/bin` (contains `pdftoppm.exe` and related executables). Windows users can download Poppler from: https://github.com/oschwartz10612/poppler-windows/releases

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

## Setup Steps

1. Open a terminal and navigate to the project directory.

2. Install Node.js dependencies:  
   ```
   npm install
   ```

3. Ensure the following folders exist:

    - input/ (place your input PDF files here)

    - output/ (will be created automatically if missing)

4. Verify that Poppler binaries are present at the correct path (poppler-24.08.0/Library/bin).

---

## Running the Script

Run the program with:

```
node index.js
```

The script will:

- Process all PDF files in the input/ folder.

- Generate flattened PDFs in the output/ folder.

- Clean up temporary image files automatically.

## Notes

- The script preserves input PDF filenames for output.

- Make sure Poppler binaries are accessible to the script (local path configured in index.js).

## Troubleshooting

- If you encounter errors related to Poppler, verify the poppler-24.08.0/Library/bin path and binaries.

- Ensure you have read/write permissions on the project folders.

- Check Node.js version compatibility.