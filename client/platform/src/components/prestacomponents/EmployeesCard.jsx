import { Card, Avatar, Tooltip } from "flowbite-react";

export const EmployeesCard = ({ employees }) => {
  return (
    <Card className="shadow-md w-full">
      <div className="flex flex-row justify-evenly">
        {employees.map((employee, index) => {
          return (
            <Tooltip key={index} content={employee.description}>
              <Card key={index} className="m-3 shadow-none">
                <Avatar img={employee.image} rounded>
                  <p className="text-black dark:text-white">
                    {employee.prenom}
                  </p>
                </Avatar>
              </Card>
            </Tooltip>
          );
        })}
      </div>
    </Card>
  );
};
