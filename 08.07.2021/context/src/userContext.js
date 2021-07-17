import React from 'react';

const Usercontext = React.createContext();

const Userprovider = Usercontext.Provider
const Userconsumer = Usercontext.Consumer

export { Userprovider, Userconsumer };

export default Usercontext;