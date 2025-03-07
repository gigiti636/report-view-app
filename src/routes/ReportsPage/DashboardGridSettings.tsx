import { Box, FormControl, InputLabel, MenuItem, Select, Switch, Typography } from '@mui/material';
import { useState } from 'react';

interface GridSettingsProps {
  onUpdateSettings: (_settings: {
    isDraggable: boolean;
    isResizable: boolean;
    compactType: 'vertical' | 'horizontal' | null;
  }) => void;
}

export const DashboardGridSettings = ({ onUpdateSettings }: GridSettingsProps) => {
  const [isDraggable, setIsDraggable] = useState(true);
  const [isResizable, setIsResizable] = useState(true);
  const [compactType, setCompactType] = useState<'vertical' | 'horizontal' | null>('vertical');

  const handleToggleDraggable = () => {
    setIsDraggable((prev) => {
      const newState = !prev;
      onUpdateSettings({ isDraggable: newState, isResizable, compactType });
      return newState;
    });
  };

  const handleToggleResizable = () => {
    setIsResizable((prev) => {
      const newState = !prev;
      onUpdateSettings({ isDraggable, isResizable: newState, compactType });
      return newState;
    });
  };

  const handleChangeCompactType = (event: any) => {
    const newCompactType = event.target.value as 'vertical' | 'horizontal' | null;
    setCompactType(newCompactType);
    onUpdateSettings({ isDraggable, isResizable, compactType: newCompactType });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Dashboard Grid Settings
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography>Enable Dragging</Typography>
        <Switch checked={isDraggable} onChange={handleToggleDraggable} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography>Enable Resizing</Typography>
        <Switch checked={isResizable} onChange={handleToggleResizable} />
      </Box>

      <FormControl fullWidth>
        <InputLabel>Compact Type</InputLabel>
        <Select value={compactType} onChange={handleChangeCompactType}>
          <MenuItem value={'vertical'}>Vertical</MenuItem>
          <MenuItem value={'horizontal'}>Horizontal</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
