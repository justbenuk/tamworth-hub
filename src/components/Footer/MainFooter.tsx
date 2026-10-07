import PageContainer from "../Shared/PageContainer";

export default function MainFooter() {
  return (
    <div className="bg-primary text-primary-foreground">
      <PageContainer>
        <div className="py-10">Links</div>
        <footer className="flex flex-row items-center justify-center border-t border-black text-sm py-2 text-center">
          footer
        </footer>
      </PageContainer>
    </div>
  );
}
