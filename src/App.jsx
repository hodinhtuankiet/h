/* eslint-disable no-console */
import './App.css'
import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import HomeIcon from '@mui/icons-material/Home'
import { pink } from '@mui/material/colors'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
// import select mode
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//Icon 
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
function ModeSelect() {
    const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    // setAge(event.target.value);
    setMode(event.target.value)
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-dark-light">Mode</InputLabel>
      <Select
        labelId="demo-select-dark-light"
        id="demo-select-dark-light"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value='light'> 
        <div style={{ display:'flex', alignItem: 'center', gap:'6px' }}>
          <LightModeIcon fontSize='small'/>  Light
          </div> 
        </MenuItem>

        <MenuItem value='dark'>
          <div style={{ display:'flex', alignItem: 'center',gap:'6px' }}>
          <NightsStayIcon fontSize='small'/>  Dark
          </div> </MenuItem>

        <MenuItem value='system'>
          <div style={{ display:'flex', alignItem: 'center',gap:'6px' }}>
          <SettingsSuggestIcon fontSize='small'/>  System
          </div> </MenuItem>
      </Select>
    </FormControl>
  );
}

function ModeToggle() {
  // Hook support for store local storage 
  const { mode, setMode } = useColorScheme()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');
  console.log('prefersDarkMode' , prefersDarkMode)
  console.log('prefersLightMode' ,prefersLightMode)
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}

function App() {
  return (
    <>
      <ModeSelect/>
      <hr />
      {/* <ModeToggle/> */}
      <Typography color='text.secondary'>Hello Admin</Typography>
      <div>tuankiet</div>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <br />

      <AccessAlarmIcon/>
      <ThreeDRotation/>

      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[500] }} />
    </>
  )
}

export default App
