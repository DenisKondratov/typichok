import { formatRelative } from "date-fns";

const Message = ({ text, createdAt, photoURL, displayName }) => {
  return (
    <div style={{ display: "flex", height: 80, width: 500, alignItems: 'center' }}>
      <div>
        {photoURL ? (
          <img
            src={photoURL}
            alt="avatar"
            width={45}
            height={45}
            style={{ borderRadius: "50%" }}
          />
        ) : null}
      </div>
      <div className='ps-3'>
        <div className='d-flex align-items-end m-0'>
          {displayName ? <p className='m-0 text-danger fw-bolder'>{displayName}&nbsp;</p> : null}
          {createdAt?.seconds ? (
            <p className='m-0 d-flex align-items-start' style={{fontSize: '0.8rem', color: '#99aab5'}}>
              {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
            </p>
          ) : null}
        </div>
        <div>
          <p className='m-0 pt-2 d-flex align-items-start text-light'>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
