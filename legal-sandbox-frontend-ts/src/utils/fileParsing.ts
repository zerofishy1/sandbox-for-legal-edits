import * as pdfjsLib from 'pdfjs-dist'
import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'
import mammoth from 'mammoth'

// Fallback worker path
// @ts-ignore
;(pdfjsLib as any).GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

export async function readTextFile(file: File): Promise<string> {
  const text = await file.text()
  return text
}

export async function readMarkdown(file: File): Promise<string> {
  const text = await file.text()
  return text
}

export async function readDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const { value } = await mammoth.extractRawText({ arrayBuffer })
  return value
}

export async function readPdf(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const pdf: PDFDocumentProxy = await (pdfjsLib as any).getDocument({ data: buffer }).promise
  let text = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const strings = (content.items as any[]).map((item: any) => item.str)
    text += strings.join(' ') + '\n\n'
  }
  return text
}

export function chooseReader(file: File): (f: File) => Promise<string> {
  const name = file.name.toLowerCase()
  if (name.endsWith('.txt')) return readTextFile
  if (name.endsWith('.md')) return readMarkdown
  if (name.endsWith('.docx')) return readDocx
  if (name.endsWith('.pdf')) return readPdf
  return readTextFile
}
