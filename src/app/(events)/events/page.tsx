import PageContainer from '@/components/PageContainer';
import EventCard from '@/features/Events/components/EventCard';
import { FetchAllPublishedEvents } from '@/features/Events/EventsActions';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: "What's On in Tamworth",
  description: "Discover what's on in Tamworth. Explore local events, family activities, live music, markets, festivals and things to do near you with Tamworth Hub."
};

export default async function EventsPage() {
  const events = await FetchAllPublishedEvents()
  return (
    <PageContainer className='py-10'>
      <div className='grid grid-cols-1 md:grid-cols-5 xl:grid-cols-8 gap-6'>
        <div className='col-span-1 md:col-span-3 lg:col-span-6 space-y-6'>
          <div className='grid gap-6'>
            <div>
              <h1>What&apos;s on in Tamworth</h1>
              <span className='text-lead'>Discover local events, activities and things to do in and around Tamworth</span>
            </div>
          </div>
          <div className='space-y-12'>
            {events.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
        </div>
        <aside className='col-span-1 md:col-span-2'></aside>
      </div>
    </PageContainer >
  )
}

