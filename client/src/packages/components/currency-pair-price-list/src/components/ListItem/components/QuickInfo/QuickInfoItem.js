import React from 'react';

const QuickInfoItem = ({
  children,
  subtext
}) => (
  <div className="cppl-quick-info-item">
    <div>
      {children}
    </div>
    <div className="cppl-subtext">
      {subtext}
    </div>
  </div>
);

export default QuickInfoItem;
