import React from "react";

// The Tab component displays the name of the tab and adds an additional class
// if the tab is active. When clicked, the component will fire a handler, onClick,
// that will let the Tabs component know which tab should be active.

export function Tab({ activeTab, label, onClick }) {
  const handleClick = () => {
    onClick(label);
  };
  let className = "tab-list-item text-[14px] text-opacity-50 font-bold uppercase pb-[28px] pt-[13px] border-b-[3px] mb-[-2px] cursor-pointer";
  return (
    <>
      <li
        className={`${className} 
        ${activeTab === label ? "tab-list-active text-[#0A627E] border-[#0A627E]" : "text-black border-transparent"}`}
        onClick={handleClick}
      >
        {label}
      </li>
    </>
  );
}
