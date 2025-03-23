// import {
//   applyNodeChanges,
//   Controls,
//   Edge,
//   Node,
//   ReactFlow,
// } from '@xyflow/react';
// import CustomNodeCard from '../prep-card';
// import { PreparationStep } from '../../../../../utils/types/Preparation';
// import { useCallback, useState } from 'react';
// import theme from '../../../../../themes/global.theme';

// type PrepStepContainerProps = {
//   steps: PreparationStep[];
// };

// const PrepStepContainer: React.FC<
//   PrepStepContainerProps
// > = ({ steps }) => {
//   const randomX = () => Math.random() * (1620 - 200) + 100; // Random X within padding limits
//   const stepGap = 100; // Vertical gap between nodes

//   // Nodes array with "type" set to use custom component
//   const initialNodes: Node[] = steps.map((step, index) => ({
//     id: `node-${index}`, // Unique ID for each node
//     position: {
//       x: randomX(),
//       y: Math.min(index * stepGap, 800 - 100),
//     },
//     data: {
//       label: step.description,
//       index,
//       isFinalNode: index === steps.length - 1,
//       isInitialNode: index === 0,
//       photo: step.photo,
//     },
//     type: 'customNode', // Specify custom node type
//   }));

//   const edges: Edge[] = steps.slice(1).map((_, index) => ({
//     id: `edge-${index}`,
//     source: `node-${index}`,
//     target: `node-${index + 1}`,
//     sourceHandle: `e-right-${index}`,
//     type: 'smoothstep',
//     animated: true,
//     style: {
//       stroke: theme.palette.default.dark,
//       strokeWidth: 3,
//       strokeDasharray: '8, 8',
//     },
//   }));
//   const [nodes, setNodes] = useState(initialNodes);

//   const onNodesChange = useCallback(
//     changes =>
//       setNodes(nds => applyNodeChanges(changes, nds)),
//     [setNodes]
//   );

//   return (
//     <div style={{ height: '100%', width: '100%' }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         nodeTypes={{ customNode: CustomNodeCard }} // Map custom node type
//         style={{
//           borderRadius: '20px',
//           backgroundColor:
//             theme.palette.background?.default,
//         }}
//       >
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// };

// export default PrepStepContainer;
