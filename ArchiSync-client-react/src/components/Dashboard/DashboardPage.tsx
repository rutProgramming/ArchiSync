// import React from 'react';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// // import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// const demoProjects = ['Project A', 'Project B', 'Project C'];

// export default function DashboardPage() {
//   const [projects, setProjects] = React.useState(demoProjects);

//   const onDragEnd = (result: import('react-beautiful-dnd').DropResult) => {
//     if (!result.destination) return;
//     const items = Array.from(projects);
//     const [moved] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, moved);
//     setProjects(items);
//   };

//   return (
//     <div className="p-6 bg-background text-text min-h-screen">
//       <h2 className="text-3xl mb-4">Projects</h2>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="projects">
//           {(provided) => (
//             <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
//               {projects.map((proj, idx) => (
//                 <Draggable key={proj} draggableId={proj} index={idx}>
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className="p-4 bg-background rounded shadow hover:bg-primary transition"
//                     >
//                       {proj}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// }


import React from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const demoProjects = ['Project A', 'Project B', 'Project C'];

function SortableItem({ id }: { id: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-4 bg-background rounded shadow hover:bg-primary transition"
    >
      {id}
    </div>
  );
}

export default function DashboardPage() {
  const [projects, setProjects] = React.useState(demoProjects);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.indexOf(active.id);
    const newIndex = projects.indexOf(over.id);
    setProjects((items) => arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div className="p-6 bg-background text-text min-h-screen">
      <h2 className="text-3xl mb-4">Projects</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={projects}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {projects.map((project) => (
              <SortableItem key={project} id={project} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
