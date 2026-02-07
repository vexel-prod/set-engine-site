'use client'

export default function PrivacyContent() {
  const lastUpdate = '01.03.2025'

  return (
    <div className='max-w-4xl mx-auto py-12 space-y-16 text-left'>
      <header className='space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-12'>
        <h1>
          Политика <br />
          <span className='text-brand-500'>Конфиденциальности</span>
        </h1>
        <div className='flex items-center gap-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest'>
          <span>Версия 1.0.4</span>
          <span className='w-1 h-1 bg-zinc-300 rounded-full' />
          <span>Последнее обновление: {lastUpdate}</span>
        </div>
      </header>

      <div className='max-w-none space-y-12'>
        <section className='space-y-4'>
          <h2>
            <span className='w-2 h-6 bg-brand-500 rounded-full' /> 1. Общие положения
          </h2>
          <p>
            Настоящая политика обработки персональных данных составлена в соответствии с
            требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и
            определяет порядок обработки персональных данных и меры по обеспечению безопасности
            персональных данных, предпринимаемые ООО «СЭТ» (далее — Оператор).
          </p>
        </section>

        <section className='space-y-4'>
          <h2>
            <span className='w-2 h-6 bg-zinc-300 rounded-full' /> 2. Данные, которые мы собираем
          </h2>
          <ul className='grid md:grid-cols-2 gap-4 list-none p-0'>
            {[
              'Фамилия, имя, отчество',
              'Номер контактного телефона',
              'Адрес электронной почты',
              'Название организации и должность',
              'Файлы cookie и данные о визите',
            ].map((item, i) => (
              <li
                key={i}
                className='bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl text-xs border border-zinc-100 dark:border-zinc-800 flex items-center gap-3'
              >
                <div className='w-1.5 h-1.5 bg-brand-500 rounded-full' /> {item}
              </li>
            ))}
          </ul>
        </section>

        <section className='space-y-4'>
          <h2>
            <span className='w-2 h-6 bg-zinc-300 rounded-full' /> 3. Цели обработки
          </h2>
          <p className='text-zinc-500 leading-relaxed text-sm'>
            Цель обработки персональных данных Пользователя — информирование Пользователя
            посредством отправки электронных писем; предоставление доступа Пользователю к сервисам,
            информации и/или материалам, содержащимся на веб-сайте; расчет предварительных смет и
            проведение технических аудитов.
          </p>
        </section>

        <section className='p-8 bg-zinc-900 rounded-4xl border border-zinc-800'>
          <h3>
            Важное примечание:
          </h3>
          <p>
            Мы никогда не передаем ваши инженерные данные (чертежи, BIM-модели, спецификации)
            третьим лицам без подписания отдельного соглашения о неразглашении (NDA). Инфраструктура
            сайта защищена по стандарту AES-256.
          </p>
        </section>
      </div>

      <footer className='pt-12 border-t border-zinc-100 dark:border-zinc-800 text-center'>
        <p>
          Вопросы по обработке данных:{' '}
          <a
            href='mailto:privacy@set-energy.tech'
            className='text-brand-500 hover:underline'
          >
            privacy@set-energy.tech
          </a>
        </p>
      </footer>
    </div>
  )
}
