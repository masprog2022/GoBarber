import React, { createContext, useContext, useCallback, useState } from 'react';
import ToastContainer from '../components/ToastContainer';
import { uuid } from 'uuidv4';

export interface ToastMessage {
  id: string;
  type?: 'sucess' | 'error' | 'info';
  title: string;
  description?: string;

}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'> ): void;
  removeToast(id: string): void;
}

export const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {

  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({ type, title, description}: Omit<ToastMessage, 'id'>) => {

    const id = uuid();

    const toast = {
      id,
      type,
      title,
      description
    }

    setMessages(oldMessages => [...oldMessages, toast])

    //console.log('addToast');
  },[])
  const removeToast = useCallback((id: string) => {
    //console.log('removeToast');

    setMessages((oldMessages) => oldMessages.filter(message => message.id !== id))


  },[messages])


  return (<ToastContext.Provider value={{ addToast, removeToast}}>
              { children }
              <ToastContainer messages={messages}/>
         </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {

  const context = useContext(ToastContext);

  if(!context){
    throw new Error('useAuth must be used within a ToastPtovider');
  }

  return context;

}
