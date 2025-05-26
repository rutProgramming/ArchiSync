import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const demoProjects = ['Project A', 'Project B', 'Project C'];

export default function DashboardPage() {
  const [projects, setProjects] = React.useState(demoProjects);

  const onDragEnd = (result: import('react-beautiful-dnd').DropResult) => {
    if (!result.destination) return;
    const items = Array.from(projects);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setProjects(items);
  };

  return (
    <div className="p-6 bg-background text-text min-h-screen">
      <h2 className="text-3xl mb-4">Projects</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {projects.map((proj, idx) => (
                <Draggable key={proj} draggableId={proj} index={idx}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 bg-background rounded shadow hover:bg-primary transition"
                    >
                      {proj}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
