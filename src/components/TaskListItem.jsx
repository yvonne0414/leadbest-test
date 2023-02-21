import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TaskListItem(props) {
  const {listData,handleEditOpen, handleConfirmOpen} = props;


  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem
            disablePadding
          >
        <ListItemButton dense>
          <ListItemIcon>
            
          </ListItemIcon>
          <ListItemText  primary={'Title'} />
        </ListItemButton>
      </ListItem>

      {listData?.map((value) => {
        const labelId = `checkbox-list-label-${value._uuid}`;

        return (
          <ListItem
            key={value._uuid}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" sx={{
                  mx: 0.5,
                }} onClick={()=>{handleEditOpen(value._uuid)}}>
                  <EditIcon  />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={()=>{handleConfirmOpen(value._uuid)}}>
                  <DeleteIcon  />
                </IconButton>
              </>
            }
            disablePadding
            sx={{maxWidth: '780px'}}
          >
            <ListItemButton role={undefined} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={value.completed}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  disabled
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.title} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}