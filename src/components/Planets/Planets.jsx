/* eslint-disable no-debugger */
import React from 'react';
import { useStyles } from './styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PropTypes } from 'prop-types';

export default function Planets({ data }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {data &&
        data.map(planet => (
          <Accordion
            key={planet.name}
            expanded={expanded === planet.name}
            onChange={handleChange(planet.name)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>{planet.name}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Typography variant="h4">{`Name: ${planet.name}`}</Typography>
              <Typography>{`Diameter: ${planet.diameter}`}</Typography>
              {planet.population !== 'unknown' ? (
                <Typography>{`Population: ${planet.population}`}</Typography>
              ) : null}
              <Typography>{`Orbital period: ${planet.orbital_period}`}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
}

Planets.propTypes = {
  data: PropTypes.array,
};
