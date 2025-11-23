export default function About() {
  return (
    <div className="max-w-none">
      <h1 className="text-2xl font-bold mb-2">О системе</h1>
      <p><strong>Legal Sandbox (TS)</strong> — фронтенд для песочницы юридических правок. Загружайте документы (TXT/MD/DOCX/PDF), запускайте анализ, просматривайте найденные дубли и конфликты.</p>
      <ul className="list-disc ml-6 my-2">
        <li>Импорт и нормализация текста</li>
        <li>Поиск дублей (Jaccard по токенам)</li>
        <li>Эвристики конфликтов: подсудность, сроки, санкции</li>
        <li>Панель проблем + переход к клаузам</li>
        <li>Правила/порог сходства</li>
      </ul>
      <p>Подключение к backend: замените клиент анализа на вызов API.</p>
    </div>
  )
}
