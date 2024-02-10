import { React } from 'react';

import { Navbar } from 'src/layout';
import Routers from 'src/routers/Routers';

const App = () => (
  <div className="relative flex h-screen flex-col justify-between bg-background">
    <Navbar />
    <Routers />
  </div>
);

export default App;
