import "./App.css";
import Stateless from "./Components/Stateless";
import Statefull from "./Components/Statefull";
import Test from "./Components/newjsx";
import Props from "./Components/props";
import Message from "./Components/Stateclasscomp";
import Counter from "./Components/Statefunccomp";
import EventBind from "./Components/EventBind";
import ParentComponent from "./Components/methodasprops";
import Conditional from "./Components/Conditional";
import Listrendering from "./Components/Listrendering";
import Lifecycle from "./Components/Lifecycle";
import RefsDemo from "./Components/refss";
import ErrorBoundary from "./Components/ErrorBoundary";
import HigherOrder from "./Components/Higherorder";
import HigherOrderhover from "./Components/Highrorderhover";
import { UserProvider } from "./Components/userContext";
import ContextA from "./Components/contextA";
import UseStateObject from "./Components/usestateObject";
import UseStateArray from "./Components/usestatearray";
import UseEfectAfterRender from "./Components/UseEffectrender";
import UseEffectrenderFunc from "./Components/useEffectafterrender";
import UseEffectCondFunc from "./Components/useEffectconditional";
import UseEffectSetinterval from "./Components/UseEffectsetinterval";

function App() {
  return (
    <div className="App">
      <Stateless name="sujatha" />
      <Statefull name="react" />
      <Test />
      <Props data="Props data">
        <p>This child props Components</p>
      </Props>
      <Message />
      <Counter />
      <EventBind />
      <ParentComponent />
      <Conditional />
      <Listrendering />
      <Lifecycle />
      <RefsDemo />
      <ErrorBoundary />
      <HigherOrder />
      <HigherOrderhover />
      <UserProvider value="newtext">
        {" "}
        <ContextA />
      </UserProvider>
      <UseStateObject />
      <UseStateArray />
      <UseEfectAfterRender />
      <UseEffectrenderFunc />
      <UseEffectCondFunc />
      <UseEffectSetinterval />
    </div>
  );
}

export default App;
