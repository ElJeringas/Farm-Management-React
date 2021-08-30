import React, { useState , Component} from 'react';
import './createAnimal.css';
import { Typography } from '@material-ui/core';
import InputAnimal from './InputAnimal';
import { useHistory } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { Card,CardActions,Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Save } from '@material-ui/icons';
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core';


import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

const useStyles = makeStyles((theme) => ({

    root: {
        minWidth:"500px",
        margin:"1em",
        boxSizing:"border-box",
        maxWidth: 800,
        minHeight:500,
        maxHeight:800,
        backgroundColor:"#FFF8DC",
    },

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    
  }));

const CssTextField = withStyles({
    input: {
    color: '#fff',
    },
    root: {
        margin: '10px',
      '& label.Mui-focused': {
        color: '#f9aa33',
      },
      
      '&::placeholder': {
        color: '#fff',
      },
  
      '& .MuiInput-underline:after': {
        borderBottomColor: '#f9aa33',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#A9A9A9', 
        },
        '&:hover fieldset': {
          borderColor: '#f9aa33',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#f9aa33',
        },
      },
    },
  })(TextField);



  const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter();
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited();
        }
      },
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {children}
      </animated.div>
    );
  });
  
  Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
  };

const Animal = () => {
    const classes = useStyles();

    const [name, setName] = useState('');
    const[birth_date,setBirth] = useState('');
    const history=useHistory();
    const[gender, setGender] = useState('');
    const[weight, setWeight] = useState('');
    const [breed, setBreed] = useState('');
    const [group, setGroup] = useState('');
    const [open, setOpen] = React.useState(false);
  
   /*  const handleOpen = () => {
      setOpen(true);
    }; */
  
    const handleClose = () => {
      setOpen(false);
    };
    const Back = () =>{
        history.push('/home')
    }

    
        const [picture,setPicture]=useState();
        
        function fileSelected(event){
            const file = event.target.files[0];
            setPicture(event.target.files[0]);
            console.log(picture);
        }

    function handleChange(valid, value){
        if(valid === 'name'){
            setName(value)
            
        }

        if(valid === 'birth_date'){
            setBirth(value);
        }

/*         if(valid === 'picture'){
            
            setPicture(value.target.files[0]);
        } */
        if(valid === 'gender'){
            setGender(value);
        }
/*         if(valid === 'weight'){
            setWeight(value);
        }
        if (valid === 'breed'){
            setBreed(value)
        }
        if (valid === 'group'){
            setGroup(value)
        } */
    }



    function handleSubmit(){
        /* let account = {name,birth_date,picture,gender,weight,breed,group}; */
            let token = localStorage.getItem('token');
/*         let token = "109e218fcb947f52dd5bda59aa54b811d7b47925";
 */        console.log(token);
        console.log(picture);
        let account = {name,birth_date,gender};
        let formData = new FormData();
        formData.append('name',name)
        formData.append('birth_date',birth_date)
        formData.append('picture',picture)
        formData.append('gender',gender)


        console.log(formData.getAll('picture'));


        const api = 'https://farm-management.xyz/lands/3/animals/'; 


        axios.post(api ,formData,{ headers: {"Content-type": "multipart/form-data'", "Authorization" : `Token ${token}`} })
        .then( ( response ) => {
            console.log( response.status )
            console.log(response.data);
            if(response.status == 201){
                console.log("tas bien");
                console.log(response.data);
                setOpen(true);
            }else{
                console.log('tas mal');
            }
        } )
        .catch( (error) =>{
            // handle error
            console.log(error);
        })



    }
    const StyledButton = withStyles({
        root: {
          background: 'linear-gradient(45deg, #23395d 30%, #1c2e4a 90%)',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 48,
          width:'100px',
          alignItems:'center',
          marginTop: '10px',
          padding: '0 20px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
        label: {
          textTransform: 'capitalize',
        },
    })(Button);

   
        return (
            <div>
                <div className='animal-container'>
                    <div className='animal-content'>
                        <Card className={classes.root} >
                        <Typography align='center' variant='h5'>
                            Crear animal
                        </Typography>
                        <InputAnimal
                            attribute={{
                                id:'name',
                                label:'Animal name',
                                name:'Animal name',
                                type: 'text',
                                placeholder: 'Animal name'
                            }}
                            handleChange={handleChange}    

                        />
                        <InputAnimal
                            attribute={{
                                id:'birth_date',
                                label:'Birth date',
                                name:'birth_date',
                                type: 'date',
                                
                            }}
                            handleChange={handleChange} 
                        />
                        <CssTextField variant={"outlined"} InputLabelProps={{ shrink: true }} type='file' id='files' name='Picture' label='Picture' onChange={fileSelected}/>
                        <InputAnimal
                            attribute={{
                                id:'gender',
                                label:'Animal gender',
                                name:'gender',
                                type: 'text',
                                placeholder: 'Animal gender'
                            }}
                            handleChange={handleChange} 
                        /> 
                        <CardActions>                                 
                        <StyledButton startIcon={<Save/>} onClick={handleSubmit}>
                            Save
                        </StyledButton>
                        <StyledButton variant= "outlined" startIcon={<ArrowBackIcon/>} onClick={Back}>
                            Volver
                        </StyledButton>
                        </CardActions>
                        </Card>


                    </div>
                </div>

                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h2 id="spring-modal-title">Animal creado</h2>
                            <p id="spring-modal-description">su animal: {name}, ha sido creado en la finca nro </p>  {/* falta agregar id finca */}
                        </div> 
                    </Fade>
                </Modal>
            </div>
        )
    
}
export default  Animal;