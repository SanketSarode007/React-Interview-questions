import React from 'react';
import Posts from './Components/Posts';
import Notifiy from './Components/toast/notification/Notify';
import { CinemaSeatBooking } from './Components/CinemaSeatBooking/CinemaSeatBooking';
import { Board } from './Components/KanbanBoard/Board';
import { Route, Routes } from "react-router";
import { GridLights } from "./Components/GridLights/GridLight"
import { LightsOut } from "./Components/LightsOut/LightOuts";
import ReactForm from "./Components/React Hook Form/ReactForm";
import { Suduko } from "./Components/SudukoValidator/Suduko"
import { Home } from "./Components/Home";

const App: React.FC = () => {

  return (
    <div>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/kanbanboard" element={<Board />} />
        <Route path="/gridlights" element={<GridLights />} />
        <Route path="/lights-out" element={<LightsOut />} />
        <Route path="/react-hook-form" element={<ReactForm />} />
        <Route path="/suduko" element={<Suduko />} />
      </Routes>
    </div>
  )
}

export default App;