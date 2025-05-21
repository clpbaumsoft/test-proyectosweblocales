import { EventEmitter } from "events";

const mcmModalEmitter = new EventEmitter();


function mcm() {}

mcm.openModal = (message: string, funcHandleYes: ()  => void, funcHandleNo: () => void) => {
  mcmModalEmitter.emit('open_modal', { message, funcHandleYes, funcHandleNo });
}

mcm.open = () => {
	mcmModalEmitter.emit('open');
}

mcm.close = () => {
	mcmModalEmitter.emit('close');
}

mcm.confirm = (message: string) => {
	return new Promise((resolve) => {
    
    const handleYes = () => {
      mcm.close();
      resolve(true);
    };

    const handleNo = () => {
      mcm.close();
      resolve(false);
    };

    mcm.openModal(
      message,
      handleYes,
      handleNo
    );
  });
}

mcm.init = (callback: (valIsOpen: boolean) => void, setMessage: (str: string) => void, setHandleYes: (fu: () => void)  => void, setHandleNo: (fu: () => void)  => void) => {

  mcmModalEmitter.on('open', () => {
    callback(true);
  });
	
  mcmModalEmitter.on('close', () => {
		callback(false);
  });
  
  mcmModalEmitter.on('open_modal', (modal) => {
    setMessage(modal.message);
    setHandleYes(() => modal.funcHandleYes);
    setHandleNo(() => modal.funcHandleNo);
    callback(true);
  });

  return () => {
    mcmModalEmitter.removeAllListeners();
  };
}

export { mcm };