import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
}

export interface IToastHook {
  addToast: (message: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  messages: ToastMessage[];
}

export function useToastHook(): IToastHook {
  const [messages, setMessages] = useState<ToastMessage[]>([]);
  
  const addToast = useCallback(
    ({title, description}: Omit<ToastMessage, 'id'>) => {
    const id = uuidv4();

    const toast = {
      id,
      title,
      description,
    };

    setMessages(oldMessages => [...oldMessages, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return { addToast, removeToast, messages };
}
