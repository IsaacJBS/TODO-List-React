import { useState } from "react";
import Lista from './components/Lista'

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  function handleKeyDown(event) {
    if (event.key !== 'Enter') return;

    const newTasks = [...tasks, { id: Math.random(), text: event.target.value, complete: false, display: '' }];

    setTasks(newTasks);
    event.target.value = '';
  }

  function handleDelete(id) {
    const newTasks = tasks.filter(task => task.id !== id);

    setTasks(newTasks);
  }

  function handleComplete(id) {
    const newTasks = [...tasks];
    const taskComplete = newTasks.find(task => task.id === id);
    taskComplete.complete = !taskComplete.complete;

    setTasks(newTasks);
  }

  const tasksRemaining = tasks.filter(task => !task.complete)

  function handleAll() {
    const newTasks = [...tasks]

    newTasks.forEach(task => {
      task.display = ''
    })

    setFilter('all')
    setTasks(newTasks)
  };

  function handleActive() {
    const newTasks = [...tasks]
    newTasks.forEach(task => {
      if (task.complete) {
        task.display = 'hide'
      } else {
        task.display = ''
      }
    })

    setFilter('active')
    setTasks(newTasks)
  }

  function handlecompletes() {
    const newTasks = [...tasks]

    newTasks.forEach(task => {
      if (!task.complete) {
        task.display = 'hide'
      } else {
        task.display = ''
      }
    })

    setFilter('completes')
    setTasks(newTasks)
  }

  function handleDeleteAllComplete() {
    const newTasks = tasks.filter(task => !task.complete)

    setTasks(newTasks)
  }

  return (
    <div className='container'>
      <h1 className='title'>Tarefas</h1>
      <input className='input' type='text' onKeyDown={handleKeyDown} />
      <ul>
        {tasks.map(task => {
          return (
            <Lista key={task.id}
              id={task.id}
              handleDelete={handleDelete}
              handleComplete={handleComplete}
              complete={task.complete}
              displayLi={task.display}>
              {task.text}
            </Lista>
          )
        })}
      </ul>
      <div className='footer'>
        <div>
          <span>{tasksRemaining.length} {' '} {tasksRemaining.length === 1 ? 'Item restante' : 'Itens restantes'}</span>
        </div>
        <div className='active'>
          <button onClick={handleAll} className={filter === 'all' ? 'blue' : ''}>Todas</button>
          <button onClick={handleActive} className={filter === 'active' ? 'blue' : ''}>Ativas</button>
          <button onClick={handlecompletes} className={filter === 'completes' ? 'blue' : ''}>Completas</button>
        </div>
        <div className='clean'>
          <button onClick={handleDeleteAllComplete}>Limpar completas</button>
        </div>
      </div>
    </div>
  );
}

export default App;
