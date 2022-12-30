// import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
// import imageService from "../../services/image";
// import { GET_IMAGE_UPLOAD_URL } from "../../gql/misc";
// import { Box } from "@mui/system";
// import { CREATE_VIDEO } from "../../gql/video";
// import { LoadingButton } from "@mui/lab";
// import {
//   Button,
//   Typography,
//   Card,
//   CardMedia,
//   CardContent,
//   TextField,
//   FormControl,
//   Menu,
//   MenuItem,
//   InputLabel,
//   Select,
// } from "@mui/material";
// import { valueFromAST } from "graphql";

// const CreateVideo = ({ handleClose, videoAlert }) => {
//   const fileTypes = ["video/webm", "video/mkv", "video/mp4"];
//   const [imagePreview, setImagePreview] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [imageFileUrl, setImageFileUrl] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [values, setValues] = useState({
//     video_url: "",
//     video_title: "",
//     duration: "",
//     package_type: "",
//   });
//   const [errors, setErrors] = useState({
//     video_url: "",
//     video_title: "",
//     duration: "",
//     package_type: "",
//   });

//   const handleChange = (prop) => (event) => {
//     setValues({ ...values, [prop]: event.target.value });
//   };

//   const [getImageUrl] = useMutation(GET_IMAGE_UPLOAD_URL, {
//     onError: (error) => {
//       console.log("error : ", error);
//     },
//     onCompleted: (result) => {
//       setImageFileUrl(result.getImageUploadUrl.imageUploadUrl);
//       setValues({
//         ...values,
//         video_url: `https://axra.sgp1.digitaloceanspaces.com/VJun/${result.getImageUploadUrl.imageName}`,
//       });
//     },
//   });

//   const [createVideo] = useMutation(CREATE_VIDEO, {
//     onError: (error) => {
//       console.log("error : ", error);
//       setLoading(false);
//     },
//     onCompleted: () => {
//       setValues({
//         video_url: "",
//         video_title: "",
//         duration: "",
//         package_type: "",
//       });
//       setErrors({
//         video_url: "",
//         video_title: "",
//         duration: "",
//         package_type: "",
//       });
//       setImageFile("");
//       setImagePreview("");
//       setLoading(false);
//       videoAlert("New Video have been created.");
//       handleClose();
//     },
//   });

//   const videoChange = async (e) => {
//     if (e.target.files && e.target.files[0]) {
//       let video = e.target.files[0];
//       if (!fileTypes.includes(video.type)) {
//         setErrors({
//           ...errors,
//           video_url: "Please select image. (mp4,mkv...)",
//         });
//         return;
//       }
//       if (video.size > 1048576000) {
//         setErrors({
//           ...errors,
//           video_url: "Video file size must be smaller than 10MB.",
//         });
//         return;
//       }
//       setImageFile(video);
//       setImagePreview(URL.createObjectURL(video));
//       getImageUrl();
//     }
//   };

//   const handleCreate = async () => {
//     setLoading(true);
//     setErrors({
//       video_url: "",
//       video_title: "",
//       duration: "",
//       package_type: "",
//     });
//     let isErrorExit = false;
//     let errorObject = {};

//     if (!values.video_url || !imageFile) {
//       errorObject.video_url = "Video_url field is required.";
//       isErrorExit = true;
//     }
//     if (!values.video_title) {
//       errorObject.video_title = "Video Title field is required.";
//       isErrorExit = true;
//     }
//     if (!values.duration) {
//       errorObject.duration = "Duration field is required";
//       isErrorExit = true;
//     }
//     if (!values.package_type) {
//       errorObject.package_type = "package type is required";
//       isErrorExit = true;
//     }
//     if (isErrorExit) {
//       setErrors({ ...errorObject });
//       setLoading(false);
//       console.log("hay", errorObject);
//       return;
//     }
//     try {
//       await imageService.uploadImage(imageFileUrl, imageFile);
//       createVideo({ variables: { ...values } });
//       console.log(values);
//     } catch (error) {
//       console.log("error : ", error);
//     }
//   };

//   return (
//     <div>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           color: "black",
//           maxWidth: "lg",
//           bgcolor: "#cecece",
//           borderTopRightRadius: 10,
//           borderTopLeftRadius: 1,
//           py: 2,
//           mx: 13,
//         }}
//       >
//         <Typography variant="h5" component="h2" color="black" sx={{ mx: 4 }}>
//           Create Video
//         </Typography>
//         <Button
//           onClick={handleClose}
//           variant="contained"
//           color="warning"
//           sx={{ mx: 4 }}
//         >
//           Close
//         </Button>
//       </Box>
//       <Card
//         sx={{
//           display: "flex",
//           justifyContent: "flex-start",
//           color: "white",
//           bgcolor: "white",
//           maxWidth: "lg",
//           mx: 13,
//           borderRadius: 0,
//           height: 450,
//           borderBottomLeftRadius: 10,
//           borderBottomRightRadius: 10,
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             my: 2,
//             mx: 3,
//             ml: 5,
//           }}
//         >
//           <CardMedia
//             component="img"
//             image={imagePreview}
//             alt="Video"
//             sx={{
//               flex: 1,
//               bgcolor: "#cecece",
//               maxHeight: 200,
//               objectFit: "contain",
//               width: 200,
//               mt: 4,
//               boxShadow: 10,
//               borderRadius: 2,
//               border: 1,
//             }}
//           />
//         </Box>

//         <CardContent sx={{ mx: 2, my: 2, maxWidth: 500 }}>
//           <Box sx={{ display: "flex", flexDirection: "column" }}>
//             <TextField
//               id="video_url"
//               label="Upload Video"
//               type="file"
//               InputLabelProps={{ shrink: "shrink" }}
//               sx={{ my: 2 }}
//               onChange={videoChange}
//               error={errors.video_url ? true : false}
//               helperText={errors.video_url}
//               accept="video/webm, video/mkv, video/mp4"
//             />

//             <TextField
//               id="video_title"
//               label="Video Title"
//               value={values.video_title}
//               onChange={handleChange("video_title")}
//               error={errors.video_title ? true : false}
//               helperText={errors.video_title}
//             />
//           </Box>

//           <LoadingButton
//             variant="contained"
//             color="warning"
//             size="large"
//             sx={{ maxWidth: 100, mt: "1rem" }}
//             loading={loading}
//             onClick={handleCreate}
//           >
//             Create
//           </LoadingButton>
//         </CardContent>
//         <div>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               mx: 2,
//               my: 4,
//               minWidth: 350,
//             }}
//           >
//             <TextField
//               id="package_type"
//               label="package_type"
//               sx={{ my: 2 }}
//               value={values.package_type}
//               onChange={handleChange("package_type")}
//               error={errors.package_type ? true : false}
//               helperText={errors.package_type}
//             />

//             <TextField
//               id="duration"
//               label="duration"
//               sx={{ my: 2 }}
//               value={values.duration}
//               onChange={handleChange("duration")}
//               error={errors.duration ? true : false}
//               helperText={errors.duration}
//             />
//           </Box>
//         </div>
//       </Card>
//     </div>
//   );
// };
// export default CreateVideo;
