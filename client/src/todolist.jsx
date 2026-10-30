
import { useEffect, useRef } from "react";
import Item from "./todoitem";

export default function List({
  todos,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  onLoadMore,
  hasMore,
  loading,
  onLoadPrevious,
  hasPrevious,
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    const handleWheel = (event) => {
      if (loading) return;

      if (event.deltaY > 0 && hasMore) {
        onLoadMore();
      } 
      else if (event.deltaY < 0 && hasPrevious) {
        onLoadPrevious();
      }
    };

    section.addEventListener("wheel", handleWheel);

    return () => {
      section.removeEventListener("wheel", handleWheel);
    };
  }, [loading, hasMore, hasPrevious, onLoadMore, onLoadPrevious]);

  if (todos.length === 0 && !loading) {
    return <p>No tasks available</p>;
  }

  return (
    <section ref={sectionRef} className="bg-white">
      <h3 className="text-2xl font-bold mb-3">My Tasks</h3>

      <p>Scroll down for next tasks or up for previous tasks</p>

      <ul className="max-h-80 overflow-y-auto overflow-x-hidden">
        {todos.map((todo) => (
          <Item
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </ul>

      {loading && <p>Loading tasks...</p>}
    </section>
  );
}
