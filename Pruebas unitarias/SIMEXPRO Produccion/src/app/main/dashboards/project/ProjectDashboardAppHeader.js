import _ from '@lodash';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { selectUser } from 'app/store/userSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, selectProjects } from './store/projectsSlice';

function ProjectDashboardAppHeader(props) {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const user = useSelector(selectUser);

  const [selectedProject, setSelectedProject] = useState({
    id: 1,
    menuEl: null,
  });

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  function handleChangeProject(id) {
    setSelectedProject({
      id,
      menuEl: null,
    });
  }

  function handleOpenProjectMenu(event) {
    setSelectedProject({
      id: selectedProject.id,
      menuEl: event.currentTarget,
    });
  }

  function handleCloseProjectMenu() {
    setSelectedProject({
      id: selectedProject.id,
      menuEl: null,
    });
  }

  if (_.isEmpty(projects)) {
    return null;
  }

  return (
    <div className="flex flex-col w-full px-24 sm:px-32">
      <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-24 sm:my-30">
        <div className="flex flex-auto items-center min-w-0">
          {/* <Avatar className="flex-0 w-64 h-64" alt="user photo" src={user?.data?.photoURL}>
            {user?.data?.displayName[0]}
          </Avatar> */}
          <div className="flex flex-col min-w-0 mx-16">
            <Typography style={{textTransform:'capitalize'}} className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
              {`Bienvenido de Nuevo, ${user.data.displayName}!`}
            </Typography>

           
          </div>
        </div>
        <div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12">
          
        </div>
      </div>
      <div className="flex items-center">
        
        <Menu
          id="project-menu"
          anchorEl={selectedProject.menuEl}
          open={Boolean(selectedProject.menuEl)}
          onClose={handleCloseProjectMenu}
        >
          {projects &&
            projects.map((project) => (
              <MenuItem
                key={project.id}
                onClick={(ev) => {
                  handleChangeProject(project.id);
                }}
              >
                {project.name}
              </MenuItem>
            ))}
        </Menu>
      </div>
    </div>
  );
}

export default ProjectDashboardAppHeader;
