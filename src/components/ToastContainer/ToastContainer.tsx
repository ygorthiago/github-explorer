import { useTransition } from 'react-spring';
import { useToastContext } from '../../contexts/useToastContext';

import * as s from './styles'
import Toast from './Toast/Toast';

export function ToastContainer(): JSX.Element {
  const { messages } = useToastContext();

  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <s.ToastContainer>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </s.ToastContainer>
  );
}
