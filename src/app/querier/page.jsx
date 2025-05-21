import ProtectPage from "@/ui/protect-page";
import Querier from "@/ui/protected/querier";

export default function ProtectedConnectDB() {
  return (
    <ProtectPage>
      <Querier />
    </ProtectPage>
  );
}
