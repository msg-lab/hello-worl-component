import React from "react";

export const App = props => {
  const { agent, components } = props;
  const { Table, TableBody, TableCell, TableContainer, TableRow } = components;

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
            {Object.entries.map(([key, value]) => (
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
