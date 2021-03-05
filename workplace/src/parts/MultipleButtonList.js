import "./AttendanceTable.css";
import React from "react";
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const MultipleButtonList = (props) => {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}

// const MultipleButtonList = (props) => {
//   return (
//     <Grid container item spacing={3} justify="flex-start" alignItems="center">
//         <Grid item>
//             <ButtonGroup color="primary" aria-label="outlined secondary button group">
//                 <Button
//                   variant={props.vote === '○' && `contained`}
//                   onClick={() => props.onSelectVote('○')}
//                   >○</Button>
//                 <Button
//                   variant={props.vote === '△' && `contained`}
//                   onClick={() => props.onSelectVote('△')}
//                   >△</Button>
//                 <Button
//                   variant={props.vote === '×' && `contained`}
//                   onClick={() => props.onSelectVote('×')}
//                 >×</Button>
//             </ButtonGroup>
//         </Grid>
//     </Grid>
//   );
// };

export default MultipleButtonList;