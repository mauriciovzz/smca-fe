import { React } from 'react';

import {
  Outlet, redirect, useLoaderData, useOutlet, useOutletContext, useParams,
} from 'react-router-dom';

import nodesService from 'src/services/nodes';
import notificationHelper from 'src/utils/notificationHelper';

import SelectedNodeOverview from './SelectedNodeOverview';

export const selectedNodeComponentsLoader = async (auth, params, loaderErrors) => {
  if (!auth) {
    return redirect('/');
  }

  try {
    const componentsData = await nodesService.getComponents(params.spaceId, params.nodeId);

    return componentsData;
  } catch (error) {
    const errorMessage = error.response.data.message;

    const errorData = loaderErrors.find((err) => err.errorMessage === errorMessage);

    if (errorData) {
      if (errorData.showMessage)
        notificationHelper.errorMsg(errorData.errorMessage);

      return redirect(errorData.redirectTo);
    }

    return null;
  }
};

const SelectedNodeRoot = () => {
  const {
    spaceData, nodesData, updateSelectedSpaceRoot, errorHandler,
  } = useOutletContext();
  const { nodeId } = useParams();
  const outlet = useOutlet();
  const componentsData = useLoaderData();
  const selectedNode = nodesData.find((n) => n.node_id === parseInt(nodeId, 10));

  const renderOutlet = () => {
    if (outlet) {
      return (
        <Outlet context={{
          spaceData, selectedNode, componentsData, updateSelectedSpaceRoot, errorHandler,
        }}
        />
      );
    }

    return (
      <SelectedNodeOverview
        spaceData={spaceData}
        selectedNode={selectedNode}
        componentsData={componentsData}
      />
    );
  };

  return (
    <div className="flex grow flex-col">
      <div className="flex grow bg-background">
        {renderOutlet()}
      </div>
    </div>
  );
};

export default SelectedNodeRoot;
