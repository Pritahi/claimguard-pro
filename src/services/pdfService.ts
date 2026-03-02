/**
 * PDF Service - Digital PDF Text Extraction
 * Using pdf-parse for proper text extraction from digital PDFs
 */

import pdfParse from "pdf-parse";

export interface PDFExtractionResult {
  text: string;
  pages: number;
  error?: string;
}

/**
 * Extract text from a digital PDF using pdf-parse
 * Works for text-based PDFs, NOT for scanned/image PDFs
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<PDFExtractionResult> {
  try {
    // pdf-parse returns a promise with { numpages, numrender, info, metadata, text, version }
    const data = await pdfParse(buffer);
    
    const text = data.text || "";
    const pages = data.numpages || 1;
    
    // Clean up extracted text
    const cleanedText = text
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
    
    console.log(`[PDFService] Extracted ${cleanedText.length} characters from ${pages} page(s)`);
    
    if (cleanedText.length < 20) {
      return {
        text: cleanedText,
        pages,
        error: "WARNING: Very little text extracted. PDF might be scanned/image-based (needs OCR).",
      };
    }
    
    return {
      text: cleanedText,
      pages,
    };
    
  } catch (error) {
    console.error("[PDFService] Extraction error:", error);
    return {
      text: "",
      pages: 0,
      error: error instanceof Error ? error.message : "Unknown error extracting PDF",
    };
  }
}

/**
 * Check if PDF is likely digital (has extractable text)
 */
export async function isDigitalPDF(buffer: Buffer): Promise<boolean> {
  try {
    const result = await extractTextFromPDF(buffer);
    return result.text.length > 100;
  } catch {
    return false;
  }
}
