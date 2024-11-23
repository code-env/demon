import MailContent from "@/components/mail-content";
import MailHeader from "@/components/mail-header";
import MailSidebar from "@/components/mail-sidebar";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col gap-10">
        <MailHeader />
        <div className="flex gap-4">
          <MailSidebar />
          <MailContent />
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
