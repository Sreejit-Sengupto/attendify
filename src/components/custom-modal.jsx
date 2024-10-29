import React from "react";
import { Modal, Box } from "@mui/material";
import { Loader2 } from "lucide-react";

const CustomModal = ({ open, handleClose, actionHandler }) => {
  const [orgCode, setOrgCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await actionHandler(orgCode);
      setOrgCode("");
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#1C1D20",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          color: "white",
        }}
      >
        <p className="text-lg text-center my-2">Add New Institute</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-textPrimary"
        >
          {/* <label htmlFor="">Organisation Code</label> */}
          <input
            type="text"
            name="orgCode"
            value={orgCode}
            onChange={(e) => {
              e.preventDefault();
              setOrgCode(e.target.value);
            }}
            required
            placeholder="Enter the unique Institute code"
            className="p-3 shadow-md rounded border border-accent focus:outline-none focus:ring focus:ring-accent bg-[#1C1D20] placeholder:text-textSecondary"
          />
          <button
            className="w-full my-3 bg-accent hover:bg-accent/90 text-white font-medium p-3 rounded-lg disabled:bg-accent/80"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              "Add Institute"
            )}
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default CustomModal;
