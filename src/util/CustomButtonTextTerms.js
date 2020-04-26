import React  from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import SubjectIcon from '@material-ui/icons/Subject';
import Button from '@material-ui/core/Button';




export default ({ tip, tipClassName, text, onClick}) => (
    <Tooltip title={tip} className={tipClassName}>
        <Button variant="text" color="default" startIcon={<SubjectIcon />}>{text}</Button>
    </Tooltip>
)
