import React  from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';




export default ({ tip, tipClassName, text, onClick}) => (
    <Tooltip title={tip} className={tipClassName}>
        <Button variant="text" color="default" startIcon={<FavoriteIcon />}>{text}</Button>
    </Tooltip>
)
