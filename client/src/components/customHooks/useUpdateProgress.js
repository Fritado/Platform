// import { useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const useUpdateProgress = (lastVisited, stepsCompleted) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const updatePageProgress = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         console.error('Token not found');
//         return;
//       }

//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         console.log('Updating progress with:', { lastVisited, stepsCompleted });
//         await axios.post('/api/auth/update-progress', { lastVisited, stepsCompleted }, config);

//         // Redirect based on progress
//         if (!stepsCompleted) {
//           console.log('Navigating to:', lastVisited);
//           navigate(lastVisited); // Navigate to lastVisited path
//         }
//       } catch (error) {
//         console.error('Error updating progress:', error);
//       }
//     };

//     // Add event listener for beforeunload
//     const handleBeforeUnload = (event) => {
//       console.log('Before unload event triggered');
//       event.preventDefault(); // Prevent default to show the confirmation dialog
//       updatePageProgress();
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     // Clean up function to remove event listener
//     return () => {
//       console.log('Cleaning up useUpdateProgress');
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, [lastVisited, stepsCompleted, navigate]);
// };

// export default useUpdateProgress;
