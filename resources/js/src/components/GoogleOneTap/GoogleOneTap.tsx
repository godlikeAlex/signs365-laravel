import { SharedInertiaData } from "@/src/types/inertiaTypes";
import { router, usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function GoogleOneTap() {
  const { auth } = usePage<SharedInertiaData>().props;

  useEffect(() => {
    if (window.google && !auth.user) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: (response) =>
          router.post("/auth/google/one-tap", {
            credential: response.credential,
          }),
        auto_select: false,
      });

      window.google.accounts.id.prompt();
    }
  }, [auth]);

  return <></>;
}
