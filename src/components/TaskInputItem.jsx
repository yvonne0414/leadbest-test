import { styled, useTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const InputItemWraper = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between'
}));

export default function TaskInputItem(props) {
  const { editInfo, onSubmit } = props;
  const [title, setTitle] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  useEffect(()=>{
    if(editInfo){
      setTitle(editInfo.title);
      setIsChecked(editInfo.completed);
    }
  },[])

  const handleSubmit = () => {
    // title 不能為空
    if(!title.trim()){
      return
    }
    const formData = {
      title: title.trimStart().trimEnd(),
      completed: isChecked,
      _uuid: editInfo?._uuid
    }
    onSubmit(formData);
    setTitle('');
    setIsChecked(false);
  };

  
  return (
    <InputItemWraper>
      <Checkbox checked={isChecked} onChange={()=>{setIsChecked(!isChecked)}}/>
      <TextField 
        id="outlined-basic"
        label="Title"
        fullWidth
        variant="outlined"
        sx={{ mx: 1.5 }}
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <Button variant="contained" onClick={handleSubmit}>{editInfo? 'update' : 'add'}</Button>
    </InputItemWraper>
  );
}