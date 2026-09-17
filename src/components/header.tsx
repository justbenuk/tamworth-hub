import MenuList from "./MenuList";
import PageContainer from "./PageContainer";
import SiteLogo from "./SiteLogo";

export default function Header() {
  return (
    <PageContainer size="large">
      <header className="grid grid-cols-3 items-center py-4">
        <div className="justify-self-start">
          <SiteLogo />
        </div>
        <div className="justify-self-center">
          <MenuList />
        </div>
        <div className="justify-self-end">auth</div>
      </header>
    </PageContainer>
  );
}
