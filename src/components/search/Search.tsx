import './search.scss';
import React from 'react';
import { Search } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';

export default function SearchBar() {
  const [queryString, setQueryString] = React.useState('');
  const { dispatch } = React.useContext(AuthContext);

  React.useEffect(() => {
    dispatch({ type: 'SET_QUERY', payload: queryString });
  }, [queryString, dispatch]);

  return (
    <div className="searchbar">
      <Search className="searchIcon" />
      <input
        placeholder="Search for friend, post or video"
        className="searchInput"
        onChange={(e) => setQueryString(e.target.value)}
      />
    </div>
  );
}
