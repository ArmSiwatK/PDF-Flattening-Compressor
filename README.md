# PDF Flattening Tool

This TypeScript-based Node.js application converts each page of input PDF files into images, then recompiles them into flattened PDFs.

Input PDFs are read from the `input/` folder. Flattened PDFs are written to the `output/` folder, preserving the original filenames.

## Prerequisites

- **Node.js** v12 or higher
- **Poppler-utils** binaries downloaded locally at `poppler-VERSION/Library/bin`
  - Windows users can download Poppler from the [Poppler for Windows releases page](https://github.com/oschwartz10612/poppler-windows/releases)

## Installing Node.js

If Node.js is not installed on your machine, follow these steps:

1. Visit the [official Node.js website](https://nodejs.org/).
1. Download the **LTS** version for your operating system.
1. Run the installer and follow the setup prompts.
1. Verify the installation by opening a terminal or command prompt and running:

   ```bash
   node -v
   npm -v
   ```

## Setup Instructions

1. Open a terminal and navigate to the project directory.
1. Install Node.js dependencies:

   ```bash
   npm install
   ```

1. Verify that Poppler binaries are present at the correct path:

   ```text
   poppler-26.02.0/Library/bin
   ```

## Running the Application

Run the project with:

```bash
npm start
```

This uses `tsx` to execute `src/main.ts` without requiring a separate build step.

The script will:

- Process all PDF files in the `input/` folder.
- Generate flattened PDFs in the `output/` folder.
- Clean up temporary image files automatically.

## Configuration

- Poppler binary path and image conversion options are configurable in `config.ts`.
- Ensure Poppler binaries are accessible and permissions allow read/write operations.

## Notes

- The script preserves input PDF filenames for output.
- Make sure Poppler binaries are accessible to the script.

## Troubleshooting

- If you encounter errors related to Poppler, verify the `poppler-26.02.0/Library/bin` path and binaries.
- Ensure you have read/write permissions on the project folders.
- Check Node.js version compatibility.
