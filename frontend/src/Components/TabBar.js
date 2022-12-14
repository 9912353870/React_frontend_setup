import * as React from "react";
import Tab from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Box from "@mui/material/Box";

export default function TabBar({ tabs = [], setParentTab }) {
  const [value, setValue] = React.useState(0);

  const styles = {
    tabElements: {
      color: "darkslategrey",
      fontWeight: "800",
      fontSize: "11px",
      padding: "0px 0px",
    },
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setParentTab(tabs[newValue]);
  };

  React.useEffect(() => {
    setParentTab(tabs[0]);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5b0",
        boxShadow: "0px 0px 2px 0px #a1a1a157",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        sx={{
          width: "92vw",
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
          overflow: "hidden",
        }}
        TabIndicatorProps={{ style: { background: "#fbd020" } }}
      >
        {tabs?.map((item) => {
          return <Tab label={item?.title} sx={styles?.tabElements} />;
        })}
      </Tabs>
    </Box>
  );
}
