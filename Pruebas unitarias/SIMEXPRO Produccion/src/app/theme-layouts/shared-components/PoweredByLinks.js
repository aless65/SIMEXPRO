import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { motion } from 'framer-motion';

function PoweredByLinks() {
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1 },
    
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex items-center">
      <Tooltip title="INFOP" placement="top">
        <IconButton
          className="max-w-full"
          component={motion.a}
          variants={item}
          href="https://infop.hn"
          target="_blank"
          rel="noreferrer noopener"
          role="button"
          size="large"
          style={{
            display: 'inline-flex',
            borderRadius: '4px',
            overflow: 'hidden',
            width: '100px',
          }}
        >
          <img
            src="https://i.ibb.co/3TCdMmV/Logonuevo.png"
            width="100"
            height="100%"
            style={{
              objectFit: 'cover',
            }}
            alt="infop"
          />
        </IconButton>
      </Tooltip>
      <Tooltip variants={item} title="AHM" placement="top">
      <IconButton
        className="max-w-full"
        component={motion.a}
        variants={item}
        href="http://www.ahm-honduras.com"
        target="_blank"
        rel="noreferrer noopener"
        role="button"
        size="large"
        style={{
          display: 'inline-flex',
          borderRadius: '4px',
          overflow: 'hidden',
          width: '130px',
        }}
      >
        <img
          src="//i.ibb.co/ZHK2pvv/ahm.png"
          alt="ahm"
          width="130"
          height="100%"
          style={{
            objectFit: 'cover',
          }}
        />
      </IconButton>
    </Tooltip>
    
    </motion.div>
  );
}

export default PoweredByLinks;
