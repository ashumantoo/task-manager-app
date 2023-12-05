import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { ITaskInput } from '../utils/task-types';
import { taskApi } from '../utils/axios';

interface IDialogProps {
  open: boolean;
  taskId: string;
  handleClose: () => void;
  handleSubmit: (task: ITaskInput, taskId?: string) => void;
}

export const TaskDialog: FC<IDialogProps> = ({ open, taskId, handleClose, handleSubmit }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "TODO"
  })
  const [titleErrorState, setTitleErrorState] = useState(false);
  const [titleErrorHelperText, setTitleErrorHelperText] = useState("");

  useEffect(() => {
    if (taskId) {
      const fetchTask = async (taskId: string) => {
        const response = await taskApi.getTask(taskId);
        if (response && response.data.success) {
          const { task } = response.data;
          setTask({
            ...task,
            title: task.title,
            description: task.description,
            status: task.status
          })
        }
      }
      fetchTask(taskId)
    }
  }, [taskId]);

  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant='body1' style={{fontWeight:"bold"}}>
            Add New Task
          </Typography>
          <span data-testid='closeicon' style={{ cursor: 'pointer' }} onClick={handleClose}><Close /></span>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div>
            <TextField
              label="Title"
              id="outlined-size-small"
              placeholder='Enter title'
              size="small"
              fullWidth
              type='text'
              value={task.title}
              onChange={(event) => {
                setTask({
                  ...task,
                  title: event.target.value
                });
                setTitleErrorState(false)
                setTitleErrorHelperText("")
              }}
              onBlur={(event) => {
                if (!event.target.value) {
                  setTitleErrorState(true)
                  setTitleErrorHelperText("Title is required")
                }
              }}
              required
              error={titleErrorState}
              helperText={titleErrorHelperText}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <TextField
              id="filled-multiline-flexible"
              label="Description"
              placeholder='Enter description'
              multiline
              rows={4}
              size='small'
              fullWidth
              value={task.description}
              onChange={(event) => {
                setTask({
                  ...task,
                  description: event.target.value
                })
              }}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <FormControl
              size='small'
              fullWidth
              required
            >
              <InputLabel id="demo-simple-select-helper-label">status</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Status"
                data-testid="createtaskselect"
                defaultValue='TODO'
                value={task.status}
                onChange={(event) => {
                  setTask({
                    ...task,
                    status: event.target.value
                  });
                }}
                required
              >
                <MenuItem value={"TODO"}>To do</MenuItem>
                <MenuItem value={"IN_PROGRESS"}>In Progress</MenuItem>
                <MenuItem value={"DONE"}>Done</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
            <div></div>
            <Button data-testid='tasksubmit' variant='contained' onClick={() => {
              if (!task.title) {
                setTitleErrorState(true)
                setTitleErrorHelperText("Title is required")
              } else {
                handleSubmit(task, taskId);
              }
            }}>
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}