// import { Avatar, Typography } from '@mui/material';
// import theme from '../../../../../themes/global.theme';
// import { useTranslation } from 'react-i18next';
// import { Handle, Position } from '@xyflow/react';

// // Custom Node Component
// const CustomNodeCard = ({
//   data,
// }: {
//   data: {
//     label: string;
//     index: number;
//     isFinalNode: boolean;
//     isInitialNode: boolean;
//     photo?: string;
//   };
// }): JSX.Element => {
//   const { t } = useTranslation();

//   return (
//     <div
//       style={{
//         display: 'flex', // Ensure width adjusts to content
//         flexDirection: 'column',
//         gap: '8px',
//         alignItems: 'flex-start',
//         padding: '8px 12px',
//         borderRadius: '12px',
//         boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
//         maxWidth: '400px', // Optional: constrain max width if needed
//         backgroundColor: theme.palette.default.light,
//       }}
//     >
//       {/* Handle for right-side (source) */}
//       {!data.isFinalNode && (
//         <Handle
//           type="source"
//           position={Position.Right}
//           id={`e-right-${data.index}`}
//           style={{
//             background: theme.palette.default.dark,
//             width: '10px',
//             height: '10px',
//             borderRadius: '50%',
//           }}
//         />
//       )}
//       {/* Handle for left-side (target) */}
//       {!data.isInitialNode && (
//         <Handle
//           type="target"
//           position={Position.Left}
//           id={`e-left-${data.index}`}
//           style={{
//             background: theme.palette.default.dark,
//             width: '10px',
//             height: '10px',
//             borderRadius: '50%',
//           }}
//         />
//       )}
//       <div
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'flex-start',
//           padding: '4px',
//           gap: '4px',
//           backgroundColor:
//             theme.palette.customBackground.default,
//           borderRadius: '20px',
//         }}
//       >
//         <Avatar
//           sx={{
//             width: '28px',
//             height: '28px',
//             backgroundColor: theme.palette.default.primary,
//             fontSize: '18px',
//             fontFamily: 'Comfortaa',
//             fontWeight: 700,
//           }}
//         >
//           {data.index + 1}
//         </Avatar>
//         <Typography
//           fontSize={18}
//           fontFamily={'Comfortaa'}
//           fontWeight={700}
//         >
//           {t('step')}
//         </Typography>
//       </div>
//       {data.photo && (
//         <img
//           src={data.photo}
//           style={{
//             height: '200px',
//             width: '100%',
//             objectFit: 'cover',
//             objectPosition: 'center',
//             borderRadius: '20px',
//           }}
//         />
//       )}
//       <Typography
//         fontSize={14}
//         fontFamily={'Comfortaa'}
//         sx={{
//           wordWrap: 'break-word',
//           padding: '8px',
//           backgroundColor:
//             theme.palette.customBackground.default,
//           borderRadius: '20px',
//         }}
//       >
//         {data.label}
//       </Typography>
//     </div>
//   );
// };

// export default CustomNodeCard;
