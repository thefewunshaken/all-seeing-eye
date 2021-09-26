const Rank = ({ user }) => {
  return (
    <div className="white tc">
      <div className="f3">
        { `${user.first_name} ${user?.last_name}` || 'Hey there' }, your current rank is
      </div>
      <div className="f1">
        { user.entries || 0 }
      </div>
    </div>
  );
}

export default Rank;