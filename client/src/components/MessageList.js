import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <React.Fragment key={i}><Message message={message} name={name}/></React.Fragment>)}
  </ScrollToBottom>
);

export default Messages;
