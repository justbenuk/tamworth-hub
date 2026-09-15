import PageContainer from '@/components/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import AddCouncillorForm from '@/features/wards/forms/AddcouncillorForm';
import AllCouncillorsTable from '@/features/wards/tables/AllCouncillorsTable.';
import { FetchAllCouncillorsAction } from '@/features/wards/WardActions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Councillors'
};

export default async function DashboardCouncillorsPage() {

const councillors = await FetchAllCouncillorsAction()
  return (
    <PageContainer size='large' className='py-10'>
      <div className='grid gap-6'>
        <div className='flex flex-row items-center justify-end'>
          <AddCouncillorForm />
        </div>
        <Card>
          <CardContent>
        <AllCouncillorsTable councillors={councillors} />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
