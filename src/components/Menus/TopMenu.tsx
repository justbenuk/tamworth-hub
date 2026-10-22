import { format } from "date-fns";
import PageContainer from "../PageContainer";
import AuthMenu from "./AuthMenu";

export default function TopMenu() {
  const date = new Date();
  return (
    <div className="bg-neutral-800 text-primary-foreground">
      <PageContainer>
        <div className="flex flex-row justify-between items-center">
          <div className="text-xs font-semibold">
            {format(date, "EEEE do MMMM yyyy", {
              useAdditionalDayOfYearTokens: true,
            }).toString()}
          </div>
          <AuthMenu />
        </div>
      </PageContainer>
    </div>
  );
}
