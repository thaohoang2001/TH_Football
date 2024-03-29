import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Matching from "../matching/Matching";
import OpponentPitch from "../opponentPitch/OpponentPitch";
import { Box, Tabs, Tab } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";

const MatchingShared = () => {
  const namePages = {
    MATCHING: "matching",
    CHOOSE_OPPONENT_PITCH: "choose-opponent-pitch",
  };

  const [value, setValue] = useState(namePages.MATCHING);
  const primaryColor = "#152AE8";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />

      <Box>
        <TabContext value={value}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                className="Tabs"
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                centered
              >
                <Tab label="Matching" value={namePages.MATCHING} />
                <Tab
                  label="Choose Opponent Pitch"
                  value={namePages.CHOOSE_OPPONENT_PITCH}
                />
              </Tabs>
            </Box>
            <TabPanel value={namePages.MATCHING}>
              <Matching />
            </TabPanel>
            <TabPanel value={namePages.CHOOSE_OPPONENT_PITCH}>
              <OpponentPitch />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </div>
  );
};

export default MatchingShared;
