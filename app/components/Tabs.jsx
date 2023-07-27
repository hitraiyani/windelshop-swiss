import React from "react";

import { Tab } from "./Tab";
// This component keeps track of which tab is active,
// displays a list of tabs, and the content for the active tab.

export function Tabs({ children }) {
  const label = children[0].props.label;
  //  active tab will start at 0 in the array of tabs
  const [activeTab, setActiveTab] = React.useState(label);

  function onClickTabItem(tab) {
    setActiveTab(tab);
  }
  return (
    <div className="tabs">
      <ol className="tab-list flex gap-x-[15px] md:gap-x-[20px] lg:gap-x-[30px] xl:gap-x-[40px] 2xl:gap-x-[53px] border-b-[1px] border-[#E5EFD4]">
        {children.map((child) => {
          // Tab label
          const { label } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="tab-content pt-[30px]">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
}
