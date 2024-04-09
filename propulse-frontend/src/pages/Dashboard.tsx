import { useState } from 'react';
import Button from '../components/Button';
import Page from '../structure/Page';
import { Layout, WidthProvider, Responsive } from "react-grid-layout";
import { CLIDashboardElement, DashboardElement, DiscoDashboardElement, InitialPosition, ServoDashboardElement, SolenoidDashboardElement } from '../components/DashboardElements';
import { useModal } from '../context/modal/ModalHook';
import { FaLock, FaLockOpen } from 'react-icons/fa';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// This is a JSON object that contains the layout of the saved dashboard
// This will give the user the ability to save and load dashboards

interface ComponentMap {
  [key: string]: any;
}

const componentmap: ComponentMap = {
  solenoid: SolenoidDashboardElement,
  servo: ServoDashboardElement,
  disco: DiscoDashboardElement,
  cli: CLIDashboardElement
}

interface SavedDashboardElement {
  type: string;
  typeOptions: any;
  name: string;
  initialPosition: InitialPosition;
}


const getDashboardConfig = (dashboard: DashboardElement[]) => {
  return dashboard.map((el) => {
    return {
      type: el.type,
      name: el.name,
      typeOptions: el.options,
      initialPosition: {
        x: el.layout.x,
        y: el.layout.y,
        w: el.layout.w,
        h: el.layout.h,
        static: el.layout.static
      }
    }
  });
}

const loadDashboard = (dashboard: SavedDashboardElement[]) => {
  return dashboard.map((el: SavedDashboardElement) => {
    const element = componentmap[el.type];
    return new element(el.name, el.typeOptions, el.initialPosition);
  });
}

const generateLayoutFromDashboard = (dashboard: any) => {
  return dashboard.map((value, index: number) => {
    return value.layout
  })
}


// Home Function: This is the homepage, should be located at (/).
const Dashboard: React.FC = () => {
  const modal = useModal();
  const initial_dashboard: DashboardElement[] = loadDashboard(JSON.parse(localStorage.getItem('dashboard') || '[]'));

  //const modal = useModal();
  const [dashboardTitle, setDashboardTitle] = useState<string>(localStorage.getItem('dashboard_title') || 'New Dashboard');
  const [dashboard, setDashboard] = useState<DashboardElement[]>(initial_dashboard);

  const [layout, setLayout] = useState(generateLayoutFromDashboard(initial_dashboard));

  const onDashboardTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDashboardTitle(e.target.value);

    // Save to local storage
    localStorage.setItem('dashboard_title', e.target.value);
  }

  const onAddItem = () => {
    //setDashboard(oldDashboard => [...oldDashboard, new SolenoidDashboardElement((oldDashboard.length + 1).toString(), {inline: false}, {x: 0, y: 0, w: 2, h: 2})]);
    modal.open('new_component');
  };

  const onNewDashboard = () => {
    setDashboard([]);
    setDashboardTitle('New Dashboard');
  }

  const onSaveDashboard = () => {
    // Get the dashboard config
    const new_saved_dashboard = getDashboardConfig(dashboard);

    const dashboard_config = JSON.stringify(new_saved_dashboard);

    localStorage.setItem('dashboard', dashboard_config);
    localStorage.setItem('dashboard_title', dashboardTitle);

    // Download the file to the user's computer
    const element = document.createElement("a");
    const file = new Blob([dashboard_config], {type: 'text/plain'});
    
    element.href = URL.createObjectURL(file);
    element.download = dashboardTitle + ".json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();

    // Remove the element from the DOM
    document.body.removeChild(element);

    // Save to local storage
  }

  const onLoadDashboard = () => {
    // Open file dialog and load the json file
    const element = document.createElement("input");
    element.type = 'file';
    element.accept = '.json';
    element.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.item(0);
      if (file) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {

          // Parse the JSON file and load the dashboard
          const dashboard_config = JSON.parse(reader.result as string)
          
          // Save to local storage
          localStorage.setItem('dashboard', JSON.stringify(dashboard_config));
          localStorage.setItem('dashboard_title', file.name.split('.')[0]);

          const newDashboard = loadDashboard(dashboard_config);
          setDashboard(newDashboard);
          setDashboardTitle(file.name.split('.')[0]);
        }

        reader.onerror = () => {
          console.log(reader.error);
        }
      }
    }
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  }

  const onDashboardLayoutChange = (layout: Layout[]) => {
    setDashboard(oldDashboard => {
      const newDashboard = [...oldDashboard];
      for (let i = 0; i < layout.length; i++) {
        newDashboard[i].layout = layout[i];
      }

      // Save to local storage
      localStorage.setItem('dashboard', JSON.stringify(getDashboardConfig(newDashboard)));

      setLayout(generateLayoutFromDashboard(newDashboard));
      return newDashboard;
    });

    
  }

  const onLockElement = (el: DashboardElement) => {
    // TODO: Make this work
    const newLayout = layout.map(item => {
      if (item.i === el.name) {
        return { ...item, static: !item.static }; // Toggle the `static` property
      }
      return { ...item }; // Return the item unchanged if it doesn't match
    });

    // CODE HERE

    setLayout(newLayout);
    console.log(el);
  }

  return (
    <Page>
      <div className='flex flex-row items-center justify-between'>
        <input value={dashboardTitle} onChange={onDashboardTitleChange} className='text-2xl font-black bg-transparent focus:bg-background-100 w-full select-none outline-none' />
        <div className='flex flex-row space-x-2'>
          <Button className='btn-gray active:btn-gray-active hover:btn-gray-hover w-16' onClick={onAddItem}>+</Button>
          <Button className='btn-gray active:btn-gray-active hover:btn-gray-hover w-16' onClick={onNewDashboard}>New</Button>
          <Button className='btn-gray active:btn-gray-active hover:btn-gray-hover w-16' onClick={onSaveDashboard}>Save</Button>
          <Button className='btn-gray active:btn-gray-active hover:btn-gray-hover w-16' onClick={onLoadDashboard}>Load</Button>
        </div>
      </div>
      <ResponsiveReactGridLayout
        rowHeight={40}
        cols={{ lg: 20, md: 16, sm: 12, xs: 8, xxs: 4 }}
        onLayoutChange={onDashboardLayoutChange}
        layouts={{lg: layout}}
      >
        {dashboard.map((el) => {
          return <div className='relative' key={el.name}>
            {el.element}
            <div onClick={() => onLockElement(el)} onMouseDown={ e => e.stopPropagation() } className='absolute top-1 right-1 cursor-pointer'>
              {
                el.layout.static ?
                <FaLock className='fill-gray-400 w-4 h-4' /> :
                <FaLockOpen className='fill-gray-400 w-4 h-4' />
              }
            </div>
          </div>;
        })}
      </ResponsiveReactGridLayout>
    </Page>
  )
}

export default Dashboard
