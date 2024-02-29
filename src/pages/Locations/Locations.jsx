import {
  React, useState, useEffect,
} from 'react';

import { useOutletContext } from 'react-router-dom';

import locationsService from 'src/services/locations';
import notifications from 'src/utils/notifications';

import LocationCreation from './LocationCreation';
import LocationList from './LocationList';
import LocationManagement from './LocationManagement';

const Locations = () => {
  const { selectedWorkspace } = useOutletContext();
  const [view, setView] = useState(null);

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const getLocations = async () => {
    try {
      const response = await locationsService.getAll(selectedWorkspace.workspace_id);
      setLocations(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  const selectLocation = (location) => {
    setSelectedLocation(location);
    setView('LocationManagement');
  };

  const renderView = () => {
    switch (view) {
      case 'LocationCreation':
        return (
          <LocationCreation
            updateLocations={() => getLocations()}
            changeView={() => setView(null)}
          />
        );
      case 'LocationManagement':
        return (
          <LocationManagement
            selectedLocation={selectedLocation}
            updateLocations={() => getLocations()}
            changeView={() => setView(null)}
          />
        );
      default:
        return (
          <LocationList
            locations={locations}
            selectLocation={(location) => selectLocation(location)}
            changeView={() => setView('LocationCreation')}
          />
        );
    }
  };

  return (
    <div className="flex grow bg-background">
      {renderView()}
    </div>
  );
};

export default Locations;
