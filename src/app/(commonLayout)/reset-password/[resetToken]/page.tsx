import ResetPassPage from "@/components/Login/ResetPassPage";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ResetPassWithToken = async ({
  params,
  searchParams
}: {
  params: Promise<{ resetToken: string }>;
  searchParams: any;
}) => {
  const resetToken = (await params).resetToken;
//   console.log(resetToken, searchParams.email);
  const email = searchParams.email;
  return (
    <div>
      <ResetPassPage  resetToken={resetToken} email={email} />
    </div>
  );
};

export default ResetPassWithToken;
