import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FetchAllEvents } from "@/features/Events/EventsActions";
import AllEventsTable from "@/features/Events/Tables/AllEventsTable";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Events'
};

export default async function AdminEventsPage() {
  const events = await FetchAllEvents()
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Events</CardTitle>
        <Button asChild>
          <Link href={'/admin/events/new'} className='flex flex-row items-center gap-2'>
            <PlusIcon />
            <span>New Event</span>
          </Link>
        </Button>

      </CardHeader>
      <CardContent>
        <AllEventsTable events={events} />
      </CardContent>
    </Card>
  )
}

