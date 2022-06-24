import { Link, useParams } from 'react-router-dom'
import { CheckCircle, Lock } from 'phosphor-react'

import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

type LessonProps = {
  title: string
  slug: string
  availableAt: Date
  type: string
}

export function Lesson({ title, slug, availableAt, type }: LessonProps) {
  const { slug: url } = useParams<{ slug: string }>()

  const isLessonAvailable = isPast(availableAt)
  const availableDateFormatted = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm'", {
    locale: ptBR
  })

  const isActiveLesson = url === slug

  return (
    <Link to={`/event/lesson/${slug}`} className='group'>
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>

      <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isActiveLesson ? 'bg-green-500' : ''}`}>
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={`text-sm font-medium flex items-center gap-2 ${isActiveLesson ? 'text-white' : 'text-blue-500'}`}>
              <CheckCircle size={20} /> 
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} /> 
              Em Breve
            </span>
          )}
          
          <span className="text-xs rounded py=[0.125rem] px-2 text-white border border-green-300 font-bold">
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        <strong className="text-gray-200 mt-5 block">
          {title}
        </strong>
      </div>
    </Link>
  )
}