import React from "react";
import { mount, shallow } from "enzyme";

import ListCard from "./ListCard";
import { UserSubscription } from "advantage/api/types";
import {
  freeSubscriptionFactory,
  userSubscriptionEntitlementFactory,
} from "advantage/tests/factories/api";
import { EntitlementType, SupportLevel } from "advantage/api/enum";

describe("ListCard", () => {
  let freeSubscription: UserSubscription;

  beforeEach(async () => {
    freeSubscription = freeSubscriptionFactory.build();
  });

  it("can render a free subscription", () => {
    freeSubscription = freeSubscriptionFactory.build({
      entitlements: [
        userSubscriptionEntitlementFactory.build({
          type: EntitlementType.Livepatch,
        }),
        userSubscriptionEntitlementFactory.build({
          support_level: SupportLevel.Advanced,
          type: EntitlementType.Support,
        }),
      ],
      number_of_machines: 2,
      start_date: "2021-07-09T07:14:56Z",
    });
    const wrapper = mount(
      <ListCard subscription={freeSubscription} onClick={jest.fn()} />
    );
    expect(wrapper.find("[data-test='card-title']").text()).toBe(
      "Free Personal Token"
    );
    expect(wrapper.find("[data-test='card-type']").text()).toBe("free");
    expect(wrapper.find("[data-test='card-machines']").text()).toBe("2");
    expect(wrapper.find("[data-test='card-start-date']").text()).toBe(
      "09.07.2021"
    );
    expect(wrapper.find("[data-test='card-end-date']").text()).toBe("Never");
    expect(wrapper.find("List[data-test='card-entitlements']").text()).toBe(
      "Livepatch24/7 Support"
    );
  });

  it("can be marked as selected", () => {
    const wrapper = shallow(
      <ListCard
        subscription={freeSubscription}
        isSelected={true}
        onClick={jest.fn()}
      />
    );
    expect(wrapper.find("Card").hasClass("is-active")).toBe(true);
  });

  it("calls the onclick function when the card is clicked", () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <ListCard
        subscription={freeSubscription}
        isSelected={true}
        onClick={onClick}
      />
    );
    wrapper.find("Card").simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
});