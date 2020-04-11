import React  from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import TranslateIcon from '@material-ui/icons/Translate';
import Button from '@material-ui/core/Button';




export default ({ tip, tipClassName, text, onClick}) => (
    <Tooltip title={tip} className={tipClassName}>
        <Button onClick={onClick} variant="text" color="inherit" startIcon={<TranslateIcon />}>{text}</Button>
    </Tooltip>
)
