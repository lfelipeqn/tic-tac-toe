import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React, {useState, useEffect, useRef} from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';


const App = () => {

  const game = useRef(null);

  const [data, setData] = useState(['','','','','','','','',''])
  const [turno, setTurno] = useState('X');
  const [reset, setReset] = useState(false);
  const [iswin, setIswin] = useState(null);
  const [games, setGames] = useState({X:0,O:0,tie:0})

  const handleClick = (event, key)=>{
    if((data[key]==='' || data[key]==='\u00A0') && iswin===null){
    data[key] = turno;
    event.target.innerText = turno
    winner()
    turno==='X' ? setTurno('O') : setTurno('X');
    }
  }

  const winner = () =>{
    let win = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [6,4,2]
    ]
    
    for(let k of win){
      if(data[k[0]]==="X" && data[k[1]]==="X" && data[k[2]]==="X"){
        setIswin('X')
        let newgames = {...games}
        newgames.X+=1;
        setGames(games => ({
          ...games,
          ...newgames
        }))
      }
      
      if (data[k[0]]==="O" && data[k[1]]==="O" && data[k[2]]==="O"){
        setIswin('O')
        let newgames = {...games}
        newgames.O+=1;
        setGames(games => ({
          ...games,
          ...newgames
        }))
      }
       
    }
    
    if(!data.includes('') && iswin===null){ 
      setIswin('tie'); 
      let newgames = {...games}
      newgames.tie+=1;
      setGames(games => ({
        ...games,
        ...newgames
      }))}
    
  }

  const reiniciar = (inicio)=>{
    for(let element of game.current.children) {
      element.children[0].innerText='\u00A0'  
    };
    setReset(inicio)
    if(inicio) setGames({X:0,O:0,tie:0});
    setIswin(null)
  }
  
  useEffect(()=>{
    setData(['','','','','','','','','']);
    setTurno('X')
    console.log(games);
  },[reset,iswin,games])

  return (
    <Box componet="span" sx={{
      border: 'solid 2px orange',
      padding:'10px'
    }}>
    <Grid container spacing={0.5} justifyContent="center"
  alignItems="center">
      <Grid item xs={12}>
      <Chip style={{backgroundColor:'black', color:'white'}} label={"X:"+games.X} size="medium"/>
      <Chip style={{backgroundColor:'black', color:'white'}} label={"O:"+games.O} size="medium"/>
      <Chip style={{backgroundColor:'black', color:'white'}} label={"Empate:"+games.tie} size="medium" />
      <br/><br/>
        {(iswin === "X" || iswin === "O") ? 
          <Alert icon={false} variant="filled" severity="success">El Ganador es: <span style={{fontWeight:'bold'}}>{iswin}</span></Alert> : 
          <Alert icon={false} variant="filled" severity="warning">Siguiente Turno: <span style={{fontWeight:'bold'}}>{turno}</span></Alert>
        }
        <br />
      </Grid>
      <Grid item xs={12}>
      <Grid ref={game} container spacing={2}>
    {data.map((v, k)=>{
      return (
        <Grid item xs={4} key={k}>
          <Button key={k} variant="outlined" size="large" fullWidth={true} color="warning" onClick={(e)=>handleClick(e, k)}>&nbsp;</Button>
        </Grid>
      )
    })}
    </Grid>
      </Grid>
      <Grid item xs={6}>
        <br />
        <Button variant="contained" size="small" fullWidth={true} color="success" onClick={()=>{reiniciar(false)}} >OTRA PARTIDA</Button>
      </Grid>
      <Grid item xs={6}>
        <br />
        <Button variant="contained" size="small" fullWidth={true} color="error" onClick={()=>{reiniciar(true)}}>REINICIAR JUEGO</Button>
      </Grid>
    </Grid>
    </Box>
  );
}

export default App;
