import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface ISubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({priceId}: ISubscribeButtonProps) {

  const [session] = useSession();
  
  const { push } = useRouter();
  async function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    }

    if(session && session.activeSubscription) {
      push('/posts');
      return;
    }

    try {
      const response = await api.post('/subscribe');
      const { sessionId } = response.data;
      const stripe = await getStripeJs();
      await stripe?.redirectToCheckout({sessionId});
    } catch (error) {
      alert(error.message);
    }
  } 

  return (
    <button 
    className={styles.subscribeButton} 
    type="button"
    onClick={handleSubscribe}>
      Subscribe now
    </button>
  )
}