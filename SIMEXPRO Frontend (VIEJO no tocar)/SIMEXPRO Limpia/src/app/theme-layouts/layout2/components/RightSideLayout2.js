import { memo } from 'react';
import ChatPanel from '../../shared-components/chatPanel/ChatPanel';
import QuickPanel from '../../shared-components/quickPanel/QuickPanel';
import NotificationPanel from '../../shared-components/notificationPanel/NotificationPanel';

function RightSideLayout2() {
  return (
    <>

      <QuickPanel />

    </>
  );
}

export default memo(RightSideLayout2);
