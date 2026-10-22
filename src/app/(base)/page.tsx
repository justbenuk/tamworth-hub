import PageContainer from "@/components/PageContainer";

export default function HomePage() {
  return (
    <PageContainer>
      <div className="h-100">banner</div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">Content side</div>
        <aside></aside>
      </div>
    </PageContainer>
  );
}
