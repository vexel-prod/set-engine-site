import Link from 'next/link'
import { CompanyData } from '../types/types'

const company: CompanyData = {
  full_name: 'Общество с ограниченной ответственностью «Строительство и Энергетические Технологии»',
  short_name: 'ООО «СЭТ»',
  inn: '7720946228',
  ogrn: '1257700108852',
  reg_date: '07.03.2025',
  legal_address:
    'г. Москва, вн.тер. г. Муниципальный округ Вешняки, ул. Вешняковская, д. 31, кв. 323',
  ceo: 'Орлов Евгений Владимирович',
  okved_main: '71.12',
  last_verified_date: '2024-05-20',
}


export default function Footer() {
  return (
    <footer className='bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-16'>
      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
          <div className='col-span-2 space-y-6'>
            <Link
              href='/'
              className='inline-block'
            >
              <span className='font-display font-bold text-2xl uppercase tracking-tighter'>
                ООО «СЭТ»
              </span>
            </Link>
            <p className='text-zinc-500 text-sm max-w-sm leading-relaxed'>
              Технологическая студия управления строительными и энергетическими проектами.
              Прозрачность на каждом этапе.
            </p>
            <div className='flex items-center gap-3 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-2xl w-fit border border-zinc-200 dark:border-zinc-800'>
              <div className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse' />
              <span className='text-[10px] font-mono text-zinc-600 dark:text-zinc-400'>
                ИНН: {company.inn}
              </span>
            </div>
          </div>

          <div>
            <h4 className='text-xs font-bold uppercase tracking-widest mb-6 text-zinc-900 dark:text-zinc-100'>
              Карта сайта
            </h4>
            <ul className='space-y-4 text-sm text-zinc-500'>
              <li>
                <Link
                  href='/services'
                  className='hover:text-brand-500'
                >
                  Услуги
                </Link>
              </li>
              <li>
                <Link
                  href='/interactives'
                  className='hover:text-brand-500'
                >
                  Инструменты
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='hover:text-brand-500'
                >
                  О компании
                </Link>
              </li>
              <li>
                <Link
                  href='/contacts'
                  className='hover:text-brand-500'
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-xs font-bold uppercase tracking-widest mb-6 text-zinc-900 dark:text-zinc-100'>
              Юридическая инфо
            </h4>
            <ul className='space-y-4 text-sm text-zinc-500'>
              <li>
                <Link
                  href='/privacy'
                  className='hover:text-brand-500'
                >
                  Конфиденциальность
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='hover:text-brand-500'
                >
                  Согласие на данные
                </Link>
              </li>
              <li>
                <span className='text-[10px] font-mono uppercase'>ОГРН: {company.ogrn}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className='pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between gap-4 text-[10px] font-mono text-zinc-400 uppercase tracking-widest'>
          <span>© 2025 ООО «СЭТ». Энергия и Строительство.</span>
          <span>Разработано в Digital Twin Control Room</span>
        </div>
      </div>
    </footer>
  )
}
