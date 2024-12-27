import './task.css';
import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { taskApi } from '../utils/axios';
import { getTaskColorStyles, getTaskStatusValues, ITask, ITaskInput } from '../utils/task-types';
import { TaskDialog } from './task-dialog';

export const Task: FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filteredTask, setFilteredTask] = useState<ITask[]>([]);
  const [seletedFilter, setSelectedfilter] = useState('ALL');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedfilter(event.target.value);
  };

  const mutateTaskHandler = async (taskInput: ITaskInput, taskId?: string) => {
    try {
      if (taskId) {
        const response = await taskApi.updateTask(taskId, taskInput);
        if (response && response.data.success) {
          const _task = response.data.data;
          const matchedTaskIndex = filteredTask.findIndex((task) => task._id === _task._id);
          if (matchedTaskIndex >= 0) {
            const _filteredTasks = [...filteredTask];
            _filteredTasks[matchedTaskIndex] = _task;
            setFilteredTask(_filteredTasks);
          }
          setOpenDialog(false)
        }
      } else {
        const response = await taskApi.createTask(taskInput);
        if (response && response.data.success) {
          setFilteredTask([
            response.data.data,
            ...filteredTask
          ]);
          setOpenDialog(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const completeTask = async (task: ITask) => {
    try {
      const response = await taskApi.updateTask(task._id, {
        title: task.title,
        description: task.description,
        status: "DONE"
      });
      if (response && response.data.success) {
        const _task = response.data.data;
        const matchedTaskIndex = filteredTask.findIndex((task) => task._id === _task._id);
        if (matchedTaskIndex >= 0) {
          const _updatedFilteredTasks = [...filteredTask];
          _updatedFilteredTasks[matchedTaskIndex] = response.data.data;
          setFilteredTask(_updatedFilteredTasks);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      const response = await taskApi.deleteTask(taskId);
      if (response && response.data.success) {
        const _filteredTasks = filteredTask.filter((task) => task._id !== taskId);
        setFilteredTask(_filteredTasks);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (seletedFilter === 'ALL') {
      setFilteredTask(tasks);
    } else {
      const copyTask = [...tasks];
      const filteredTask = copyTask.filter((item) => item.status === seletedFilter);
      setFilteredTask(filteredTask);
    }
  }, [seletedFilter]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await taskApi.getTasks();
      if (response.data.success) {
        setTasks(response.data.data);
        setFilteredTask(response.data.data);
      }
    }
    fetchTasks();
  }, []);

  return (
    <div>
      <h1 className="heading">
        Task Manager App
      </h1>
      <div className='task_container'>
        <Button variant='contained' onClick={() => setOpenDialog(true)}>Add Task</Button>
        <div className='filter' data-testid='filterByStatus'>
          <FormControl sx={{ m: 1, minWidth: 160 }} size='small'>
            <InputLabel id="demo-simple-select-helper-label">status</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={seletedFilter}
              label="Filter"
              onChange={handleChange}
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value={"TODO"}>Not Started</MenuItem>
              <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
              <MenuItem value={"DONE"}>Completed</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className='task_list_container' data-testid='taskTable'>
        {filteredTask.length > 0 ? filteredTask.map((task) => {
          const { backgroundColor, color } = getTaskColorStyles(task.status);
          return (
            <Grid container spacing={2} key={task._id} style={{ backgroundColor: "#fff", width: '99%', margin: '10px auto' }}>
              <Grid item xs={8} style={{ paddingLeft: 0, paddingTop: 0 }}>
                <div style={{ display: 'flex' }}>
                  <Checkbox
                    title={task.status === 'DONE' ? 'Task is completed' : ""}
                    checked={task.status === 'DONE' ? true : false}
                    color='success'
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    onChange={() => {
                      if (task.status !== 'DONE') {
                        completeTask(task);
                      }
                    }}
                  />
                  <p>{task.title}</p>
                </div>
              </Grid>
              <Grid item xs={2} style={{ paddingLeft: 0, paddingTop: 0 }}>
                <div style={{ marginTop: 16 }}>
                  <span style={{
                    backgroundColor: backgroundColor,
                    color: color,
                    padding: 4,
                    borderRadius: 4
                  }}>{getTaskStatusValues(task.status)}</span>
                </div>
              </Grid>
              <Grid item xs={2} style={{ paddingLeft: 0, paddingTop: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: 6 }}>
                  <span
                    className='icon'
                    onClick={() => deleteTask(task._id)}
                  >
                    <DeleteIcon color='error' />
                  </span>
                  <span
                    className='icon'
                    title={task.status === 'DONE' ? 'Task is completed' : ""}
                    onClick={() => {
                      setOpenDialog(true);
                      setSelectedTaskId(task._id)
                    }}>
                    <EditIcon />
                  </span>
                </div>
              </Grid>
            </Grid>
          )
        }) : (
          <div style={{ textAlign: "center" }}>
            <p>No task found</p>
          </div>
        )}
      </div>
      {openDialog &&
        <TaskDialog
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          handleSubmit={mutateTaskHandler}
          taskId={selectedTaskId}
        />}
    </div>
  )
}