import Stack from '@mui/material/Stack';
import { useEffect, useRef, useState } from 'react';
import D3PnlChart from './D3PnLGraph';
import Tooltip from '@mui/material/Tooltip';
import BarChartIcon from '@mui/icons-material/BarChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import Tabs from '@mui/material/Tabs';
import { Tab } from '@mui/material';

interface PnLGraphWrapperProps {
  data: { x: number; y: number }[];
  height: number;
  width: number;
  type: 'PNL' | 'ROI';
  newUi: boolean;
  setNewUi: any;
}

const tabConfig = [
  {
    id: 0,
    icon: <BarChartIcon />,
  },
  {
    id: 1,
    icon: <ScatterPlotIcon />,
  },
];

export default function PnLGraphWrapper(props: PnLGraphWrapperProps) {
  const [chart, setChart] = useState<D3PnlChart | null>(null);
  const refElement = useRef<HTMLDivElement>(null);

  function initialiseGraph() {
    setChart(new D3PnlChart(refElement.current, props.newUi, { ...props }));
  }

  function handleChange() {
    props.setNewUi(!props.newUi);
  }

  useEffect(() => {
    if (chart?.destroy) {
      chart?.destroy();
      setChart(null);
    }
    initialiseGraph();
  }, [props.newUi]);

  return (
    <>
      <Tabs
        value={props.newUi ? 1 : 0}
        onChange={handleChange}
        aria-label="styled tabs example"
        sx={{
          '& .Mui-selected': {
            backgroundColor: 'primary.main',
            borderBottom: 'none',
          },
          '& .MuiTabs-indicator': {
            background: 'none',
          },
          '& .MuiButtonBase-root:not(:last-of-type)': {
            marginRight: '0px',
          },
          borderRadius: '4px',
          backgroundColor: 'background.default',
          width: 99,
          height: 40,
          minHeight: 20,
          position: 'absolute',
          right: '1.5%',
          top: '5%',
          transform: 'scale(.85)',
        }}
      >
        {tabConfig.map(({ id, icon }) => (
          <Tooltip key={id} title={`Toggle ${id === 0 ? 'bar' : 'scatter'} chart`}>
            <Tab
              sx={{
                height: 40,
                minHeight: 20,
                borderRadius: props.newUi ? '0 4px 4px 0' : ' 4px 0 0 4px',
              }}
              key={id}
              icon={icon}
            />
          </Tooltip>
        ))}
      </Tabs>
      <Stack spacing={2} sx={{ pl: 1 }}>
        <div ref={refElement}></div>
      </Stack>
    </>
  );
}
