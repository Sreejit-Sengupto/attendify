import React from "react";
import { useUserContext } from "../../../../providers/UserProvider";
import { registerPasskey } from "../../../../utils/webauthn";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import PasskeyNotification from "../../../../components/passkey-notification";

const MainPanel = () => {
  const { userData } = useUserContext();

  const [loading, setLoading] = React.useState(false);

  const [pagination, setPagination] = React.useState({
    pageSize: 10,
    page: 0,
  });

  const registerOrgPasskey = async () => {
    try {
      setLoading(true);
      await registerPasskey(userData, "ORG");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const rows =
    userData.students &&
    userData.students.map((item, index) => {
      return {
        id: index + 1,
        rollno: item.rollNumber,
        uid: item.$id,
        name: item.firstName + " " + item.lastName,
        email: item.email,
        phno: item.phoneNumber,
        att: 0,
      };
    });

  const columns = [
    {
      field: "id",
      headerName: "Serial Number",
      flex: 1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "rollno",
      headerName: "Student Roll Number",
      flex: 2,
      minWidth: 175,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "uid",
      headerName: "Student UID",
      flex: 2,
      minWidth: 175,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Student Name",
      flex: 3,
      minWidth: 175,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Student Email",
      flex: 3,
      minWidth: 175,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phno",
      headerName: "Student Phone Number",
      flex: 2,
      minWidth: 175,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "att",
      headerName: "Total Attendance",
      flex: 1,
      minWidth: 100,
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="font-semibold text-xl  p-3 text-textPrimary">
        Registered Students
      </h1>
      <PasskeyNotification
        userData={userData}
        category={"ORG"}
        clickHandler={registerOrgPasskey}
        loading={loading}
      />
      <Paper sx={{ height: "100%", width: "100%", backgroundColor: "#18181C" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          density="standard"
          disableColumnFilter
          disableColumnSelector
          disableColumnSorting
          disableRowSelectionOnClick
          disableColumnMenu
          loading={!userData.$id}
          pageSizeOptions={[10]}
          paginationModel={pagination}
          onPaginationModelChange={setPagination}
          sx={{
            fontFamily: "Poppins",
            "& .MuiDataGrid-root": {
              backgroundColor: "#18181C",
              color: "#fff",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#1C1D20",
              color: "#fff",
              border: "1px solid #2D2C31",
            },
            "& .MuiDataGrid-cell": {
              color: "#fff",
              border: "1px solid #2D2C31",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#fff",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row": {
              backgroundColor: "#1C1D20",
              "&:hover": {
                backgroundColor: "#333",
              },
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#18181C",
            },
            ".MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "&.MuiDataGrid-root": {
              border: "none",
            },
            ".MuiDataGrid-columnHeaders": {
              fontWeight: 400,
              borderRadius: "var(--none, 0px)",
              borderBottom: "1px solid var(--divider, rgba(0, 0, 0, 0.12))",
              borderLeft:
                "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
              borderRight:
                "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
              borderTop:
                "var(--none, 0px) solid var(--divider, rgba(0, 0, 0, 0.12))",
              background: "var(--primary-selected, rgba(33, 150, 243, 0.08))",
              alignItems: "space-between !important",
            },
            "& .MuiDataGrid-container--top [role=row]": {
              backgroundColor: "#1C1D20",
            },
            "& .MuiTablePagination-root:last-child": {
              color: "white",
            },
            "& .css-1gpuzre-MuiSvgIcon-root-MuiSelect-icon": {
              color: "white",
            },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
        />
      </Paper>
    </div>
  );
};

export default MainPanel;
