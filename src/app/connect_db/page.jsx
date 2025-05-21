import ProtectPage from "@/ui/protect-page";
import ConnectDB from "@/ui/protected/connect-db";

export default function ProtectedConnectDB() {
  return (
    <ProtectPage>
      <ConnectDB />
    </ProtectPage>
  );
}
