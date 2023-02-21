import { tasksApi } from '../service/taskApi';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import { TaskListItem, TaskInputItem } from '../components/index'


const TaskList = ()=>{
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { data, isFetching, isSuccess } = tasksApi.useGetTasksQuery('');
  const [deleteTask, { isSuccess: isDeleteTaskSuccess, isLoading: isDeleteTaskLoading }] =
		tasksApi.useDeleteTaskMutation();
	const [updateTask, { isLoading: isUpdateTaskLoading, isSuccess: isUpdateTaskSuccess }] = tasksApi.useUpdateTaskMutation();
  
  
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editInfo, setEditInfo] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [toDelete, setToDelete] = useState("false");

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleConfirmOpen = (_uuid) => {
    setConfirmOpen(!confirmOpen);
    setToDelete(_uuid);
  };
  
  const handleEditOpen = async (_uuid) => {
    setEditOpen(!editOpen);
    let tmp = data.items.find((info)=>{
      return info._uuid === _uuid
    })
    await setEditInfo(tmp);
  };
  
  const onDelete = async ()=> {
    await deleteTask([{_uuid: toDelete}])
    if(!isDeleteTaskLoading){
      setConfirmOpen(false);
      setAlertOpen(true);
      setToDelete("")
    }
  }

  const onUpdate = async (formData) => {
    await updateTask([{
      _uuid: formData._uuid,
      title: formData.title,
      completed: formData.completed, 
    }])
    if(!isUpdateTaskLoading){
      setEditOpen(false);
      setAlertOpen(true);
    }
  }
  return (
    <>
      <main>
        <section>
          <Typography variant="h4" component="h4" my={4}>
            Task List
          </Typography>
          {
            isFetching ?
            <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center' }}>
              <CircularProgress />
            </Box>
            :
            <TaskListItem listData={data?.items} handleEditOpen={handleEditOpen} handleConfirmOpen={handleConfirmOpen} />
          }
        </section>
      </main>
      <Dialog
        fullScreen={fullScreen}
        open={confirmOpen}
        onClose={handleConfirmOpen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Alert"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleConfirmOpen}>
            Disagree
          </Button>
          <Button onClick={onDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen={fullScreen}
        open={editOpen}
        onClose={handleEditOpen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Edit"}
        </DialogTitle>
        <DialogContent>
          {
            isUpdateTaskLoading?
            <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center' }}>
              <CircularProgress />
            </Box>
            :
            <TaskInputItem editInfo={editInfo} onSubmit={onUpdate} />
          }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>{setEditOpen(false)}}>
            cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
          <Alert onClose={handleAlertClose} severity={(isUpdateTaskSuccess || isDeleteTaskSuccess)? 'success' :'error'} sx={{ width: '100%' }}>
            {(isUpdateTaskSuccess || isDeleteTaskSuccess)? 'success' : 'error'}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}

export default TaskList;