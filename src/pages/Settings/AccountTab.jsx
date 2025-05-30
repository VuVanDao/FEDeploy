import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MailIcon from "@mui/icons-material/Mail";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import {
  FIELD_REQUIRED_MESSAGE,
  singleFileValidator,
} from "~/utils/validators";
import FieldErrorAlert from "../Form/FieldErrorAlert";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, updateUserAPI } from "~/redux/user/userSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import VisuallyHiddenInput from "../Form/VisuallyHiddenInput";

function AccountTab() {
  const currentUser = useSelector(selectCurrentUser);

  // Những thông tin của user để init vào form (key tương ứng với register phía dưới Field)
  const initialGeneralForm = {
    displayName: currentUser?.displayName,
  };
  // Sử dụng defaultValues để set giá trị mặc định cho các field cần thiết
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialGeneralForm,
  });
  const dispatch = useDispatch();
  const submitChangeGeneralInformation = (data) => {
    const { displayName } = data;
    console.log("displayName: ", displayName);

    // Nếu không có sự thay đổi gì về displayname thì không làm gì cả
    if (displayName === currentUser?.displayName) return;
    toast
      .promise(dispatch(updateUserAPI({ displayName })), {
        pending: "updating...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Update successfully!");
        }
      });
    // Gọi API...
  };

  const uploadAvatar = (e) => {
    // Lấy file thông qua e.target?.files[0] và validate nó trước khi xử lý
    console.log("e.target?.files[0]: ", e.target?.files[0]);
    const error = singleFileValidator(e.target?.files[0]);
    if (error) {
      toast.error(error);
      return;
    }

    // Sử dụng FormData để xử lý dữ liệu liên quan tới file khi gọi API
    let reqData = new FormData();
    reqData.append("avatar", e.target?.files[0]);
    // Cách để log được dữ liệu thông qua FormData
    // console.log("reqData: ", reqData);
    // for (const value of reqData.values()) {
    //   console.log("reqData Value: ", value);
    // }

    toast
      .promise(dispatch(updateUserAPI(reqData)), {
        pending: "updating... ",
      })
      .then((res) => {
        console.log(res);
        // Nếu không có lỗi gì thì update lại avatar cho currentUser
        if (!res.error) {
          toast.success("Update successfully!");
        }
        e.target.value = ""; // Reset lại input file
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ width: 84, height: 84, mb: 1 }}
              alt="TrungQuanDev"
              src={currentUser?.avatar}
            />
            <Tooltip title="Upload a new image to update your avatar immediately.">
              <Button
                component="label"
                variant="contained"
                size="small"
                startIcon={<CloudUploadIcon />}
              >
                Upload
                <VisuallyHiddenInput type="file" onChange={uploadAvatar} />
              </Button>
            </Tooltip>
          </Box>
          <Box>
            <Typography variant="h6">{currentUser?.displayName}</Typography>
            <Typography sx={{ color: "grey" }}>
              @{currentUser?.username}
            </Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(submitChangeGeneralInformation)}>
          <Box
            sx={{
              width: "400px",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <Box>
              <TextField
                disabled
                defaultValue={currentUser?.email}
                fullWidth
                label="Your Email"
                type="text"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box>
              <TextField
                disabled
                defaultValue={currentUser?.username}
                fullWidth
                label="Your Username"
                type="text"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBoxIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Your Display Name"
                type="text"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentIndIcon
                        fontSize="small"
                        sx={{
                          color: (theme) =>
                            theme.palette.mode === "dark"
                              ? "primary.main"
                              : "black",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                {...register("displayName", {
                  required: FIELD_REQUIRED_MESSAGE,
                })}
                error={!!errors["displayName"]}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: (theme) =>
                      theme.palette.mode === "dark" ? "primary.main" : "black",
                    "& fieldset": {
                      borderColor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "primary.main"
                          : "black",
                    },
                  },
                }}
              />
              <FieldErrorAlert errors={errors} fieldName={"displayName"} />
            </Box>

            <Box>
              <Button
                className="interceptor-loading"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Update
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default AccountTab;
