import React from 'react';

const QuickInfoItem = ({
  children,
  subtext
}) => (
  <div className="cppl-quick-info-item">
    {children}
    <div className="cppl-subtext">
      {subtext}
    </div>
  </div>
);