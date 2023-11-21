import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDBDrivers } from "../../redux/actions";
import { Box, ContentWrapper } from "./styles/styledCards";
import DriverCard from "./Card";

function DriverDB() {
  const myDrivers = useSelector((state) => state.myDrivers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDBDrivers());
  }, [dispatch]);

  return (
    <ContentWrapper>
      <Box>
        {myDrivers.map((driver) => (
          <DriverCard key={driver.id} driver={driver} />
        ))}
      </Box>{" "}
    </ContentWrapper>
  );
}

export default DriverDB;