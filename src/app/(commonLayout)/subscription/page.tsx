import Subscription from "@/components/shared/Subscription/Subscription";
import NoSSR from "@/utils/NoSSR";

const SubscriptionPage = () => {
  return (
    <div>
      <NoSSR>
        <Subscription />
      </NoSSR>
    </div>
  );
};

export default SubscriptionPage;
