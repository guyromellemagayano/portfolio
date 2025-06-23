import { log } from '@packages/logger';
import { CounterButton } from '@packages/ui/counter-button';
import { Link } from '@packages/ui/link';

const Store = () => {
  log('Hey! This is the Store page.');

  return (
    <div className="container">
      <h1 className="title">
        Store <br />
        <span>Kitchen Sink</span>
      </h1>
      <CounterButton />
      <p className="description">
        Built With{' '}
        <Link href="https://turbo.build/repo" newTab>
          Turborepo
        </Link>
        {' & '}
        <Link href="https://nextjs.org/" newTab>
          Next.js
        </Link>
      </p>
    </div>
  );
};

export default Store;
