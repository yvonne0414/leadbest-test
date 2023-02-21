import { tasksApi } from '../service/taskApi';
import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { TaskInputItem } from '../components';
import { useState } from 'react';

const CreateTask = ()=>{
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const [createTask, { isLoading: isCreateTaskLoading, isError }] = tasksApi.useCreateTaskMutation();
  

  const onSubmit = (formData) => {
    setOpen(true);
    createTask([{
      title: formData.title,
      completed: formData.completed,
    }])
  }
  return (
    <>
      <main>
        <section>
          <Typography variant="h4" component="h4" my={4}>
            Create Task
          </Typography>
          <TaskInputItem onSubmit={onSubmit} />
        </section>
      </main> 
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={isError? 'error':'success'} sx={{ width: '100%' }}>
            {isError? 'error':'success'}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}

export default CreateTask;