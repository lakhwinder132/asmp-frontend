import React, { useState } from "react";
import "./Toggle.css";

import NonCoreManagement_consult from "./non-corefiles/NonCoreManagement-consult";
import NonCoreFinance from "./non-corefiles/NonCoreFinance";
import NonCoreSoftware from "./non-corefiles/NonCoreSoftware";
import Civil_services from "./non-corefiles/civil_services";
import Management from "./non-corefiles/management";
import Product_management from "./non-corefiles/product_management";
import Strategy_consulting from "./non-corefiles/strategy_consulting";
import Design from "./non-corefiles/design";
import Marketing from "./non-corefiles/marketing";
import Entrepreneurship from "./non-corefiles/entrepreneurship";
import Analytics from "./non-corefiles/analytics.jsx";
import Other from "./non-corefiles/other.jsx";

import Core from "./Core";
import Research from "./research";

import backgroundImage from "../assets/asmp_bg.jpg";
import CursorAnimation from "./CursorAnimation";

const Toggle = () => {
  const [selectedOption, setSelectedOption] = useState("core");
  const [activeTabNonCore, setActiveTabNonCore] = useState("analytics");
  const [activeTabCore, setActiveTabCore] = useState("core-engineering");

  // to toggle between core and non-core
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // to toggle between different options in the non-core div
  const handleTabClickNonCore = (tab, event) => {
    event.preventDefault();
    setActiveTabNonCore(tab);
  };

  // to toggle between different options in the core div
  const handleTabClickCore = (tab, event) => {
    event.preventDefault();
    setActiveTabCore(tab);
  };

  const nonCoreTabs = [
    { id: "analytics", label: "Analytics", href: "#analytics" },
    { id: "civil-service", label: "Civil Services/Government of India", href: "#civil-service" },
    { id: "management-consult", label: "Management Consulting", href: "#management-consult" },
    { id: "strategy-consult", label: "Strategy Consulting", href: "#strategy-consult" },
    { id: "finance", label: "Finance", href: "#finance" },
    { id: "software", label: "IT/Software", href: "#software" },
    { id: "others", label: "Others", href: "#others" },
    { id: "product-management", label: "Product Management", href: "#product-management" },
    { id: "design", label: "Design", href: "#design" },
    { id: "management", label: "Management", href: "#management" },
    { id: "marketing", label: "Marketing", href: "#marketing" },
    { id: "entrepreneurship", label: "Entrepreneurship", href: "#entrepreneurship" },
  ];

  const coreTabs = [
    { id: "core-engineering", label: "Core Engineering", href: "#core-engineering" },
    { id: "research", label: "Research", href: "#research" },
  ];

  return (
    <>
      <CursorAnimation />
      <div className="toggle-bg-image">
        <div style={{ height: "10vh" }}></div>
        <div className="core-or-noncore-container">
          <div className="switches-container">
            <input
              type="radio"
              id="core"
              name="coreOrNonCore"
              value="core"
              checked={selectedOption === "core"}
              onChange={handleOptionChange}
            />
            <label htmlFor="core">Core</label>

            <input
              type="radio"
              id="noncore"
              name="coreOrNonCore"
              value="noncore"
              checked={selectedOption === "noncore"}
              onChange={handleOptionChange}
            />
            <label htmlFor="noncore">Non Core</label>

            <div className="switch-wrapper">
              <div
                className="switch">
                <div
                  style={{
                    fontFamily: "Fraunces, serif",
                    fontSize: "3rem",
                    lineHeight: "1.2",
                    color: "#245331",
                  }}>Core</div>
                <div
                  style={{
                    fontFamily: "Fraunces, serif",
                    fontSize: "3rem",
                    lineHeight: "1.2",
                    color: "#245331",
                  }}>Non Core</div>
              </div>
            </div>
          </div>
        </div>

        {/* Conditionally rendering coreDiv and noncoreDiv */}
        {selectedOption === "core" && (
          <div id="coreDiv">
            <ul className="toggle-ul-core">
              {coreTabs.map(({ id, label, href = `#${id}` }) => (
                <li key={id} className="toggle-li-core">
                  <a
                    className={`toggle-li-link-core ${activeTabCore === id ? "active" : ""
                      }`}
                    href={href}
                    onClick={(e) => handleTabClickCore(id, e)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            {activeTabCore === "core-engineering" && <Core />}
            {activeTabCore === "research" && <Research />}
          </div>
        )}

        {selectedOption === "noncore" && (
          <div id="noncoreDiv">
            <ul className="toggle-ul-noncore">
              {nonCoreTabs.map(({ id, label, href = `#${id}` }) => (
                <li key={id} className="toggle-li-noncore">
                  <a
                    className={`toggle-li-link-noncore ${activeTabNonCore === id ? "active" : ""
                      }`}
                    href={href}
                    onClick={(e) => handleTabClickNonCore(id, e)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            {activeTabNonCore === "analytics" && <Analytics />}
            {activeTabNonCore === "civil-service" && <Civil_services />}
            {activeTabNonCore === "management-consult" && <NonCoreManagement_consult />}
            {activeTabNonCore === "strategy-consult" && <Strategy_consulting />}
            {activeTabNonCore === "finance" && <NonCoreFinance />}
            {activeTabNonCore === "software" && <NonCoreSoftware />}
            {activeTabNonCore === "others" && <Other />}
            {activeTabNonCore === "product-management" && <Product_management />}
            {activeTabNonCore === "design" && <Design />}
            {activeTabNonCore === "management" && <Management />}
            {activeTabNonCore === "marketing" && <Marketing />}
            {activeTabNonCore === "entrepreneurship" && <Entrepreneurship />}
          </div>
        )}
      </div>
    </>
  );
};

export default Toggle;
