import React from "react";

import { Title } from "./components/Title";

export const App = ({ agent = { name: "Sonia Chronowska" }, components = {} }) => {
  const { name } = agent;
  const { Icon } = components;

  return (
    <div>
      <Title>Hello {name}!</Title>
      {Icon && <Icon />}
    </div>
  );
};
