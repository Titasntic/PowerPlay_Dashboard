// import { useLazyQuery, useQuery } from "@apollo/client";
// import DirectionsIcon from "@mui/icons-material/Directions";
// import CreateVideo from "../../components/video Details/CreateVideo";
// import {
//   Breadcrumbs,
//   Paper,
//   Box,
//   Card,
//   CardMedia,
//   CardActions,
//   Typography,
//   CardContent,
//   Alert,
//   InputBase,
//   Divider,
//   IconButton,
//   Button,
//   Modal,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { SINGLE_VIDEO } from "../../gql/video";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "60%",
//   transform: "translate(-50%, -50%)",
//   width: "100vw",

//   // border: "2px solid #000",
//   // boxShadow: 24,
//   // /p: 8,
// };
// const Video = () => {
//   // Search button
//   const [search, setSearch] = useState("");
//   const { id } = useParams();

//   // for message alert
//   const [showAlert, setShowAlert] = useState({ message: "", isError: false });

//   //for Add video
//   const [createOpen, setCreateOpen] = useState(false);

//   //----------- function-----------

//   //for search
//   const handleSearch = (e) => {
//     setSearch(document.getElementById("search-by-title").value);
//     // setSearch(" ");
//     //setSearch(e.target.value);
//   };

//   //for Add button
//   const videoAlert = (message, isError = false) => {
//     setShowAlert({ message: message, isError: isError });
//     setTimeout(() => {
//       setShowAlert({ message: "", isError: false });
//     }, 3000);
//   };

//   const handleCreateOpen = () => setCreateOpen(true);
//   const handleCreateClose = () => {
//     result.refetch();
//     setCreateOpen(false);
//   };

//   const result = useQuery(SINGLE_VIDEO, { variables: { id: id } });

//   if (result.loading) {
//     return (
//       <div>
//         <em>Loading.....</em>
//       </div>
//     );
//   }
//   let video = result.data.video_package_by_pk.videos;

//   return (
//     <div>
//       <div className="align">
//         {/* dashboard */}
//         <div>
//           <Breadcrumbs
//             aria-label="breadcrumb"
//             fontWeight="bold"
//             fontSize="1.2rem"
//           >
//             <Link to="/" className="dashboard">
//               Dashboard
//             </Link>
//             <span>Video</span>
//           </Breadcrumbs>
//         </div>
//         {/* search */}
//         <div>
//           <Paper
//             component="form"
//             sx={{
//               p: "2px 4px",
//               display: "flex",
//               alignItems: "center",
//               width: 350,
//             }}
//           >
//             {/* Search Box */}

//             <InputBase
//               id="search-by-title"
//               sx={{ ml: 1, flex: 1 }}
//               placeholder="Search By Video Title"
//               type="search"
//               // value={search}
//               //onChange={handleSearch}
//             />

//             <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//             <IconButton
//               color="warning"
//               id="search-by-title"
//               sx={{ p: "10px" }}
//               aria-label="directions"
//               value={search}
//               onClick={handleSearch}
//             >
//               <DirectionsIcon />
//             </IconButton>
//           </Paper>
//         </div>
//       </div>
//       <div>
//         <Button
//           sx={{ fontWeight: "bold", height: 60, my: 2 }}
//           color="secondary"
//           variant="contained"
//           component="h1"
//           value=""
//           onClick={handleCreateOpen}
//         >
//           Add Video
//         </Button>
//       </div>

//       <div>
//         <Box
//           sx={{
//             display: "flex",
//             flexFlow: "wrap row",
//             "& > :not(style)": {
//               m: 1,
//               width: "100%",
//               minHeight: "25vh",
//             },
//           }}
//         >
//           {Array.isArray(video)
//             ? video.map((row, index) => (
//                 <Card
//                   sx={{
//                     maxWidth: 250,
//                     borderRadius: 5,
//                   }}
//                   key={index}
//                 >
//                   <CardMedia
//                     component="iframe"
//                     alt="video"
//                     image={row.video_url}
//                     title="video"
//                     type="video/mp4"
//                   />

//                   <CardContent>
//                     <Typography>Title: {row.title}</Typography>
//                     <Typography>Duration: {row.duration}</Typography>
//                   </CardContent>
//                   <CardActions>
//                     <Button color="error">Remove</Button>
//                   </CardActions>
//                 </Card>
//               ))
//             : null}
//         </Box>
//       </div>

//       <Modal
//         keepMounted
//         open={createOpen}
//         onClose={handleCreateClose}
//         aria-labelledby="keep-mounted-modal-title"
//         aria-descripedby="keep-mounted-modal-description"
//       >
//         <Box style={style}>
//           <CreateVideo
//             videoAlert={videoAlert}
//             handleClose={handleCreateClose}
//           />
//         </Box>
//       </Modal>
//     </div>
//   );
// };
// export default Video;
