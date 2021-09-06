import { Spinner } from "@canonical/react-components";
import { useUserSubscriptions } from "advantage/react/hooks";
import { selectFreeSubscription } from "advantage/react/hooks/useUserSubscriptions";
import React from "react";
import { SelectedToken } from "../Content/types";

import ListCard from "./ListCard";
import ListGroup from "./ListGroup";

type Props = {
  selectedToken?: SelectedToken;
  onSetActive: (token: SelectedToken) => void;
};

const SubscriptionList = ({ selectedToken, onSetActive }: Props) => {
  const {
    data: freeSubscription,
    isLoading: isLoadingFree,
  } = useUserSubscriptions({
    select: selectFreeSubscription,
  });
  if (isLoadingFree || !freeSubscription) {
    return <Spinner />;
  }
  const uaSubscriptions = [...Array(20)].map((_, i) => (
    <ListCard
      isSelected={selectedToken === `ua-sub-${i}`}
      key={i}
      onClick={() => {
        onSetActive(`ua-sub-${i}`);
      }}
      subscription={freeSubscription}
    />
  ));
  return (
    <div className="p-subscriptions__list">
      <div className="p-subscriptions__list-scroll">
        <ListGroup title="Ubuntu Advantage">{uaSubscriptions}</ListGroup>
        {freeSubscription ? (
          <ListGroup title="Free personal token">
            <ListCard
              data-test="free-token"
              isSelected={
                // TODO: update this to use the sub token when it is available.
                // https://github.com/canonical-web-and-design/commercial-squad/issues/210
                selectedToken === "free-token"
              }
              onClick={() => {
                // TODO: update this to use the sub token when it is available.
                // https://github.com/canonical-web-and-design/commercial-squad/issues/210
                onSetActive("free-token");
              }}
              subscription={freeSubscription}
            />
          </ListGroup>
        ) : null}
      </div>
    </div>
  );
};

export default SubscriptionList;