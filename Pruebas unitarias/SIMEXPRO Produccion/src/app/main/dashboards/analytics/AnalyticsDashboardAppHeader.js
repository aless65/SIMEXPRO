import Typography from '@mui/material/Typography';

function AnalyticsDashboardAppHeader(props) {
  return (
    <div className="flex w-full container">
      <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 p-24 md:p-32 pb-2 md:pb-3">
        <div className="flex flex-col flex-auto">
          <Typography className="text-3xl font-semibold tracking-tight leading-8">
            Inicio
          </Typography>
        </div>
        <div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12" />
      </div>
    </div>
  );
}

export default AnalyticsDashboardAppHeader;
