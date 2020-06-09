import React from "react";
import "./styles.css";
import HorizonTable from "./HorizonTable";
var faker = require("faker");

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName"
      },
      {
        Header: "Last Name",
        accessor: "lastName"
      },
      {
        Header: "Address",
        accessor: "address"
      }
    ],
    []
  );
  const data = [...new Array(200)].map(() => {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.firstName(),
      address: faker.address.streetAddress() + faker.address.streetAddress()
    };
  });
  return (
    <div>
      <HorizonTable columns={columns} data={data} />
    </div>
  );
}

export default App;
