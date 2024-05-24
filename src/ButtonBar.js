import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import { useSoftblock } from './SoftblockContext';

export default function IconButtonBar() {


const [isPlaying, setIsPlaying] = React.useState(false);
  const [isStopped, setIsStopped] = React.useState(true);
  const {isSoftblockOn, setIsSoftblockOn} = useSoftblock();

  const handlePlay = () => {
    setIsPlaying(true);
    setIsStopped(false);
    setIsSoftblockOn(true);

  };

  const handlePause = () => {
    setIsPlaying(false);
    setIsSoftblockOn(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setIsStopped(true);
    setIsSoftblockOn(false);
    // Additional stop logic if needed
  };

  return (
    <Stack spacing={2} direction="row">
      <IconButton
        onClick={handlePlay}
        disabled={isPlaying}
        sx={{
          width: 50,
          height: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '16px', // Makes the button round
          border: isPlaying ? '1px solid black' : 'none', // Persistent border when playing
        }}
      >
        <PlayArrowIcon fontSize="large" sx={{ color: 'black' }} />
      </IconButton>
      <IconButton
        onClick={handlePause}
        disabled={!isPlaying}
        sx={{
          width: 50,
          height: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '16px', // Makes the button round
          border: !isPlaying && !isStopped ? '1px solid black' : 'none', // Persistent border when paused
        }}
      >
        <PauseIcon fontSize="large" sx={{ color: 'black' }} />
      </IconButton>
      <IconButton
        onClick={handleStop}
        sx={{
          width: 50,
          height: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '16px', // Makes the button round
          border: isStopped ? '1px solid black' : 'none', // Persistent border when stopped
        }}
      >
        <StopIcon fontSize="large" sx={{ color: 'black' }} />
      </IconButton>
    </Stack>
  );
}
