'use client';

import { account } from '@/lib/appwrite';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Dashboard() {
  const [state, setState] = useState(null);
  const router = useRouter();

  // 1. Ensure user is logged in
  useEffect(() => {
    account
      .get()
      .then(() => fetchState())
      .catch(() => router.push('/login'));
  }, []);

  // 2. Fetch or initialize game state
  const fetchState = async () => {
    const user = await account.get();
    const list = await db.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      'gameStates',
      [Query.equal('userId', user.$id)]
    );
    if (list.total === 0) {
      // create initial
      const doc = await db.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        'gameStates',
        'unique()',
        {
          userId: user.$id,
          lumber: 0,
          workers: 1,
          assignedWorkers: 0,
          townhallLevel: 1,
        }
      );
      setState(doc);
    } else {
      setState(list.documents[0]);
    }
  };

  // 3. Update helper
  const updateState = async (updates) => {
    const doc = await db.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      'gameStates',
      state.$id,
      updates
    );
    setState(doc);
  };

  // 4. Game actions
  const assignWorker = () => {
    if (state.assignedWorkers < state.workers) {
      updateState({ assignedWorkers: state.assignedWorkers + 1 });
    }
  };
  const unassignWorker = () => {
    if (state.assignedWorkers > 0) {
      updateState({ assignedWorkers: state.assignedWorkers - 1 });
    }
  };
  const produceLumber = () => {
    const gain = state.assignedWorkers;
    updateState({ lumber: state.lumber + gain });
  };
  const upgradeTownhall = () => {
    const cost = state.townhallLevel * 10;
    if (state.lumber >= cost) {
      updateState({
        lumber: state.lumber - cost,
        townhallLevel: state.townhallLevel + 1,
        workers: state.workers + 1,
      });
    }
  };

  if (!state) return <div>Loading…</div>;

  return (
    <div>
      <h1>Townhall Lv. {state.townhallLevel}</h1>
      <p>Lumber: {state.lumber}</p>
      <p>
        Workers: {state.workers} (Assigned: {state.assignedWorkers})
      </p>

      <div>
        <button onClick={assignWorker}>Assign Worker</button>
        <button onClick={unassignWorker}>Unassign</button>
        <button onClick={produceLumber}>Produce Lumber</button>
      </div>

      <div>
        <button
          onClick={upgradeTownhall}
          disabled={state.lumber < state.townhallLevel * 10}
        >
          Upgrade Townhall (Cost: {state.townhallLevel * 10})
        </button>
      </div>
    </div>
  );
}
