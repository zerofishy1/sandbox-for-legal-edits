import React, { useState, useCallback } from 'react'
import Button from './Button'
import { chooseReader } from '../utils/fileParsing'

export default function FileDropzone({ onText }: { onText?: (name: string, text: string) => void }) {
  const [hover, setHover] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFiles = useCallback(async (files: FileList) => {
    setError('')
    setLoading(true)
    try {
      const file = files[0]
      const reader = chooseReader(file)
      const text = await reader(file)
      onText?.(file.name, text)
    } catch (e) {
      console.error(e)
      setError('Не удалось прочитать файл')
    } finally {
      setLoading(false)
    }
  }, [onText])

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setHover(false)
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files)
  }

  return (
    <div
      onDragOver={(e)=>{e.preventDefault(); setHover(true)}}
      onDragLeave={()=>setHover(false)}
      onDrop={onDrop}
      className={`card p-6 text-center ${hover ? 'ring-2 ring-accent' : ''}`}
    >
      <div className="text-lg font-semibold mb-1">Перетащите файл сюда</div>
      <div className="text-sm text-muted mb-4">Поддержка: TXT, MD, DOCX, PDF</div>
      <div className="flex items-center justify-center gap-2">
        <input id="file" type="file"
          onChange={e => e.target.files && handleFiles(e.target.files)}
          className="hidden" />
        <label htmlFor="file">
          <Button className="btn-primary cursor-pointer">{loading ? 'Чтение…' : 'Выбрать файл'}</Button>
        </label>
        {error && <span className="text-danger text-sm">{error}</span>}
      </div>
    </div>
  )
}
