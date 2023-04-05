
import * as React from 'react';
import { contacts } from '../../resources/contacts';
import { Popup } from '@progress/kendo-react-popup';
import {
  ListView,
  ListViewHeader,
  ListViewFooter,
} from '@progress/kendo-react-listview';
import { Avatar } from '@progress/kendo-react-layout';
import { Notification } from '@progress/kendo-react-notification';
import { Button } from '@progress/kendo-react-buttons';

export const Alert = () => {
  const anchor = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const [notifications, setNotifications] = React.useState('2')

  const MyHeader = () => {
    return (
      <ListViewHeader
        style={{
          color: 'black',
          fontSize: 19,
          borderBottom: '1px solid #dee2e6',
          padding: '.3rem'
        }}
        className="pl-3 pb-2 pt-2"
      >
        Notifications <Notification type={{
          style: 'warning',
        }} >
          <span>{`${notifications} New`}</span>
        </Notification>
      </ListViewHeader>
    );
  };
  const MyFooter = () => {
    let messages = 0;
    contacts.map((i) => (
      messages = messages + i.messages
    ));
    return (
      <ListViewFooter
        style={{
          color: 'black',
          fontSize: 19,
          margin: '0.3em',
          padding: '.1rem'
        }}
        className="pl-3 pb-2 pt-2"
      >
        <div>
          <Button type={'submit'} onClick={() => { setNotifications('0') }} className="mark-button" style={{
            border: 'solid 1px #FF6358',
            color: '#FF6358',
            backgroundColor: 'white'
          }}>
            Mark all as read
          </Button>
        </div>
      </ListViewFooter>
    );
  };
  const MyItemRender = (props) => {
    let item = props.dataItem;
    return (
      <div
        className="row p-2 border-bottom align-middle"
        style={{
          margin: 0,
          padding: '.3rem'
        }}
      >
        <div className="col-2 avatar-container" >
          <Avatar type="image">
            <img
              src={item.image}
              alt="name"
            />
          </Avatar>
          <div className="col-6 message-container">
            <h1
              style={{
                fontSize: '0.8rem',
                marginBottom: 0,

              }}
            >
              {item.message}
            </h1>
          </div>
        </div>

      </div>
    );
  };

  const onClick = () => {
    setShow(!show);
  };
  return (
    <div>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
        onClick={onClick}
        ref={anchor}
      >
        <span className="k-icon k-i-notification"></span>
      </button>
      <Popup anchor={anchor.current} show={show} popupClass={'popup-content'}>
        <ListView
          data={contacts}
          item={MyItemRender}
          style={{
            width: '100%',
          }}
          header={MyHeader}
          footer={MyFooter}
        />
      </Popup>
    </div>
  );
};