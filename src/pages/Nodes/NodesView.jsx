import {
  React, useState, useEffect, useContext,
} from 'react';
import {
  useNavigate, useOutletContext,
} from 'react-router-dom';
import {
  AuthContext,
} from 'src/context/authProvider';
import MapWidget from 'src/components/MapWidget';
import TableWidget from 'src/components/TableWidget';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import nodesService from 'src/services/nodes';

const NodesView = () => {
  const navigate = useNavigate();
  const [nodeList, setNodeList] = useState([]);
  const { setSelectedNode } = useOutletContext();
  const { logout } = useContext(AuthContext);

  const selectNode = (node) => {
    setSelectedNode(node);
    navigate(`/cuenta/nodos/${node.node_type}/${node.node_id}`);
  };

  const parseRows = (type) => {
    const rowsStyle = (type === 'desktop')
      ? ['whitespace-nowrap', '', '', '', 'text-center']
      : ['', '', '', '', 'flex'];

    const rows = nodeList.map((node) => {
      const rowData = [];

      rowData.push(`${node.node_type}-${node.node_id}`);
      rowData.push(`[${node.lat}, ${node.long}]`);
      rowData.push(node.location_name);
      rowData.push(node.address);
      rowData.push(
        <span className={`${(node.node_state === 'ACT') ? 'bg-[#39FF14]' : 'bg-[#FF0000]'} rounded-2xl p-2 text-xs font-bold text-white`}>
          {node.node_state}
        </span>,
      );

      return {
        key: node.node_type + node.node_id,
        onClick: () => selectNode(node),
        rowData,
      };
    });

    return {
      data: rows,
      style: rowsStyle,
    };
  };

  useEffect(() => {
    nodesService
      .getAllNodes()
      .then((allNodes) => setNodeList(allNodes))
      .catch((err) => {
        if (err.response.data.error === 'La sesión expiró') logout(err);
      });
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="h-full w-full">
      {/* Desktop */}
      <div className="hidden h-full w-full grid-cols-2 grid-rows-1 gap-5 sm:grid">

        {/* Map */}
        <div className="flex w-full rounded-lg bg-white p-5 shadow">
          <div className="flex w-full overflow-hidden rounded-lg shadow">
            <MapWidget
              markerList={nodeList}
              onMarkerClick={selectNode}
              markerPopup={(node) => (
                <>
                  <b>
                    {(node.node_type === 'OUT') ? 'Outdoor' : 'Indoor'}
                    -
                    {node.node_id}
                  </b>
                  <br />
                  {node.location_name}
                </>
              )}
              mapType="showing"
            />
          </div>
        </div>

        {/* Table */}
        <TableWidget
          title="Nodos"
          headers={['ID', 'Coordenadas', 'Ubicación', 'Dirección', 'Estado']}
          rows={(nodeList) ? parseRows('desktop') : null}
          buttonText="Agregar Nodo"
          onTableButtonClick={() => navigate('/cuenta/nodos/registrar')}
        />
      </div>

      {/* Mobile */}
      <div className="grid h-full grid-cols-1 grid-rows-1 sm:hidden">
        <Carousel
          showDots
          renderDotsOutside
          swipeable
          arrows={false}
          responsive={responsive}
          dotListClass="relative pt-3"
          sliderClass="h-full"
          className="h-full"
        >
          {/* Table */}
          <TableWidget
            title="Nodos"
            headers={['ID', 'Coordenadas', 'Ubicación', 'Dirección', 'Estado']}
            rows={(nodeList) ? parseRows('mobile') : null}
            buttonText="Agregar Nodo"
            onTableButtonClick={() => navigate('/cuenta/nodos/registrar')}
          />

          {/* Map */}
          <div className="flex h-full rounded-lg bg-white p-5 shadow">
            <div className="flex h-full w-full overflow-hidden rounded-lg shadow">
              <MapWidget
                markerList={nodeList}
                onMarkerClick={selectNode}
                markerPopup={(node) => (
                  <>
                    <b>
                      {(node.node_type === 'OUT') ? 'Outdoor' : 'Indoor'}
                      -
                      {node.node_id}
                    </b>
                    <br />
                    {node.location_name}
                  </>
                )}
                mapType="showing"
              />
            </div>
          </div>

        </Carousel>
      </div>
    </div>
  );
};

export default NodesView;
