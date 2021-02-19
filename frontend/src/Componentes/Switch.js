import React from 'react';
import "../Switch.css"

const Switch = ({ checked, handleToggle }) => {
  return (
    <>
      <input
        defaultChecked={checked}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: checked && "#009900" }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;