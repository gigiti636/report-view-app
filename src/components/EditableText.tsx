import { memo, SyntheticEvent, useState } from 'react';
import { IconButton, Input, lighten, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { darken } from '@mui/material/styles';

interface EditableTextProps {
  text: string;
  onSave: (_text: string) => void;
}

const EditableText = ({ text, onSave }: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSaveClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    onSave(editText);
    setIsEditing(false);
  };

  const handleEditClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSave(editText);
      setIsEditing(false);
    }
  };

  return isEditing ? (
    <Input
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      // @ts-ignore
      onKeyDown={handleKeyPress}
      autoFocus
      fullWidth
      sx={{
        bgcolor: (theme) => lighten(theme.palette.background.paper, 0.07),
        pl: 2,
        pr: 1,
        py: 1 / 2,
        borderRadius: '5px',
        display: 'flex',
        width: 'unset',
      }}
      endAdornment={
        <IconButton onClick={handleSaveClick} edge="end" sx={{ color: 'text.secondary' }}>
          <SaveIcon color={'inherit'} />
        </IconButton>
      }
    />
  ) : (
    <Typography
      component="div"
      display="flex"
      alignItems={'left'}
      gap={1}
      onClick={handleEditClick}
      sx={{
        bgcolor: (theme) =>
          darken(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.28 : 0.09),
        pl: 2,
        pr: 1,
        py: 1 / 2,
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      {text}
      <EditIcon />
    </Typography>
  );
};

export default memo(EditableText);
