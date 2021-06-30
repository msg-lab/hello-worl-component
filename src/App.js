import React from "react";

import { Title } from "./components/Title";

export const App = props => {
  const { agent, components } = props;
  const {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead
  } = components;

  return (
    <div>
      <Title>Hello {agent.user.firstName}!</Title>
      <TableContainer>
        <Table style={{ width: "auto" }}>
          <TableHead>
            <TableRow>
              <TableCell>Key</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(props).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>key</TableCell>
                <TableCell>{JSON.stringify(value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
