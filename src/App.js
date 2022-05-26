import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import JsonData from "./Data.json";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

function App() {
  // <-------- Custom Theme For MUI -------->

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const bull = (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        mx: "2px",
        transform: "scale(0.8)",
      }}
    >
      •
    </Box>
  );

  // <-------- Pagination Logic -------->

  const [users, setUsers] = useState(JsonData.slice(0, 30));
  const [pageNumber, setPageNumber] = useState(1);
  const usersPerPage = 6;
  const pagesVisited = (pageNumber - 1) * usersPerPage;
  const pageCount = Math.ceil(users.length / usersPerPage);

  const displayUsers = users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user) => {
      return (
        <div className="max-w-[400px] h-fit mx-2" key={user.id}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Firstname
              </Typography>
              <Typography variant="h5">{user.firstName}</Typography>
              <Typography color="text.secondary">Lastname</Typography>
              <Typography variant="h5">{user.lastName}</Typography>
              <Typography color="text.secondary">Email</Typography>
              <Typography variant="h5">{user.email}</Typography>
            </CardContent>
          </Card>
        </div>
      );
    });
  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col items-center bg-gray-900">
        <Box sx={{ flexGrow: 1, mt: 3 }}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit" component="div">
                Users
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <div className=" grid grid-cols-1 lg:grid-cols-2 h-fit w-fit gap-5 flex-1 mt-6">
          {displayUsers}
        </div>
        <div className="p-5  mt-4">
          <Stack>
            <Pagination
              count={pageCount}
              color="primary"
              defaultPage={1}
              onChange={(e, v) => setPageNumber(v)}
              variant="outlined"
              size="large"
            />
          </Stack>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
