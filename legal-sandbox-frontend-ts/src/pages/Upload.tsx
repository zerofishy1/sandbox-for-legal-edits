import { useNavigate } from 'react-router-dom'
import FileDropzone from '../components/FileDropzone'
import useAppStore from '../store/useAppStore'

export default function Upload() {
  const addDoc = useAppStore(s => s.addDoc)
  const setCurrentDoc = useAppStore(s => s.setCurrentDoc)
  const navigate = useNavigate()

  const onText = (name: string, text: string) => {
    const id = addDoc(name, text)
    setCurrentDoc(id)
    navigate('/sandbox')
  }

  return (
    <div className="grid gap-4">
      <div className="section-title">Загрузка документа</div>
      <FileDropzone onText={onText} />
    </div>
  )
}
