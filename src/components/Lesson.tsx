import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";
import classNames from 'classnames';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "class" | "live";
}

export function Lesson(props: LessonProps) {
  const {slug} = useParams<{slug: string}>();

  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'K'h'mm", {
    locale: ptBR,
  });

  const isLessonCurrent = slug === props.slug;

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>

      <div className={classNames(
        'rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
          'bg-green-500': isLessonCurrent,
        } 
      )}>
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={classNames('text-sm text-blue-500 font-medium flex items-center gap-2', {
              'text-white': isLessonCurrent
            })}>
              <CheckCircle size={20} />
              Conteúdo Liberado
            </span>
          ) : (
            <span className='text-sm text-orange-500 font-medium flex items-center gap-2'>
              <Lock size={20} />
              Em Breve
            </span>
          )}

          <span className="text-xs rounded px-2 py-[2px] text-white border border-green-300 font-bold">
            { props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA' }
          </span>
        </header>

        <strong className={classNames(
          ' mt-5 block', {
            'text-white': isLessonCurrent,
            'text-gray-200': !isLessonCurrent,
          }
        )}>{props.title}</strong>
      </div>
    </Link>
  );
}
