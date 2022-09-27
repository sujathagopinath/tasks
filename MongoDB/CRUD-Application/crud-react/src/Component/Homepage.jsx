import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    component: {
        margin: 50,
        '& > *': {
            marginTop: 50
        }
    },
    image: {
        width: '50%',
        height: '50%'
    }
})

const Homepage = () => {
    const classes = useStyles();
    return (
        <Box className={classes.component}>
             <img src="https://i.morioh.com/2019/12/11/3d7de331fd04.jpg"></img>
        </Box>
    )
}

export default Homepage;