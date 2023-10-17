import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeLanguage, selectCurrentLanguage, selectLanguages } from 'app/store/i18nSlice';

function LanguageSwitcher(props) {
  const currentLanguage = useSelector(selectCurrentLanguage);
  const languages = useSelector(selectLanguages);
  const [menu, setMenu] = useState(null);
  const dispatch = useDispatch();

  const langMenuClick = (event) => {
    setMenu(event.currentTarget);
  };

  const langMenuClose = () => {
    setMenu(null);
  };

  function handleLanguageChange(lng) {
    dispatch(changeLanguage(lng.id));

    langMenuClose();
  }

  return (
    <>


      <Popover
        open={Boolean(menu)}
        anchorEl={menu}
        onClose={langMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
     


      </Popover>
    </>
  );
}

export default LanguageSwitcher;
