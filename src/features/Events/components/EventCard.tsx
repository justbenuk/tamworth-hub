import { Event } from "@prisma/client";
import EditorContent from '@/components/EditorContent';
import { Badge } from '@/components/ui/badge';
import { eventCategoryLabels } from '@/features/Events/EventCategoryLabels';
import { format } from 'date-fns';
import { Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.slug}`} className='flex flex-row items-start justify-between gap-8 border-b py-10'>
      <div className='flex flex-col items-center justify-center text-center border p-4 font-semibold'>
        <span className='font-bold text-primary text-2xl'>{format(event.startDate, 'dd')}</span>
        <span className='text-xl font-bold'>{format(event.startDate, 'MMM')}</span>
      </div>
      <div>
        <Image src={event.image as string} alt='event-image' width={500} height={500} className='aspect-square w-50 h-auto' />
      </div>
      <div className='flex-1 space-y-2'>
        <div className="flex flex-row items-center gap-2">
          {event.isFeatured && (
            <Badge className="h-full">Featured</Badge>
          )}
          <h3>{event.title}</h3>
        </div>
        <div>
          <div className='flex flex-row gap-1 text-gray-500 items-center'>
            <MapPin className="size-4" />
            <span>{event.venue}</span>
          </div>
          <div className='flex flex-row gap-1 text-gray-500 items-center'>
            <Clock className="size-4" />
            <span>{format(event.startDate, 'h:mm a')}</span>
            {event.endDate && (
              <span>– {format(event.endDate, 'h:mm a')}</span>
            )}
          </div>

        </div>
        <EditorContent content={event.description.slice(0, 150) + '...'} />
        <div className='flex flex-row items-center gap-6'>
          {event.isFree && (
            <Badge variant={'secondary'}>Free</Badge>
          )}
          <Badge variant={'secondary'}>{eventCategoryLabels[event.category]}</Badge>
        </div>
      </div>
    </Link>
  )
}

