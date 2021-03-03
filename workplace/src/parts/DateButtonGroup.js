import "./AttendanceTable.css";
import React from "react";
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';


const DateButtonGroup = (props) => {
  return (
    <Grid container item spacing={3} justify="flex-start" alignItems="center">
        <Grid item>
            {props.date}
        </Grid>
        <Grid item>
            <ButtonGroup color="primary" aria-label="outlined secondary button group">
                <Button
                  variant={props.vote === '○' && `contained`}
                  onClick={() => props.onSelectVote('○')}
                  >○</Button>
                <Button
                  variant={props.vote === '△' && `contained`}
                  onClick={() => props.onSelectVote('△')}
                  >△</Button>
                <Button
                  variant={props.vote === '×' && `contained`}
                  onClick={() => props.onSelectVote('×')}
                >×</Button>
            </ButtonGroup>
        </Grid>
    </Grid>
  );
};

export default DateButtonGroup;