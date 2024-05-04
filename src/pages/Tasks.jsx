// import Spline from '@splinetool/react-spline';
// import Leaderboard from '../components/Leaderboard'

// export default function App() {
//   return (
//     <div style={{ position: 'relative' }}>
//       <Leaderboard/>
//       <Spline scene="https://prod.spline.design/cAB2EgWqWcYhnHVa/scene.splinecode" />
//     </div>
//   );
// }
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import '../App.css'
import background from '../images/background.jpg'
import jungle1 from '../images/jungle1.png'
import jungle2 from '../images/jungle2.png'
import jungle3 from '../images/jungle3.png'
import jungle4 from '../images/jungle4.png'
import jungle5 from '../images/jungle5.png'
import man from '../images/man.png'
import mountains from '../images/mountains.png'
import Textblock from './Textblock.jsx'
import Spline from '@splinetool/react-spline';
import { useState } from 'react'

const Tasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  // State to manage the input value for the new task
  const [task, setTask] = useState('');

  const handleClick = () => {
    console.log('Button was clicked');
    setIsOpen(!isOpen);
  };

   // Function to handle adding a new task
   const handleAddTask = () => {
    console.log('Task Added:', task);
    // Add task to your tasks array or state here (not shown in this snippet)
    setIsOpen(false); // Close the popup after adding the task
  };

  return (
    <Parallax pages={4} style={{ top: '0', left: '0' }}>
        <ParallaxLayer offset={0} speed={0.5}  factor={4} >
        {/* Spline scene */}
        <Spline scene="https://prod.spline.design/TYP3GaZJtYJudnYt/scene.splinecode" />
      </ParallaxLayer>


      <ParallaxLayer offset={1} speed={0.5} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', margin: '10px', padding: '20px' }}>
        <div class="kanban-column">
      <h2 style={{ fontWeight: 'bold'}}>To Do</h2>
      <div class="task-card">
          <input type="checkbox" /> Task 1 - 5 points
      </div>
      <div class="task-card">
          <input type="checkbox" /> Task 2 - 3 points
      </div>
      <button onclick="addTask('ToDo')">Add Task</button>
    </div>
    <div class="kanban-column">
      <h2 style={{ fontWeight: 'bold'}}> In Progress</h2>
      <div class="task-card">
          <input type="checkbox" /> Task 3 - 8 points
      </div>
      <button onclick="addTask('InProgress')">Add Task</button>
    </div>
    <div class="kanban-column">
      <h2 style={{ fontWeight: 'bold'}}>Completed</h2>
      <div class="task-card">
          <input type="checkbox" checked /> Task 4 - 10 points
      </div>
      <div>
      <button onClick={handleClick}>
        {isOpen ? 'Close' : 'Add Task'}
      </button>
      {isOpen && (
        <div style={{ position: 'absolute', top: '20%', left: '40%', padding: '20px', border: '1px solid black', backgroundColor: 'white' }}>
          <input
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={handleAddTask}>Submit Task</button>
        </div>
      )}
    </div>
    </div>
      </ParallaxLayer>

      <ParallaxLayer offset={3} speed={0.5}  factor={1} >
        <h1>Rewards</h1>
      </ParallaxLayer>
    </Parallax>
  )
}

export default Tasks
