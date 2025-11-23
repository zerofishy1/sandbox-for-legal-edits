# Legal Sandbox — Frontend (TypeScript)

TS-версия: React + Vite + Tailwind + Router + Zustand, загрузка TXT/MD/DOCX/PDF, анализ дублей/конфликтов.

## Быстрый старт
```bash
npm i
npm run dev
```
Node.js ≥ 18.

## Модели / типы
`src/types/models.ts` — Block, Doc, Rules, Issue

## Парсинг файлов
- DOCX: `mammoth` (типы объявлены в `src/types/mammoth.d.ts`)
- PDF: `pdfjs-dist` (воркер — `public/pdf.worker.min.mjs`)

## Backend
Замените `analyzeText` в `src/utils/analyzer.ts` на вызов API и верните issues того же формата — фронт подсветит клаузы и выведет список проблем.
