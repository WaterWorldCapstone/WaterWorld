import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
})

function ExpansionPanelSample(props) {
  const {classes} = props
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Donation ID # {Number.MAX_SAFE_INTEGER} Donor: Hardco Dedentry
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            "A map that does the things": id: whatever location: whatever is
            this actually working?: true
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Donation ID # 000001 Donor: Unic Ode
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>id: yes please location: everywhere moop</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel disabled={props.counter < 10 || props.counter >= 30}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {props.counter < 12
              ? `This panel should activate in approximately ${12 -
                  props.counter}
            seconds from now`
              : `Panel is opened!!`}
            {props.counter > 30 ? `Panel closed forever...` : ''}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {props.counter < 30
              ? `GUESS WHAT IT DID!!!! It'll close off again after about
            ${30 - props.counter} sec and be lost forever...`
              : `Lost forever...`}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

ExpansionPanelSample.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ExpansionPanelSample)
