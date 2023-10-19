import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiMoneyWithdraw, BiSolidUser } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import { Link } from "react-router-dom";

const CardUser = [
  {
    title: "Total User",
    number: 25,
  },
  {
    title: "Total Money",
    number: 25,
  },
  {
    title: "Total Product",
    number: 25,
  },
];
export function CardTop() {
  return (
    <div className="top flex flex-grow gap-10">
      {CardUser.map((user, index) => (
        <Card key={index} className="mt-6 w-96">
          <CardBody>
            {user.title === "Total User" ? (
              <BiSolidUser className="text-[45px]" />
            ) : user.title === "Total Money" ? (
              <BiMoneyWithdraw className="text-[45px]" />
            ) : (
              <BsBoxSeam className="text-[45px]" />
            )}

            <Typography variant="h5" color="blue-gray" className="mb-2 ">
              {user.title}
            </Typography>
            <Typography>{user.number}</Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Link
              to={
                user.title === "Total User"
                  ? "/admin/user"
                  : user.title === "Total Product"
                  ? "/admin/product"
                  : ""
              }
              className="inline-block"
            >
              <Button
                size="sm"
                variant="text"
                className="flex items-center gap-2"
              >
                Show More
                <AiOutlineArrowRight className="text-[15px]" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
