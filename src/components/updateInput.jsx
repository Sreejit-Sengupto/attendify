import React, { useState } from "react";
import { account, databases } from "../appwrite/config"; 
import { Modal, Box, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";

const UpdateInput = ({ type, open, handleClose, userData }) => {
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handleUpdate = async () => {
    try {
      switch (type) {
        case "email":
          if (!password) {
            toast.info("Please enter your password to update your email.");
            return;
          }
          await account.updateEmail(inputValue, password);
          await databases.updateDocument(
            import.meta.env.VITE_APPWRITE_DB_ID,
            import.meta.env.VITE_APPWRITE_ORG_COLLECTION_ID, 
            userData.$id, 
            { email: inputValue }
          );
          toast.success("Email updated successfully!");
          location.reload();
          break;

        case "phoneNumber":
          await account.updatePrefs({ phoneNumber: inputValue });
          await databases.updateDocument(
           import.meta.env.VITE_APPWRITE_DB_ID,
           import.meta.env.VITE_APPWRITE_ORG_COLLECTION_ID,
            userData.$id, 
            { phoneNumber: inputValue }
          );
          toast.success("Phone number updated successfully!");
          location.reload();
          break;

        case "password":
          if (!password || !oldPassword) {
            toast.info("Please enter both the old and new passwords.");
            return;
          }
          await account.updatePassword(password, oldPassword);
          toast.success("Password updated successfully!");
          break;

        default:
          break;
      }
      
      const updatedUser = await account.get(); 
      refreshUserData(updatedUser);
      handleClose(); 
    } catch (error) {
      console.error(`Error updating ${type}:`, error.message || error);
      toast.error(`Failed to update ${type}`);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: '#1C1D20',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          color: 'white',
        }}
      >
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
          Update {type}
        </h2>

        {type === "password" ? (
          <>
            <TextField
              label="Old Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: '#b0b0b0' } }}
              InputProps={{
                style: {
                  color: 'white',
                  backgroundColor: '#2C2F33',
                  borderRadius: '8px',
                },
              }}
            />
            <TextField
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: '#b0b0b0' } }}
              InputProps={{
                style: {
                  color: 'white',
                  backgroundColor: '#2C2F33',
                  borderRadius: '8px',
                },
              }}
            />
          </>
        ) : (
          <>
            <TextField
              label={type === "email" ? "New Email" : "New " + type}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: '#b0b0b0' } }}
              InputProps={{
                style: {
                  color: 'white',
                  backgroundColor: '#2C2F33',
                  borderRadius: '8px',
                },
              }}
            />

            {type === "email" && (
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: '#b0b0b0' } }}
                InputProps={{
                  style: {
                    color: 'white',
                    backgroundColor: '#2C2F33',
                    borderRadius: '8px',
                  },
                }}
              />
            )}
          </>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          fullWidth
          sx={{
            marginTop: 2,
            backgroundColor: '#FC356C',
            '&:hover': { backgroundColor: '#e02a5c' },
          }}
        >
          Update {type}
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdateInput;
