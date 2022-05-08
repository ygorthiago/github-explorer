import { useEffect } from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useToastContext } from '../../../contexts/useToastContext';
import { ToastMessage } from '../../../hooks/useToast';
import { getDateTime } from '../../../utils';
import { StyledToast } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: Record<string, unknown>;
}

function Toast({ message, style }: ToastProps): JSX.Element {
  const { removeToast } = useToastContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 4 * 1000);

    return () => clearTimeout(timer);
  }, [removeToast, message.id]);

  return (
    <StyledToast style={style}>
      <FiCheckCircle size={24} />
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
        <p className="date">{getDateTime()}</p>
      </div>

      <button
        onClick={() => removeToast(message.id)}
        type="button"
        data-testid="close-toast-button"
      >
        <FiXCircle size={18} />
      </button>
    </StyledToast>
  );
}

export default Toast;
